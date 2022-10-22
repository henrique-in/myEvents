import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '~/hooks/auth';

import { styles } from './styles';

export const Home: React.FC = () => {
   const { user } = useAuth();

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Olá, {user.name}</Text>

         {/* <TouchableOpacity onPress={() => signOut()}>
            <Text>Home</Text>
         </TouchableOpacity> */}
      </View>
   );
};
