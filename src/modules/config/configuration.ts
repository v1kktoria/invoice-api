import { config } from "dotenv";
config();

export interface EnvironmentVariables {
  port: number;
  nodeEnv: "dev" | "prod";
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (value) return value;
  throw new Error(`[ERROR] Env variable ${key} is required`);
};

export default (): EnvironmentVariables => ({
  port: parseInt(getEnvVar("PORT"), 10),
  nodeEnv: (process.env.NODE_ENV as "dev" | "prod") || "dev",
  database: {
    host: getEnvVar("DATABASE_HOST"),
    port: parseInt(getEnvVar("DATABASE_PORT")),
    user: getEnvVar("DATABASE_USER"),
    password: getEnvVar("DATABASE_PASSWORD"),
    name: getEnvVar("DATABASE_NAME"),
  },
});
