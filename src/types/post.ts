interface PostProps {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  images: [
    {
      url: string;
      postId: number;
      id: number;
    }
  ];
  grade: number;
  grades: [
    {
      id: number;
      userId: number;
      postId: number;
      grade: number;
      createdAt: string;
      updatedAt: string;
      user: {
        firstname: string;
        lastname: string;
        profilImage: string;
        isAdmin: boolean;
      };
    }
  ];
  comments: [
    {
      id: number;
      userId: number;
      postId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      user: {
        firstname: string;
        lastname: string;
        profilImage: string;
        isAdmin: boolean;
      };
    }
  ];
}

export { PostProps };
