import { StyleSheet, View } from "react-native";
import { Home } from "./screens";

export const App = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
