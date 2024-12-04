declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number;
    readonly MONGODB_URI: string;
    readonly NODE_ENV: string;
  }
}
