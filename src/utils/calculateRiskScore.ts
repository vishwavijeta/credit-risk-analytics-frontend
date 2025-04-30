import { Customer } from '../models/Customer';

export function calculateRiskScore(customer: Customer): number {
    const creditScoreNormalized = (customer.creditScore / 850) * 40;
    const repayments = customer.loanRepaymentHistory.filter(r => r === 1).length;
    const repaymentScore = (repayments / customer.loanRepaymentHistory.length) * 30;
    const loanToIncome = customer.outstandingLoans / customer.monthlyIncome;
    const loanScore = Math.max(0, 30 - Math.min(30, loanToIncome * 10));
    return Math.round(creditScoreNormalized + repaymentScore + loanScore);
}
