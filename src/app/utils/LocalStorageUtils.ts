export default class LocalStorageUtils {
    static readonly tokenkey: string = 'TASKS_TOKEN';
    static readonly USERNAME_KEY = 'TASKS_USERNAME';

    static setItem(key: string, value: any): void {
        localStorage.setItem(key, value);
    }

    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    static deleteItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}