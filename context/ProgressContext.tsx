'use client'

import React, { createContext, useContext, useState } from 'react';

interface UserProgressContextType {
  progress: number;
  setProgress: (progress: any) => void;
}

const UserProgressContext = createContext<UserProgressContextType>({
  progress: 0,
  setProgress: () => {},
});

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <UserProgressContext.Provider value={{ progress, setProgress: updateProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = (): UserProgressContextType => {
  return useContext(UserProgressContext);
};
