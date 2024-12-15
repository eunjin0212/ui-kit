export interface InnerCircleProps {
	percentage?: number;
	size?: number;
	strokeWidth?: number;
	color?: string;
	indeterminate?: boolean;
}

const InnerCircle = ({
	percentage = 0,
	size = 80,
	strokeWidth = 12,
	indeterminate = false,
	color = '#0075FF',
}: InnerCircleProps) => {
	const radius = (size - strokeWidth) / 2; // 원의 반지름
	const circumference = 2 * Math.PI * radius; // 원의 둘레
	const offset = circumference - (percentage / 100) * circumference; // 진행률에 따른 offset
 const progressBgSize = `${size}px`;
	const progressSize = `${size / 2}px`;

 return (
  <svg
  width={progressBgSize}
  height={progressBgSize}
  className={[indeterminate ? 'animate-spin': '-rotate-90 transform'].join(' ')} // 시작점을 12시 방향으로 회전
 >
  {/* Background Circle */}
  <circle
   cx={progressSize}
   cy={progressSize}
   r={radius}
   stroke='#EEEEEE' // 배경 색상
   strokeWidth={strokeWidth}
   fill='transparent'
  />
  {/* Progress Circle */}
  <circle
   cx={progressSize}
   cy={progressSize}
   r={radius}
   stroke={color} // 진행 색상
   strokeWidth={strokeWidth}
   fill='transparent'
   strokeDasharray={circumference}
   strokeDashoffset={offset}
   strokeLinecap='round' // 끝을 둥글게 만듭니다
   className='transition-all duration-500'
  />
 </svg>

 )
}

export default InnerCircle