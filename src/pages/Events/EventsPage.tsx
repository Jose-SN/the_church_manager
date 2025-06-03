import { CalendarIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: number;
  maxAttendees?: number;
}

// Mock data for development
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunday Service',
    description: 'Weekly Sunday worship service',
    date: '2023-06-04',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    status: 'upcoming',
    attendees: 120,
    maxAttendees: 200
  },
  {
    id: '2',
    title: 'Bible Study',
    description: 'Weekly Bible study group',
    date: '2023-06-07',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    status: 'upcoming',
    attendees: 30,
    maxAttendees: 50
  },
];

const EventsPage = () => {
  // Fetch events data
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockEvents;
    },
  });

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <CalendarIcon className="h-6 w-6 inline-block mr-2 -mt-1" />
          Events
        </h3>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="text-lg leading-6 font-medium text-gray-900">
              Upcoming Events
            </h4>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-4 text-center">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No upcoming events. Create your first event to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event: Event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <CalendarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {event.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
