import React from "react";

type StarBorderProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "#ef4444",
  speed = "4s",
  children,
  ...props
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block p-[1.5px] overflow-hidden rounded-full ${className}`}
      style={{ "--speed": speed } as React.CSSProperties} // CRITICAL: This enables the animation
      {...props}
    >
      {/* The Animated Gradient */}
      <div
        className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] rounded-full opacity-100 animate-star-border-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 50%, transparent 100%)`,
        }}
      ></div>

      {/* The Inner Content Container */}
      <div className="relative z-10 bg-white dark:bg-black px-6 py-2 rounded-full flex items-center justify-center whitespace-nowrap text-red-600 font-medium hover:bg-red-50 dark:hover:bg-zinc-900 transition-colors">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;