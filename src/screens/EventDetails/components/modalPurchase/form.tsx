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
import { EventProps, useAppData } from '~/hooks/appData';
import { useAuth } from '~/hooks/auth';

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
   nextStep: () => void;
   onCancel: () => void;
}

export const FormPurchase: React.FC<Props> = ({ item, nextStep, onCancel }) => {
   const { user } = useAuth();
   const { handleSubscribe } = useAppData();
   const [loading, setLoading] = useState(false);
   const initialValues: PurchaseFormValues = {
      numberCard: '',
      name: '',
      cvc: '',
      validationYear: '',
      cpf: '',
   };

   const {
      handleChange,
      handleSubmit,
      values,
      errors,
      isValid,
   }: FormikProps<any> = useFormik({
      initialValues,
      validationSchema: purchaseSchema,
      validateOnMount: true,
      onSubmit: values =>
         new Promise(async () => {
            setLoading(true);
            handleSubscribe(item, user.id);
            setTimeout(() => {
               setLoading(false);
               nextStep();
            }, 1000);
         }),
   });
   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <KeyboardAvoidingView
            style={styles.modalBackground}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalContainer}>
               <Text style={styles.title}>
                  Preencha os campos abaixo para realizar a compra
               </Text>
               <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                  <View style={styles.modalInformation}>
                     <InputForm
                        label={'Nome completo'}
                        error={errors.name}
                        onChangeText={handleChange('name')}
                     />
                     <InputForm
                        label={'Numero do cartão'}
                        onChangeText={handleChange('numberCard')}
                        keyboardType="number-pad"
                        maxLength={19}
                        error={errors.numberCard}
                        value={MaskService.toMask(
                           'credit-card',
                           values.numberCard.replace(/[^0-9]/g, ''),
                        )}
                     />
                     <InputForm
                        label={'CPF'}
                        maxLength={14}
                        keyboardType="number-pad"
                        error={errors.cpf}
                        onChangeText={handleChange('cpf')}
                        value={MaskService.toMask(
                           'cpf',
                           values.cpf.replace(/[^0-9]/g, ''),
                        )}
                     />
                     <InputForm
                        label={'CVC'}
                        keyboardType="number-pad"
                        maxLength={3}
                        error={errors.cvc}
                        onChangeText={handleChange('cvc')}
                     />
                     <InputForm
                        label={'Data de expiração'}
                        maxLength={5}
                        placeholder={''}
                        keyboardType="number-pad"
                        error={errors.validationYear}
                        onChangeText={handleChange('validationYear')}
                        value={MaskService.toMask(
                           'custom',
                           values.validationYear.replace(/[^0-9]/g, ''),
                           {
                              mask: '99/99',
                           },
                        )}
                     />
                  </View>
               </ScrollView>
               <Button
                  activeOpacity={0.7}
                  title={`Efetuar compra`}
                  loading={loading}
                  buttonStyle={{
                     borderRadius: 5,
                     height: 50,
                     backgroundColor: colors.primary,
                  }}
                  onPress={() => handleSubmit()}
               />
               <Button
                  activeOpacity={0.7}
                  type="clear"
                  title={`cancelar`}
                  titleStyle={{ color: colors.errors }}
                  buttonStyle={{
                     borderRadius: 5,
                     height: 50,
                  }}
                  onPress={() => onCancel()}
               />
            </View>
         </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
   );
};
