'use client';

import { useFormStatus } from 'react-dom';
import { FC } from 'react';
import { Loader } from 'lucide-react';
import { ButtonProps, Button } from './button';

export const SubmitButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      disabled={pending || props.disabled}
      type="submit"
    >
      {props.children}
      {pending && <Loader className="ml-2" />}
    </Button>
  );
};
