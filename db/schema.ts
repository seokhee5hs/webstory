import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const projects=sqliteTable("novel_projects",{
 id:text("id").primaryKey(),userId:text("user_id").notNull(),title:text("title").notNull(),
 data:text("data").notNull(),revision:integer("revision").notNull().default(1),
 createdAt:text("created_at").notNull(),updatedAt:text("updated_at").notNull(),
},t=>[index("idx_novel_projects_user_updated").on(t.userId,t.updatedAt)]);
