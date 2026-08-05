export interface TaskComment {
  commentId: number;
  content: string;
  userId: number;
  username: string;
  creationDate: string;
  lastUpdateDate: string;
  deleted: boolean;
  replies: TaskComment[];
}