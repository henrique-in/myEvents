import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { EventProps } from '~/hooks/appData';
import { colors } from '~/theme/colors';

import { styles } from './styles';
interface Props {
   item: EventProps;
}

export const CardEvents: React.FC<Props> = ({ item }) => {
   return (
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '30%', marginRight: 20 }}>
               <Image source={{ uri: item.image }} style={styles.image} />
            </View>

            <View style={{ width: '60%' }}>
               <Text style={styles.date}>
                  {moment(item.startDate).format('DD MMM')} {`>`}{' '}
                  {moment(item.endDate).format('DD MMM')}
               </Text>
               <Text style={styles.title}>{item.title}</Text>

               <Text style={styles.city}>{item.city}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
};
