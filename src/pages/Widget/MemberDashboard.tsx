import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowSmRightIcon,
} from '@heroicons/react/outline';

// Mock data and services
const fetchDashboardData = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: [
          { name: 'Total Members', value: '2,345', change: '+12%', changeType: 'increase' },
          { name: 'Active Members', value: '1,234', change: '+5%', changeType: 'increase' },
          { name: 'Upcoming Events', value: '12', change: '+2', changeType: 'neutral' },
          { name: 'Total Donations', value: '$24,567', change: '+8.2%', changeType: 'increase' },
        ],
        recentActivity: [
          { id: 1, user: 'John Doe', action: 'joined', target: 'Bible Study Group', date: '2h ago' },
          { id: 2, user: 'Jane Smith', action: 'donated', target: '$100', date: '4h ago' },
          { id: 3, user: 'Robert Johnson', action: 'registered for', target: 'Sunday Service', date: '1d ago' },
          { id: 4, user: 'Emily Davis', action: 'updated', target: 'profile information', date: '1d ago' },
          { id: 5, user: 'Michael Wilson', action: 'joined', target: 'Prayer Group', date: '2d ago' },
        ],
      });
    }, 500);
  });
};

const MemberDashboard = () => {
  const { data, isLoading, error } = useQuery(['dashboardData'], fetchDashboardData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading dashboard data. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { stats = [], recentActivity = [] } = data || {};

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/calendar"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CalendarIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            View Calendar
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat: any) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  {stat.name.includes('Members') && (
                    <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  )}
                  {stat.name.includes('Events') && (
                    <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  )}
                  {stat.name.includes('Donations') && (
                    <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span
                  className={classNames(
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : stat.changeType === 'decrease'
                      ? 'text-red-600'
                      : 'text-gray-500',
                    'font-medium'
                  )}
                >
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">
                  {stat.changeType === 'increase' ? 'Increase' : stat.changeType === 'decrease' ? 'Decrease' : 'No change'} from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              A summary of recent member activities.
            </p>
          </div>
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity: any) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${activity.user.replace(' ', '+')}&background=0D8ABC&color=fff`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}{' '}
                        <span className="text-gray-500 font-normal">
                          {activity.action}
                        </span>{' '}
                        <span className="text-gray-900 font-medium">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 px-6 py-4 text-right">
              <Link
                to="/activity"
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all activity
                <ArrowSmRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Common tasks and shortcuts.
            </p>
          </div>
          <div className="px-6 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/members/new"
                  className="group flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                    <UserGroupIcon
                      className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Add New Member
                    </p>
                    <p className="text-sm text-gray-500">
                      Register a new church member
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/events/new"
                  className="group flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                    <CalendarIcon
                      className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Create Event
                    </p>
                    <p className="text-sm text-gray-500">
                      Schedule a new church event
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/donations/new"
                  className="group flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                    <CurrencyDollarIcon
                      className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Record Donation
                    </p>
                    <p className="text-sm text-gray-500">
                      Add a new donation record
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="group flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                    <ChartBarIcon
                      className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      View Reports
                    </p>
                    <p className="text-sm text-gray-500">
                      Generate and view reports
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default MemberDashboard;
