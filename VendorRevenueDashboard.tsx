import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

interface RevenueData {
  vendor_name: string;
  total_trips: number;
  total_revenue: number;
}

export default function VendorRevenueDashboard() {
  const [reportData, setReportData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenueReport() {
      // Using .rpc() to call a predefined database view or function for complex queries is best practice,
      // but here is the raw query execution for demonstration:
      const { data, error } = await supabase
        .rpc('get_vendor_revenue_feb_2026'); // Assuming you created this function in DB

      if (error) console.error('Error fetching report:', error);
      else setReportData(data || []);
      setLoading(false);
    }

    fetchRevenueReport();
  }, []);

  if (loading) return <div className="p-4">Loading report...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Vendor Revenue Report - Feb 2026</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Trips</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportData.map((row) => (
            <tr key={row.vendor_name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.vendor_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.total_trips}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{row.total_revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
