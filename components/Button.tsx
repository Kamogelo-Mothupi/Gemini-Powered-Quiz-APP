import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300 ease-out rounded-xl font-semibold px-6 py-3 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";
  
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 border border-white/20",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-lg shadow-red-500/20 border border-white/20",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};