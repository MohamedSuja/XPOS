export const formatTimeto12 = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  let period = hours >= 12 ? 'pm' : 'am';
  let adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export function formatDate(date: Date) {
  if (!date) return '';
  const utcDate = new Date(date);
  const localDate = utcDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' format
  return localDate;
}

export function formatTime(date: Date) {
  if (!date) return '';
  const utcDate = new Date(date);
  const localTime = utcDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return localTime;
}
