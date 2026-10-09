import { z } from "zod";

export const ELEMENTS = [
  { id: "genre", name: "장르", en: "Genre", question: "어떤 재미를 약속하는 이야기인가요?", hint: "주 장르를 먼저 정하고, 작품만의 차이를 한 문장으로 적어보세요.", fields: [{ key: "primary", label: "주 장르", placeholder: "예: 현대판타지" }, { key: "sub", label: "서브 장르와 차별점", placeholder: "예: 게임 개발 × 성장. 미래를 보는 개발자의 창작 이야기" }, { key: "readers", label: "독자와 기대하는 재미", placeholder: "누가 읽고, 어떤 순간에 다음 화를 기다릴까요?" }] },
  { id: "theme", name: "주제", en: "Theme", question: "이 이야기로 무엇을 말하고 싶은가요?", hint: "사건을 요약하기보다, 인물이 끝내 마주할 질문을 적어보세요.", fields: [{ key: "message", label: "핵심 메시지", placeholder: "예: 완벽한 미래보다 함께 만드는 불완전한 현재가 중요하다" }, { key: "question", label: "작품이 던지는 질문", placeholder: "성공을 미리 안다면, 창작은 여전히 의미가 있을까?" }, { key: "tone", label: "정서와 분위기", placeholder: "예: 경쾌한 성장극, 현실적인 고민, 따뜻한 결말" }] },
  { id: "characters", name: "인물", en: "Character", question: "누구를 따라 이 이야기를 읽게 되나요?", hint: "소개보다 선택의 이유가 중요합니다. 인물 카드에서 욕망과 약점을 함께 설정하세요.", fields: [{ key: "overview", label: "핵심 인물과 관계", placeholder: "주인공, 조력자, 적대자는 어떻게 연결되나요?" }, { key: "arc", label: "인물의 변화", placeholder: "처음의 믿음이 사건을 거쳐 어떻게 달라지나요?" }, { key: "voice", label: "화법의 기본 방향", placeholder: "예: 업무에서는 존댓말, 오래된 친구와는 짧은 반말" }] },
  { id: "goal", name: "목표", en: "Goal", question: "주인공은 무엇을 간절히 원하나요?", hint: "겉으로 원하는 것과 실제로 필요한 것이 다르면 더 깊은 이야기가 됩니다.", fields: [{ key: "external", label: "외적 목표", placeholder: "예: 6개월 안에 첫 게임을 출시한다" }, { key: "internal", label: "내적 욕망과 결핍", placeholder: "실패를 두려워하는 마음, 인정받고 싶은 욕망" }, { key: "stakes", label: "실패하면 잃는 것", placeholder: "목표를 이루지 못했을 때 치러야 하는 대가" }] },
  { id: "conflict", name: "갈등", en: "Conflict", question: "무엇이 목표를 가로막나요?", hint: "주인공이 쉽게 피할 수 없는 대립과 선택을 만들어보세요.", fields: [{ key: "opponent", label: "인물 간 대립", placeholder: "예: 주인공과 투자자가 게임의 가치를 다르게 본다" }, { key: "obstacle", label: "환경과 내면의 장애물", placeholder: "시간, 자원, 제도, 약점이 어떻게 행동을 제한하나요?" }, { key: "dilemma", label: "가장 어려운 선택", placeholder: "어느 쪽을 선택해도 무언가를 잃는 딜레마" }] },
  { id: "plot", name: "사건", en: "Plot", question: "무슨 일이 주인공을 움직이게 하나요?", hint: "사건마다 원인, 인물의 선택, 그 결과를 연결해보세요.", fields: [{ key: "inciting", label: "발단 사건", placeholder: "일상을 깨고 이야기를 시작하는 계기" }, { key: "turns", label: "주요 사건과 전환점", placeholder: "발생한 일 → 인물의 선택 → 바뀐 상황" }, { key: "climax", label: "위기와 절정 및 해결", placeholder: "주인공이 마지막으로 무엇을 선택하고 갈등을 해결하나요?" }] },
  { id: "setting", name: "배경", en: "Setting", question: "이야기는 언제, 어디에서 일어나나요?", hint: "배경이 인물의 삶과 선택에 어떤 영향을 주는지도 정해보세요.", fields: [{ key: "time", label: "시간적 배경", placeholder: "예: 2032년, 겨울. 사건이 진행되는 기간은 6개월" }, { key: "place", label: "공간적 배경", placeholder: "도시, 직장, 집, 사건이 반복되는 주요 장소" }, { key: "society", label: "사회와 문화", placeholder: "계급, 조직, 관습, 생활환경과 사회적 관계" }] },
  { id: "world", name: "세계관", en: "Worldbuilding", question: "이 세계는 어떤 규칙으로 움직이나요?", hint: "능력보다 한계와 대가를 먼저 명시하면 설정 충돌을 줄일 수 있습니다.", fields: [{ key: "rules", label: "세계의 작동 규칙", placeholder: "마법, 기술, 능력, 제도, 경제가 작동하는 원리" }, { key: "limits", label: "한계와 금지 및 대가", placeholder: "가능한 일과 불가능한 일. 능력을 사용할 때 치르는 대가" }, { key: "history", label: "역사와 권력 구조", placeholder: "현재 질서를 만든 사건, 조직, 권력과 자원" }] },
  { id: "pov", name: "시점", en: "Point of view", question: "누구의 눈으로 이야기를 보여주나요?", hint: "독자가 알 수 있는 정보의 범위와 화자의 목소리를 함께 정하세요.", fields: [{ key: "type", label: "서술 시점", placeholder: "예: 3인칭 제한적 시점. 주인공을 중심으로 서술" }, { key: "distance", label: "정보 공개와 시점 전환", placeholder: "누구의 내면을 보여주고, 어떤 조건에서 시점을 바꾸나요?" }, { key: "style", label: "서술 문체", placeholder: "문장 길이, 서술의 밀도, 대사와 독백의 비중" }] },
  { id: "structure", name: "서사 구조", en: "Narrative", question: "어떤 리듬으로 다음 화를 기다리게 하나요?", hint: "전체 이야기와 회차의 작은 목표를 연결하세요. 매 화의 보상도 필요합니다.", fields: [{ key: "length", label: "전체 분량과 연재 단위", placeholder: "예: 60회차, 회당 4,000자, 3개의 시즌" }, { key: "arcs", label: "전체 구조와 에피소드", placeholder: "발단 → 전개 → 위기 → 절정 → 결말. 에피소드별 변화" }, { key: "episode", label: "회차별 목표와 후킹", placeholder: "초반 관심, 작은 갈등과 보상, 다음 화의 궁금증, 복선 회수" }] },
] as const;
export type ElementId = typeof ELEMENTS[number]["id"];
export type Character = { id: string; name: string; role: string; age: string; gender: string; position: string; desire: string; weakness: string; voice: string };
export type Relationship = { id: string; speakerId: string; listenerId: string; relation: string; context: string; styles: string; address: string; selfTerm: string; exceptions: string; validFrom: string; approved: boolean; approvedAt: string | null; version: number };
export type Plan = { schemaVersion: 1; title: string; logline: string; elements: Record<ElementId, Record<string, string>>; characters: Character[]; relationships: Relationship[]; report: string };

const text = z.string().max(15000);
const elementShape = Object.fromEntries(ELEMENTS.map(e => [e.id, z.object(Object.fromEntries(e.fields.map(f => [f.key,text]))).strict()]));
const character = z.object({ id:z.string().max(100),name:text,role:text,age:text,gender:text,position:text,desire:text,weakness:text,voice:text }).strict();
const relationship = z.object({ id:z.string().max(100),speakerId:z.string().max(100),listenerId:z.string().max(100),relation:text,context:text,styles:text,address:text,selfTerm:text,exceptions:text,validFrom:text,approved:z.boolean(),approvedAt:z.string().datetime().nullable(),version:z.number().int().min(1) }).strict();
export const planSchema = z.object({ schemaVersion:z.literal(1),title:z.string().max(200),logline:z.string().max(2000),elements:z.object(elementShape).strict(),characters:z.array(character).max(50),relationships:z.array(relationship).max(100),report:z.string().max(80000) }).strict().superRefine((p,ctx) => {
 const ids=p.characters.map(c=>c.id);
 if(new Set(ids).size!==ids.length)ctx.addIssue({code:"custom",message:"인물 ID가 중복됩니다"});
 if(new Set(p.relationships.map(r=>r.id)).size!==p.relationships.length)ctx.addIssue({code:"custom",message:"관계 ID가 중복됩니다"});
 p.relationships.forEach(r=>{if(!ids.includes(r.speakerId)||!ids.includes(r.listenerId)||r.speakerId===r.listenerId)ctx.addIssue({code:"custom",message:"관계의 화자와 청자를 확인하세요"}); if(r.approved&&(!r.approvedAt||!r.relation.trim()||!r.context.trim()||!r.styles.trim()||!r.validFrom.trim()))ctx.addIssue({code:"custom",message:"승인 시점과 관계별 필수 규칙이 필요합니다"});});
});
export function blankPlan():Plan {
 return {schemaVersion:1,title:"",logline:"",elements:Object.fromEntries(ELEMENTS.map(e=>[e.id,Object.fromEntries(e.fields.map(f=>[f.key,""]))])) as Plan["elements"],characters:[],relationships:[],report:""};
}
export function completion(plan:Plan,id:ElementId){return ELEMENTS.find(e=>e.id===id)!.fields.every(f=>plan.elements[id][f.key].trim())}
export function planMarkdown(plan:Plan) {
 let out=`# ${plan.title||"제목 없는 웹소설"}\n\n${plan.logline}\n\n`;
 ELEMENTS.forEach((e,i)=>{out+=`## ${i+1}. ${e.name}\n\n`;e.fields.forEach(f=>out+=`### ${f.label}\n${plan.elements[e.id][f.key]||"미작성"}\n\n`)});
 out+="## 인물 카드\n\n";
 plan.characters.forEach(c=>{out+=`### ${c.name||"이름 미정"}\n역할: ${c.role}\n나이: ${c.age}\n성별: ${c.gender}\n직위: ${c.position}\n욕망: ${c.desire}\n약점: ${c.weakness}\n말투: ${c.voice}\n\n`});
 out+="## 인물 관계와 화법\n\n";
 plan.relationships.forEach(r=>{const name=(id:string)=>plan.characters.find(c=>c.id===id)?.name||id;out+=`### ${name(r.speakerId)} → ${name(r.listenerId)}\n관계: ${r.relation}\n상황: ${r.context}\n말씨: ${r.styles}\n호칭: ${r.address}\n자칭: ${r.selfTerm}\n예외: ${r.exceptions}\n유효 시점: ${r.validFrom}\n작가 승인: ${r.approved?"승인됨":"검토 중"}\n버전: ${r.version}\n\n`});
 if(plan.report)out+=`## AI 기획안\n\n${plan.report}\n`;
 return out;
}
export function samplePlan():Plan {
 const p=blankPlan();p.title="미래를 보는 게임 개발자";p.logline="미래의 플레이 경험을 보는 실패한 개발자가, 예측에 의존할수록 동료와 창작 능력을 잃는다는 사실을 깨닫고 자신의 게임을 완성한다.";
 const values=[ ["현대판타지","게임 개발과 창작자의 성장","게임과 창작을 좋아하는 독자. 작은 성취와 팀의 성장"],["함께 만드는 불완전한 현재의 가치","미래를 알아도 좋은 게임을 만들 수 있을까?","경쾌한 성장극과 현실적인 갈등"],["개발자 지민, 팀장 서연, 투자자 태준","미래의 정답을 따르던 지민이 동료와 스스로 선택한다","업무 존댓말. 관계 합의 이후 사적 자리에서만 반말"],["6개월 안에 첫 게임을 출시한다","실패를 견디며 동료를 신뢰한다","개발 자금과 팀, 자신의 창작 의지"],["창작을 중시하는 팀과 수익을 요구하는 투자자","미래 정보에 의존할수록 현재의 아이디어가 약해진다","성공이 보이는 모방작과 불확실한 독창적 게임 중 선택"],["지민이 자신의 게임을 플레이한 미래의 기억을 본다","예측대로 개발했으나 동료가 떠난다. 예측에 없는 아이디어가 등장한다","미래를 보는 능력을 포기하고 팀의 게임을 공개한다"],["2032년 겨울부터 6개월","서울의 작은 게임 스튜디오와 전시회","개발 일정, 투자, 직장 내 위계와 개인의 창작 생활"],["자신이 작성한 게임의 미래 플레이 경험을 한 번씩 볼 수 있다","보는 시간만큼 현재의 창작 기억이 흐려진다","대형 플랫폼 중심 산업과 인디 개발 생태계"],["3인칭 제한적 시점","지민의 내면 중심. 서연의 내면은 대사로만 드러낸다","짧은 문장과 구체적인 행동. 중요한 선택에서 독백"],["60회차, 3부 구성","능력 발견 1~20화, 팀의 위기 21~40화, 독창적 출시 41~60화","회차마다 개발 과제 하나. 성취를 보상하고 새 선택으로 마무리"] ];
 ELEMENTS.forEach((e,i)=>e.fields.forEach((f,j)=>p.elements[e.id][f.key]=values[i][j]));
 p.characters=[{id:"jimin",name:"지민",role:"주인공",age:"27",gender:"남성",position:"개발자",desire:"자신의 게임 출시",weakness:"실패를 두려워한다",voice:"업무에서는 짧은 존댓말"},{id:"seoyeon",name:"서연",role:"조력자",age:"30",gender:"여성",position:"팀장",desire:"팀과 오래 만드는 게임",weakness:"책임을 혼자 떠안는다",voice:"차분한 해요체"}];
 p.relationships=[{id:"jm-sy-work",speakerId:"jimin",listenerId:"seoyeon",relation:"부하와 팀장",context:"업무와 공적 자리",styles:"해요체 또는 하십시오체",address:"팀장님",selfTerm:"저",exceptions:"8회차 사적 반말 합의는 업무에 적용하지 않음",validFrom:"1회차 이후",approved:false,approvedAt:null,version:1}];return p;
}
