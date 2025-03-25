import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export type FeedbackType = 'Bug Report' | 'Feature Request' | 'General' | 'Question' | 'Complaint';

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface FeedbackItem {
  id: string;
  userId: string;
  userName: string;
  type: FeedbackType;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  replies: Reply[];
}

export const feedbackTypes: FeedbackType[] = [
  'Bug Report',
  'Feature Request',
  'General',
  'Question',
  'Complaint'
];

export const mockFeedbackData: FeedbackItem[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    type: 'Bug Report',
    title: 'Dashboard not loading correctly',
    content: 'When I open the dashboard on mobile devices, the charts are not displaying properly.',
    rating: 2,
    createdAt: new Date('2023-10-15T10:30:00'),
    status: 'In Progress',
    replies: [
      {
        id: 'reply1',
        userId: 'admin1',
        userName: 'Support Team',
        content: 'Thank you for reporting this issue. Our development team is looking into it.',
        createdAt: new Date('2023-10-15T14:25:00'),
        isAdmin: true
      }
    ]
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    type: 'Feature Request',
    title: 'Add dark mode option',
    content: 'It would be great to have a dark mode option for better viewing at night.',
    rating: 4,
    createdAt: new Date('2023-10-10T09:15:00'),
    status: 'Open',
    replies: []
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Robert Johnson',
    type: 'General',
    title: 'Great application overall',
    content: 'I\'ve been using this application for a month now, and I\'m very impressed with the features and user interface.',
    rating: 5,
    createdAt: new Date('2023-10-05T16:45:00'),
    status: 'Closed',
    replies: [
      {
        id: 'reply2',
        userId: 'admin2',
        userName: 'Customer Success',
        content: 'Thank you for your kind feedback, Robert! We\'re glad you\'re enjoying the application.',
        createdAt: new Date('2023-10-06T11:20:00'),
        isAdmin: true
      },
      {
        id: 'reply3',
        userId: 'user3',
        userName: 'Robert Johnson',
        content: 'You\'re welcome! Looking forward to future updates.',
        createdAt: new Date('2023-10-06T15:30:00')
      }
    ]
  }
];

export const RenderStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        
        if (rating >= ratingValue) {
          return <FaStar key={i} className="text-yellow-400" />;
        } else if (rating >= ratingValue - 0.5) {
          return <FaStarHalfAlt key={i} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={i} className="text-yellow-400" />;
        }
      })}
    </div>
  );
};
