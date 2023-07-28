export interface iTodoItem {
  id: number;

  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;
}
