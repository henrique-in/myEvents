import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, InputForm, ModalOption } from '~/components';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useAuth } from '~/hooks/auth';

import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@rneui/base';
import { colors } from '~/theme/colors';

const schema = Yup.object().shape({
   name: Yup.string(),
   email: Yup.string().email('Email inválido').nullable(),
   password: Yup.string().min(8, 'Minimo de 8 caracteres'),
});

interface FormValues {
   name: string;
   email: string;
   password: string;
}

export const Account: React.FC = () => {
   const { user, updateUser, signOut } = useAuth();
   const [securityInput, setSecurityInput] = useState(true);
   const [editable, setEditable] = useState(false);
   const [visible, setVisible] = useState(false);

   const initialValues: FormValues = {
      name: '',
      email: '',
      password: '',
   };

   const {
      handleChange,
      handleSubmit,
      resetForm,
      setValues,
      values,
      errors,
      isValid,
   }: FormikProps<any> = useFormik({
      initialValues,
      validationSchema: editable ? schema : null,
      validateOnMount: true,
      onSubmit: values =>
         new Promise(async () => {
            if (!values.name && !values.email && !values.password) {
               setEditable(false);
            } else {
               handleEditData(values);
            }
         }),
   });

   const handleEditable = () => {
      resetForm();
      setEditable(false);
   };

   const handleEditData = (item: FormValues) => {
      updateUser({ id: user.id, ...item });
      resetForm();
      setEditable(false);
   };

   const handleSignOut = () => {
      setVisible(false);
      signOut();
   };

   return (
      <View style={styles.container}>
         <Header title="Minha conta" />

         <View style={{ paddingVertical: 10, marginBottom: 20 }}>
            <InputForm
               label="Nome"
               editable={editable}
               placeholder={user.name}
               value={values.name}
               error={errors.name}
               onChangeText={handleChange('name')}
            />
            <InputForm
               label="Email"
               editable={editable}
               value={values.email}
               placeholder={user.email}
               error={errors.email}
               onChangeText={handleChange('email')}
            />
            <InputForm
               rightIcon={
                  <TouchableOpacity
                     onPress={() => setSecurityInput(!securityInput)}>
                     <Feather
                        name={securityInput ? 'eye-off' : 'eye'}
                        size={24}
                        color="black"
                     />
                  </TouchableOpacity>
               }
               editable={editable}
               label="Senha"
               placeholder="********"
               onChangeText={handleChange('password')}
               error={errors.password}
               value={values.password}
               secureTextEntry={securityInput}
            />
         </View>
         <View
            style={{
               flex: 1,
               paddingHorizontal: 10,
            }}>
            <Button
               title={editable ? 'Salvar' : 'Editar'}
               buttonStyle={{
                  backgroundColor: editable ? colors.primary : colors.primary,
                  borderRadius: 10,
                  height: 50,
               }}
               onPress={() => (editable ? handleSubmit() : setEditable(true))}
            />

            {editable && (
               <Button
                  title={'Cancelar'}
                  type="outline"
                  titleStyle={{ color: colors.errors }}
                  buttonStyle={{
                     borderColor: colors.errors,
                     marginTop: 10,
                     borderRadius: 10,
                  }}
                  onPress={() => handleEditable()}
               />
            )}

            {!editable && (
               <Button
                  title={'Sair'}
                  type="clear"
                  titleStyle={{ color: colors.errors }}
                  buttonStyle={{ marginTop: 10 }}
                  onPress={() => setVisible(true)}
               />
            )}
         </View>
         <ModalOption
            isVisible={visible}
            title="Tem certeza que deseja sair ?"
            leftOption={() => handleSignOut()}
            rightOption={() => setVisible(false)}
         />
      </View>
   );
};
