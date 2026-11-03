import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AcademicLevel,
  ScienceSubject,
  Lesson,
  LiveClass,
  TestQuiz,
  TeacherVerificationRequest,
  SubscriptionRecord,
  MobileMoneyTransaction,
  QAThread,
  QuizSubmission,
  SubscriptionTier,
  SubscriptionPeriod,
  User,
  TextbookResource,
  StudentWorkSubmission,
  NotificationItem,
  UserActivityLog
} from '../types';
import {
  mockLessons,
  mockLiveClasses,
  mockQuizzes,
  mockTeacherRequests,
  mockSubscriptions,
  mockTransactions,
  mockQAThreads,
  mockUsers,
  mockTextbooks,
  mockStudentSubmissions,
  mockNotifications,
  mockUserLogs
} from '../data/mockData';

interface AppContextType {
  // View mode
  viewMode: 'landing' | 'app';
  enterPortalAsLevel: (level: AcademicLevel) => void;
  returnToLandingPage: () => void;

  // Auth state
  isAuthenticated: boolean;
  currentUser: User | null;
  userLogs: UserActivityLog[];

  // App UI state
  currentRole: UserRole;
  isDataSaverMode: boolean;
  theme: 'dark' | 'light';
  activeLevel: AcademicLevel;
  activeSubject: ScienceSubject | 'All';
  activeLesson: Lesson | null;
  activeLiveClass: LiveClass | null;
  activeQuiz: TestQuiz | null;
  activeTab: string;

  // Collections
  lessons: Lesson[];
  liveClasses: LiveClass[];
  quizzes: TestQuiz[];
  teacherRequests: TeacherVerificationRequest[];
  subscriptions: SubscriptionRecord[];
  transactions: MobileMoneyTransaction[];
  qaThreads: QAThread[];
  quizSubmissions: QuizSubmission[];
  userSubscribedSubjects: ScienceSubject[];
  resources: TextbookResource[];
  studentSubmissions: StudentWorkSubmission[];
  notifications: NotificationItem[];

  // Payment Modal state
  isPaymentModalOpen: boolean;
  pendingSubscriptionInfo: {
    subjects: ScienceSubject[];
    level: AcademicLevel;
    tier: SubscriptionTier;
    period: SubscriptionPeriod;
    amountUGX: number;
  } | null;

  // Auth & Profile Actions
  login: (email: string, role: UserRole) => void;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;

  // UI Actions
  setRole: (role: UserRole) => void;
  toggleDataSaver: () => void;
  toggleTheme: () => void;
  setActiveLevel: (level: AcademicLevel) => void;
  setActiveSubject: (subj: ScienceSubject | 'All') => void;
  setActiveLesson: (lesson: Lesson | null) => void;
  setActiveLiveClass: (liveClass: LiveClass | null) => void;
  setActiveQuiz: (quiz: TestQuiz | null) => void;
  setActiveTab: (tab: string) => void;

  // Feature Actions
  openPaymentModal: (
    subjects: ScienceSubject[],
    level: AcademicLevel,
    tier: SubscriptionTier,
    period: SubscriptionPeriod,
    amountUGX: number
  ) => void;
  closePaymentModal: () => void;
  completePayment: (provider: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Card', phone: string) => void;

  submitQuiz: (quizId: string, answers: Record<string, number>) => QuizSubmission;
  gradeStudentSubmission: (id: string, scorePercent: number, feedback: string, correctionAnswerUrl: string) => void;
  addResource: (resource: TextbookResource) => void;
  activateLiveClass: (liveClassId: string) => void;
  markNotificationRead: (notifId: string) => void;
  approveTeacherRequest: (requestId: string) => void;
  rejectTeacherRequest: (requestId: string) => void;
  submitTeacherVerification: (data: Partial<TeacherVerificationRequest>) => void;
  postQuestion: (subject: ScienceSubject, level: AcademicLevel, questionText: string) => void;
  answerQuestion: (qaId: string, answerText: string) => void;
  createLesson: (lesson: Omit<Lesson, 'id' | 'viewsCount'>) => void;
  scheduleLiveClass: (liveClass: Omit<LiveClass, 'id' | 'isLive' | 'participantsCount' | 'chatMessages' | 'polls'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View mode defaults to landing page!
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [userLogs, setUserLogs] = useState<UserActivityLog[]>(mockUserLogs);

  // App UI state
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [isDataSaverMode, setIsDataSaverMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeLevel, setActiveLevel] = useState<AcademicLevel>('O-Level');
  const [activeSubject, setActiveSubject] = useState<ScienceSubject | 'All'>('All');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(mockLessons[0]);
  const [activeLiveClass, setActiveLiveClass] = useState<LiveClass | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<TestQuiz | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Dynamic collections
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(mockLiveClasses);
  const [quizzes, setQuizzes] = useState<TestQuiz[]>(mockQuizzes);
  const [teacherRequests, setTeacherRequests] = useState<TeacherVerificationRequest[]>(mockTeacherRequests);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>(mockSubscriptions);
  const [transactions, setTransactions] = useState<MobileMoneyTransaction[]>(mockTransactions);
  const [qaThreads, setQaThreads] = useState<QAThread[]>(mockQAThreads);
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [resources, setResources] = useState<TextbookResource[]>(mockTextbooks);
  const [studentSubmissions, setStudentSubmissions] = useState<StudentWorkSubmission[]>(mockStudentSubmissions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingSubscriptionInfo, setPendingSubscriptionInfo] = useState<{
    subjects: ScienceSubject[];
    level: AcademicLevel;
    tier: SubscriptionTier;
    period: SubscriptionPeriod;
    amountUGX: number;
  } | null>(null);

  // Filter subscribed subjects by active level
  const userSubscribedSubjects: ScienceSubject[] = subscriptions
    .filter(s => s.status === 'active' && s.level === activeLevel)
    .flatMap(s => s.subjects);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const enterPortalAsLevel = (level: AcademicLevel) => {
    setActiveLevel(level);
    setViewMode('app');
    setActiveTab('dashboard');
  };

  const returnToLandingPage = () => {
    setViewMode('landing');
  };

  // Auth & Profile Actions
  const login = (email: string, role: UserRole) => {
    const user = mockUsers.find(u => u.email === email) || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      phone: '+256 770 000000',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };
    setCurrentUser(user);
    setCurrentRole(role);
    setIsAuthenticated(true);
    setViewMode('app');

    const newLog: UserActivityLog = {
      id: `log_${Date.now()}`,
      userId: user.id,
      action: `Logged in as ${role}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: `IP: 197.239.12.4 (Kampala, Uganda)`
    };
    setUserLogs([newLog, ...userLogs]);
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'New Student',
      email: userData.email || 'student@school.ug',
      role: 'student',
      academicLevel: userData.academicLevel || 'O-Level',
      phone: userData.phone || '+256 700 000000',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };
    setCurrentUser(newUser);
    setCurrentRole('student');
    setIsAuthenticated(true);
    if (userData.academicLevel) setActiveLevel(userData.academicLevel);
    setViewMode('app');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setViewMode('landing');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);

    const newLog: UserActivityLog = {
      id: `log_${Date.now()}`,
      userId: currentUser.id,
      action: 'Updated profile credentials & avatar',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setUserLogs([newLog, ...userLogs]);
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'student') setActiveTab('dashboard');
    else if (role === 'teacher') setActiveTab('teacher_studio');
    else if (role === 'parent') setActiveTab('parent_monitor');
    else if (role === 'admin') setActiveTab('admin_hub');
  };

  const toggleDataSaver = () => setIsDataSaverMode(prev => !prev);
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const openPaymentModal = (
    subjects: ScienceSubject[],
    level: AcademicLevel,
    tier: SubscriptionTier,
    period: SubscriptionPeriod,
    amountUGX: number
  ) => {
    setPendingSubscriptionInfo({ subjects, level, tier, period, amountUGX });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPendingSubscriptionInfo(null);
  };

  const completePayment = (provider: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Card', phone: string) => {
    if (!pendingSubscriptionInfo) return;

    const newTx: MobileMoneyTransaction = {
      id: `tx_${Date.now()}`,
      phoneNumber: phone,
      provider,
      amountUGX: pendingSubscriptionInfo.amountUGX,
      description: `${pendingSubscriptionInfo.level} ${pendingSubscriptionInfo.subjects.join(', ')} Subscription`,
      referenceCode: `${provider.slice(0, 3).toUpperCase()}-UG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString(),
      status: 'successful'
    };

    const newSub: SubscriptionRecord = {
      id: `sub_${Date.now()}`,
      userId: currentUser?.id || 'usr_student_1',
      level: pendingSubscriptionInfo.level,
      tier: pendingSubscriptionInfo.tier,
      period: pendingSubscriptionInfo.period,
      subjects: pendingSubscriptionInfo.subjects,
      amountUGX: pendingSubscriptionInfo.amountUGX,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    };

    setTransactions([newTx, ...transactions]);
    setSubscriptions([newSub, ...subscriptions]);
    closePaymentModal();
  };

  const submitQuiz = (quizId: string, answers: Record<string, number>): QuizSubmission => {
    const targetQuiz = quizzes.find(q => q.id === quizId);
    if (!targetQuiz) throw new Error('Quiz not found');

    let correctCount = 0;
    targetQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / targetQuiz.questions.length) * 100);

    const submission: QuizSubmission = {
      id: `subm_${Date.now()}`,
      quizId,
      quizTitle: targetQuiz.title,
      studentId: currentUser?.id || 'usr_student_1',
      studentName: currentUser?.name || 'Brian Kato',
      scorePercent: percent,
      correctAnswers: correctCount,
      totalQuestions: targetQuiz.questions.length,
      completedAt: new Date().toLocaleString(),
      teacherFeedback: percent >= 80 ? 'Excellent UNEB performance standard!' : 'Good effort! Review topic notes and retry.'
    };

    setQuizSubmissions([submission, ...quizSubmissions]);
    return submission;
  };

  const gradeStudentSubmission = (id: string, scorePercent: number, feedback: string, correctionAnswerUrl: string) => {
    setStudentSubmissions(prev =>
      prev.map(s =>
        s.id === id
          ? {
              ...s,
              status: 'graded',
              scorePercent,
              teacherFeedback: feedback,
              correctionAnswerUrl,
              gradedByTeacherName: 'Dr. Mukasa Godfrey',
              gradedAt: new Date().toLocaleString()
            }
          : s
      )
    );

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: 'usr_student_1',
      title: `📝 Test Graded (${scorePercent}%)`,
      message: `Dr. Mukasa graded your submission and uploaded official correction PDF.`,
      timestamp: 'Just now',
      read: false,
      type: 'grade',
      linkTab: 'quizzes'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const addResource = (resource: TextbookResource) => {
    setResources([resource, ...resources]);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: 'usr_student_1',
      title: `📚 New Resource: ${resource.title}`,
      message: `${resource.authorTeacherName} published a new ${resource.level} ${resource.subject} textbook (${resource.isPaid ? `UGX ${resource.priceUGX.toLocaleString()}` : 'FREE'}).`,
      timestamp: 'Just now',
      read: false,
      type: 'resource',
      linkTab: 'resources'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const activateLiveClass = (liveClassId: string) => {
    setLiveClasses(prev =>
      prev.map(c => (c.id === liveClassId ? { ...c, isLive: true, isBroadcasting: true } : c))
    );

    const targetClass = liveClasses.find(c => c.id === liveClassId);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: 'usr_student_1',
      title: `📡 LIVE CLASS BROADCAST ACTIVE!`,
      message: `${targetClass?.teacherName || 'Teacher'} started live interactive session: "${targetClass?.title}".`,
      timestamp: 'Just now',
      read: false,
      type: 'live',
      linkTab: 'live'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => (n.id === notifId ? { ...n, read: true } : n)));
  };

  const approveTeacherRequest = (requestId: string) => {
    setTeacherRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'approved' } : r))
    );
  };

  const rejectTeacherRequest = (requestId: string) => {
    setTeacherRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    );
  };

  const submitTeacherVerification = (data: Partial<TeacherVerificationRequest>) => {
    const newReq: TeacherVerificationRequest = {
      id: `req_${Date.now()}`,
      teacherId: 'usr_teacher_3',
      teacherName: data.teacherName || 'New Science Teacher',
      email: data.email || 'teacher@school.ug',
      phone: data.phone || '+256 700 000000',
      academicDegree: data.academicDegree || 'BSc Education',
      teachingExperienceYears: data.teachingExperienceYears || 3,
      unebSpecialities: data.unebSpecialities || ['Physics'],
      nationalIdNumber: data.nationalIdNumber || 'CM0000000000',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      certificateUrl: '#certificate-uploaded.pdf'
    };
    setTeacherRequests([newReq, ...teacherRequests]);
  };

  const postQuestion = (subject: ScienceSubject, level: AcademicLevel, questionText: string) => {
    const newQA: QAThread = {
      id: `qa_${Date.now()}`,
      studentId: currentUser?.id || 'usr_student_1',
      studentName: currentUser?.name || 'Brian Kato',
      subject,
      level,
      question: questionText,
      postedAt: 'Just now',
      resolved: false
    };
    setQaThreads([newQA, ...qaThreads]);
  };

  const answerQuestion = (qaId: string, answerText: string) => {
    setQaThreads(prev =>
      prev.map(qa =>
        qa.id === qaId
          ? {
              ...qa,
              answer: answerText,
              teacherName: 'Dr. Mukasa Godfrey',
              answeredAt: 'Just now',
              resolved: true
            }
          : qa
      )
    );
  };

  const createLesson = (lessonData: Omit<Lesson, 'id' | 'viewsCount'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `les_${Date.now()}`,
      viewsCount: 1
    };
    setLessons([newLesson, ...lessons]);
  };

  const scheduleLiveClass = (
    classData: Omit<LiveClass, 'id' | 'isLive' | 'participantsCount' | 'chatMessages' | 'polls'>
  ) => {
    const newLive: LiveClass = {
      ...classData,
      id: `live_${Date.now()}`,
      isLive: false,
      participantsCount: 0,
      chatMessages: [],
      polls: []
    };
    setLiveClasses([newLive, ...liveClasses]);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        enterPortalAsLevel,
        returnToLandingPage,
        isAuthenticated,
        currentUser,
        userLogs,
        currentRole,
        isDataSaverMode,
        theme,
        activeLevel,
        activeSubject,
        activeLesson,
        activeLiveClass,
        activeQuiz,
        activeTab,
        lessons,
        liveClasses,
        quizzes,
        teacherRequests,
        subscriptions,
        transactions,
        qaThreads,
        quizSubmissions,
        userSubscribedSubjects,
        resources,
        studentSubmissions,
        notifications,
        isPaymentModalOpen,
        pendingSubscriptionInfo,
        login,
        signup,
        logout,
        updateUserProfile,
        setRole,
        toggleDataSaver,
        toggleTheme,
        setActiveLevel,
        setActiveSubject,
        setActiveLesson,
        setActiveLiveClass,
        setActiveQuiz,
        setActiveTab,
        openPaymentModal,
        closePaymentModal,
        completePayment,
        submitQuiz,
        gradeStudentSubmission,
        addResource,
        activateLiveClass,
        markNotificationRead,
        approveTeacherRequest,
        rejectTeacherRequest,
        submitTeacherVerification,
        postQuestion,
        answerQuestion,
        createLesson,
        scheduleLiveClass
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
