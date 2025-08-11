export interface ExercisePerformance {
  username: string; // Identifier for the user who created this performance
  name: string;
  repetitions: number;
  accuracyPercent: number;
  durationSeconds: number;
  date: string;
  speeds: number[];
}