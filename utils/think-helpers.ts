export function getPercentageColor(percentage: number): string {
  if (percentage === 100) return '#4CAF50';
  if (percentage >= 80) return '#66BB6A';
  if (percentage >= 60) return '#FFA726';
  if (percentage >= 40) return '#FF7043';
  if (percentage >= 20) return '#EF5350';
  return '#E53935';
}

export function getPercentageMessage(percentage: number): string {
  if (percentage === 100) return 'Perfect! Say it with confidence';
  if (percentage >= 80) return 'Good to say';
  if (percentage >= 60) return 'Consider carefully';
  if (percentage >= 40) return 'Think twice';
  if (percentage >= 20) return 'Probably best not to say';
  return 'Keep it to yourself';
}

export function calculatePercentage(criteriaCount: number): number {
  return (criteriaCount / 5) * 100;
}