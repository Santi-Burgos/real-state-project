export interface IFileStorage{
  deleteFile(path: string): Promise<void>;
}