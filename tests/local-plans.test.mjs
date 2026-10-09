import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Run the browser storage logic with the same schemas, without a browser or API.
const output = new URL('../.sites-runtime/storage-tests/', import.meta.url);
mkdirSync(output, { recursive: true });
for (const name of ['planning', 'local-plans']) {
  const source = readFileSync(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  writeFileSync(new URL(`${name}.mjs`, output), compiled.replace("from './planning'", "from './planning.mjs'"));
}
const { blankPlan } = await import(new URL('planning.mjs', output).href);
const { listLocalPlans, loadLocalPlan, saveLocalPlan } = await import(new URL('local-plans.mjs', output).href);
class MemoryStorage {
  data = new Map();
  get length() { return this.data.size; }
  key(i) { return [...this.data.keys()][i] ?? null; }
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
}

test('save/load round trip and separate projects preserve writer data', () => {
  const storage = new MemoryStorage();
  storage.setItem('another-app', 'unrelated');
  const plan = { ...blankPlan(), title: '테스트 작품' };
  const first = saveLocalPlan(storage, plan, null, null);
  const second = saveLocalPlan(storage, { ...plan, title: '두 번째 작품' }, null, null);
  assert.notEqual(first.id, second.id);
  assert.deepEqual(loadLocalPlan(storage, first.id).plan, plan);
  assert.equal(listLocalPlans(storage).length, 2);
  assert.equal(storage.getItem('another-app'), 'unrelated');
});

test('stale revision cannot overwrite a newer saved plan', () => {
  const storage = new MemoryStorage();
  const first = saveLocalPlan(storage, blankPlan(), null, null);
  const changed = { ...first.plan, title: '새 제목' };
  const second = saveLocalPlan(storage, changed, first.id, first.revision);
  assert.equal(second.revision, 2);
  assert.throws(() => saveLocalPlan(storage, first.plan, first.id, first.revision), /다른 창/);
  assert.equal(loadLocalPlan(storage, first.id).plan.title, '새 제목');
});

test('invalid data and full storage report errors without reporting a save', () => {
  const storage = new MemoryStorage();
  assert.throws(() => saveLocalPlan(storage, {}, null, null));
  assert.equal(storage.length, 0);
  storage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => saveLocalPlan(storage, blankPlan(), null, null), /JSON/);
});

test('corrupt existing record is preserved rather than overwritten', () => {
  const storage = new MemoryStorage();
  const saved = saveLocalPlan(storage, blankPlan(), null, null);
  const key = storage.key(0);
  storage.setItem(key, '{broken');
  assert.throws(() => listLocalPlans(storage));
  assert.throws(() => saveLocalPlan(storage, blankPlan(), saved.id, saved.revision));
  assert.equal(storage.getItem(key), '{broken');
});
