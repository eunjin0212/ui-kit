import { useEffect, useState } from 'react';
import SLoading from '../components/SLoading';
import SProgress from '../components/SProgress';

const Progress = () => {
 const [percent, setPercent] = useState(0)

 useEffect(() => {
  const interval = setInterval(() => {
    setPercent((prev) => {
      const statusPer = 10;
      if (prev < 100) return prev + statusPer;
      clearInterval(interval);
      return 100;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);
 return (
  <div className="flex flex-col items-center gap-8 p-8">
   <h1 className="text-2xl font-bold">Circle Progress</h1>
   <SProgress percentage={percent} status='error' />
   <SProgress percentage={percent} />
   <SProgress percentage={100} status='success' label='완료되었습니다.' />
   <SProgress percentage={percent} linear={true} label="진행중..." className='w-full' />
   <SLoading percentage={30} label="Loading..." />
  </div>
 );
};

export default Progress;
