import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '~/theme/colors';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import { Button } from '@rneui/base';

interface Props {
   handleClose: (item: boolean) => void;
}

export const LoadingPurchase: React.FC<Props> = ({ handleClose }) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 2000);
   }, []);

   return (
      <View style={styles.modalBackground}>
         <View style={styles.modalContainer}>
            <View style={styles.modalInformation}>
               {isLoading ? (
                  <ActivityIndicator size={'large'} color={colors.secondary} />
               ) : (
                  <View
                     style={{
                        flex: 1,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                     }}>
                     <Text style={styles.title}>
                        Compra Efetuada com sucesso
                     </Text>
                     <AntDesign
                        name="checkcircle"
                        size={140}
                        color={colors.primary}
                     />
                     <Button
                        activeOpacity={0.7}
                        type="clear"
                        title={`Fechar`}
                        titleStyle={{
                           color: colors.primary,
                           fontWeight: 'bold',
                        }}
                        buttonStyle={{
                           borderRadius: 5,
                           height: 50,
                        }}
                        onPress={() => handleClose(true)}
                     />
                  </View>
               )}
            </View>
         </View>
      </View>
   );
};
