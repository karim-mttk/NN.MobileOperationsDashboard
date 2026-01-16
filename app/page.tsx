'use client';
import { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import JobModal from '@/components/JobModal';

// Mock Data
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
    color: 'border-l-purple-500', 
    stripeColor: 'bg-purple-500',
    assignedTech: 'John Doe',
    date: 'Tuesday, January 13',
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
    color: 'border-l-red-400',
    stripeColor: 'bg-red-400',
    assignedTech: 'John Doe',
    date: 'Tuesday, January 13',
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
    color: 'border-l-blue-400',
    stripeColor: 'bg-blue-400',
    assignedTech: 'John Doe',
    date: 'Tuesday, January 13',
    description: 'Routine AC maintenance and filter replacement.',
    amount: '$200.00',
    paymentStatus: 'Unpaid'
  }
];

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-safe">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden relative border-x border-gray-100">
        
        {/* Header */}
        <header className="px-6 py-6 bg-white shrink-0 sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <h1 className="text-xl font-bold text-gray-900">Tuesday, January 13</h1>
        </header>

        {/* Job List */}
        <div className="px-4 pb-8 space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => handleJobClick(job)}
              className={`bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow flex items-stretch overflow-hidden relative active:scale-[0.98] transition-transform duration-100 select-none`}
            >
              {/* Colored Status Strip */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${job.stripeColor}`}></div>
              
              <div className="pl-3 flex w-full">
                {/* Time Column */}
                <div className="flex flex-col items-start pr-4 pt-1 w-20 shrink-0">
                  <span className="font-bold text-gray-700 text-sm whitespace-nowrap">{job.time}</span>
                  <span className="text-xs text-gray-400">{job.duration}</span>
                </div>

                {/* Details Column */}
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-tight text-[15px]">{job.title}</h3>
                    <Badge variant="secondary" className="text-[10px] px-2 h-5 font-normal bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100">
                      {job.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <MapPin size={12} className="mr-1 shrink-0" />
                    <span className="truncate">{job.customer.name} • {job.customer.address}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-xs mt-3 gap-3">
                    <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        <span>Tech: {job.tech}</span>
                    </div>
                    <span>Job No: {job.jobNo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200">
             {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={handleCloseModal}></div>
            
            <div className="bg-white w-full sm:w-full sm:max-w-lg h-[95vh] sm:h-auto sm:max-h-[90vh] sm:rounded-xl rounded-t-2xl shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-bottom duration-300 ease-out">
              {/* Drag Handle for mobile feel */}
              <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>
              
              <div className="flex-1 overflow-hidden rounded-t-2xl sm:rounded-xl h-full">
                 <JobModal job={selectedJob} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
