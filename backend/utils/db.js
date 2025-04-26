require('dotenv').config()
// import * as schema from './schema.js'
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
const schema = require('./schema')
const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, {schema});

module.exports = {db}

