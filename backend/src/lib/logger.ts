
enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private formatMessage(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const extra = args.length ? JSON.stringify(args.length === 1 ? args[0] : args) : '';
    return `[${timestamp}] [${level}] ${message} ${extra}`;
  }

  info(message: string, ...args: any[]) {
    console.log(this.formatMessage(LogLevel.INFO, message, ...args));
  }

  warn(message: string, ...args: any[]) {
    console.warn(this.formatMessage(LogLevel.WARN, message, ...args));
  }

  error(message: string, ...args: any[]) {
    console.error(this.formatMessage(LogLevel.ERROR, message, ...args));
  }

  debug(message: string, ...args: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(this.formatMessage(LogLevel.DEBUG, message, ...args));
    }
  }
}

export const logger = new Logger();
