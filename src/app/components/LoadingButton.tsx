import React from "react";

interface LoadingButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function LoadingButton({ 
  children, 
  onClick, 
  loading = false, 
  disabled = false,
  className = "",
  variant = 'primary'
}: LoadingButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  
  const variantClasses = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${(disabled || loading) ? disabledClasses : ''} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
} 