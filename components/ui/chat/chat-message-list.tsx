import * as React from 'react';
import { cn } from '@/lib/utils/utils';

const ChatMessageList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    className={cn('flex w-full flex-col gap-6 overflow-y-auto p-4', className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
));

ChatMessageList.displayName = 'ChatMessageList';

export { ChatMessageList };
