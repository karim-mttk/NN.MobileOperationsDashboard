"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Calendar, DollarSign, Clock, ChevronLeft, ChevronRight, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jobs, getStatusColor, getPaymentStatusColor } from "@/data/jobs";

type ViewType = 'daily' | 'weekly' | 'monthly';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<ViewType>('daily');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 19)); // Start at Jan 19, 2026

  // Helper to get raw color class for stripe
  const getStripeColor = (status: string) => {
    switch (status) {
      case 'Unscheduled': return 'bg-purple-600';
      case 'Complete': return 'bg-gray-300';
      case 'Cancelled': return 'bg-red-900';
      case 'Partially Completed': return 'bg-yellow-400';
      case 'Scheduled': return 'bg-[#1a4254]';
      default: return 'bg-gray-200';
    }
  };

  // Date Navigation
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
    setCurrentDate(new Date(2026, 0, 19)); // Reset to "Today" (mock date)
  };

  // Date Display Helper
  const getDateDisplay = () => {
    if (viewType === 'daily') {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (viewType === 'weekly') {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    // 1. Text Search
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobNo.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Date/View Filter
    const jobDate = new Date(job.date);
    if (viewType === 'daily') {
      return jobDate.toDateString() === currentDate.toDateString();
    } else if (viewType === 'weekly') {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday
      const end = new Date(start);
      end.setDate(start.getDate() + 6); // Saturday
      // Reset hours to compare purely dates if needed, but dates in mock data are usually set to 00:00 or specific times. 
      // safer to compare timestamps
      return jobDate >= start && jobDate <= end;
    } else if (viewType === 'monthly') {
      return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear();
    }
    return false;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header Section */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Field Operations</h1>
            <p className="text-sm text-gray-500">Welcome, John Doe</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* View Type Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-lg">
           {(['daily', 'weekly', 'monthly'] as const).map((type) => (
             <button
               key={type}
               onClick={() => setViewType(type)}
               className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                 viewType === type 
                   ? 'bg-white text-gray-900 shadow-sm' 
                   : 'text-gray-500 hover:text-gray-700'
               }`}
             >
               {type}
             </button>
           ))}
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border border-gray-100">
          <Button variant="ghost" size="icon" onClick={() => navigateDate('prev')} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center">
             <span className="text-sm font-semibold text-gray-900">{getDateDisplay()}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigateDate('next')} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all placeholder:text-gray-400 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {viewType === 'daily' ? "Today's Schedule" : `${viewType.charAt(0).toUpperCase() + viewType.slice(1)} Overview`}
          </h2>
          <button onClick={goToToday} className="text-sm text-blue-600 font-medium hover:underline">
             Go to Today
          </button>
        </div>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link href={`/job/${job.id}`} key={job.id} className="block group">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform relative">
                
                {/* Colored Stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getStripeColor(job.status)}`} />

                <div className="p-4 pl-5">
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1.5">{job.title}</h3>
                      <div className="flex items-center text-gray-500 text-xs">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400 shrink-0" />
                        <span className="truncate">{job.customer.address}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(job.status)} shadow-none shrink-0 text-[10px] px-2 py-0.5 whitespace-nowrap`}>
                      {job.status}
                    </Badge>
                  </div>

                  {/* Card Details Grid */}
                  <div className="space-y-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        <span className="text-xs font-medium">{job.time}</span>
                      </div>
                      <Badge variant="outline" className={`${getPaymentStatusColor(job.paymentStatus)} border-0 text-[10px] px-2 py-0.5 whitespace-nowrap shrink-0`}>
                         {job.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-600 text-[10px] mr-2">{job.jobNo}</span>
                      <span className="truncate">{job.customer.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Calendar className="h-12 w-12 mb-3 opacity-20" />
            <p className="text-gray-500 font-medium">No jobs found</p>
            <p className="text-sm text-gray-400">Try changing dates or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
