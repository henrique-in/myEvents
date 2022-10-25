import { StyleSheet } from "react-native";
import { colors } from "~/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background
  },
  content:{
    height:'70%',
    backgroundColor:colors.primary,
    alignItems:'center',
    justifyContent:'center'
   
  },
  ticket:{
    backgroundColor:colors.backgroundSecondary,
    borderBottomRightRadius: 40,
    paddingVertical:20,
    paddingHorizontal:20,
    height:'80%',
    width:'90%',
  },
  ticketTitle:{
    fontSize:20,
    color:colors.textH1,
    fontWeight:"bold",
    marginBottom:5
  },
  ticketDetails:{
    fontSize:18,
    color:colors.textH1,
    fontWeight:"400",
    marginBottom:5
  },
  footer:{
    height:'18%',
    backgroundColor:colors.backgroundSecondary,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'

  },
  title:{
    fontSize:16,
    color:colors.textH2,
    fontWeight:"500",
    marginBottom:5
  },
  subtitle:{
    fontSize:16,
    color:colors.textH1,
    fontWeight:'400',
    marginBottom:10
  },
  textFooter:{
    fontSize:16,
  },
  ticketBorderLeft:{
    position: 'absolute', 
    bottom: 0, 
    left: 0 
  },
  contentBorderLeft:{
    width: 80,
    height: 65,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
 },
 contentRadiusLeft:{
  backgroundColor: colors.primary,
  marginTop: 25,
  marginEnd: 30,
  height: 50,
  width: 50,
  alignSelf: 'center',
  borderTopRightRadius: 50,
},
ticketBorderRight:{
   position: 'absolute',
    bottom: -1, 
    right: -1 
},
contentBorderRight:{
    width: 80,
    height: 65,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
},
contentRadiusRight:{
  backgroundColor: colors.primary,
  height: 50,
  width: 50,
  borderTopLeftRadius: 50,
},

});