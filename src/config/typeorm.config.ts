import { join } from "path";
import { DataSourceOptions } from "typeorm";
import configuration, { EnvironmentVariables } from "../modules/config/configuration";
import { TypedConfigService } from "src/modules/config/typed.config.service";

export const createTypeOrmOptions = (env: TypedConfigService | NodeJS.ProcessEnv): DataSourceOptions => {
  const getConfig = (): EnvironmentVariables => {
    if (env instanceof TypedConfigService) return env.getAll();
    return configuration();
  };

  const conf = getConfig();
  
  return {
    type: "postgres",
    host: conf.database.host,
    port: conf.database.port,
    username: conf.database.user,
    password: conf.database.password,
    database: conf.database.name,
    entities: [join(__dirname, "../modules/**/**/*.entity.{ts,js}")],
    migrations: [join(__dirname, "../migrations/*.{ts,js}")],
    synchronize: false,
    logging: conf.nodeEnv !== "prod",
  };
};

export const typeOrmConfig = (configService: TypedConfigService) => createTypeOrmOptions(configService);