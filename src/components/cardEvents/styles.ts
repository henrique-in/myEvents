import { Platform, StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    width:'100%',
    marginVertical:10,
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor:colors.backgroundSecondary,
    ...Platform.select({
      android: {
         elevation: 3,
      },
      ios: {
         shadowColor: '#000',
         shadowOffset: {
            width: 0,
            height: 5,
         },
         shadowOpacity: 0.2,
         shadowRadius: 3.84,
      },
   }),
  },
  image:{
   height: 100,
   width: 120,
   borderRadius: 10,
},
date:{
   textTransform: 'uppercase',
   color: colors.pallete.red,
   fontWeight: 'bold',
},
title:{
   fontWeight: 'bold',
   color: colors.textH1,
   marginVertical: 5,
},
city:{ fontWeight: 'bold', color: colors.textH2 }


});