declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

interface ViteEnv {
  name: string;
}
