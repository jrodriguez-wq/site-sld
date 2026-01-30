import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const PageContent = ({ children, size = "xl", className }: PageContentProps) => {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Container className={cn(sizeClasses[size], className)}>
      {children}
    </Container>
  );
};
