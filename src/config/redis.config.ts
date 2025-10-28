import { TypedConfigService } from "src/modules/config/typed.config.service";

export const getRedisConfig = (config: TypedConfigService) => ({
  connection: {
    host: config.get("redis.host"),
    port: config.get("redis.port"),
  },
});
