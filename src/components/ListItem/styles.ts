import { Platform, StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container:{
    width:'100%',
    backgroundColor: colors.background,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:15,

 },
 content:{
    width:'70%',
 
 },
 contentIcon:{
  width:'15%',
  alignItems:"center",
  justifyContent:"center",
  
 },
  title:{
   fontSize:14,
   color:colors.textH1,
   fontWeight:"700",
   textTransform:'uppercase',
  },
  subtitle:{
    fontSize:15,
    color:colors.textH2,
    fontWeight:"700"
    
   },
});