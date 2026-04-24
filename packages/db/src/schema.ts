import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const gearCategoryEnum = pgEnum("gear_category", [
  "shelter",
  "sleep",
  "clothing",
  "cooking",
  "navigation",
  "safety",
  "hydration",
  "nutrition",
  "other",
]);

export const userTable = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const tripTable = pgTable(
  "trip",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    location: varchar("location", { length: 255 }).notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIdx: index("trip_user_id_idx").on(table.userId),
    dateRangeCheck: check(
      "trip_date_range_check",
      sql`${table.endDate} >= ${table.startDate}`,
    ),
  }),
);

export const gearTable = pgTable(
  "gear",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    weightGrams: integer("weight_grams").notNull(),
    category: gearCategoryEnum("category").notNull(),
    isEssential: boolean("is_essential").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    categoryIdx: index("gear_category_idx").on(table.category),
    nameIdx: index("gear_name_idx").on(table.name),
    weightPositiveCheck: check("gear_weight_positive_check", sql`${table.weightGrams} > 0`),
  }),
);

export const tripGearTable = pgTable(
  "trip_gear",
  {
    tripId: uuid("trip_id")
      .notNull()
      .references(() => tripTable.id, { onDelete: "cascade" }),
    gearId: uuid("gear_id")
      .notNull()
      .references(() => gearTable.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tripId, table.gearId] }),
    tripIdIdx: index("trip_gear_trip_id_idx").on(table.tripId),
    gearIdIdx: index("trip_gear_gear_id_idx").on(table.gearId),
    quantityPositiveCheck: check("trip_gear_quantity_positive_check", sql`${table.quantity} > 0`),
  }),
);

export const userGearTable = pgTable(
  "user_gear",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    gearId: uuid("gear_id")
      .notNull()
      .references(() => gearTable.id, { onDelete: "restrict" }),
    quantityOwned: integer("quantity_owned").notNull().default(1),
    isPreferred: boolean("is_preferred").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.gearId] }),
    userIdIdx: index("user_gear_user_id_idx").on(table.userId),
    gearIdIdx: index("user_gear_gear_id_idx").on(table.gearId),
    quantityOwnedPositiveCheck: check(
      "user_gear_quantity_owned_positive_check",
      sql`${table.quantityOwned} > 0`,
    ),
  }),
);

export const userRelations = relations(userTable, ({ many }) => ({
  trips: many(tripTable),
  userGearItems: many(userGearTable),
}));

export const tripRelations = relations(tripTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [tripTable.userId],
    references: [userTable.id],
  }),
  tripGearItems: many(tripGearTable),
}));

export const gearRelations = relations(gearTable, ({ many }) => ({
  tripGearItems: many(tripGearTable),
  userGearItems: many(userGearTable),
}));

export const tripGearRelations = relations(tripGearTable, ({ one }) => ({
  trip: one(tripTable, {
    fields: [tripGearTable.tripId],
    references: [tripTable.id],
  }),
  gear: one(gearTable, {
    fields: [tripGearTable.gearId],
    references: [gearTable.id],
  }),
}));

export const userGearRelations = relations(userGearTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userGearTable.userId],
    references: [userTable.id],
  }),
  gear: one(gearTable, {
    fields: [userGearTable.gearId],
    references: [gearTable.id],
  }),
}));
