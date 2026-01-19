"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Calendar, DollarSign, Clock, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobs, getStatusColor, getPaymentStatusColor } from "@/data/jobs";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.id.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Job History</h1>

        {/* Search Bar */}
        <div className="flex gap-3">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
                type="text"
                placeholder="Search history..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <Button variant="outline" size="icon" className="h-full aspect-square border-gray-200 rounded-xl">
                <Filter className="h-4 w-4 text-gray-500" />
            </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="p-6 space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link href={`/job/${job.id}`} key={job.id} className="block">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400 font-mono">#{job.id}</span>
                        <span className="text-xs text-gray-400">{job.time} • {new Date().toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-3 w-3 mr-1" />
                    {job.location}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <Badge className={`${getStatusColor(job.status)} shadow-none`}>
                        {job.status}
                    </Badge>
                     <Badge variant="outline" className={`${getPaymentStatusColor(job.paymentStatus)} border-0 bg-transparent font-medium`}>
                        {job.paymentStatus}
                    </Badge>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No history found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
