import { Platform, StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background
  },
  title:{
   fontSize: 25,
   fontWeight: '700',
   color: colors.textH1,
   paddingVertical: 10,
},
  content:{
    flex:1,
    paddingHorizontal:10,
  },

  inputContent:{
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  
    marginVertical: 10,
    borderRadius: 10,
    ...Platform.select({
       android: {
          elevation: 3,
       },
       ios: {
          shadowColor: '#000',
          shadowOffset: {
             width: 0,
             height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
       },
    }),
 }

});