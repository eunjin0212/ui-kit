export const formatDateToObject = (date: string) => {
	const d = date ? new Date(date) : new Date();
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	return { year, month, day };
};

const addZero = (date: number) => String(date).padStart(2, '0');

export const formatDateToString = (date: { year: number, month: number, day: number } | Date) => {
 if (date instanceof Date) {
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
 }
 return `${date.year}-${addZero(date.month)}-${addZero(date.day)}`
};

export const isSameDate = (prevDate: string, nextDate: string) => {
	if (!prevDate || !nextDate) return false;
	const before = formatDateToObject(prevDate);
	const after = formatDateToObject(nextDate);

	return (
		before.year === after.year &&
		before.month === after.month &&
		before.day === after.day
	);
};

export const isToday = (date: string) => {
	if (!date) return false;

	const today = new Date();
	const valueDate = new Date(date);

	return (
		today.getFullYear() === valueDate.getFullYear() &&
		today.getMonth() === valueDate.getMonth() &&
		today.getDate() === valueDate.getDate()
	);
};
