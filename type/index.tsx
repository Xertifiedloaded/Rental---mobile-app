export interface Post {
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
  export interface Streak {
    currentStreak: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    username: string | null;
    isVerified: boolean;
    isOwner: boolean;
    profilePicture: string;
    streaks: Streak[];
  }

  export interface UseCheckInsResult {
    checkIns: Post[];
    loading: boolean;
    error: string | null;
  }