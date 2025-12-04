import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.SERVER_HOST || "localhost";
const port = Number(process.env.SERVER_PORT || 5173);

export default defineConfig({
  plugins: [react()],
  server: {
    host,
    port,
  },
});
