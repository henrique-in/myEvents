import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { colors } from '~/theme/colors';

interface Props {
   isVisible: boolean;
   title: string;
   leftOption: () => void;
   rightOption: () => void;
}
export const ModalOption: React.FC<Props> = ({
   leftOption,
   title,
   rightOption,
   isVisible,
}) => {
   return (
      <Modal transparent={true} animationType={'fade'} visible={isVisible}>
         <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
               <View style={styles.modalInformation}>
                  <Text style={styles.title}>{title}</Text>
               </View>
               <View style={styles.footer}>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => leftOption()}>
                     <Text>Sim</Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => rightOption()}>
                     <Text>Não</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};
