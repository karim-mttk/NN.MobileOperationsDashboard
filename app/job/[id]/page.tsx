'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Clock, User, FileText, Play, Pause, Square, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useJobTimer } from '@/contexts/JobTimerContext';

// Mock Data - same as in page.tsx
const jobs = [
  {
    id: 1,
    time: '9:00 AM',
    duration: '1 hr',
    title: 'Electrical Inspection',
    customer: {
      name: 'Acme Corp',
      address: 'Suite 1200',
      subAddress: 'Acme Corp HQ',
      phone: '555-0123',
      email: 'contact@acme.com'
    },
    tech: 'John Doe',
    jobNo: 'J-2026-03',
    status: 'Scheduled',
    stripeColor: 'bg-purple-500',
    assignedTech: 'John Doe',
    date: new Date(2026, 0, 13),
    description: 'Electrical Inspection for quarterly safety check.',
    amount: '$150.00',
    paymentStatus: 'Unpaid'
  },
  {
    id: 2,
    time: '12:00 PM',
    duration: '1 hr',
    title: 'Fire Alarm Service',
    customer: {
      name: 'Acme Corp',
      address: 'Suite 1200',
      subAddress: 'Acme Corp HQ',
      phone: '555-0123',
      email: 'contact@acme.com'
    },
    tech: 'John Doe',
    jobNo: 'J-2026-04',
    status: 'Scheduled',
    stripeColor: 'bg-red-400',
    assignedTech: 'John Doe',
    date: new Date(2026, 0, 13),
    description: "Annual Fire Alarm Testing and certification.",
    amount: '$300.00',
    paymentStatus: 'Unpaid'
  },
  {
    id: 3,
    time: '2:00 PM',
    duration: '2 hrs',
    title: 'AC Maintenance',
    customer: {
      name: 'Acme Corp',
      address: 'Suite 1200',
      subAddress: 'Acme Corp HQ',
      phone: '555-0123',
      email: 'contact@acme.com'
    },
    tech: 'John Doe',
    jobNo: 'J-2026-05',
    status: 'Scheduled',
    stripeColor: 'bg-blue-400',
    assignedTech: 'John Doe',
    date: new Date(2026, 0, 13),
    description: 'Routine AC maintenance and filter replacement.',
    amount: '$200.00',
    paymentStatus: 'Unpaid'
  },
  {
    id: 4,
    time: '10:00 AM',
    duration: '1.5 hrs',
    title: 'Plumbing Repair',
    customer: {
      name: 'TechStart Inc',
      address: '456 Tech Ave',
      subAddress: 'Building A',
      phone: '555-0456',
      email: 'ops@techstart.com'
    },
    tech: 'Jane Smith',
    jobNo: 'J-2026-06',
    status: 'Complete',
    stripeColor: 'bg-green-500',
    assignedTech: 'Jane Smith',
    date: new Date(2026, 0, 14),
    description: 'Emergency plumbing repair in basement.',
    amount: '$275.00',
    paymentStatus: 'Paid in Full'
  },
  {
    id: 5,
    time: '3:00 PM',
    duration: '2 hrs',
    title: 'HVAC Installation',
    customer: {
      name: 'BuildRight LLC',
      address: '789 Construction Blvd',
      subAddress: 'Site 12',
      phone: '555-0789',
      email: 'contact@buildright.com'
    },
    tech: 'Mike Johnson',
    jobNo: 'J-2026-07',
    status: 'Scheduled',
    stripeColor: 'bg-blue-500',
    assignedTech: 'Mike Johnson',
    date: new Date(2026, 0, 14),
    description: 'New HVAC system installation.',
    amount: '$1,250.00',
    paymentStatus: 'Partial Payment'
  },
  {
    id: 6,
    time: '8:00 AM',
    duration: '3 hrs',
    title: 'Electrical Wiring',
    customer: {
      name: 'Home Depot',
      address: '321 Retail Park',
      subAddress: 'Store #442',
      phone: '555-0321',
      email: 'maintenance@homedepot.com'
    },
    tech: 'John Doe',
    jobNo: 'J-2026-08',
    status: 'Scheduled',
    stripeColor: 'bg-yellow-500',
    assignedTech: 'John Doe',
    date: new Date(2026, 0, 15),
    description: 'Rewiring electrical panel.',
    amount: '$850.00',
    paymentStatus: 'Unpaid'
  },
  {
    id: 7,
    time: '11:00 AM',
    duration: '1 hr',
    title: 'Safety Inspection',
    customer: {
      name: 'City Mall',
      address: '100 Downtown Plaza',
      subAddress: 'Mall Office',
      phone: '555-0100',
      email: 'ops@citymall.com'
    },
    tech: 'Jane Smith',
    jobNo: 'J-2026-09',
    status: 'Scheduled',
    stripeColor: 'bg-purple-500',
    assignedTech: 'Jane Smith',
    date: new Date(2026, 0, 16),
    description: 'Monthly safety and compliance inspection.',
    amount: '$200.00',
    paymentStatus: 'Unpaid'
  },
  {
    id: 8,
    time: '1:00 PM',
    duration: '2 hrs',
    title: 'Generator Maintenance',
    customer: {
      name: 'Hospital Network',
      address: '555 Medical Center Dr',
      subAddress: 'Main Campus',
      phone: '555-0555',
      email: 'facilities@hospital.com'
    },
    tech: 'Mike Johnson',
    jobNo: 'J-2026-10',
    status: 'Scheduled',
    stripeColor: 'bg-red-500',
    assignedTech: 'Mike Johnson',
    date: new Date(2026, 0, 20),
    description: 'Emergency generator quarterly maintenance.',
    amount: '$650.00',
    paymentStatus: 'Unpaid'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Unscheduled': return 'bg-purple-600 hover:bg-purple-700 text-white border-0';
    case 'Complete': return 'bg-gray-300 hover:bg-gray-400 text-gray-800 border-0';
    case 'Cancelled': return 'bg-red-900 hover:bg-red-800 text-white border-0';
    case 'Partially Completed': return 'bg-yellow-400 hover:bg-yellow-500 text-black border-0';
    case 'Scheduled': return 'bg-[#1a4254] hover:bg-[#1a4254]/90 text-white border-0';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Paid in Full': return 'bg-gray-800 text-white hover:bg-gray-700';
    case 'Partial Payment': return 'bg-amber-600 text-white hover:bg-amber-700';
    case 'Unpaid': return 'bg-sky-600 text-white hover:bg-sky-700';
    default: return 'bg-gray-200';
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showStartWarning, setShowStartWarning] = useState(false);
  
  const { activeJob, startJob, stopJob, toggleBreak, getFormattedTime, getTotalSiteTime } = useJobTimer();

  useEffect(() => {
    params.then((resolvedParams) => {
      setJobId(resolvedParams.id);
    });
  }, [params]);

  const job = jobId ? jobs.find(j => j.id === parseInt(jobId)) : null;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Job not found</p>
      </div>
    );
  }

  const isThisJobActive = activeJob?.jobId === job.id;
  const hasActiveJob = activeJob !== null;

  const handleStartClick = () => {
    if (hasActiveJob && !isThisJobActive) {
      setShowStartWarning(true);
      return;
    }

    const success = startJob(job.id, job.jobNo, job.customer.name, job.title);
    if (!success) {
      setShowStartWarning(true);
    }
  };

  const handleStopClick = () => {
    setShowStopConfirm(true);
  };

  const confirmStop = () => {
    stopJob();
    setShowStopConfirm(false);
  };

  const address = job.customer?.address || 'New York, NY';
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const startTime = activeJob?.startTime ? new Date(activeJob.startTime) : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl">
        {/* Header */}
        <header className="px-4 py-3.5 border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900 truncate">Job #{job.jobNo}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge className={`${getStatusColor(job.status || 'Scheduled')} px-2 py-0.5 rounded text-[11px] font-medium`}>
                  {job.status || 'Scheduled'}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="overflow-y-auto pb-20">
          <div className="p-4 space-y-4">
            
            {/* Warning: Another Job Active */}
            {hasActiveJob && !isThisJobActive && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-yellow-900">Another job is active</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Job #{activeJob.jobNo} for {activeJob.customerName} is currently in progress. Stop it before starting this job.
                  </p>
                </div>
              </div>
            )}

            {/* Timer Display */}
            {isThisJobActive && activeJob && (
              <div className="space-y-3">
                {/* Work Time - Always Visible */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-xs font-medium mb-2 opacity-90 uppercase tracking-wide">
                      Work Time
                    </div>
                    <div className="text-4xl font-bold font-mono">
                      {getFormattedTime(activeJob.elapsedTime)}
                    </div>
                  </div>
                </div>

                {/* Break Time - Only shown during break */}
                {activeJob.state === 'break' && activeJob.breakTime > 0 && (
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-medium mb-2 opacity-90 uppercase tracking-wide">
                        Break Time
                      </div>
                      <div className="text-3xl font-bold font-mono">
                        {getFormattedTime(activeJob.breakTime)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Time at Site */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-xs font-medium mb-2 opacity-90 uppercase tracking-wide">
                      Total Time at Site
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {getFormattedTime(activeJob.elapsedTime + activeJob.breakTime)}
                    </div>
                  </div>
                </div>

                {/* Start Time Info */}
                {startTime && (
                  <div className="text-center">
                    <div className="text-xs text-gray-500 bg-gray-100 inline-block px-3 py-1.5 rounded-full">
                      Started at {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wide">Actions</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={isThisJobActive ? 'secondary' : 'default'}
                  className={`w-full ${!isThisJobActive ? 'bg-green-600 hover:bg-green-700 text-white' : 'opacity-50'}`}
                  onClick={handleStartClick}
                  disabled={isThisJobActive}
                >
                  <Play size={16} className="mr-1.5" /> 
                  <span className="text-sm">Start</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300"
                  onClick={toggleBreak}
                  disabled={!isThisJobActive}
                >
                  {activeJob?.state === 'break' ? (
                    <>
                      <Play size={16} className="mr-1.5" /> 
                      <span className="text-sm">Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause size={16} className="mr-1.5" /> 
                      <span className="text-sm">Break</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleStopClick}
                  disabled={!isThisJobActive}
                >
                  <Square size={16} className="mr-1.5 fill-current" /> 
                  <span className="text-sm">Stop</span>
                </Button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              <div className="p-4 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <User size={18} /> 
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Customer</div>
                  <div className="font-semibold text-gray-900">{job.customer?.name}</div>
                </div>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Location</div>
                  <div className="text-sm font-medium text-gray-900">{job.customer?.address}</div>
                  {job.customer?.subAddress && <div className="text-sm text-gray-500 mt-0.5">{job.customer.subAddress}</div>}
                </div>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 shrink-0">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Description</div>
                  <div className="text-sm text-gray-900 leading-relaxed">
                    {job.description || "Electrical Inspection"}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[220px] w-full bg-slate-100">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={mapUrl}
                className="grayscale-[0.0]"
              ></iframe>
            </div>

            {/* Schedule Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              <div className="p-4 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 shrink-0">
                  <Calendar size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Date</div>
                  <div className="text-sm font-medium text-gray-900">
                    {job.date instanceof Date 
                      ? job.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                      : job.date || '11/16/2023'
                    }
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Time</div>
                  <div className="text-sm font-medium text-gray-900">
                    {job.time || '09:00 AM'} • {job.duration || '1 hr'}
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Technician</div>
                  <div className="text-sm font-medium text-gray-900">{job.assignedTech || 'John Doe'}</div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              <div className="p-4 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Payment Amount</div>
                <div className="text-lg font-bold text-gray-900">{job.amount || '$0.00'}</div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Payment Status</div>
                <Badge className={`${getPaymentStatusColor(job.paymentStatus)} border-0 rounded-full px-3 py-1 text-[11px] font-medium`}>
                  {job.paymentStatus === 'Paid in Full' ? 'Paid in Full' : job.paymentStatus || 'Unpaid'}
                </Badge>
              </div>
            </div>

          </div>
        </div>

        {/* Stop Confirmation Dialog */}
        {showStopConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Stop Job?</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to stop working on this job? Your time will be logged.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowStopConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmStop}
                  className="flex-1"
                >
                  Stop Job
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Start Warning Dialog */}
        {showStartWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Job Already Active</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    You're currently working on Job #{activeJob?.jobNo}. Please stop that job before starting a new one.
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowStartWarning(false)}
                className="w-full"
              >
                Got it
              </Button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
