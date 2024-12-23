import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

export const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle = "",
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-200"
    >
      <View className="flex-row items-center">
        <Image source={icon} className="w-6 h-6 mr-4" />
        <Text className={`text-base ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Text className="text-gray-400 text-lg">&gt;</Text>}
    </TouchableOpacity>
  );
};

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        className="px-6"
      >
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-xl font-bold">Profile</Text>
          <Image source={icons.bell} className="w-5 h-5" />
        </View>

        <View className="flex items-center mt-5">
          <View className="relative">
            <Image source={images.avatar} className="w-28 h-28 rounded-full" />
            <TouchableOpacity className="absolute bottom-0 right-0">
              <Image source={icons.edit} className="w-6 h-6" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold mt-3">Makinde Olaitan</Text>
        </View>

        <View className="mt-10 space-y-4">
          <SettingsItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => console.log("Navigating to My Bookings")}
          />
          <SettingsItem
            icon={icons.wallet}
            title="Payments"
            onPress={() => console.log("Navigating to Payments")}
          />
        </View>

        <View className="mt-6 space-y-4">
          {settings.slice(2).map((item, idx) => (
            <SettingsItem
              key={idx}
              icon={item.icon}
              title={item.title}
              onPress={item.onPress}
              textStyle={item.textStyle}
              showArrow={item.showArrow}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
