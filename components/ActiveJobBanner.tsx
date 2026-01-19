'use client';

import { useJobTimer } from '@/contexts/JobTimerContext';
import { Clock, Briefcase, Pause, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActiveJobBanner() {
  const { activeJob, getFormattedTime } = useJobTimer();
  const router = useRouter();

  if (!activeJob) return null;

  const handleClick = () => {
    router.push(`/job/${activeJob.jobId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {activeJob.state === 'working' ? (
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Briefcase size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 bg-yellow-400/90 rounded-full flex items-center justify-center text-yellow-900">
                <Pause size={20} />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium opacity-90">
                {activeJob.state === 'working' ? 'Working on' : 'On Break'}
              </span>
              <span className="text-xs px-2 py-0.5 bg-white/20 rounded">
                {activeJob.jobNo}
              </span>
            </div>
            <div className="text-sm font-semibold truncate">
              {activeJob.customerName}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-lg font-bold font-mono">
            {getFormattedTime(activeJob.state === 'working' ? activeJob.elapsedTime : activeJob.breakTime)}
          </div>
          <div className="text-[10px] opacity-75 uppercase tracking-wide">
            {activeJob.state === 'working' ? 'Working' : 'Break'}
          </div>
        </div>
      </div>
    </div>
  );
}
