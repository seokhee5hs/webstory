import { z } from 'zod';
import { planSchema, type Plan } from './planning';

const prefix = 'webstory:plan:v1:';
const recordSchema = z.object({
  id: z.string().uuid(),
  revision: z.number().int().positive(),
  updatedAt: z.string().datetime(),
  plan: planSchema,
}).strict();

function readRecord(storage: Storage, id: string) {
  const raw = storage.getItem(prefix + id);
  if (!raw) throw new Error('저장된 기획을 찾을 수 없습니다.');
  const parsed = recordSchema.safeParse(JSON.parse(raw));
  if (!parsed.success || parsed.data.id !== id) {
    throw new Error('저장된 기획 형식을 확인할 수 없습니다. 원본 데이터는 그대로 유지됩니다.');
  }
  return parsed.data;
}

export function listLocalPlans(storage: Storage) {
  const projects = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key?.startsWith(prefix)) continue;
    const record = readRecord(storage, key.slice(prefix.length));
    projects.push({ id: record.id, title: record.plan.title.trim() || '제목 없는 웹소설', updated_at: record.updatedAt });
  }
  return projects.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export function loadLocalPlan(storage: Storage, id: string) {
  return readRecord(storage, id);
}

export function saveLocalPlan(storage: Storage, plan: Plan, id: string | null, revision: number | null) {
  const parsed = planSchema.parse(plan);
  const previous = id ? readRecord(storage, id) : null;
  if (previous && previous.revision !== revision) {
    throw new Error('다른 창에서 기획이 변경되었습니다. 현재 기획을 JSON으로 내보낸 뒤 최신 기획을 불러와 주세요.');
  }
  const record = { id: id ?? crypto.randomUUID(), revision: (previous?.revision ?? 0) + 1, updatedAt: new Date().toISOString(), plan: parsed };
  try {
    storage.setItem(prefix + record.id, JSON.stringify(record));
  } catch {
    throw new Error('브라우저에 저장하지 못했습니다. 저장 공간과 브라우저 설정을 확인하거나 기획을 JSON으로 내보내 주세요.');
  }
  return record;
}
