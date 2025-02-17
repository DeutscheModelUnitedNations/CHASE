const NODE_ENV = process.env.NODE_ENV ?? "production";
const development = NODE_ENV === "development";

export const appConfiguration = {
  production: !development,
  development,
  port: process.env.PORT ?? "3001",
  documentationPath: process.env.DOCUMENTATION_PATH ?? "documentation",
  appName: process.env.APP_NAME ?? "CHASE",
  db:
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/postgres",
};
