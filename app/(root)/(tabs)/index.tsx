import CardComponent from "@/components/card";
import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function HomePage() {
  const [isUserActive, setIsUserActive] = useState(false);
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-5">
          {isUserActive ? (
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="w-10 h-10 rounded-full"
                  resizeMode="cover"
                />
                <View className="flex flex-col items-start ml-3">
                  <Text className="text-xs text-gray-500 font-rubik">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-gray-900">
                    Olaitan
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Image
                  source={icons.bell}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex items-center justify-center mt-5">
              <Text className="text-lg text-gray-900 font-rubik">
                Please Log In or Sign Up
              </Text>
              <View className="flex-row mt-3">
                <TouchableOpacity className="bg-primary-300 py-2 px-5 rounded-full">
                  <Link href="/login">
                    <Text className="text-white font-rubik">Login</Text>
                  </Link>
                </TouchableOpacity>
                <TouchableOpacity className="ml-3 bg-gray-200 py-2 px-5 rounded-full">
                  <Link href="/register">
                    <Text className="text-gray-900 font-rubik">Sign Up</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      
        <Search />
        <CardComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
