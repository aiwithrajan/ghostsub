export interface RawTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category?: string;
  account?: string;
}

export interface PriceHistoryPoint {
  date: string;
  amount: number;
}

export interface DetectedSubscription {
  id: string;
  merchantName: string;
  rawDescriptor: string;
  cadence: 'monthly' | 'yearly' | 'weekly' | 'irregular';
  currentAmount: number;
  initialAmount: number;
  annualImpact: number;
  priceCreep: {
    detected: boolean;
    diff: number;
    percentage: number;
    history: PriceHistoryPoint[];
  };
  zombieStatus: {
    isZombie: boolean;
    monthsDormant: number;
    reason: string;
  };
  vampireScore: number; // 1-100 severity index
  confidenceScore: number; // 0.0 - 1.0 from TabPFN
  category: 'Streaming' | 'Software/SaaS' | 'Fitness' | 'News/Media' | 'Retail/Box' | 'Gaming' | 'Utility';
  darkPattern: {
    riskLevel: 'extreme' | 'high' | 'medium' | 'low';
    tactics: string[];
    cancellationTrapSummary: string;
    statutesToInvoke: string[];
  };
  status: 'active' | 'cancelled' | 'kept';
}

export interface FriendSubscription {
  serviceName: string;
  cost: number;
  category: string;
  planType: string;
}

export interface FriendSynergy {
  service: string;
  userCost: number;
  friendCost: number;
  combinedCurrent: number;
  familyPlanCost: number;
  annualSavings: number;
  recommendation: string;
  iconName: string;
}

export interface FriendGoal {
  title: string;
  targetCost: number;
  currentSaved: number;
  tagline: string;
}
