interface Category {
  id: number;
  name: string;
}

interface Image {
  id: number;
  url: string;
  postId: number;
}

interface PostsProps {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  category: Category;
  images: Image[];
  price: number;
  location: string;
  grade: number;
}

export { PostsProps };
