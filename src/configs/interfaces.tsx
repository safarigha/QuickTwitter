//followUser.tsx:
export interface FollowUserData {
  username: string;
}
//login.tsx:
export interface FormDataLogin {
  username: string;
  password: string;
}
//signup.tsx:
export interface FormDataSignup {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  bio: string;
}
//tweet.tsx
//and TweetForm.tsx:
export interface AddTweetData {
  body: string;
  tags: string[];
}
//UserContext.tsx:
export interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}
//loginValidation.tsx:
export interface FormDataLoginValidation {
  username: string;
  password: string;
}
export interface FormErrorLoginValidation
  extends Partial<FormDataLoginValidation> {}
//signupValidation.tsx:
export type FormDataSignupValidation = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  bio: string;
};
export interface FormErrorSignupValidation
  extends Partial<FormDataSignupValidation> {}
//LeftSidebar.tsx:
export interface NavItemLeftSidebar {
  to: string;
  src: string;
  alt: string;
  text: string;
}
//LoginForm.tsx:
export interface FormDataLoginForm {
  username: string;
  password: string;
}
export interface FormErrorLoginForm {
  username?: string;
  password?: string;
}
//MainForm.tsx
//and RightSidebar.tsx
//and profileForm.tsx:
export interface TweetData {
  id: number;
  body: string;
  reply: [];
  comment: [];
  favorites: [];
  favcount: number;
  tags: [];
  createdAt: string;
  user: {
    username: string;
    id: number;
  };
}
//profileForm.tsx:
export interface UserProfileForm {
  id: number;
  username: string;
  biography: string;
}
