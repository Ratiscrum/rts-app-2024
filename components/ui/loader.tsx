import { Loader2 } from 'lucide-react';
import { FC } from 'react';

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Loader2 className="animate-spin" />
    </div>
  );
};
