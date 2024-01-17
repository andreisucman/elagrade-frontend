export declare global {
  interface Window {
    dataLayer: any[];
  }
}
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
