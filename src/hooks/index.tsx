import React from 'react';
import { AppDataProvider } from './appData';

import { AuthProvider } from './auth';

export interface ChildrenProps {
   children: React.ReactNode;
}

const AppProvider: React.FC<ChildrenProps> = ({ children }) => (
   <AuthProvider>
      <AppDataProvider>{children}</AppDataProvider>
   </AuthProvider>
);

export default AppProvider;
