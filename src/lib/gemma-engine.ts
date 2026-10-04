import { DetectedSubscription } from '@/types';

export interface LegalNoticePayload {
  subscription: DetectedSubscription;
  userName?: string;
  userEmail?: string;
  lastFourCard?: string;
  todayDate?: string;
}

/**
 * Gemma Legal Notice Generator:
 * Generates consumer protection cancellation demands citing FTC regulations and statutory automatic renewal laws.
 */
export function generateFTCClickToCancelNotice(payload: LegalNoticePayload): string {
  const {
    subscription,
    userName = '[YOUR FULL NAME]',
    userEmail = '[YOUR EMAIL ADDRESS]',
    lastFourCard = '•••• [LAST 4 DIGITS]',
    todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } = payload;

  const statutesList = subscription.darkPattern.statutesToInvoke
    .map((s, idx) => `  ${idx + 1}. ${s}`)
    .join('\n');

  return `FORMAL NOTICE OF CANCELLATION & REVOCATION OF PAYMENT AUTHORIZATION
DELIVERED PURSUANT TO FEDERAL TRADE COMMISSION (FTC) "CLICK-TO-CANCEL" REGULATIONS
AND APPLICABLE STATE AUTOMATIC RENEWAL STATUTES

DATE: ${todayDate}
TO: Billing & Customer Accounts Department
MERCHANT ENTITY: ${subscription.merchantName} (${subscription.rawDescriptor})
REGARDING: ACCOUNT ASSOCIATED WITH ${userEmail}
PAYMENT INSTRUMENT ENDING IN: ${lastFourCard}
MONTHLY CHARGE AMOUNT: $${subscription.currentAmount.toFixed(2)}/month

--------------------------------------------------------------------------------
1. FORMAL NOTICE OF IMMEDIATE CANCELLATION
--------------------------------------------------------------------------------
Please be advised that I hereby terminate, revoke, and cancel any and all recurring 
membership agreements, subscription terms, or preauthorized billing arrangements 
associated with my account, effective immediately upon receipt of this transmission.

Any previous authorization permitting ${subscription.merchantName} or its third-party billing 
processors to debit my credit card, debit card, ACH account, or digital wallet is 
EXPRESSLY AND PERMANENTLY REVOKED under the Electronic Fund Transfer Act (EFTA), 
15 U.S.C. § 1693e, and Regulation E, 12 C.F.R. § 1005.10(c).

--------------------------------------------------------------------------------
2. STATUTORY BASIS & PROHIBITION OF DARK PATTERNS
--------------------------------------------------------------------------------
Under the FTC's Negative Option Rule ("Click-to-Cancel", 16 C.F.R. Part 425) and state 
automatic renewal mandates:

${statutesList}

a. Sellers are legally required to provide a cancellation mechanism that is at least 
   as simple, swift, and easily accessible as the enrollment mechanism. 
b. Sellers may NOT mandate phone calls during restricted hours, in-person club visits, 
   mandatory certified postal letters, or deceptive multi-screen retention labyrinths 
   if initial signup was processed digitally.
c. Any assessment of an "Early Termination Penalty" or subsequent monthly debit following 
   receipt of this unambiguous cancellation demand constitutes an unfair and deceptive 
   practice under Section 5(a) of the Federal Trade Commission Act (15 U.S.C. § 45(a)).

--------------------------------------------------------------------------------
3. REQUIRED ACTIONS & TIMELINE
--------------------------------------------------------------------------------
Within three (3) business days of this notice, you are formally requested to:
1. Confirm in writing via email to ${userEmail} that this subscription has been cancelled.
2. Cease any further pending or recurring charges to payment card ending in ${lastFourCard}.
3. Refund any unauthorized charges debited after cancellation was attempted.

NOTICE OF RESERVATION OF RIGHTS:
Failure to honor this revocation notice will result in immediate filing of a formal 
Merchant Chargeback dispute under Regulation E/Reason Code 4837/10.4 with my financial 
institution, accompanied by formal consumer complaints to the FTC Bureau of Consumer 
Protection, state Attorney General Consumer Division, and CFPB.

Respectfully submitted,

Signature: __________________________________
Name: ${userName}
Email: ${userEmail}
Date: ${todayDate}`;
}

/**
 * Bank Dispute / Stop Payment Affidavit
 * Used when a zombie merchant ignores cancellation and continues debiting.
 */
export function generateBankDisputeAffidavit(payload: LegalNoticePayload): string {
  const {
    subscription,
    userName = '[ACCOUNT HOLDER NAME]',
    lastFourCard = '•••• [LAST 4 DIGITS]',
    todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } = payload;

  return `DECLARATION OF UNAUTHORIZED RECURRING DEBIT / STOP PAYMENT REQUEST
SUBMITTED TO ISSUING BANK DISPUTE & FRAUD DEPARTMENT

DATE: ${todayDate}
ACCOUNT HOLDER: ${userName}
CARD / ACCOUNT ENDING IN: ${lastFourCard}
DISPUTED MERCHANT: ${subscription.merchantName} (${subscription.rawDescriptor})
RECURRING AMOUNT: $${subscription.currentAmount.toFixed(2)}

STATEMENT OF FACTS:
1. The undersigned cardholder previously revoked all billing consent and preauthorization 
   for ${subscription.merchantName}.
2. Despite written notice of cancellation, the merchant processed unauthorized recurring 
   debits without valid consumer consent.
3. Pursuant to Regulation E (12 CFR § 1005.11) and Visa/Mastercard Core Dispute Rules, 
   I request an immediate Stop Payment block on future recurring authorizations from 
   this merchant descriptor and a provisional chargeback credit of $${subscription.currentAmount.toFixed(2)}.

I declare under penalty of perjury under the laws of the United States that the foregoing 
is true and correct.

Declarant Signature: _______________________
Date: ${todayDate}`;
}

/**
 * Gemma Plain-English Breakdown & Dark Pattern Analysis
 */
export function getGemmaDarkPatternBriefing(subscription: DetectedSubscription) {
  const riskLabels = {
    extreme: 'CRITICAL DARK PATTERN ALERT: Active Retention Trap Detected',
    high: 'HIGH RISK: Friction-Heavy Cancellation Maze',
    medium: 'MODERATE RISK: Sneaky Multi-Step Confirmation',
    low: 'LOW RISK: Standard Billing Flow'
  };

  return {
    headline: riskLabels[subscription.darkPattern.riskLevel],
    trapDescription: subscription.darkPattern.cancellationTrapSummary,
    tacticsUsed: subscription.darkPattern.tactics,
    defenseStrategy: `Deploy the FTC Click-to-Cancel demand notice. By citing federal Regulation E (12 CFR 1005.10(c)) and the FTC Negative Option Rule, you legally revoke authorization, forcing the company to cancel immediately or face credit card chargebacks.`,
    statutoryBacking: subscription.darkPattern.statutesToInvoke
  };
}
