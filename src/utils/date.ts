export const formatDate = (beforeDate: string) => {
  const d = beforeDate ? new Date(beforeDate) : new Date();
  const year = String(d.getFullYear());
  const month = String(d.getMonth() + 1);
  const day = String(d.getDate());
  return { year, month, date: day };
 };

export	const addZero = (num: string) => num.padStart(2, '0');
