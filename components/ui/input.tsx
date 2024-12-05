import * as React from 'react';

import { cn } from '@/lib/utils/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react'; // Icons for visibility toggle
import { ErrorsDisplay } from '../shared/errors-display';

export interface InputProps extends React.ComponentProps<'input'> {
  errors?: string[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <>
        <div
          className={cn(
            'flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            errors && 'border-red-500 bg-destructive/20',
            className,
          )}
        >
          {/* Input Field */}
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            className="flex-1 bg-transparent outline-none"
            ref={ref}
            {...props}
          />

          {/* Password Toggle Icon */}
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 text-muted-foreground focus:outline-none"
              aria-label={
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Error Icon */}
          {errors && (
            <AlertCircle
              className="ml-2 h-4 w-4 text-red-500"
              aria-hidden="true"
            />
          )}
        </div>

        {/* ErrorsDisplay */}
        {errors && <ErrorsDisplay errors={errors} />}
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input };
