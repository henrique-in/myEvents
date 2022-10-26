import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
interface Props {
   title: string;
   position?: 'left' | 'center' | 'right';
}
export const Header: React.FC<Props> = ({ title, position = 'center' }) => {
   return (
      <View style={styles.container}>
         <Text style={{ ...styles.title, textAlign: position }}>{title}</Text>
      </View>
   );
};
