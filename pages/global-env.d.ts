export declare global {
  interface Window {
    pintrk: (...args: any[]) => void;
  }
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
