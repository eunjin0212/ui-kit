export const addZero = (time: number | string) => time.toString().padStart(2, '0');
export const set12Hour = (hour: string, isAm: boolean) => isAm ? hour :addZero(String(+hour - 12));
