import React from "react";
import HomeNav from "./navigators/AuthNavigator";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  return (
    <PaperProvider>
      <HomeNav />
    </PaperProvider>
  );
}
