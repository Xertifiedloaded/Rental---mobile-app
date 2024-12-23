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

const register = () => {
  const handleLogin = () => {};
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6 resizeMode='contain"
        />
        <View>
          <Text className="text-base mt-2 text-center uppercase font-rubik text-black-200">
            Welcome to RealState
          </Text>
          <Text className="text-3xl text-center font-rubik-bold">
            Let get closer to {"\n"}{" "}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login To Real Estate with Google
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleLogin}
          >
            <View className="flex flex-row justify-center items-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;
