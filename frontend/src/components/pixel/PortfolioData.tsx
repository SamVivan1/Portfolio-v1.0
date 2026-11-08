"use client";

import { createContext, ReactNode, useContext } from "react";
import { LiveGitHubData, useLiveProjects } from "../../hooks/useLiveProjects";

const PortfolioDataContext = createContext<LiveGitHubData | null>(null);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const data = useLiveProjects();
  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const value = useContext(PortfolioDataContext);
  if (!value) {
    throw new Error("usePortfolioData must be used inside PortfolioDataProvider");
  }
  return value;
}
