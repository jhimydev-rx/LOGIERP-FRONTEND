export interface Schema {
  $ref?: string;
  additionalProperties?: boolean | Schema;
  type?: string;
  format?: string;
  nullable?: boolean;
  properties?: Record<string, Schema>;
  items?: Schema;
  enum?: string[];
  required?: string[];
  default?: unknown;
  allOf?: Schema[];
}
export interface Parameter {
  name: string;
  in: string;
  required?: boolean;
  schema: Schema;
}
export interface Operation {
  key: string;
  method: string;
  path: string;
  module: string;
  title: string;
  permissions: string[];
  parameters: Parameter[];
  body: Schema | null;
}
export interface Module {
  id: string;
  name: string;
  group: string;
}
export interface Access {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  permissions: string[];
}
export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  user: Access;
}
export type Data = Record<string, any>;
