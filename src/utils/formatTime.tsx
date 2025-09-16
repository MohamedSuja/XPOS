export const formatTimeto12 = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  let period = hours >= 12 ? 'pm' : 'am';
  let adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
