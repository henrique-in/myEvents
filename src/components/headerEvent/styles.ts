import { Platform, StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container:{
    height: '12%',
    width:'100%',
    backgroundColor: colors.primary,
    paddingTop:30,
    paddingHorizontal:10,
    justifyContent:'flex-end'
 
 
 },
 content:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
 }
 ,
  title:{
   fontSize:18,
   color:colors.pallete.white,
   
  },

});