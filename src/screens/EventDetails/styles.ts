import { StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  content:{
    width:'100%',
    paddingHorizontal: 10 ,
    paddingVertical:10,
    backgroundColor:colors.background,
    
  },
  title:{
    fontSize:20,
    color:colors.textH1,
    fontWeight:'bold',
    
  },
  description:{
    color:colors.textH1,
    fontSize:15,
    paddingVertical:10,
    textAlign:"justify"
  },
  footer:{
    height: 80,
    backgroundColor: colors.background,

    justifyContent: 'center',
    paddingHorizontal: 10,
 }

});