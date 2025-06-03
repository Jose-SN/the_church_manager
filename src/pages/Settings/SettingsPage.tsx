import { 
  Cog6ToothIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BellIcon,
  UserCircleIcon,
  PuzzlePieceIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const settingsSections = [
  {
    name: 'General',
    description: 'Basic church information and settings',
    icon: Cog6ToothIcon,
    href: '#',
  },
  {
    name: 'Membership',
    description: 'Member categories and status settings',
    icon: UserGroupIcon,
    href: '#',
  },
  {
    name: 'Donations',
    description: 'Donation settings and payment integrations',
    icon: CurrencyDollarIcon,
    href: '#',
  },
  {
    name: 'Notifications',
    description: 'Email and notification preferences',
    icon: BellIcon,
    href: '#',
  },
  {
    name: 'Users & Permissions',
    description: 'Manage user accounts and access levels',
    icon: UserCircleIcon,
    href: '#',
  },
  {
    name: 'Integrations',
    description: 'Connect with other services',
    icon: PuzzlePieceIcon,
    href: '#',
  },
];

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <Cog6ToothIcon className="h-6 w-6 inline-block mr-2 -mt-1" />
          Settings
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Manage your church's settings and preferences.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.name}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={section.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {section.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {section.description}
                      </p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-red-700 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            Danger Zone
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Permanently delete your account and all associated data.</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
