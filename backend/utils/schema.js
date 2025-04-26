const { pgTable, serial, varchar, text, boolean, integer, timestamp } = require("drizzle-orm/pg-core");

// Users Table
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  isAdmin: boolean('is_admin').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Books Table
const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  description: text('description'),
  genre: varchar('genre', { length: 100 }),
  coverImageUrl: text('cover_image_url'),
  averageRating: integer('average_rating').default(0),
  ratingsCount: integer('ratings_count').default(0),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Reviews Table
const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  bookId: integer('book_id').notNull().references(() => books.id),
  userId: integer('user_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(), // Validate 1-5 in your route logic
  reviewText: text('review_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
  users,
  books,
  reviews,
};