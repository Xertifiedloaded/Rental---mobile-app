import { Clock, Image as ImageIcon, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";


interface DailyCheckInProps {
  userId: string | null;
}

const DailyCheckIn: React.FC<DailyCheckInProps> = ({ userId }) => {
  const [content, setContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<string>("PUBLIC");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <ScrollView contentContainerClassName="flex-1 p-4">
      <View className="bg-white rounded-lg shadow-md p-4 mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View className="p-2 bg-indigo-500 rounded-lg">
              <Clock size={24} color="white" />
            </View>
            <Text className="text-lg font-bold ml-2 text-gray-800">Daily Check-In</Text>
          </View>
          <Sparkles size={24} color="#FFD700" />
        </View>
        <Text className="text-center text-sm text-gray-600 mb-4">
          Share your daily progress and inspire others!
        </Text>

        <View className="mt-4">
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder={
              userId
                ? "What will you accomplish today? Share your steps, wins, big or small..."
                : "Please login to share your progress..."
            }
            editable={userId !== null}
            className="min-h-[150px] border border-gray-300 rounded-lg p-3 text-sm text-gray-800"
          />

          {imagePreview && (
            <View className="relative mt-4">
              <Image source={{ uri: imagePreview }} className="w-full h-[150px] rounded-lg object-cover" />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
                onPress={handleRemoveImage}
              >
                <ImageIcon size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}

          <View className="flex-row gap-4 mt-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-700">Visibility</Text>
              <TextInput
                value={visibility}
                onChangeText={setVisibility}
                className="border border-gray-300 rounded-lg p-3 text-sm text-gray-800"
                editable={userId !== null}
              />
              
            </View>

            <View className="flex-row items-center gap-4 mt-4">
              <TouchableOpacity
                onPress={() => document.getElementById("image-upload")?.click()}
                disabled={!userId}
                className="flex-row items-center bg-gray-100 rounded-lg py-2 px-4"
              >
                <ImageIcon size={20} color="black" />
                <Text className="ml-2 text-sm">Add Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!userId || !content.trim() || loading}
                className={`${
                  loading ? "bg-indigo-700" : "bg-indigo-500"
                } rounded-lg py-3 px-6 flex justify-center items-center`}
              >
                <Text className="text-white text-sm">
                  {loading ? "Loading" : "Share Progress"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-2 text-gray-700 mt-6">
        <Sparkles size={16} color="#FFD700" />
        <Text className="text-sm">
          Pro tip: Share specific achievements to inspire others!
        </Text>
      </View>
    </ScrollView>
  );
};

export default DailyCheckIn;
