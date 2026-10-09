import { getChatGPTUser } from "../../chatgpt-auth";
import { rawDb } from "../../../db/raw";
import { planSchema } from "../../../lib/planning";
import { z } from "zod";
export const dynamic="force-dynamic";
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function GET(request:Request){
 const user=await getChatGPTUser();if(!user)return reply({error:"기획을 불러오려면 로그인해야 합니다."},401);
 try {const id=new URL(request.url).searchParams.get("id");const db=rawDb();
  if(id){const row=await db.prepare("SELECT data,revision,id,updated_at FROM novel_projects WHERE id=? AND user_id=?").bind(id,user.userId).first<{data:string;revision:number;id:string;updated_at:string}>();if(!row)return reply({error:"기획을 찾을 수 없습니다."},404);return reply({plan:JSON.parse(row.data),id:row.id,revision:row.revision,updatedAt:row.updated_at});}
  const result=await db.prepare("SELECT id,title,updated_at,revision FROM novel_projects WHERE user_id=? ORDER BY updated_at DESC LIMIT 50").bind(user.userId).all();return reply({projects:result.results});
 }catch{return reply({error:"기획을 불러오지 못했습니다. 입력한 내용은 그대로 유지됩니다."},503);}
}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return reply({error:"기획을 저장하려면 로그인해야 합니다."},401);
 if(request.headers.get("origin")!==new URL(request.url).origin)return reply({error:"요청 출처를 확인할 수 없습니다."},403);
 try{
  const raw=await request.text();if(raw.length>200000)return reply({error:"기획이 너무 큽니다. 내용을 줄여 주세요."},413);
  const body=z.object({id:z.string().uuid().nullable(),revision:z.number().int().min(1).nullable(),plan:planSchema}).strict().safeParse(JSON.parse(raw));
  if(!body.success)return reply({error:"기획 형식이 올바르지 않습니다."},400);
  const {plan,id,revision}=body.data;const now=new Date().toISOString();const db=rawDb();const title=plan.title.trim()||"제목 없는 웹소설";const data=JSON.stringify(plan);
  if(id){if(!revision)return reply({error:"저장 버전을 확인해 주세요."},400);const result=await db.prepare("UPDATE novel_projects SET title=?,data=?,updated_at=?,revision=revision+1 WHERE id=? AND user_id=? AND revision=?").bind(title,data,now,id,user.userId,revision).run();if(result.meta.changes!==1)return reply({error:"다른 창에서 기획이 변경되었습니다. JSON으로 현재 내용을 내보낸 뒤 최신 기획을 불러와 주세요."},409);return reply({id,revision:revision+1,updatedAt:now});}
  const newId=crypto.randomUUID();await db.prepare("INSERT INTO novel_projects (id,user_id,title,data,revision,created_at,updated_at) VALUES (?,?,?,?,1,?,?)").bind(newId,user.userId,title,data,now,now).run();return reply({id:newId,revision:1,updatedAt:now});
 }catch{return reply({error:"기획을 저장하지 못했습니다. 입력한 내용은 유지됩니다. 잠시 후 다시 시도해 주세요."},503);}
}
