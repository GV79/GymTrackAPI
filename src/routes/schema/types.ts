/* Types for routine object inserted to and read from database */

interface Exercise {
  name: string;
  reps: number;
  weight: number;
  units: 'lb' | 'kg' | 's' | 'reps';
  gif?: string;
}

interface DayRoutine {
  name?: string;
  exercises: Exercise[];
}

export interface RoutineObject {
  name: string;
  date: Date;
  description: string;
  token: string;
  userId: string;
  userEmail?: string;
  workouts: {
    monday: DayRoutine;
    tuesday: DayRoutine;
    wednesday: DayRoutine;
    thursday: DayRoutine;
    friday: DayRoutine;
    saturday: DayRoutine;
    sunday: DayRoutine;
  };
}
