import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MessageCircle } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFetchPosts } from '@/hooks/useFetch';


const CheckInList = () => {
  const { id } = useLocalSearchParams(); 
  const navigation = useNavigation();

  const { loading, error, posts  } = useFetchPosts(`https://daily-check-in.com.ng/api/post/${id}`);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center"
        >
          <ArrowLeft color="gray" size={20} />
          <Text className="ml-2 text-gray-600 text-sm">Return to Dashboard</Text>
        </TouchableOpacity>
        <View className="mt-4">
          <Text className="text-2xl font-bold text-gray-900">CheckIn</Text>
          <Text className="text-sm text-gray-600">
            See what everyone's been up to today
          </Text>
        </View>
      </View>

      {posts.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <MessageCircle size={64} color="gray" />
          <Text className="mt-4 text-lg font-semibold text-gray-900">
            No Posts Yet
          </Text>
          <Text className="mt-2 text-gray-600">
            Be the first to share your progress!
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4 bg-white rounded-lg shadow p-4">
              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: item?.user?.profilePicture }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="ml-3">
                  <Text className="text-sm font-medium text-gray-800">
                    {item?.user?.name}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-700 mb-4">{item?.content}</Text>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default CheckInList;
