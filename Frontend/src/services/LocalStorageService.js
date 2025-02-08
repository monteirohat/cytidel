// src/services/LocalStorageService.js

const LocalStorageService = {
    setItem(key, value, asJson = true) {
        if (asJson) {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, value);
        }
      },

    getItem(key,asJson = true) {
        const item = localStorage.getItem(key);
        if (asJson) {
          return item ? JSON.parse(item) : null;
        } else {
          return item ? item : null;
        }
        
    },

    removeItem(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};

export default LocalStorageService;
