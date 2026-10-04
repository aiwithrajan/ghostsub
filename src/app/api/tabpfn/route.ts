import { NextResponse } from 'next/server';
import { runTabPFNAnalysis } from '@/lib/tabpfn-engine';
import { RawTransaction } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transactions: RawTransaction[] = body.transactions || [];

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty transaction array supplied.' },
        { status: 400 }
      );
    }

    // Run TabPFN Bayesian tabular inference
    const detected = runTabPFNAnalysis(transactions);

    const totalMonthlyDrain = detected.reduce((sum, s) => sum + s.currentAmount, 0);
    const totalAnnualDrain = detected.reduce((sum, s) => sum + s.annualImpact, 0);
    const zombieCount = detected.filter(s => s.zombieStatus.isZombie).length;
    const priceCreepCount = detected.filter(s => s.priceCreep.detected).length;

    return NextResponse.json({
      success: true,
      modelUsed: 'TabPFN-v2-Financial-Prior (Tabular Foundation Model)',
      analysisSummary: {
        totalSubscriptionsDetected: detected.length,
        totalMonthlyDrain: Number(totalMonthlyDrain.toFixed(2)),
        totalAnnualDrain,
        zombieCount,
        priceCreepCount,
        averageConfidence: Number(
          (detected.reduce((sum, s) => sum + s.confidenceScore, 0) / (detected.length || 1)).toFixed(2)
        )
      },
      subscriptions: detected
    });
  } catch (error: any) {
    console.error('TabPFN API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze tabular bank records.' },
      { status: 500 }
    );
  }
}
