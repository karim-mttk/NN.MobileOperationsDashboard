'use client';

import { useState } from 'react';
import { X, Pencil, MapPin, Calendar, Clock, User, FileText, Briefcase, Play, Pause, Square } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DialogTitle } from './ui/dialog';

interface JobModalProps {
  job: any;
  onClose: () => void;
}

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

export default function JobModal({ job, onClose }: JobModalProps) {
  const address = job.customer?.address || 'New York, NY';
  const encodedAddress = encodeURIComponent(address);
  // Simple embed, restricted usage. For production, needs API key usually or embed API.
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const [jobState, setJobState] = useState<'idle' | 'working' | 'break'>('idle');

  return (
    <div className="flex flex-col h-full bg-white sm:rounded-lg overflow-hidden max-h-[90vh]">
      <DialogTitle className="sr-only">Job Details - {job.jobNo || job.id}</DialogTitle>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-white sticky top-0 z-10 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-800">Job #{job.jobNo || job.id}</h2>
          <div className="flex items-center gap-2 mt-0.5">
             <Badge className={`${getStatusColor(job.status || 'Scheduled')} px-2 py-0.5 rounded-md text-xs font-normal`}>
              {job.status || 'Scheduled'}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-hide">
          {/* Mobile Layout: Stack everything */}
          <div className="flex flex-col gap-4 pb-20">
            
            {/* Action Bar (Clock In/Out) */}
            <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                    <Button 
                        variant={jobState === 'working' ? 'secondary' : 'default'}
                        className={`w-full ${jobState === 'idle' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                        onClick={() => setJobState('working')}
                        disabled={jobState === 'working'}
                    >
                        <Play size={16} className="mr-2" /> Start
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setJobState(jobState === 'break' ? 'working' : 'break')}
                        disabled={jobState === 'idle'}
                    >
                        <Pause size={16} className="mr-2" /> {jobState === 'break' ? 'Resume' : 'Break'}
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => setJobState('idle')}
                        disabled={jobState === 'idle'}
                    >
                        <Square size={16} className="mr-2 fill-current" /> Stop
                    </Button>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border shadow-sm divide-y">
              <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600">
                    <User size={16} /> 
                </div>
                <div>
                    <div className="text-xs text-gray-500">Customer</div>
                    <div className="font-medium text-gray-900">{job.customer?.name}</div>
                </div>
              </div>
              <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-start">
                 <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500">
                    <MapPin size={16} />
                 </div>
                 <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-medium text-gray-900">{job.customer?.address}</div>
                    {job.customer?.subAddress && <div className="text-sm text-gray-500">{job.customer.subAddress}</div>}
                 </div>
              </div>
               <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Description</div>
                    <div className="text-sm text-gray-900">
                        {job.description || "Electrical Inspection"}
                    </div>
                  </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border shadow-sm h-[200px] w-full bg-slate-100 relative">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="yes"
                src={mapUrl}
                className="grayscale-[0.0]"
              ></iframe>
            </div>

            {/* Schedule Info */}
            <div className="bg-white rounded-lg border shadow-sm divide-y">
               <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500">
                    <Calendar size={16} />
                </div>
                <div>
                    <div className="text-xs text-gray-500">Date</div>
                    <div className="text-sm font-medium text-gray-900">
                        {job.date instanceof Date 
                        ? job.date.toLocaleDateString()
                        : job.date || '11/16/2023'
                        }
                    </div>
                </div>
               </div>
               <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-center">
                 <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500">
                    <Clock size={16} />
                 </div>
                 <div>
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-sm font-medium text-gray-900">
                        {job.time || '09:00 AM'} - {job.duration || '1 hr'}
                    </div>
                 </div>
               </div>
               <div className="p-3 grid grid-cols-[auto_1fr] gap-3 items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Technician</div>
                    <div className="text-sm font-medium text-gray-900">{job.assignedTech || 'John Doe'}</div>
                  </div>
               </div>
            </div>

            {/* Payment Info Box */}
            <div className="bg-white rounded-lg border shadow-sm divide-y">
              <div className="p-3 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Payment Amount</div>
                <div className="text-gray-900 font-bold">{job.amount || '$0.00'}</div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Payment Status</div>
                <Badge className={`${getPaymentStatusColor(job.paymentStatus)} border-0 w-max rounded-full px-3 py-0.5 text-[10px] whitespace-nowrap font-normal`}>
                  {job.paymentStatus === 'Paid in Full' ? 'Paid in Full' : job.paymentStatus || 'Unpaid'}
                </Badge>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}
