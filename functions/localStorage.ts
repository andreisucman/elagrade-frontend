import ls from "localstorage-slim";

export function getFromLocalStorage(key: string, defaultValue: any) {
  try {
    const storedValue = ls.get(`Elagrade - ${key}`);
    return storedValue ? storedValue : defaultValue;
  } catch (error) {
    console.error(`Error parsing the "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToLocalStorage(key: string, value: any) {
  try {
    ls.set(`Elagrade - ${key}`, value);
  } catch (error) {
    console.error(`Error saving the "${key}" to localStorage:`, error);
  }
}
