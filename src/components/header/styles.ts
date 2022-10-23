import { Platform, StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({

  title:{
    fontSize:24,
    color:colors.pallete.white,
    fontWeight:"bold"
  },
 
  container:{
    height: 120,
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    paddingBottom:10,
    paddingHorizontal:10,
 },
 

});