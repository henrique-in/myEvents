import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildrenProps } from '.';

interface SignInCredentials {
   email: string;
   password: string;
}

interface AppDataContextData {
   loading: boolean;
}

const AppDataContext = createContext<AppDataContextData>(
   {} as AppDataContextData,
);

export const AppDataProvider: React.FC<ChildrenProps> = ({ children }) => {
   const [data, setData] = useState({});
   const [loading, setLoading] = useState(true);

   //  useEffect(() => {
   //     async function loadStorageData(): Promise<void> {
   //        const [access_token, user] = await AsyncStorage.multiGet([
   //           '@AllRecords:access_token',
   //           '@AllRecords:user',
   //        ]);

   //        setLoading(false);
   //     }

   //     loadStorageData();
   //  }, []);

   const signIn = useCallback(async () => {}, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@myEvents:user']);

      setData({});
   }, []);

   return (
      <AppDataContext.Provider value={{ loading }}>
         {children}
      </AppDataContext.Provider>
   );
};

export function useAuth(): AppDataContextData {
   const context = useContext(AppDataContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
