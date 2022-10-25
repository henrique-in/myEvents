import { StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.pallete.blackOpacity,
 },
 modalContainer: {
    backgroundColor: colors.background,
    height: '20%',
    width: '80%',
    borderRadius: 10,
   

 },
 modalInformation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal:10,
    borderBottomWidth:0.5
 },
 title: {
    color: colors.textH1,
    fontWeight:"800",
    fontSize: 18,
    textAlign: 'center',
 } ,
 footer:{
   height: '30%',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-around',
},
 button:{
   width: '50%',
   height: '100%',
   alignItems: 'center',
   justifyContent: 'center',
},
divider:{
   height: '100%',
   width: 0.5,
   backgroundColor: colors.pallete.black,
}
 

});