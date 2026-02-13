export interface BlogPost {
  id: string;
  date: string;
  title: string;
  content: string;
  tone: string;
  status: 'Published' | 'Draft' | 'Generating';
  tags?: string[];
  readingTime?: string;
  wordCount?: number;
}

export type Tone = 'Professional' | 'Friendly' | 'Humorous' | 'Academic';

export const AVAILABLE_TONES: Tone[] = ['Professional', 'Friendly', 'Humorous', 'Academic'];
