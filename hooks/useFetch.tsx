import { useState, useEffect } from "react";
import axios from "axios";
import { Post, UseCheckInsResult } from "@/type";
import { useNavigation } from '@react-navigation/native';

export const useFetchPosts = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ posts: Post[] }>(url);
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
  }, [url]);

  return { loading, error, posts };
};







 
const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigation = useNavigation(); 

  const handleSignup = async (payload: { name: string; email: string; password: string; confirmPassword: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://daily-check-in.com.ng/api/post/postsignup', payload);

      if (response.status === 200) {
        setSuccess(true);
        navigation.navigate('login'); 
      }
    } catch (err: any) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, handleSignup };
};

export default useSignup;
