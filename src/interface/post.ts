export interface IPost {
  _id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
