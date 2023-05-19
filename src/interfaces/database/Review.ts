export interface Review {
  _id: string;
  rating: number;
  review: string;
  userMetadata: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  movieMetadata: {
    tmdbId: string;
    title: string;
    releaseDate: Date;
    image: string;
    genres: string[];
  };
  createdAt: Date;
}

export interface RegisteringReview {
  rating: number;
  review: string;
  userMetadata: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  movieMetadata: {
    tmdbId: string;
    title: string;
    releaseDate: Date;
    image: string;
    genres: string[];
  };
}
