"use client";
import { useState, useEffect } from 'react';

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  urgency: string;
  notes: string | null;
  status: string;
  createdAt: string;
  estimatedCost: number | null;
  estimatedHeight: number | null;
  estimatedLength: number | null;
}

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      if (response.ok) {
        const data = await response.json();
        setQuotes(data.quotes);
      } else {
        setError('Failed to fetch quotes');
      }
    } catch {
      setError('Error fetching quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading quotes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Quote Submissions</h1>
            
            {quotes.length === 0 ? (
              <p className="text-gray-500">No quotes found in the database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.firstName} {quote.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            quote.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            quote.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            quote.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            quote.urgency === 'URGENT' ? 'bg-red-100 text-red-800' :
                            quote.urgency === 'STANDARD' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {quote.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6">
              <button
                onClick={fetchQuotes}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 