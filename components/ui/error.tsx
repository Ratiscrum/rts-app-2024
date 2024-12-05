import { cn } from '@/lib/utils/utils';
import { Rat } from 'lucide-react';
import { FC } from 'react';

type Props = {
  title?: string;
  message: string;
  children: React.ReactNode;
  className?: string;
};

export const Error: FC<Props> = ({
  title = 'Une erreur est survenue !',
  message,
  children,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <Rat size={128} className="text-accent" />
      <h3>{title}</h3>
      {children}
      <p className="max-w-prose text-xs text-muted-foreground">{`${message}`}</p>
    </div>
  );
};
