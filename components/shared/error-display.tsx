import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';

interface ErrorProps {
  errorText: string;
}

export default function ErrorDisplay({ errorText }: ErrorProps) {
  return <Label className="text-center text-red-500">{errorText}</Label>;
}
