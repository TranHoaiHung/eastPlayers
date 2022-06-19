
import {Dimensions }from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const cStyles = EStyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontInterBold: {
        fontFamily: "Inter-SemiBold"
    },
    fontInterRegular: {
        fontFamily: "Inter-Regular"
    },
    fontInterMedium: {
        fontFamily: "Inter-Medium"
    },
    fontInterBold_16: {
        fontFamily: "Inter-SemiBold",
        fontSize: "16rem",
    },
    fontInterBold_14: {
        fontFamily: "Inter-SemiBold",
        fontSize: "14rem",
    },
    fontInterBold_12: {
        fontFamily: "Inter-SemiBold",
        fontSize: "12rem",
    },
    fontInterRegular_16: {
        fontFamily: "Inter-Regular",
        fontSize: "16rem",
    },
    fontInterRegular_14: {
        fontFamily: "Inter-Regular",
        fontSize: "14rem",
    },
    fontInterRegular_12: {
        fontFamily: "Inter-Regular",
        fontSize: "12rem",
    },
    fontInterMedium_16: {
        fontFamily: "Inter-Medium",
        fontSize: "16rem",
    },
    fontInterMedium_14: {
        fontFamily: "Inter-Medium",
        fontSize: "14rem",
    },
    fontInterMedium_12: {
        fontFamily: "Inter-Medium",
        fontSize: "12rem",
    },
    size1 : "1rem",
    size3 : "3rem",
    size9 : "9rem",
    size11 : "11rem",
    size14 : "14rem",
    size20 : "20rem",
    size21 : "21rem",
    size24 : "24rem",
})

export default cStyles ;