import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import configuration, { EnvironmentVariables } from "./configuration";

type Leaves<T> = T extends object
  ? { [K in keyof T]: `${K & string}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}` }[keyof T]
  : never;

type LeafTypes<T, S extends string> = S extends `${infer K}.${infer Rest}` ? K extends keyof T
  ? LeafTypes<T[K], Rest> : never
  : S extends keyof T ? T[S] : never;

@Injectable()
export class TypedConfigService {
  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

  get<T extends Leaves<EnvironmentVariables>>(propertyPath: T): LeafTypes<EnvironmentVariables, T> {
    return this.configService.get(propertyPath as any) as LeafTypes<EnvironmentVariables, T>;
  }

  getAll(): EnvironmentVariables {
    return configuration();
  }
}