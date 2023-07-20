import { ObjectId } from "mongodb";

interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
}

export type {Post};
