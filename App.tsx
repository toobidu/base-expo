import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Slot /> {/* Hiển thị nội dung từ app/index.tsx */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});