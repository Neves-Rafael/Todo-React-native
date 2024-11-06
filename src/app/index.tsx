import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "../styles/global.css";
import { Home } from "./home";

export default function App() {
  return (
    <View className="flex-1 items-center bg-zinc-950">
      <Home />
      <StatusBar style="light" />
    </View>
  );
}
