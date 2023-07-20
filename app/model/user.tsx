import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  username: string;
  password: string;
}

export type { User };
