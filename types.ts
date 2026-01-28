
export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  MATHS = 'Maths'
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface BacklogItem {
  id: string;
  title: string;
  subject: Subject;
  priority: Priority;
  estimatedHours: number;
  completedPercentage: number;
  createdAt: number;
  isCompleted: boolean;
}

export interface FocusSession {
  id: string;
  startTime: number;
  durationSeconds: number;
  type: 'Work' | 'Break';
}

export interface UserProfile {
  name: string;
  streak: number;
  lastActive: number;
  targetExamYear: string;
}
