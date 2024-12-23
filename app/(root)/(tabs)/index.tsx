import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomePage() {
  return (
    <View
    
    >
      <Text className="text-red-400 text-3xl font-rubik my-10">welcome to Realestate</Text>
      <Link href="/register">Register</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Properties</Link>
    </View>
  );
}
