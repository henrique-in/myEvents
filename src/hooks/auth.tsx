import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildrenProps } from '.';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

interface AuthState {
   user: User;
}

interface SignInCredentials {
   email: string;
   password: string;
}

interface SignUpData {
   name: string;
   email: string;
   password: string;
}

interface AuthContextData {
   user: User;
   loading: boolean;
   signIn(credentials: SignInCredentials): Promise<void>;
   signUp(dataUser: SignUpData): Promise<void>;
   signOut(): void;
}

interface User {
   id: string | number[];
   name: string;
   email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
   const [data, setData] = useState<AuthState>({} as AuthState);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStorageData(): Promise<void> {
         const user = await AsyncStorage.getItem('@myEvents:user');
         if (user) {
            setData({ user: JSON.parse(user) });
         }
         setLoading(false);
      }

      loadStorageData();
   }, []);

   const signIn = useCallback(async (data: SignInCredentials) => {
      const result = await AsyncStorage.getItem('@myEvents:users');

      const userRegisters = JSON.parse(result);

      if (result) {
         const account = userRegisters?.filter(
            (item: { email: string }) => item.email === data.email,
         );
         if (account) {
            account[0].password === data.password
               ? setTimeout(async () => {
                    setData({ user: account[0] });
                    await AsyncStorage.setItem(
                       '@myEvents:user',
                       JSON.stringify(account[0]),
                    );
                 }, 200)
               : Alert.alert('Senha incorreta');
         }
      } else {
         Alert.alert('Usuário não cadastrado');
      }
   }, []);

   const signUp = useCallback(async (data: SignUpData) => {
      const userId = uuid.v4();
      const result = await AsyncStorage.getItem('@myEvents:users');

      const userRegisters = JSON.parse(result);

      if (result) {
         const emails = userRegisters?.map(
            (item: { email: string }) => item.email,
         );

         if (emails.includes(data.email)) {
            return Alert.alert('Email já registrado');
         }
      }

      const userData = {
         id: userId,
         name: data.name,
         email: data.email,
      };

      const users = result ? [...userRegisters, userData] : [userData];

      setTimeout(async () => {
         await AsyncStorage.multiSet([
            ['@myEvents:user', JSON.stringify(userData)],
            ['@myEvents:users', JSON.stringify(users)],
         ]);
         setData({ user: userData });
      }, 2000);
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.removeItem('@myEvents:user');

      setData({} as AuthState);
   }, []);

   return (
      <AuthContext.Provider
         value={{ user: data.user, loading, signIn, signOut, signUp }}>
         {children}
      </AuthContext.Provider>
   );
};

export function useAuth(): AuthContextData {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
