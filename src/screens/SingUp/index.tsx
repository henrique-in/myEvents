import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import {
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import { MaskService } from 'react-native-masked-text';
import { InputForm } from '~/components';
import { colors } from '~/theme/colors';
import { Feather, Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '~/hooks/auth';

const SignUpSchema = Yup.object().shape({
   name: Yup.string().required('Campo obrigatório'),
   email: Yup.string().email('Email inválido').required('Campo obrigatório'),
   password: Yup.string()
      .min(8, 'Minimo de 8 caracteres')
      .required('Campo obrigatório'),
});

interface SignUpFormValues {
   name: string;
   email: string;
   password: string;
}

export const SignUp: React.FC = () => {
   const navigation = useNavigation();
   const { signUp } = useAuth();
   const [securityInput, setSecurityInput] = useState(true);
   const [loading, setLoading] = useState(false);

   const initialValues: SignUpFormValues = {
      name: '',
      email: '',
      password: '',
   };

   const {
      handleChange,
      handleSubmit,
      values,
      errors,
      isValid,
   }: FormikProps<any> = useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      validateOnMount: true,
      onSubmit: values =>
         new Promise(async () => {
            setLoading(true);
            setTimeout(() => {
               signUp(values);
               setLoading(false);
            }, 1500);
         }),
   });
   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableOpacity
               activeOpacity={0.8}
               onPress={() => navigation.goBack()}>
               <Entypo name="chevron-small-left" size={40} color="black" />
            </TouchableOpacity>

            <View
               style={{
                  height: '60%',
                  paddingTop: 70,
               }}>
               <View style={{ marginVertical: 40 }}>
                  <InputForm
                     label="Nome"
                     placeholder="Fulano da Silva"
                     error={errors.name}
                     onChangeText={handleChange('name')}
                  />
                  <InputForm
                     label="Email"
                     placeholder="example@example.com"
                     error={errors.email}
                     onChangeText={handleChange('email')}
                  />
                  <InputForm
                     rightIcon={
                        <Feather
                           name={securityInput ? 'eye-off' : 'eye'}
                           size={24}
                           color="black"
                           onPress={() => setSecurityInput(!securityInput)}
                        />
                     }
                     label="Senha"
                     placeholder="********"
                     onChangeText={handleChange('password')}
                     error={errors.password}
                     secureTextEntry={securityInput}
                  />
               </View>
            </View>
            <Button
               activeOpacity={0.7}
               title={'Cadastrar'}
               titleStyle={{ fontWeight: 'bold' }}
               loading={loading}
               buttonStyle={{
                  borderRadius: 10,
                  height: 60,
                  backgroundColor: colors.primary,
               }}
               onPress={() => handleSubmit()}
            />
         </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
   );
};
