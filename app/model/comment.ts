interface CommentModel {
  _id: string;
  content: string;
  author: string;
  authorName: string;
  parent: string;
}

export type { CommentModel };
