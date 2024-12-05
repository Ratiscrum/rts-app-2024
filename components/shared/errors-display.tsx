import { FC } from 'react';

export const ErrorsDisplay: FC<{ errors?: string[] }> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-2">
      {errors.map((error, index) => (
        <p key={index} className="text-sm font-medium text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};
