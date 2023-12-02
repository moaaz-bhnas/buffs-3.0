export interface RegisteringDBUser {
  username: string;
  displayName: string;
  email: string;
  password: string;
  role: string;
}

export interface DBUser {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  following: string[];
  followers: string[];
}
