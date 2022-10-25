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
import { InputForm } from '~/components';
import { colors } from '~/theme/colors';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '~/hooks/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsAuth } from '~/router/types';

type SignInScreenProp = StackNavigationProp<RootStackParamsAuth, 'SignIn'>;

const SignInSchema = Yup.object().shape({
   email: Yup.string().email('Email inválido').required(''),
   password: Yup.string().min(8, 'Minimo de 8 caracteres').required(''),
});

interface SignInFormValues {
   email: string;
   password: string;
}

export const SignIn: React.FC = () => {
   const navigation = useNavigation<SignInScreenProp>();
   const { signIn } = useAuth();
   const [securityInput, setSecurityInput] = useState(true);
   const [loading, setLoading] = useState(false);

   const initialValues: SignInFormValues = {
      email: 'henrique@email.com',
      password: '12345678',
   };

   const {
      handleChange,
      handleSubmit,
      values,
      errors,
      isValid,
   }: FormikProps<any> = useFormik({
      initialValues,
      validationSchema: SignInSchema,
      validateOnMount: true,
      onSubmit: values =>
         new Promise(async () => {
            setLoading(true);
            signIn(values)
               .then()
               .catch(err => setLoading(false));
         }),
   });

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Text style={styles.title}>Olá, {'\n'}Seja bem-vindo</Text>
            <View
               style={{
                  height: '60%',
                  paddingTop: 70,
               }}>
               <View style={{ marginVertical: 40 }}>
                  <InputForm
                     label="Email"
                     error={errors.email}
                     maxLength={13}
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
                     placeholder=""
                     onChangeText={handleChange('password')}
                     error={errors.password}
                     secureTextEntry={securityInput}
                  />
               </View>
            </View>
            <Button
               activeOpacity={0.7}
               title={'Entrar'}
               titleStyle={{ fontWeight: 'bold' }}
               loading={loading}
               buttonStyle={{
                  borderRadius: 10,
                  height: 60,
                  backgroundColor: colors.primary,
               }}
               onPress={() => handleSubmit()}
            />

            <View style={styles.footer}>
               <Text style={styles.textFooter}>Não tem conta ? </Text>
               <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text
                     style={{
                        ...styles.textFooter,
                        fontWeight: 'bold',
                        color: colors.primary,
                     }}>
                     Cadastre-se
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
   );
};
