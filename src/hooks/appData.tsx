import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildrenProps } from '.';
import { useAuth } from './auth';

export interface EventProps {
   id: string;
   image: string;
   title: string;
   online: string;
   startDate: string;
   endDate: string;
   time: string;
   description: string;
   address: string;
   city: string;
   price: string;
}

interface AppDataContextData {
   eventsData: EventProps[];
   mySubscriptionData: EventProps[];
   handleSubscribe: (item: EventProps, userId: string | number[]) => void;
   handleUnsubscribe: (item: EventProps, userId: string | number[]) => void;
}

const AppDataContext = createContext<AppDataContextData>(
   {} as AppDataContextData,
);

const eventDataBase = require('~/database/events.json');

export const AppDataProvider: React.FC<ChildrenProps> = ({ children }) => {
   const [data, setData] = useState(eventDataBase);
   const [subscription, setSubscription] = useState<EventProps[]>([]);

   useEffect(() => {
      async function loadStorageData(): Promise<void> {
         const result = await AsyncStorage.getItem('@myEvents:user');
         const userData = JSON.parse(result);
         if (userData) {
            const mySubscription = await AsyncStorage.getItem(
               `@myEvents:subscription${userData.id}`,
            );
            if (mySubscription) {
               setSubscription(JSON.parse(mySubscription));
            }
         }
      }

      loadStorageData();
   }, []);

   const handleSubscribe = useCallback(
      async (item: EventProps, userId: string) => {
         if (subscription) {
            const aux = [...subscription, item];
            setSubscription(aux);

            await AsyncStorage.setItem(
               `@myEvents:subscription${userId}`,
               JSON.stringify(aux),
            );
         } else {
            setSubscription([item]);
            await AsyncStorage.setItem(
               `@myEvents:subscription${userId}`,
               JSON.stringify(item),
            );
         }
      },
      [],
   );

   const handleUnsubscribe = useCallback(
      async (item: EventProps, userId: string) => {
         const aux = subscription.filter(data => data.id !== item.id);
         setSubscription(aux);
         await AsyncStorage.setItem(
            `@myEvents:subscription${userId}`,
            JSON.stringify(aux),
         );
      },
      [],
   );

   const loadSubscription = async (userId: string) => {
      const mySubscription = await AsyncStorage.getItem(
         `@myEvents:subscription${userId}`,
      );
      return mySubscription ? JSON.parse(mySubscription) : [];
   };

   return (
      <AppDataContext.Provider
         value={{
            eventsData: data,
            mySubscriptionData: subscription,
            handleUnsubscribe,
            handleSubscribe,
         }}>
         {children}
      </AppDataContext.Provider>
   );
};

export function useAppData(): AppDataContextData {
   const context = useContext(AppDataContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
