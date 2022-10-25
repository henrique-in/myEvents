import { FormikProps, useFormik } from 'formik';
import React, { useState } from 'react';
import {
   Keyboard,
   KeyboardAvoidingView,
   Modal,
   Platform,
   ScrollView,
   Text,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import { MaskService } from 'react-native-masked-text';
import { InputForm } from '~/components';

import { styles } from './styles';

import * as Yup from 'yup';
import { Button } from '@rneui/base';
import { colors } from '~/theme/colors';
import { FormPurchase } from './form';
import { LoadingPurchase } from './loading';
import { EventProps } from '~/hooks/appData';

const purchaseSchema = Yup.object().shape({
   numberCard: Yup.string()
      .min(19, 'Numero do cartão incompleto')
      .required('Campo obrigatório'),
   name: Yup.string().required('Campo obrigatório'),
   cpf: Yup.string().min(14, 'CPF incompleto').required('Campo obrigatório'),
   validationYear: Yup.string()
      .min(5, 'Ano de validade incompleto')
      .required('Campo obrigatório'),
   cvc: Yup.string().min(3, 'CVC incompleto').required('Campo obrigatório'),
});

interface PurchaseFormValues {
   numberCard: string;
   name: string;
   cvc: string;
   validationYear: string;
   cpf: string;
}
interface Props {
   item: EventProps;
   isVisible: boolean;
   onClose: (item: boolean) => void;
}
export const ModalPurchase: React.FC<Props> = ({
   item,
   isVisible,
   onClose,
}) => {
   const [step, setStep] = useState(0);

   return (
      <Modal transparent={true} animationType={'fade'} visible={isVisible}>
         {step === 0 && (
            <FormPurchase
               item={item}
               nextStep={() => setStep(1)}
               onCancel={() => onClose(false)}
            />
         )}

         {step === 1 && (
            <LoadingPurchase handleClose={(item: boolean) => onClose(item)} />
         )}
      </Modal>
   );
};
