'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ViewType = 'daily' | 'weekly' | 'monthly';

// Mock Data with multiple dates
const jobs = [
  // January 13
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
    color: 'border-l-red-400',
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
    color: 'border-l-blue-400',
    stripeColor: 'bg-blue-400',
    assignedTech: 'John Doe',
    date: new Date(2026, 0, 13),
    description: 'Routine AC maintenance and filter replacement.',
    amount: '$200.00',
    paymentStatus: 'Unpaid'
  },
  // January 14
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
  // January 15
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
  // January 16
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
  // January 20
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

export default function Home() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 19)); // January 19, 2026
  const [viewType, setViewType] = useState<ViewType>('daily');

  const handleJobClick = (jobId: number) => {
    router.push(`/job/${jobId}`);
  };

  // Date navigation
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'daily') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'weekly') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewType === 'monthly') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 0, 19)); // Current date from context
  };

  // Filter jobs based on view type
  const getFilteredJobs = () => {
    if (viewType === 'daily') {
      return jobs.filter(job => {
        const jobDate = new Date(job.date);
        return jobDate.toDateString() === currentDate.toDateString();
      });
    } else if (viewType === 'weekly') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return jobs.filter(job => {
        const jobDate = new Date(job.date);
        return jobDate >= weekStart && jobDate <= weekEnd;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (viewType === 'monthly') {
      return jobs.filter(job => {
        const jobDate = new Date(job.date);
        return jobDate.getMonth() === currentDate.getMonth() && 
               jobDate.getFullYear() === currentDate.getFullYear();
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return [];
  };

  // Format date for display
  const getDateDisplay = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    if (viewType === 'daily') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (viewType === 'weekly') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  const filteredJobs = getFilteredJobs();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden relative">
        
        {/* Header */}
        <header className="px-4 py-4 bg-white sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 border-b border-gray-200 shadow-sm">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigateDate('prev')}
              className="h-9 w-9 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center flex-1 px-2">
              <h1 className="text-base font-bold text-gray-900 text-center">{getDateDisplay()}</h1>
              <Button 
                variant="link" 
                onClick={goToToday}
                className="text-xs text-blue-600 h-auto p-0 hover:text-blue-700 font-medium"
              >
                Today
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigateDate('next')}
              className="h-9 w-9 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* View Type Selector */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={viewType === 'daily' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('daily')}
              className={`flex-1 h-9 text-sm font-medium transition-all ${
                viewType === 'daily' 
                  ? 'bg-white shadow-sm text-black hover:bg-white' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              Daily
            </Button>
            <Button
              variant={viewType === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('weekly')}
              className={`flex-1 h-9 text-sm font-medium transition-all ${
                viewType === 'weekly' 
                  ? 'bg-white shadow-sm text-black hover:bg-white' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              Weekly
            </Button>
            <Button
              variant={viewType === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('monthly')}
              className={`flex-1 h-9 text-sm font-medium transition-all ${
                viewType === 'monthly' 
                  ? 'bg-white shadow-sm text-black hover:bg-white' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              Monthly
            </Button>
          </div>
        </header>

        {/* Job List */}
        <div className="px-4 py-4 space-y-3 pb-8">
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Calendar className="h-16 w-16 mb-3 opacity-50" />
              <p className="text-base font-medium text-gray-500">No jobs scheduled</p>
              <p className="text-sm text-gray-400 mt-1">Check another date or view</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id}>
                {/* Show date header for weekly/monthly views */}
                {(viewType === 'weekly' || viewType === 'monthly') && (
                  filteredJobs.indexOf(job) === 0 || 
                  new Date(job.date).toDateString() !== new Date(filteredJobs[filteredJobs.indexOf(job) - 1].date).toDateString()
                ) && (
                  <div className="text-xs font-bold text-gray-600 mb-3 mt-5 first:mt-0 uppercase tracking-wide px-1">
                    {new Date(job.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                )}
                
                <div 
                  onClick={() => handleJobClick(job.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all flex items-stretch overflow-hidden relative active:scale-[0.98] duration-100"
                >
                  {/* Colored Status Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${job.stripeColor}`}></div>
                  
                  <div className="pl-3 flex w-full gap-3">
                    {/* Time Column */}
                    <div className="flex flex-col items-start justify-start pt-0.5 w-16 shrink-0">
                      <span className="font-bold text-gray-900 text-sm leading-none">{job.time}</span>
                      <span className="text-xs text-gray-500 mt-1">{job.duration}</span>
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col flex-1 gap-1.5 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-gray-900 leading-tight text-base">{job.title}</h3>
                        <Badge variant="secondary" className="text-[10px] px-2 h-5 font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shrink-0">
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-xs">
                        <MapPin size={13} className="mr-1.5 shrink-0 text-gray-400" />
                        <span className="truncate">{job.customer.name} • {job.customer.address}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-[11px] mt-1 gap-3">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>{job.tech}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{job.jobNo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
