import React from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { CardEvents, Header } from '~/components';
import { EventProps, useAppData } from '~/hooks/appData';
import { RootStackParamsPrivate } from '~/router/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { colors } from '~/theme/colors';

type MySubscriptionsScreenProp = StackNavigationProp<
   RootStackParamsPrivate,
   'Home'
>;

export const MySubscriptions: React.FC = () => {
   const { mySubscriptionData } = useAppData();
   const navigation = useNavigation<MySubscriptionsScreenProp>();

   const renderItem = ({ item, index }: ListRenderItemInfo<EventProps>) => {
      return (
         <CardEvents
            item={item}
            onPress={() => navigation.navigate('Ticket', { params: item })}
         />
      );
   };

   const order = (a: EventProps, b: EventProps) => {
      return new Date(a.startDate) > new Date(b.startDate);
   };

   return (
      <View style={styles.container}>
         <Header title="Minhas inscrições" position="center" />
         <View style={styles.content}>
            {mySubscriptionData.length < 1 ? (
               <View style={styles.notFoundView}>
                  <Entypo name="emoji-sad" size={40} color={colors.textH2} />
                  <Text style={styles.notFoundText}>
                     Ops...você não possui eventos para ir
                  </Text>
               </View>
            ) : (
               <FlatList
                  data={mySubscriptionData.sort(order)}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 10 }}
                  renderItem={renderItem}
               />
            )}
         </View>
      </View>
   );
};
