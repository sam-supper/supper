import { type FC, useMemo } from "react";

type FormattedDateProps = {
  date: string | null;
}

export const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  const formattedDate = useMemo(() => {
    if (!date) return '';
    
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    }).format(new Date(date));
  }, [date])

  if (!formattedDate) return null;

  return <span>{formattedDate}</span>
}