import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-7xl px-4 min-[480px]:px-5 sm:px-6 lg:px-8 overflow-x-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

export { Container };
