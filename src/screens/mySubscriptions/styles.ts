import { StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background
  },
  content:{
    flex:1,
    paddingHorizontal:10
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
  },
  notFoundText:{
    textAlign:"center",
    color:colors.textH2,
    fontWeight:"900",
    fontSize:15,
    marginTop:20
  },
  notFoundView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 }
});