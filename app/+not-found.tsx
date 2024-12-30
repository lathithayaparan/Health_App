import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! File is Not Found" }} />
      <View>
        <Link href="/">Go back to Home!</Link>
      </View>
    </>
  );
}
