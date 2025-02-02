import { relations } from 'drizzle-orm';
import { pgTable, text, integer, pgEnum } from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from '../schemaHelpers';
import { CourseProductTable } from './courseProduct';
import { CourseTable } from './course';

export const productStatuses = ['public', 'private'] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum('product_status', productStatuses);

export const ProductTable = pgTable('products', {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default('private'),
  createdAt,
  updatedAt,
});

export const CourseRelationships = relations(CourseTable, ({ one, many }) => ({
  courseProducts: many(CourseProductTable),
}));
