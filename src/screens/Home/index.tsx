import React, { useEffect, useState } from 'react';
import {
   ActivityIndicator,
   FlatList,
   ListRenderItemInfo,
   Platform,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useAuth } from '~/hooks/auth';
import { colors } from '~/theme/colors';

import { styles } from './styles';
import { EventProps, useAppData } from '~/hooks/appData';
import { color } from '@rneui/base';
import { CardEvents, Header } from '~/components';

export const Home: React.FC = () => {
   const { user } = useAuth();
   const { eventsData } = useAppData();
   const [data, setData] = useState<EventProps[]>();
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState('');

   const updateSearch = (search: React.SetStateAction<string>) => {
      setSearch(search);
   };

   const loadData = async () => {
      setTimeout(() => {
         setData(eventsData);
         setLoading(false);
      }, 1000);
   };

   const renderItem = ({ item, index }: ListRenderItemInfo<EventProps>) => {
      return <CardEvents item={item} />;
   };

   useEffect(() => {
      if (search) {
         const searchText = eventsData.filter(item => {
            return (
               item?.title.toLowerCase().indexOf(search) > -1 ||
               item?.title.indexOf(search) > -1
            );
         });
         setData(searchText);
      } else {
         loadData();
      }
   }, [search]);

   return (
      <View style={styles.container}>
         <Header title={`Olá, ${user.name}`} position={'left'} />
         <View style={styles.content}>
            <SearchBar
               containerStyle={styles.inputContent}
               inputContainerStyle={{
                  backgroundColor: colors.pallete.white,
               }}
               inputStyle={{ color: colors.textH1 }}
               placeholder="Pesquise aqui..."
               onChangeText={updateSearch}
               value={search}
            />

            {!loading && data?.length === 0 ? (
               <Text
                  style={{
                     color: colors.textH2,
                     fontSize: 16,
                     textAlign: 'center',
                  }}>
                  Nenhum item encontrado
               </Text>
            ) : (
               <Text style={styles.title}>Próximos Eventos</Text>
            )}
            {loading && (
               <ActivityIndicator size={'small'} color={colors.primary} />
            )}

            <FlatList
               data={data}
               keyExtractor={item => item.id}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ paddingBottom: 10 }}
               renderItem={renderItem}
            />
            {/* <TouchableOpacity onPress={() => signOut()}>
            <Text>Home</Text>
         </TouchableOpacity> */}
         </View>
      </View>
   );
};
