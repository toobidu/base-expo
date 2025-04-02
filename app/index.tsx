import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
    console.log("Redirecting to splash screen");
    return <Redirect href={"/screens/Optional"} />;
}