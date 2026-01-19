export const jobs = [
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Unscheduled': return 'bg-purple-600 hover:bg-purple-700 text-white border-0';
    case 'Complete': return 'bg-gray-300 hover:bg-gray-400 text-gray-800 border-0';
    case 'Cancelled': return 'bg-red-900 hover:bg-red-800 text-white border-0';
    case 'Partially Completed': return 'bg-yellow-400 hover:bg-yellow-500 text-black border-0';
    case 'Scheduled': return 'bg-[#1a4254] hover:bg-[#1a4254]/90 text-white border-0';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Paid in Full': return 'bg-gray-800 text-white hover:bg-gray-700';
    case 'Partial Payment': return 'bg-amber-600 text-white hover:bg-amber-700';
    case 'Unpaid': return 'bg-sky-600 text-white hover:bg-sky-700';
    default: return 'bg-gray-200';
  }
}
