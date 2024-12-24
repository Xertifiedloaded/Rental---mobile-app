import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import useSignup from "@/hooks/useFetch";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const { name, email, password, confirmPassword } = formData;

  const { isLoading, error, success, handleSignup } = useSignup();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const onSubmit = () => {
    const payload = {
      name,
      email,
      password,
      confirmPassword,
    };
    handleSignup(payload); 
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{  paddingHorizontal: 12 }} keyboardShouldPersistTaps="handled">
        <Image
          source={images.onboarding}
          className="w-full h-4/6 resizeMode='contain'"
        />
        <View>
          <Text className="text-base mt-2 text-center uppercase font-rubik text-black-200">
            Welcome to CheckIn
          </Text>
          <Text className="text-3xl text-center font-rubik-bold">
            Let's get closer to {"\n"}{" "}
            <Text className="text-primary-300">Your Daily Check-in</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Register to Stay Updated
          </Text>
          <View className="mt-5">
            <TextInput
              value={name}
              onChangeText={(value) => handleInputChange("name", value)}
              placeholder="Enter your name"
              className="border-b-2 border-gray-300 py-2 px-4 mb-4 rounded-md"
            />

            <TextInput
              value={email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              className="border-b-2 border-gray-300 py-2 px-4 mb-4 rounded-md"
            />

            <TextInput
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              placeholder="Enter your password"
              secureTextEntry
              className="border-b-2 border-gray-300 py-2 px-4 mb-4 rounded-md"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={(value) => handleInputChange("confirmPassword", value)}
              placeholder="Confirm your password"
              secureTextEntry
              className="border-b-2 border-gray-300 py-2 px-4 mb-4 rounded-md"
            />
          </View>

          {error && <Text className="text-red-500 text-center">{error}</Text>}
          {success && <Text className="text-green-500 text-center">Signup successful!</Text>}

          <TouchableOpacity
            className="bg-primary-300 shadow-md rounded-full w-full py-4 mt-5"
            onPress={onSubmit}
            disabled={isLoading}
          >
            <View className="flex flex-row justify-center items-center">
              {isLoading ? (
                <Text className="text-white font-rubik">Loading...</Text>
              ) : (
                <>
                  <Image
                    source={icons.google}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                  <Text className="font-rubik-medium text-white ml-2">
                    Continue with Google
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
