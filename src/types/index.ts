export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export type AcademicLevel = 'O-Level' | 'A-Level';

export type ScienceSubject = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';

export type SubscriptionTier = 'single' | 'multi' | 'full_package';
export type SubscriptionPeriod = 'monthly' | 'term' | 'annual';

export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  // Student fields
  academicLevel?: AcademicLevel;
  enrolledSubjectIds?: ScienceSubject[];
  parentId?: string;
  // Teacher fields
  isVerified?: boolean;
  qualifications?: string;
  specialtySubjects?: ScienceSubject[];
  ninNumber?: string;
  createdDate?: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: AcademicLevel;
  subject: ScienceSubject;
  topic: string;
  durationMinutes: number;
  dataSizeMB: number;
  lowDataAudioSizeMB: number;
  videoUrl: string;
  audioUrl: string;
  pdfNotesUrl?: string;
  summary: string;
  unebPaperReference?: string;
  teacherId: string;
  teacherName: string;
  teacherVerified: boolean;
  viewsCount: number;
}

export interface LiveClass {
  id: string;
  title: string;
  level: AcademicLevel;
  subject: ScienceSubject;
  topic: string;
  scheduledTime: string;
  durationMinutes: number;
  teacherName: string;
  teacherVerified: boolean;
  isLive: boolean;
  isBroadcasting?: boolean;
  participantsCount: number;
  audioStreamUrl?: string;
  videoStreamUrl?: string;
  whiteboardNotes?: string[];
  chatMessages: ChatMessage[];
  polls: Poll[];
  participants?: { id: string; name: string; role: UserRole; isMuted: boolean; handRaised: boolean }[];
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isQuestion?: boolean;
  isAnswered?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: { id: number; text: string; votes: number }[];
  active: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  unebYear?: string;
}

export interface TestQuiz {
  id: string;
  title: string;
  level: AcademicLevel;
  subject: ScienceSubject;
  topic: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
  writtenPrompts?: string[];
  createdDate: string;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  quizTitle: string;
  studentId: string;
  studentName: string;
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  teacherFeedback?: string;
  status?: 'pending' | 'graded';
  correctionAnswerUrl?: string;
}

export interface StudentWorkSubmission {
  id: string;
  testId: string;
  testTitle: string;
  subject: ScienceSubject;
  level: AcademicLevel;
  studentId: string;
  studentName: string;
  submissionDate: string;
  studentFileUrl: string;
  answersText?: string;
  status: 'pending' | 'graded';
  scorePercent?: number;
  teacherFeedback?: string;
  correctionAnswerUrl?: string;
  gradedByTeacherName?: string;
  gradedAt?: string;
}

export interface TextbookResource {
  id: string;
  title: string;
  level: AcademicLevel;
  subject: ScienceSubject;
  description: string;
  authorTeacherName: string;
  authorTeacherId: string;
  isPaid: boolean;
  priceUGX: number;
  coverImageUrl: string;
  fileUrl: string;
  downloadsCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'live' | 'grade' | 'resource' | 'system';
  linkTab?: string;
}

export interface TeacherVerificationRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  email: string;
  phone: string;
  academicDegree: string;
  teachingExperienceYears: number;
  unebSpecialities: ScienceSubject[];
  nationalIdNumber: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  certificateUrl?: string;
}

export interface ParentChildMetric {
  studentId: string;
  studentName: string;
  level: AcademicLevel;
  subscribedSubjects: ScienceSubject[];
  attendanceRate: number;
  averageQuizScore: number;
  completedLessons: number;
  recentTest: string;
  lastActiveDate: string;
  teacherNotes: string[];
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  level: AcademicLevel;
  tier: SubscriptionTier;
  period: SubscriptionPeriod;
  subjects: ScienceSubject[];
  amountUGX: number;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
}

export interface MobileMoneyTransaction {
  id: string;
  phoneNumber: string;
  provider: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Card';
  amountUGX: number;
  description: string;
  referenceCode: string;
  timestamp: string;
  status: 'pending' | 'successful' | 'failed';
}

export interface QAThread {
  id: string;
  studentId: string;
  studentName: string;
  subject: ScienceSubject;
  level: AcademicLevel;
  question: string;
  postedAt: string;
  answer?: string;
  teacherName?: string;
  answeredAt?: string;
  resolved: boolean;
}
