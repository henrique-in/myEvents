import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface Props {
   leftIcon?: any;
   title: string;
   subtitle?: string;
}

export const ListItem: React.FC<Props> = ({ leftIcon, title, subtitle }) => {
   return (
      <View style={styles.container}>
         <View style={styles.contentIcon}>{leftIcon}</View>
         <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
         </View>
      </View>
   );
};
