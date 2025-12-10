import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello</Text>
      
         <Link href="/about">Go to about</Link>
         <Link href="/(drawer)">Open Admin Drawer</Link>
         <Link href="/(tab)">Open Tabs Layout</Link>
    </View>
  );
}
