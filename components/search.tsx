import { View, Text, TextInput, Pressable, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useDebouncedCallback } from "use-debounce";
import { Search as SearchIcon, X } from "lucide-react-native";

const Search = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  
  const [search, setSearch] = useState(params.query || "");
  const [isFocused, setIsFocused] = useState(false);
  
  const debouncedSearch = useDebouncedCallback(
    (text: string) => {
      setSearch(text);
      console.log("Searching for:", text);
      router.setParams({ query: text });
    },
    500
  );

  const clearSearch = () => {
    setSearch("");
    router.setParams({ query: "" });
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <Pressable 
        className="flex-1" 
        onPress={Keyboard.dismiss}
      >
        <View className="px-4 pt-4">
          {/* Search Container */}
          <View 
            className={`
              flex-row items-center px-4 py-2 
              bg-white rounded-xl shadow-sm
              border ${isFocused ? 'border-blue-500' : 'border-gray-200'}
            `}
          >
            <SearchIcon 
              size={20} 
              className="text-gray-400"
              strokeWidth={2}
            />
            
            <TextInput
              value={search}
              onChangeText={(text) => debouncedSearch(text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search anything..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base text-gray-900"
              style={{
                paddingVertical: 8,
              }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="search"
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={Keyboard.dismiss}
            />
            
            {search.length > 0 && (
              <Pressable 
                onPress={clearSearch}
                className="p-2 rounded-full active:bg-gray-100"
              >
                <X size={18} className="text-gray-400" />
              </Pressable>
            )}
          </View>


          {search && (
            <View className="mt-6 px-1">
              <Text className="text-lg font-medium text-gray-900 mb-4">
                Results for "{search}"
              </Text>
              
              <View className="space-y-4">
                <View className="h-20 bg-white rounded-lg shadow-sm border border-gray-100" />
                <View className="h-20 bg-white rounded-lg shadow-sm border border-gray-100" />
                <View className="h-20 bg-white rounded-lg shadow-sm border border-gray-100" />
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Search;