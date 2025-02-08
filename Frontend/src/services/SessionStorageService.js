// src/services/SessionStorageService.js

const SessionStorageService = {
    setItem(key, value, asJson = true) {
      if (asJson) {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, value);
      }
    },
  
    getItem(key, asJson = true) {
      const item = sessionStorage.getItem(key);
      if (asJson) {
        return item ? JSON.parse(item) : null;
      } else {
        return item ? item : null;
      }
    },
  
    removeItem(key) {
      sessionStorage.removeItem(key);
    },
  
    clear() {
      sessionStorage.clear();
    },
  };
  
  export default SessionStorageService;
  