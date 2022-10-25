import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '~/hooks/auth';
import { colors } from '~/theme/colors';
import { AuthRoutes } from './auth.routes';
import { PrivateRoutes } from './private.routes';

export default function Routes() {
   const { loading, user } = useAuth();
   if (loading) {
      <View
         style={{
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
         }}>
         <ActivityIndicator size="large" color={colors.pallete.white} />
      </View>;
   }
   return user ? <PrivateRoutes /> : <AuthRoutes />;
}
