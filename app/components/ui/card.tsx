import { ReactNode } from "react"

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-huesoRugbyClick shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
}
