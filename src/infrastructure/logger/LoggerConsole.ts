import { Logger } from "../../domain/services/Logger.js";

export class LoggerConsole implements Logger {
  log(...args: any[]): void {
    console.log(...args);
  }
}
