import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env", env);
  return {
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
    plugins: [react()],
  };
});
