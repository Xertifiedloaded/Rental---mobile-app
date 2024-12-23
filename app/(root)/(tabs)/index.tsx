import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function HomePage() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
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
      </View>
      <Search/>
    </SafeAreaView>
  );
}
