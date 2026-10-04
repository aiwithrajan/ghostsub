import { DetectedSubscription, FriendSubscription, FriendSynergy, FriendGoal } from '@/types';

// Catalog of known multi-user / family / duo tiers and pricing
const MULTI_USER_TIERS: Record<string, { familyCostMonthly: number; planName: string; maxUsers: number; icon: string }> = {
  'Spotify': { familyCostMonthly: 16.99, planName: 'Spotify Duo (or $19.99 Family)', maxUsers: 2, icon: 'Music' },
  'Disney Plus': { familyCostMonthly: 19.99, planName: 'Disney+ & Hulu Duo Bundle', maxUsers: 4, icon: 'Tv' },
  'DoorDash DashPass': { familyCostMonthly: 9.99, planName: 'Shared Roommate DashPass', maxUsers: 2, icon: 'Utensils' },
  'Dropbox': { familyCostMonthly: 16.99, planName: 'Dropbox Family (2TB Shared)', maxUsers: 6, icon: 'Cloud' },
  'YouTube': { familyCostMonthly: 22.99, planName: 'YouTube Premium Family', maxUsers: 5, icon: 'Play' },
  'Apple One': { familyCostMonthly: 25.95, planName: 'Apple One Family Plan', maxUsers: 5, icon: 'Smartphone' },
  'Claude AI': { familyCostMonthly: 25.00, planName: 'Anthropic Team Workspace', maxUsers: 5, icon: 'Bot' },
};

export function calculateFriendSynergies(
  userSubs: DetectedSubscription[],
  friendSubs: FriendSubscription[]
): {
  synergies: FriendSynergy[];
  totalAnnualSavings: number;
} {
  const synergies: FriendSynergy[] = [];

  userSubs.forEach(userSub => {
    // Check if friend has matching service
    const matchingFriendSub = friendSubs.find(f => 
      userSub.merchantName.toLowerCase().includes(f.serviceName.toLowerCase()) ||
      f.serviceName.toLowerCase().includes(userSub.merchantName.toLowerCase())
    );

    if (matchingFriendSub) {
      // Look up family/duo tier
      let tierKey = Object.keys(MULTI_USER_TIERS).find(k => 
        userSub.merchantName.toLowerCase().includes(k.toLowerCase()) ||
        matchingFriendSub.serviceName.toLowerCase().includes(k.toLowerCase())
      );

      if (tierKey) {
        const tier = MULTI_USER_TIERS[tierKey];
        const combinedCurrentMonthly = userSub.currentAmount + matchingFriendSub.cost;
        const familyMonthly = tier.familyCostMonthly;
        const monthlySavings = Math.max(0, combinedCurrentMonthly - familyMonthly);
        const annualSavings = Math.round(monthlySavings * 12);

        if (annualSavings > 0) {
          synergies.push({
            service: tierKey,
            userCost: userSub.currentAmount,
            friendCost: matchingFriendSub.cost,
            combinedCurrent: combinedCurrentMonthly,
            familyPlanCost: familyMonthly,
            annualSavings,
            recommendation: `Switch from 2 separate individual accounts ($${combinedCurrentMonthly.toFixed(2)}/mo) to ${tier.planName} ($${familyMonthly.toFixed(2)}/mo). You split the cost and save $${annualSavings}/yr together!`,
            iconName: tier.icon
          });
        }
      }
    }
  });

  const totalAnnualSavings = synergies.reduce((acc, s) => acc + s.annualSavings, 0);

  return {
    synergies,
    totalAnnualSavings
  };
}

export function updateFriendGoalProgress(goal: FriendGoal, annualSavings: number): FriendGoal {
  const funded = Math.min(goal.targetCost, annualSavings);
  return {
    ...goal,
    currentSaved: funded
  };
}
