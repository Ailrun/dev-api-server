export type UnknownJSONObjectType = {
  [key: string]: UnknownJSONType;
}
export interface UnknownJSONArrayType extends Array<UnknownJSONType> {}

export type UnknownJSONType =
  | null
  | undefined
  | number
  | boolean
  | string
  | UnknownJSONObjectType
  | UnknownJSONArrayType
  ;

export type Headers = { [key: string]: string };

export enum APIKind {
  FAILING,
  SERVING,
  BODY,
}

interface BaseAPI {
  kind: APIKind;
  apiPath: string;
  headers?: Headers;
}

export interface FailingAPI extends BaseAPI {
  kind: APIKind.FAILING,
  code: number;
}

export interface ServingAPI extends BaseAPI {
  kind: APIKind.SERVING;
  filePath: string;
}

export interface BodyAPI extends BaseAPI {
  kind: APIKind.BODY;
  body: string;
}

export type API = FailingAPI | ServingAPI | BodyAPI;

export interface ServerConfig {
  apis: Array<API>;
  port: number;
  hostname: string;
}
