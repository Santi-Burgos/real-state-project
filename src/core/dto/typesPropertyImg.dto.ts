export class UploadedFileDTO {
  constructor(
    public readonly buffer: Buffer,
    public readonly path: string,
    public readonly fileName: string,
    public readonly mimeType: string,
  ) {}
}