import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '~/theme/colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
   title: string;
}

export const HeaderEvent: React.FC<Props> = ({ title }) => {
   const navigation = useNavigation();
   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <TouchableOpacity
               style={{ flexDirection: 'row', alignItems: 'center' }}
               onPress={() => navigation.goBack()}>
               <Entypo
                  name="chevron-small-left"
                  size={40}
                  color={colors.pallete.white}
               />
               <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};
