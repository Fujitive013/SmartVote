import { Dimensions, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const{ height, width } = Dimensions.get("window");

const onBoardingStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    opacityBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(245, 245, 245, 0.4)",
    },
    textWrapper: {
      marginTop: hp('18'),
      justifyContent: "center",
      alignItems: "center",
    },
    titleText: {
      color: "#111B56",
      fontSize: hp(7),
      textAlign: "center",
      fontFamily: "Montserrat-Bold",
    },
    subTitleText: {
      color: "#111B56",
      bottom: hp(1.5),
      fontSize: hp(2.2),
      textAlign: "center",
      fontFamily: "Montserrat-Medium",
    },
    buttonContainer:{
      backgroundColor: '#111B56D4',
      padding: hp(2),
      borderRadius: 20,
      width: wp('90'),
      height: hp('7'),
      alignSelf: 'center',
      marginTop: hp('55'),
    },
    buttonText:{
      color: '#FFF',
      fontFamily: "Montserrat-Medium",
      fontSize: hp(2),
      textAlign: 'center',
    },
    image: {
      flex: 1
    },
  });
  
module.exports = { onBoardingStyles };