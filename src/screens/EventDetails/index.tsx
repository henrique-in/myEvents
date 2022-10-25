import { useRoute } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { HeaderEvent, ListItem } from '~/components';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import moment from 'moment';
import { Button } from '@rneui/base';
import { colors } from '~/theme/colors';
import { ModalPurchase } from './components/modalPurchase';
import { useAppData } from '~/hooks/appData';

export const EventDetails: React.FC = () => {
   const { mySubscriptionData, eventsData } = useAppData();
   const route = useRoute();
   const { params } = route.params;
   const [modalVisible, setModalVisible] = useState(false);
   const [isRegistered, setIsRegistered] = useState(false);

   const handleOnClose = (buy: boolean) => {
      if (buy) {
         setIsRegistered(true);
      }
      setModalVisible(false);
   };

   useEffect(() => {
      const verify = mySubscriptionData.filter(
         (item: { id: any }) => item.id === params.id,
      );

      if (verify.length > 0) {
         setIsRegistered(true);
      }
   }, []);

   return (
      <View style={styles.container}>
         <HeaderEvent title="Voltar" />
         <ScrollView>
            <Image
               source={{ uri: params?.image }}
               style={{ width: '100%', height: 190 }}
            />
            <View style={styles.content}>
               <Text style={styles.title}>{params?.title}</Text>
               <ListItem
                  leftIcon={<Feather name="map-pin" size={24} color="black" />}
                  title={params.address}
                  subtitle={params.city}
               />
               <ListItem
                  leftIcon={<Feather name="clock" size={24} color="black" />}
                  title={`${moment(params.startDate).format(
                     'DD MMM',
                  )} - ${moment(params.endDate).format('DD MMM')}`}
                  subtitle={params.time}
               />
               <ListItem
                  leftIcon={
                     <MaterialIcons
                        name="attach-money"
                        size={24}
                        color="black"
                     />
                  }
                  title={params.price}
               />
            </View>

            <View style={{ ...styles.content, marginTop: 10 }}>
               <Text style={styles.title}>Descrição do evento</Text>
               <Text style={styles.description}>{params?.description}</Text>
            </View>
         </ScrollView>
         {!isRegistered && (
            <View style={styles.footer}>
               <Button
                  activeOpacity={0.7}
                  title={`Adquirir ingresso`}
                  buttonStyle={{
                     borderRadius: 5,
                     height: 50,
                     backgroundColor: colors.secondary,
                  }}
                  onPress={() => setModalVisible(true)}
               />
            </View>
         )}

         <ModalPurchase
            item={params}
            isVisible={modalVisible}
            onClose={(item: boolean) => handleOnClose(item)}
         />
      </View>
   );
};
