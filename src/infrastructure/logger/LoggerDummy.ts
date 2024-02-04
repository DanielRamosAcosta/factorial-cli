import { Logger } from "../../domain/services/Logger.js";

export class LoggerDummy implements Logger {
  log(...args: any[]): void {}
}
