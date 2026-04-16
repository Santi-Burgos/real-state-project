export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: number;

  constructor(success: boolean, message: string, data: T | null, timestamp: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }

  public static success<T>(data: T, message: string = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, Date.now());
  }

  public static error<T>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, message, null, Date.now());
  }
}