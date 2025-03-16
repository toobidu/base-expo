// import React, {useState} from "react";
// import {StyleSheet, View} from "react-native";
// import SplashScreen from "./screens/SplashScreen";
// import {Redirect} from "expo-router";
//
// export default function Index() {
//     const [isLoading, setIsLoading] = useState(true);
//
//     const onSplashFinish = () => {
//         setIsLoading(false);
//     };
//
//     if (isLoading) {
//         return (
//             <View style={styles.container}>
//                 <SplashScreen onFinish={onSplashFinish}/>
//             </View>
//         );
//     }
//
//     return <Redirect href="/screens/OnboardingScreen"/>;
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#120E29",
//     },
// });

import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
    console.log("Redirecting to splash screen");
    return <Redirect href={"/screens/SplashScreen"} />;
}