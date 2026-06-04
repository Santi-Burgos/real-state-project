import { IFileStorage } from "../../core/domain/fileStorage.interface";

export class LocalFileStorage implements IFileStorage {
  async deleteFile(path: string): Promise<void> {
  }
}