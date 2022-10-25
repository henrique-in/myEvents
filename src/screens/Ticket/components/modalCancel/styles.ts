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
    minHeight: '50%',
    maxHeight:'60%',
    width: '90%',
    borderRadius: 10,
    paddingVertical:10,
    paddingHorizontal:10,
 },
 divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.pallete.black,
 },
 modalInformation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 0,
 },
 title: {
    color: colors.textH1,
    fontWeight:"800",
    fontSize: 18,
    textAlign: 'center',
 } ,
 button: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
 },
 

});