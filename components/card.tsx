import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

interface Streak {
  currentStreak: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string | null;
  isVerified: boolean;
  isOwner: boolean;
  profilePicture: string;
  streaks: Streak[];
}

interface Post {
  id: string;
  imageUrl: string | null;
  date: string | null;
  content: string;
  visibility: string;
  createdAt: string;
  userId: string;
  likes: any[];
  comments: any[];
  user: User;
  likeCount: number;
  commentCount: number;
  currentStreak: number;
}

export default function CardComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ posts: Post[] }>(
          "https://daily-check-in.com.ng/api/post/all"
        );

        // console.log(response.data);
        if (response.data?.posts && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateContent = (content: string): string => {
    const length = 100;
    return content.length > length ? content.slice(0, length) + "..." : content;
  };

  const handleImagePress = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageOpen(true);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View className="flex-1 justify-center  items-center p-4">
        <Text className="text-gray-500">No posts available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className=" h-full bg-gray-100">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        {posts.map((post) => (
          <View key={post.id} className="bg-white p-4 mb-2">
            <View className="flex-row items-center mb-3">
              <TouchableOpacity className="flex-row items-center flex-1">
                <Image
                  source={{ uri: post?.user?.profilePicture }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-base font-semibold">
                      {post.user.name}
                    </Text>
                    {post.user.isVerified && (
                      <Text className="ml-1 text-blue-500">✓</Text>
                    )}
                  </View>
                  <Text className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
              <View className="bg-blue-50 px-2 py-1 rounded">
                <Text className="text-xs text-blue-500">
                  🔥 {post.currentStreak} days
                </Text>
              </View>
            </View>

            <Text className="text-base text-gray-700 mb-3">
              {post.content}
            </Text>

            {post.imageUrl && (
              <TouchableOpacity
                onPress={() => handleImagePress(post.imageUrl!)}
                className="mb-3"
              >
                <Image
                  source={{ uri: post.imageUrl }}
                  className="w-full h-64 rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

            <View className="flex-row items-center mt-2 pt-2 border-t border-gray-100">
              <TouchableOpacity className="flex-row items-center mr-4">
                <Text className="text-gray-500 text-sm">
                  ❤️ {post.likeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  💬 {post.commentCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={isImageOpen} animationType="fade" transparent>
        <View className="flex-1 justify-center items-center bg-black/90">
          <Image
            source={{ uri: selectedImageUrl }}
            className="w-full h-96"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => setIsImageOpen(false)}
            className="absolute flex items-center justify-center top-10 w-10 h-10 rounded-full right-5  bg-white"
          >
            <Text className="text-2xl font-bold">✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
