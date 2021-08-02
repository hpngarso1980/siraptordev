import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function toHumanDate(date) {
  const input = (date instanceof Date) ? date : new Date(date);

  return format(input, "d MMM yyyy", { locale: id });
}
