import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { HeaderEvent, ModalOption } from '~/components';
import { useAuth } from '~/hooks/auth';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import moment from 'moment';
import { colors } from '~/theme/colors';
import { Button } from '@rneui/base';
import { useAppData } from '~/hooks/appData';

const barcode = require('~/components/img/barcode.png');
export const Ticket: React.FC = () => {
   const { user } = useAuth();
   const { unSubscribe } = useAppData();
   const navigation = useNavigation();
   const route = useRoute();
   const { params } = route.params;

   const [visibleModal, setVisibleModal] = useState(false);

   const handleRemoveSubscription = () => {
      setVisibleModal(false);
      unSubscribe(params, user.id);
      navigation.goBack();
   };

   return (
      <View style={styles.container}>
         <HeaderEvent title="Ticket" />
         <View style={styles.content}>
            <View style={styles.ticket}>
               <Text style={styles.ticketTitle}>{params.title}</Text>
               <View
                  style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     paddingVertical: 10,
                  }}>
                  <View>
                     <Text style={styles.title}>Data:</Text>
                     <Text style={styles.ticketDetails}>
                        {moment(params.startDate).format('DD MMM')} a{' '}
                        {moment(params.endDate).format('DD MMM')}
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.title}>Horário:</Text>
                     <Text style={styles.ticketDetails}>{params.time}</Text>
                  </View>
               </View>
               <Text style={styles.title}>Local</Text>
               <Text style={styles.ticketDetails}>{params.address}</Text>
               <Text style={styles.ticketDetails}>{params.city}</Text>

               <View style={{ alignSelf: 'center', marginVertical: 30 }}>
                  <Image source={barcode} style={{ width: 200, height: 70 }} />
               </View>
               <Button
                  title={'Cancelar inscrição'}
                  type="clear"
                  titleStyle={{ color: colors.errors }}
                  onPress={() => setVisibleModal(true)}
               />
               <View style={styles.ticketBorderLeft}>
                  <View style={styles.contentBorderLeft}>
                     <View style={styles.contentRadiusLeft} />
                  </View>
               </View>
               <View style={styles.ticketBorderRight}>
                  <View style={styles.contentBorderRight}>
                     <View style={styles.contentRadiusRight} />
                  </View>
               </View>
            </View>
         </View>
         <View style={styles.footer}>
            <View>
               <Text style={styles.title}>Nome</Text>
               <Text style={styles.subtitle}>{user.name}</Text>
               <Text style={styles.title}>Preço</Text>
               <Text style={styles.subtitle}>{params?.price}</Text>
            </View>
            <MaterialCommunityIcons
               name="qrcode-scan"
               size={70}
               color="black"
            />
         </View>
         <ModalOption
            title="Tem certeza que deseja cancelar o ingresso ?"
            isVisible={visibleModal}
            leftOption={() => handleRemoveSubscription()}
            rightOption={() => setVisibleModal(false)}
         />
      </View>
   );
};
