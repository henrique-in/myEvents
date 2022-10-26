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
   updateUser(userData: User): void;
}

interface User {
   id: string | number[];
   name: string;
   email: string;
   password?: string;
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

      const users = result
         ? [...userRegisters, { ...userData, password: data.password }]
         : [{ ...userData, password: data.password }];

      await AsyncStorage.multiSet([
         ['@myEvents:user', JSON.stringify(userData)],
         ['@myEvents:users', JSON.stringify(users)],
      ]);
      setData({ user: userData });
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.removeItem('@myEvents:user');

      setData({} as AuthState);
   }, []);

   const updateUser = useCallback(async (item: User) => {
      const response = await AsyncStorage.getItem('@myEvents:users');
      const users = JSON.parse(response);
      const otherUsers = users.filter(
         (data: { id: string | number[] }) => data.id !== item.id,
      );
      const myUserDataComplete = users.filter(
         (data: { id: string | number[] }) => data.id === item.id,
      );

      const userDataStoreUpdate = {
         id: item.id,
         name: item.name ? item.name : myUserDataComplete[0].name,
         email: item.email ? item.email : myUserDataComplete[0].email,
         password: item.password
            ? item.password
            : myUserDataComplete[0].password,
      };

      const myUserData = {
         id: item.id,
         name: item.name ? item.name : myUserDataComplete[0].name,
         email: item.email ? item.email : myUserDataComplete[0].email,
      };

      const array = [...otherUsers, userDataStoreUpdate];

      await AsyncStorage.setItem('@myEvents:users', JSON.stringify(array));
      await AsyncStorage.setItem('@myEvents:user', JSON.stringify(myUserData));

      setData({ user: myUserData });
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user: data.user,
            loading,
            signIn,
            signOut,
            signUp,
            updateUser,
         }}>
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
