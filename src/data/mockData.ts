import {
  Lesson,
  LiveClass,
  TestQuiz,
  TeacherVerificationRequest,
  ParentChildMetric,
  SubscriptionRecord,
  QAThread,
  User,
  MobileMoneyTransaction,
  TextbookResource,
  StudentWorkSubmission,
  NotificationItem,
  UserActivityLog
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr_student_1',
    name: 'Brian Kato',
    email: 'brian.kato@student.ug',
    role: 'student',
    academicLevel: 'O-Level',
    enrolledSubjectIds: ['Mathematics', 'Physics', 'Chemistry'],
    parentId: 'usr_parent_1',
    phone: '+256 772 123456',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_teacher_1',
    name: 'Dr. Mukasa Godfrey',
    email: 'g.mukasa@scienceclassroom.ug',
    role: 'teacher',
    isVerified: true,
    qualifications: 'MSc Physics (Makerere), B.Ed (Kyambogo)',
    specialtySubjects: ['Physics', 'Mathematics'],
    phone: '+256 701 987654',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_teacher_2',
    name: 'Ms. Sarah Akello',
    email: 's.akello@scienceclassroom.ug',
    role: 'teacher',
    isVerified: true,
    qualifications: 'BSc Chemistry & Biology (Makerere)',
    specialtySubjects: ['Chemistry', 'Biology'],
    phone: '+256 782 555444',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_parent_1',
    name: 'Mr. David Kato',
    email: 'david.kato@parent.ug',
    role: 'parent',
    phone: '+256 772 123456',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_admin_1',
    name: 'DBROFT Platform Admin',
    email: 'admin@scienceclassroom.ug',
    role: 'admin',
    phone: '+256 750 000111',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  }
];

export const mockTextbooks: TextbookResource[] = [
  {
    id: 'tb_01',
    title: 'UNEB O-Level Physics Complete Revision & Formula Guide',
    level: 'O-Level',
    subject: 'Physics',
    description: 'Comprehensive study notes, worked examples, and UNEB P535 past paper solution guides compiled by Dr. Mukasa.',
    authorTeacherName: 'Dr. Mukasa Godfrey',
    authorTeacherId: 'usr_teacher_1',
    isPaid: false,
    priceUGX: 0,
    coverImageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    fileUrl: '#download-free-physics-notes.pdf',
    downloadsCount: 1420
  },
  {
    id: 'tb_02',
    title: 'Advanced A-Level Pure Mathematics P425/1 Masterclass',
    level: 'A-Level',
    subject: 'Mathematics',
    description: 'Principal Mathematics calculus, integration by parts, vectors, and complex number masterclass textbook.',
    authorTeacherName: 'Dr. Mukasa Godfrey',
    authorTeacherId: 'usr_teacher_1',
    isPaid: true,
    priceUGX: 15000,
    coverImageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
    fileUrl: '#download-paid-pure-math-textbook.pdf',
    downloadsCount: 890
  },
  {
    id: 'tb_03',
    title: 'O-Level Chemistry Volumetric Titration & Organic Chemistry',
    level: 'O-Level',
    subject: 'Chemistry',
    description: 'Step-by-step practical titrations workbook, indicators, stoichiometry, and organic reaction mechanisms for UNEB P545.',
    authorTeacherName: 'Ms. Sarah Akello',
    authorTeacherId: 'usr_teacher_2',
    isPaid: true,
    priceUGX: 10000,
    coverImageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    fileUrl: '#download-paid-titration-workbook.pdf',
    downloadsCount: 650
  }
];

export const mockStudentSubmissions: StudentWorkSubmission[] = [
  {
    id: 'subm_01',
    testId: 'quiz_phy_01',
    testTitle: 'O-Level Physics Mechanics Assignment P535',
    subject: 'Physics',
    level: 'O-Level',
    studentId: 'usr_student_1',
    studentName: 'Brian Kato',
    submissionDate: '2026-09-14 04:30 PM',
    studentFileUrl: '#view-brian-physics-handwritten-workings.pdf',
    answersText: 'Q1: F = ma = 1000 * 2 = 2000N. Q2: Kinetic energy is scalar.',
    status: 'graded',
    scorePercent: 88,
    teacherFeedback: 'Excellent work Brian! Solid understanding of Newton\'s second law. See official correction sheet attached.',
    correctionAnswerUrl: '#download-official-physics-correction-answers.pdf',
    gradedByTeacherName: 'Dr. Mukasa Godfrey',
    gradedAt: '2026-09-14 06:15 PM'
  },
  {
    id: 'subm_02',
    testId: 'quiz_che_01',
    testTitle: 'O-Level Chemistry Titration Practical Assignment',
    subject: 'Chemistry',
    level: 'O-Level',
    studentId: 'usr_student_1',
    studentName: 'Brian Kato',
    submissionDate: '2026-09-15 09:10 AM',
    studentFileUrl: '#view-brian-chemistry-titration-workings.pdf',
    answersText: 'Titration average volume = 24.50 cm³.',
    status: 'pending'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'usr_student_1',
    title: '📡 Live Broadcast Started!',
    message: 'Dr. Mukasa Godfrey activated the O-Level Physics Mechanics Live Classroom session.',
    timestamp: '10 mins ago',
    read: false,
    type: 'live',
    linkTab: 'live'
  },
  {
    id: 'notif_02',
    userId: 'usr_student_1',
    title: '📝 Test Graded (88% - Grade A)',
    message: 'Dr. Mukasa graded your Physics Mechanics Assignment and uploaded official correction answers.',
    timestamp: '2 hours ago',
    read: false,
    type: 'grade',
    linkTab: 'quizzes'
  },
  {
    id: 'notif_03',
    userId: 'usr_student_1',
    title: '📚 New Textbook Published',
    message: 'Ms. Sarah Akello uploaded "O-Level Chemistry Titration Workbook".',
    timestamp: 'Yesterday',
    read: true,
    type: 'resource',
    linkTab: 'resources'
  }
];

export const mockUserLogs: UserActivityLog[] = [
  {
    id: 'log_1',
    userId: 'usr_student_1',
    action: 'Logged into platform',
    timestamp: 'Today at 09:15 AM',
    details: 'IP: 197.239.12.4 (Kampala, Uganda)'
  },
  {
    id: 'log_2',
    userId: 'usr_student_1',
    action: 'Completed Physics Mechanics Quiz',
    timestamp: 'Yesterday at 04:30 PM',
    details: 'Scored 88% (Grade A)'
  },
  {
    id: 'log_3',
    userId: 'usr_student_1',
    action: 'Renewed O-Level Science Subscriptions via MTN Mobile Money',
    timestamp: '2026-09-01',
    details: 'UGX 65,000 paid for Full Science Package'
  }
];

export const mockLessons: Lesson[] = [
  {
    id: 'les_phy_01',
    title: 'Newton\'s Laws of Motion & Momentum Applications',
    level: 'O-Level',
    subject: 'Physics',
    topic: 'Mechanics & Force',
    durationMinutes: 28,
    dataSizeMB: 45,
    lowDataAudioSizeMB: 8,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdfNotesUrl: '#download-pdf-mechanics-notes',
    summary: 'Comprehensive analysis of Newton\'s 1st, 2nd, and 3rd laws with real-world Ugandan transport examples for UNEB P535/1.',
    unebPaperReference: 'UNEB 2023 P535/1 Q4',
    teacherId: 'usr_teacher_1',
    teacherName: 'Dr. Mukasa Godfrey',
    teacherVerified: true,
    viewsCount: 1420
  },
  {
    id: 'les_mat_01',
    title: 'Quadratic Equations & Graphical Solution Methods',
    level: 'O-Level',
    subject: 'Mathematics',
    topic: 'Algebra & Functions',
    durationMinutes: 32,
    dataSizeMB: 50,
    lowDataAudioSizeMB: 9,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdfNotesUrl: '#download-pdf-quadratics-formula-sheet',
    summary: 'Master factoring, completing the square, quadratic formula derivation, and graph plotting techniques for UNEB P456/1.',
    unebPaperReference: 'UNEB 2022 P456/1 Section B',
    teacherId: 'usr_teacher_1',
    teacherName: 'Dr. Mukasa Godfrey',
    teacherVerified: true,
    viewsCount: 2180
  },
  {
    id: 'les_che_01',
    title: 'Acids, Bases & Titration Calculation Mastery',
    level: 'O-Level',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry & Stoichiometry',
    durationMinutes: 25,
    dataSizeMB: 38,
    lowDataAudioSizeMB: 6,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdfNotesUrl: '#download-pdf-titration-calculations',
    summary: 'Step-by-step practical volumetric analysis guide, indicator color changes, molarity equations, and percentage purity calculations.',
    unebPaperReference: 'UNEB 2023 P545/2 Practical Q1',
    teacherId: 'usr_teacher_2',
    teacherName: 'Ms. Sarah Akello',
    teacherVerified: true,
    viewsCount: 1890
  },
  {
    id: 'les_bio_01',
    title: 'Cell Division: Mitosis vs Meiosis Detailed Comparison',
    level: 'O-Level',
    subject: 'Biology',
    topic: 'Cell Biology & Genetics',
    durationMinutes: 22,
    dataSizeMB: 32,
    lowDataAudioSizeMB: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    pdfNotesUrl: '#download-pdf-mitosis-diagrams',
    summary: 'Detailed step-by-step analysis of cell cycles, chromosome pairing, gamete formation, and genetic variation in plants and humans.',
    unebPaperReference: 'UNEB 2021 P553/1 Q12',
    teacherId: 'usr_teacher_2',
    teacherName: 'Ms. Sarah Akello',
    teacherVerified: true,
    viewsCount: 3100
  },
  {
    id: 'les_phy_a01',
    title: 'Electromagnetic Induction & Faraday\'s Laws',
    level: 'A-Level',
    subject: 'Physics',
    topic: 'Electricity & Magnetism',
    durationMinutes: 40,
    dataSizeMB: 62,
    lowDataAudioSizeMB: 11,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    pdfNotesUrl: '#download-pdf-em-induction-alevel',
    summary: 'Advanced calculation of induced EMF, Lenz\'s Law direction vectors, AC generator physics, and transformer power loss factors for UNEB P510/2.',
    unebPaperReference: 'UNEB A-Level P510/2 Q6',
    teacherId: 'usr_teacher_1',
    teacherName: 'Dr. Mukasa Godfrey',
    teacherVerified: true,
    viewsCount: 950
  },
  {
    id: 'les_mat_a01',
    title: 'Calculus: Integration by Parts & Partial Fractions',
    level: 'A-Level',
    subject: 'Mathematics',
    topic: 'Pure Mathematics P425/1',
    durationMinutes: 45,
    dataSizeMB: 70,
    lowDataAudioSizeMB: 12,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    pdfNotesUrl: '#download-pdf-calculus-advanced-integration',
    summary: 'Mastering integral formulas, substitution techniques, partial fraction decomposition, and area under curves for Principal Mathematics A-Level.',
    unebPaperReference: 'UNEB A-Level P425/1 Q8',
    teacherId: 'usr_teacher_1',
    teacherName: 'Dr. Mukasa Godfrey',
    teacherVerified: true,
    viewsCount: 1240
  }
];

export const mockLiveClasses: LiveClass[] = [
  {
    id: 'live_phy_101',
    title: 'Live Q&A: Solving UNEB P535 Mechanics Revision Questions',
    level: 'O-Level',
    subject: 'Physics',
    topic: 'Mechanics, Work & Energy',
    scheduledTime: 'Today, 4:00 PM EAT',
    durationMinutes: 60,
    teacherName: 'Dr. Mukasa Godfrey',
    teacherVerified: true,
    isLive: true,
    isBroadcasting: true,
    participantsCount: 48,
    audioStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    whiteboardNotes: [
      'Formula: Kinetic Energy Ek = 1/2 * m * v^2',
      'Work Done = Force x Distance in direction of force',
      'Efficiency = (Useful Power Output / Total Power Input) x 100%'
    ],
    chatMessages: [
      {
        id: 'm1',
        senderName: 'Brian Kato',
        senderRole: 'student',
        text: 'Teacher, what happens to velocity when friction is doubled on an inclined plane?',
        timestamp: '4:12 PM',
        isQuestion: true,
        isAnswered: true
      },
      {
        id: 'm2',
        senderName: 'Dr. Mukasa Godfrey',
        senderRole: 'teacher',
        text: 'Great question Brian! The net accelerating force decreases, leading to lower acceleration according to F_net = ma.',
        timestamp: '4:14 PM'
      }
    ],
    polls: [
      {
        id: 'poll_1',
        question: 'What is the SI unit of Momentum?',
        options: [
          { id: 1, text: 'kg·m/s', votes: 34 },
          { id: 2, text: 'N·m', votes: 4 },
          { id: 3, text: 'Joules', votes: 6 },
          { id: 4, text: 'Watts', votes: 2 }
        ],
        active: true
      }
    ],
    participants: [
      { id: 'p1', name: 'Dr. Mukasa Godfrey (Host)', role: 'teacher', isMuted: false, handRaised: false },
      { id: 'p2', name: 'Brian Kato', role: 'student', isMuted: true, handRaised: true },
      { id: 'p3', name: 'Apophia Namuli', role: 'student', isMuted: true, handRaised: false },
      { id: 'p4', name: 'Emmanuel Okello', role: 'student', isMuted: true, handRaised: false }
    ]
  },
  {
    id: 'live_che_102',
    title: 'Upcoming: Organic Chemistry Functional Groups & Reactions',
    level: 'A-Level',
    subject: 'Chemistry',
    topic: 'Organic Synthesis',
    scheduledTime: 'Tomorrow, 5:30 PM EAT',
    durationMinutes: 75,
    teacherName: 'Ms. Sarah Akello',
    teacherVerified: true,
    isLive: false,
    participantsCount: 31,
    chatMessages: [],
    polls: []
  }
];

export const mockQuizzes: TestQuiz[] = [
  {
    id: 'quiz_phy_01',
    title: 'O-Level Physics: Mechanics & Friction Standard Quiz',
    level: 'O-Level',
    subject: 'Physics',
    topic: 'Mechanics',
    durationMinutes: 15,
    totalMarks: 20,
    createdDate: '2026-09-10',
    questions: [
      {
        id: 'q1',
        questionText: 'A car of mass 1000 kg accelerates uniformly from rest to 20 m/s in 10 seconds. What is the accelerating force?',
        options: ['1000 N', '2000 N', '500 N', '20,000 N'],
        correctOptionIndex: 1,
        explanation: 'Acceleration a = (v - u) / t = (20 - 0) / 10 = 2 m/s². Force F = m * a = 1000 kg * 2 m/s² = 2000 N.',
        unebYear: 'UNEB 2022 P535/1'
      },
      {
        id: 'q2',
        questionText: 'Which of the following is a scalar quantity?',
        options: ['Velocity', 'Momentum', 'Kinetic Energy', 'Weight'],
        correctOptionIndex: 2,
        explanation: 'Kinetic energy has magnitude only and no direction, making it a scalar quantity.',
        unebYear: 'UNEB 2021 P535/1'
      }
    ],
    writtenPrompts: [
      'Explain two advantages and two disadvantages of friction in motor transport on Ugandan roads.'
    ]
  }
];

export const mockTeacherRequests: TeacherVerificationRequest[] = [
  {
    id: 'req_01',
    teacherId: 'usr_teacher_3',
    teacherName: 'Mr. Emmanuel Okello',
    email: 'e.okello@school.edu.ug',
    phone: '+256 774 998877',
    academicDegree: 'Bachelor of Science with Education (Physics & Math), Kyambogo University',
    teachingExperienceYears: 7,
    unebSpecialities: ['Physics', 'Mathematics'],
    nationalIdNumber: 'CM840291039KLU',
    submittedAt: '2026-09-14',
    status: 'pending',
    certificateUrl: '#view-certificate-okello-kyambogo.pdf'
  }
];

export const mockParentMetric: ParentChildMetric = {
  studentId: 'usr_student_1',
  studentName: 'Brian Kato',
  level: 'O-Level',
  subscribedSubjects: ['Mathematics', 'Physics', 'Chemistry'],
  attendanceRate: 96,
  averageQuizScore: 86,
  completedLessons: 18,
  recentTest: 'Physics Mechanics Quiz (Scored 88% - Grade A)',
  lastActiveDate: 'Today at 3:45 PM',
  teacherNotes: [
    'Brian shows excellent grasp of Newton\'s laws of motion.',
    'Recommended extra practice on chemistry titration calculations.'
  ]
};

export const mockSubscriptions: SubscriptionRecord[] = [
  {
    id: 'sub_01',
    userId: 'usr_student_1',
    level: 'O-Level',
    tier: 'multi',
    period: 'monthly',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    amountUGX: 65000,
    startDate: '2026-09-01',
    expiryDate: '2026-10-01',
    status: 'active'
  }
];

export const mockTransactions: MobileMoneyTransaction[] = [
  {
    id: 'tx_mtn_99182',
    phoneNumber: '+256 772 123456',
    provider: 'MTN Mobile Money',
    amountUGX: 65000,
    description: 'O-Level 3 Subjects Monthly Subscription (Math, Physics, Chem)',
    referenceCode: 'MTN-UG-998124',
    timestamp: '2026-09-01 09:15 AM',
    status: 'successful'
  }
];

export const mockQAThreads: QAThread[] = [
  {
    id: 'qa_01',
    studentId: 'usr_student_1',
    studentName: 'Brian Kato',
    subject: 'Chemistry',
    level: 'O-Level',
    question: 'How do you determine the end-point color change when titrating Hydrochloric Acid against Sodium Carbonate using Methyl Orange indicator?',
    postedAt: 'Yesterday, 5:20 PM',
    answer: 'With Methyl Orange, the solution turns from yellow (alkaline) to an orange/pinkish-red endpoint when neutralization occurs with HCl.',
    teacherName: 'Ms. Sarah Akello',
    answeredAt: 'Yesterday, 6:15 PM',
    resolved: true
  }
];
