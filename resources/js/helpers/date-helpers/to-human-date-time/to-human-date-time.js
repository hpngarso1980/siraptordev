import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function toHumanDateTime(date, options = {}) {
  const input = (date instanceof Date) ? date : new Date(date);
  const monthYearFormat = options.compact ? 'MMM yy' : 'MMMM yyyy';

  return format(input, `d ${monthYearFormat} HH:mm`, { locale: id });
}
