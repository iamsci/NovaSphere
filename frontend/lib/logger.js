// lib/logger.js

export function logInfo(message, meta = {}) {
    console.log(`[INFO] ${message}`, meta);
  }
  
  export function logError(message, error) {
    console.error(`[ERROR] ${message}`, {
      message: error.message,
      stack: error.stack
    });
  }
  
  export function logDebug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  }
  