export interface InstaResponse {
  success: boolean;
  profileLink: string;
  followerCount: number;
  followCount: number;
  postCount: number;
  username: string;
  isPrivate: boolean;
  isVerified: boolean;
  fullName: string;
  bio: string;
  id: string;
  avatar: string;
  posts: InstaPost[];
}

export interface InstaPost {
  id: string;
  text: string;
  shortcode: string;
  link: string;
  commentCount: number;
  timeStamp: number;
  likeCount: number;
  location: any;
  attachments: PostAttachments;
  isVideo: boolean;
}

export interface PostAttachments {
  link: string;
}
