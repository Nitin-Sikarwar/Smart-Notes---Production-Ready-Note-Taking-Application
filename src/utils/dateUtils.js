import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatDate = (date) => {
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'HH:mm')}`;
  }
  
  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'HH:mm')}`;
  }
  
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatFullDate = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy at HH:mm');
};