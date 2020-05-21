declare global {
  interface Window {
    ipcApi: IpcApi
  }
}

export interface IpcApi {
  send(channel: string, ...args: any[]): void;
  sendSync(channel: string, ...args: any[]): any;
  receive(channel: string, listener: (...args: any[]) => void): () => void;
}