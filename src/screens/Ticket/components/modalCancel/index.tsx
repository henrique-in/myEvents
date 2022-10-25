import React, { useState } from 'react';
import { Modal, View } from 'react-native';

import { styles } from './styles';

import { EventProps } from '~/hooks/appData';

interface Props {
   item: EventProps;
   isVisible: boolean;
   onClose: (item: boolean) => void;
}
export const ModalCancel: React.FC<Props> = ({ item, isVisible, onClose }) => {
   return (
      <Modal transparent={true} animationType={'fade'} visible={isVisible}>
         <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
               <View style={styles.modalInformation}></View>
            </View>
         </View>
      </Modal>
   );
};
