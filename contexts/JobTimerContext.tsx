'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface ActiveJob {
  jobId: number;
  jobNo: string;
  customerName: string;
  title: string;
  state: 'working' | 'break';
  startTime: number; // timestamp
  elapsedTime: number; // seconds
  breakTime: number; // seconds
  lastBreakStart?: number; // timestamp
}

interface JobTimerContextType {
  activeJob: ActiveJob | null;
  startJob: (jobId: number, jobNo: string, customerName: string, title: string) => boolean;
  stopJob: () => void;
  toggleBreak: () => void;
  getFormattedTime: (seconds: number) => string;
  getTotalElapsedTime: () => number;
  getTotalSiteTime: () => number;
}

const JobTimerContext = createContext<JobTimerContextType | undefined>(undefined);

const STORAGE_KEY = 'activeJob';

export function JobTimerProvider({ children }: { children: ReactNode }) {
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Recalculate elapsed time based on current time
        const now = Date.now();
        const timeSinceStart = Math.floor((now - parsed.startTime) / 1000);
        
        setActiveJob({
          ...parsed,
          elapsedTime: parsed.state === 'working' ? timeSinceStart - parsed.breakTime : parsed.elapsedTime,
          breakTime: parsed.state === 'break' && parsed.lastBreakStart 
            ? parsed.breakTime + Math.floor((now - parsed.lastBreakStart) / 1000)
            : parsed.breakTime
        });
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever activeJob changes
  useEffect(() => {
    if (activeJob) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeJob));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [activeJob]);

  // Timer effect
  useEffect(() => {
    if (activeJob) {
      timerRef.current = setInterval(() => {
        setActiveJob(prev => {
          if (!prev) return null;
          
          if (prev.state === 'working') {
            return { ...prev, elapsedTime: prev.elapsedTime + 1 };
          } else if (prev.state === 'break') {
            return { ...prev, breakTime: prev.breakTime + 1 };
          }
          return prev;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeJob?.state]);

  const startJob = (jobId: number, jobNo: string, customerName: string, title: string): boolean => {
    if (activeJob) {
      return false; // Already have an active job
    }

    const now = Date.now();
    setActiveJob({
      jobId,
      jobNo,
      customerName,
      title,
      state: 'working',
      startTime: now,
      elapsedTime: 0,
      breakTime: 0
    });
    return true;
  };

  const stopJob = () => {
    setActiveJob(null);
  };

  const toggleBreak = () => {
    if (!activeJob) return;

    if (activeJob.state === 'working') {
      // Start break
      setActiveJob({
        ...activeJob,
        state: 'break',
        lastBreakStart: Date.now()
      });
    } else {
      // Resume work
      setActiveJob({
        ...activeJob,
        state: 'working',
        lastBreakStart: undefined
      });
    }
  };

  const getFormattedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalElapsedTime = (): number => {
    if (!activeJob) return 0;
    return activeJob.elapsedTime;
  };

  const getTotalSiteTime = (): number => {
    if (!activeJob) return 0;
    return activeJob.elapsedTime + activeJob.breakTime;
  };

  return (
    <JobTimerContext.Provider 
      value={{ 
        activeJob, 
        startJob, 
        stopJob, 
        toggleBreak, 
        getFormattedTime,
        getTotalElapsedTime,
        getTotalSiteTime
      }}
    >
      {children}
    </JobTimerContext.Provider>
  );
}

export function useJobTimer() {
  const context = useContext(JobTimerContext);
  if (context === undefined) {
    throw new Error('useJobTimer must be used within a JobTimerProvider');
  }
  return context;
}
