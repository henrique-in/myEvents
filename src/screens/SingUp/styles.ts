import { StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    paddingHorizontal:15,
    backgroundColor:colors.background
  },
  title:{
    fontSize:30,
    color:colors.textH1,
    fontWeight:'bold',
    paddingTop:60,
  },
  footer:{
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
 },
  textFooter:{
    fontSize:16,
  }
});