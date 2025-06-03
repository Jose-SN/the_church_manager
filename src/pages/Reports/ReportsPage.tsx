import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const reportTypes: ReportType[] = [
  {
    id: 'membership',
    title: 'Membership Report',
    description: 'Detailed report of all church members and their information',
    icon: DocumentTextIcon,
  },
  {
    id: 'donations',
    title: 'Donation Report',
    description: 'Comprehensive donation history and financial reports',
    icon: CurrencyDollarIcon,
  },
  {
    id: 'attendance',
    title: 'Attendance Report',
    description: 'Track member attendance over time',
    icon: UserGroupIcon,
  },
  {
    id: 'financial',
    title: 'Financial Summary',
    description: 'Financial overview and expense reports',
    icon: ChartBarIcon,
  },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <ChartBarIcon className="h-6 w-6 inline-block mr-2 -mt-1" />
          Reports
        </h3>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h4 className="text-lg leading-6 font-medium text-gray-900">
            Generate Reports
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Select a report type to generate detailed information.
          </p>
        </div>

        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-10 w-10 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={`#`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {report.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {report.description}
                      </p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">
                Recent Reports
              </h4>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate Custom Report
              </button>
            </div>
            <div className="mt-4 bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">
                No recent reports. Generate a new report to see it here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
