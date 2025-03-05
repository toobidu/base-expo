import { Text, View } from "react-native";
import OnboardingScreen from "./screens/OnboardingScreen";
export default function Index() {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {/* <Text style={{ color: "white" }}>Ngur hehe</Text> */}
      <OnboardingScreen></OnboardingScreen>
    </View>
  );
}


