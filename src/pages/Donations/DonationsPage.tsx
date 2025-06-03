import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  type: 'tithe' | 'offering' | 'donation' | 'other';
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod?: string;
  reference?: string;
}

interface DonationStats {
  total: number;
  thisMonth: number;
  lastMonth: number;
}

// Mock data for development
const mockDonations: Donation[] = [
  {
    id: '1',
    donorName: 'John Doe',
    amount: 100,
    type: 'tithe',
    date: '2023-06-01',
    status: 'completed',
    paymentMethod: 'Credit Card',
    reference: 'INV-001'
  },
  {
    id: '2',
    donorName: 'Jane Smith',
    amount: 50,
    type: 'offering',
    date: '2023-06-05',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-002'
  },
];

const mockStats: DonationStats = {
  total: 1500,
  thisMonth: 500,
  lastMonth: 1000
};

const DonationsPage = () => {
  // Fetch donations data
  const { data: donations = mockDonations, isLoading: isLoadingDonations } = useQuery<Donation[]>({
    queryKey: ['donations'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockDonations;
    },
  });

  // Fetch stats data
  const { data: stats = mockStats, isLoading: isLoadingStats } = useQuery<DonationStats>({
    queryKey: ['donationStats'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockStats;
    },
  });

  const isLoading = isLoadingDonations || isLoadingStats;

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <CurrencyDollarIcon className="h-6 w-6 inline-block mr-2 -mt-1" />
          Donations
        </h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Donations</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${stats.total.toLocaleString()}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">
              ${stats.thisMonth.toLocaleString()}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Last Month</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${stats.lastMonth.toLocaleString()}
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
              Recent Donations
            </h4>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Record Donation
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-4 text-center">Loading donations...</div>
        ) : donations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No donation records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {donation.donorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${donation.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsPage;
