export interface LocalizedText {
  en: string;
  fr: string;
  ar: string;
}

export interface CourseModule {
  title: LocalizedText;
  duration: string;
}

export interface Course {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  level: LocalizedText;
  format: LocalizedText;
  duration: LocalizedText;
  price: string;
  teacherId: string;
  nextSession: LocalizedText;
  outcomes: LocalizedText[];
  modules: CourseModule[];
}

export interface TutorAvailability {
  dayKey: string;
  slots: string[];
}

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  avatar: string;
  title: LocalizedText;
  bio: LocalizedText;
  experience: LocalizedText;
  subjects: LocalizedText[];
  languages: string[];
  price: string;
  nextSlot: LocalizedText;
  availability: TutorAvailability[];
}
