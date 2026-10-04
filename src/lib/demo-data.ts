import { RawTransaction, FriendSubscription, FriendGoal } from '@/types';

export const SAMPLE_RAW_TRANSACTIONS: RawTransaction[] = [
  // Month 1 (March)
  { id: 'tx-00', date: '2026-03-01', description: 'PLANET FIT*1029 SAN FRANCISCO CA', amount: 24.99, category: 'Fitness' }, // Active before cancellation
  { id: 'tx-01', date: '2026-03-02', description: 'TRADER JOES #512 SAN FRANCISCO CA', amount: 84.32, category: 'Groceries' },
  { id: 'tx-02', date: '2026-03-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 52.99, category: 'Software/SaaS' },
  { id: 'tx-03', date: '2026-03-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-04', date: '2026-03-08', description: 'LYFT *RIDE 03-08 SAN FRANCISCO CA', amount: 23.40, category: 'Transport' },
  { id: 'tx-05', date: '2026-03-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-06', date: '2026-03-14', description: 'DROPBOX*2K93JS SAN FRANCISCO CA', amount: 11.99, category: 'Software/SaaS' },
  { id: 'tx-07', date: '2026-03-16', description: 'WSJ*DIGITAL SPECIAL INTRO NY', amount: 1.00, category: 'News/Media' },
  { id: 'tx-08', date: '2026-03-20', description: 'BLUE BOTTLE COFFEE OAKLAND CA', amount: 6.75, category: 'Dining' },

  // Month 2 (April)
  { id: 'tx-09', date: '2026-04-03', description: 'TRADER JOES #512 SAN FRANCISCO CA', amount: 92.15, category: 'Groceries' },
  { id: 'tx-10', date: '2026-04-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 59.99, category: 'Software/SaaS' }, // Price hike 1
  { id: 'tx-11', date: '2026-04-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-12', date: '2026-04-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-13', date: '2026-04-14', description: 'DROPBOX*2K93JS SAN FRANCISCO CA', amount: 11.99, category: 'Software/SaaS' },
  { id: 'tx-14', date: '2026-04-16', description: 'WSJ*DIGITAL SUBSCRIPTION NY', amount: 38.99, category: 'News/Media' }, // Trial expired sneak hike!
  { id: 'tx-15', date: '2026-04-22', description: 'AMZN-DGTL-28941*PRM-CHNL WA', amount: 11.99, category: 'Streaming' }, // Forgotten channel add-on
  { id: 'tx-16', date: '2026-04-28', description: 'PG&E UTILITY BILL SAN FRANCISCO CA', amount: 76.50, category: 'Utility' },

  // Month 3 (May)
  { id: 'tx-17', date: '2026-05-02', description: 'TRADER JOES #512 SAN FRANCISCO CA', amount: 88.40, category: 'Groceries' },
  { id: 'tx-18', date: '2026-05-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 59.99, category: 'Software/SaaS' },
  { id: 'tx-19', date: '2026-05-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-20', date: '2026-05-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-21', date: '2026-05-14', description: 'DROPBOX*2K93JS SAN FRANCISCO CA', amount: 11.99, category: 'Software/SaaS' },
  { id: 'tx-22', date: '2026-05-16', description: 'WSJ*DIGITAL SUBSCRIPTION NY', amount: 38.99, category: 'News/Media' },
  { id: 'tx-23', date: '2026-05-22', description: 'AMZN-DGTL-28941*PRM-CHNL WA', amount: 11.99, category: 'Streaming' },
  { id: 'tx-24', date: '2026-05-27', description: 'CLAUDE.AI ANTHROPIC SAN FRANCISCO', amount: 20.00, category: 'Software/SaaS' },

  // Month 4 (June)
  { id: 'tx-25', date: '2026-06-03', description: 'TRADER JOES #512 SAN FRANCISCO CA', amount: 95.80, category: 'Groceries' },
  { id: 'tx-26', date: '2026-06-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 65.99, category: 'Software/SaaS' }, // Price hike 2!
  { id: 'tx-27', date: '2026-06-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-28', date: '2026-06-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-29', date: '2026-06-14', description: 'DROPBOX*2K93JS SAN FRANCISCO CA', amount: 11.99, category: 'Software/SaaS' },
  { id: 'tx-30', date: '2026-06-16', description: 'WSJ*DIGITAL SUBSCRIPTION NY', amount: 38.99, category: 'News/Media' },
  { id: 'tx-31', date: '2026-06-22', description: 'AMZN-DGTL-28941*PRM-CHNL WA', amount: 11.99, category: 'Streaming' },
  { id: 'tx-32', date: '2026-06-27', description: 'CLAUDE.AI ANTHROPIC SAN FRANCISCO', amount: 20.00, category: 'Software/SaaS' },

  // Month 5 (July)
  { id: 'tx-33', date: '2026-07-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 65.99, category: 'Software/SaaS' },
  { id: 'tx-34', date: '2026-07-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-35', date: '2026-07-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-36', date: '2026-07-14', description: 'DROPBOX*2K93JS SAN FRANCISCO CA', amount: 11.99, category: 'Software/SaaS' },
  { id: 'tx-37', date: '2026-07-16', description: 'WSJ*DIGITAL SUBSCRIPTION NY', amount: 38.99, category: 'News/Media' },
  { id: 'tx-38', date: '2026-07-22', description: 'AMZN-DGTL-28941*PRM-CHNL WA', amount: 11.99, category: 'Streaming' },
  { id: 'tx-39', date: '2026-07-27', description: 'CLAUDE.AI ANTHROPIC SAN FRANCISCO', amount: 20.00, category: 'Software/SaaS' },

  // Month 6 (August) - ZOMBIE CHARGE DETECTED!
  { id: 'tx-40', date: '2026-08-01', description: 'PLANET FIT*1029 SAN FRANCISCO CA', amount: 24.99, category: 'Fitness' }, // Zombie! Cancelled 4 months ago
  { id: 'tx-41', date: '2026-08-04', description: 'ADOBE*CREATIVE CLOUD 800-833-6687 CA', amount: 65.99, category: 'Software/SaaS' },
  { id: 'tx-42', date: '2026-08-05', description: 'SPOTIFY USA NEW YORK NY', amount: 11.99, category: 'Streaming' },
  { id: 'tx-43', date: '2026-08-12', description: 'DISNEY PLUS BURBANK CA', amount: 13.99, category: 'Streaming' },
  { id: 'tx-44', date: '2026-08-16', description: 'WSJ*DIGITAL SUBSCRIPTION NY', amount: 38.99, category: 'News/Media' },
  { id: 'tx-45', date: '2026-08-22', description: 'AMZN-DGTL-28941*PRM-CHNL WA', amount: 11.99, category: 'Streaming' },
  { id: 'tx-46', date: '2026-08-27', description: 'CLAUDE.AI ANTHROPIC SAN FRANCISCO', amount: 20.00, category: 'Software/SaaS' },
];

export const KEVIN_FRIEND_SUBSCRIPTIONS: FriendSubscription[] = [
  { serviceName: 'Spotify', cost: 11.99, category: 'Streaming', planType: 'Individual' },
  { serviceName: 'Disney Plus', cost: 13.99, category: 'Streaming', planType: 'Individual' },
  { serviceName: 'Claude AI', cost: 20.00, category: 'Software/SaaS', planType: 'Pro' },
  { serviceName: 'DoorDash DashPass', cost: 9.99, category: 'Food Delivery', planType: 'Individual' },
];

export const DEFAULT_FRIEND_GOAL: FriendGoal = {
  title: 'Weekend Cabin Trip to Lake Tahoe with Kevin',
  targetCost: 550,
  currentSaved: 0,
  tagline: 'Funded entirely by recovered zombie subscriptions & family-plan splits',
};
