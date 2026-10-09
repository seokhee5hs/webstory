import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";
import { ELEMENTS, planSchema, type Plan, type ElementId } from "../../../lib/planning";
import { buildAIRequest, extractOutput } from "../../../lib/ai";
export const dynamic="force-dynamic";
const reply=(x:unknown,status=200)=>Response.json(x,{status,headers:{"Cache-Control":"no-store"}});
const bodySchema=z.object({action:z.enum(["connect","improve","report","review"]),model:z.string().min(1).max(120).regex(/^[a-zA-Z0-9_.:-]+$/),element:z.enum(ELEMENTS.map(e=>e.id) as [ElementId,...ElementId[]]),request:z.string().max(2000),plan:planSchema}).strict();
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return reply({error:"AI를 사용하려면 로그인해야 합니다."},401);
 if(request.headers.get("origin")!==new URL(request.url).origin)return reply({error:"요청 출처를 확인할 수 없습니다."},403);
 const apiKey=request.headers.get("x-openai-key")?.trim();
 if(!apiKey||apiKey.length<16||apiKey.length>512)return reply({error:"OpenAI API 키를 입력해 주세요."},400);
 try{
  const raw=await request.text();if(raw.length>200000)return reply({error:"입력 내용을 줄여 주세요."},413);
  const parsed=bodySchema.safeParse(JSON.parse(raw));if(!parsed.success)return reply({error:"입력 형식 또는 모델명을 확인해 주세요."},400);
  const {action,model,element,plan,request:authorRequest}=parsed.data;
  const options:RequestInit=action==="connect"?{method:"GET",headers:{Authorization:`Bearer ${apiKey}`},signal:AbortSignal.timeout(20000)}:{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify(buildAIRequest(action,plan as Plan,model,element,authorRequest)),signal:AbortSignal.timeout(120000)};
  const endpoint=action==="connect"?`https://api.openai.com/v1/models/${encodeURIComponent(model)}`:"https://api.openai.com/v1/responses";
  const response=await fetch(endpoint,options);
  if(!response.ok){const status=response.status;const error=status===401?"API 키를 확인해 주세요.":status===429?"사용 한도 또는 호출 제한을 확인해 주세요.":status===404?"이 모델을 사용할 수 없습니다. 모델명과 접근 권한을 확인해 주세요.":status===400?"선택한 모델이 요청 형식을 지원하는지 확인해 주세요. 항목 보완에는 구조화 출력 지원 모델이 필요합니다.":"AI 서비스 응답에 문제가 있습니다. 잠시 후 다시 시도해 주세요.";return reply({error},status>=500?502:status);}
  if(action==="connect")return reply({connected:true,model});
  const data=await response.json() as {status?:string;usage?:{input_tokens?:number;output_tokens?:number}};
  if(data.status==="incomplete")return reply({error:"AI 응답이 끝나기 전에 출력 한도에 도달했습니다. 요청 범위를 줄여 다시 시도해 주세요."},502);
  const output=extractOutput(data);if(!output)return reply({error:"AI가 텍스트 결과를 반환하지 않았습니다. 다시 시도해 주세요."},502);
  if(action==="improve"){
   const spec=ELEMENTS.find(e=>e.id===element)!;
   const schema=z.object({fields:z.object(Object.fromEntries(spec.fields.map(f=>[f.key,z.string().min(1).max(15000)]))).strict(),summary:z.string().max(2000)}).strict();
   const result=schema.safeParse(JSON.parse(output));if(!result.success)return reply({error:"AI 제안의 형식이 올바르지 않습니다. 다시 시도해 주세요."},502);
   return reply({suggestion:result.data,usage:data.usage});
  }
  if(output.length>80000)return reply({error:"AI 응답이 너무 깁니다. 요청 범위를 줄여 주세요."},502);
  return reply({text:output,usage:data.usage});
 }catch{return reply({error:"AI 요청을 완료하지 못했습니다. 연결 상태와 요청 범위를 확인해 주세요. 입력한 기획은 유지됩니다."},502);}
}
