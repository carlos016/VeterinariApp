import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Esto carga manualmente el archivo .env en process.env
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});