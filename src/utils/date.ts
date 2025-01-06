const getToday = (): string => {
	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const getYesterday = () => {
	const today = new Date();
	today.setDate(today.getDate() - 1); // 하루를 빼기
	return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
};

const getOneMonthAgo = (date: string): string => {
	const currentDate = new Date(date); // 입력된 날짜 기준
	currentDate.setMonth(currentDate.getMonth() - 1); // 한 달 전으로 이동

	// YYYY-MM-DD 형식으로 변환
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
	const day = String(currentDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

// 오늘
export const today = getToday();

// 어제
export const yesterday = getYesterday();

// 한 달 전
export const oneMonthAgo = getOneMonthAgo(today);

// 해당 월의 날짜 수(배열 리턴)
export const getDaysInMonth = (date: string): number[] => {
	const year = Number(date.split('-')[0]);
	const month = Number(date.split('-')[1]);
	const daysInMonth = new Date(year, month, 0).getDate(); // month에 0을 전달하면 전달의 마지막 날짜를 반환
	return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};
