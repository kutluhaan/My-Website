export const education = {
  school: 'Sabancı University',
  degree: 'B.Sc. Computer Science and Engineering',
  place: 'Istanbul, Türkiye',
  period: '2020 — 2025',
  graduated: 'Graduated June 2025',
  facts: ['128 national credits', 'English-medium programme', 'Honor certificate, Fall 2021'],
  coursework: [
    {
      area: 'Programming & algorithms',
      courses: [
        'Introduction to Computing (CS 201)',
        'Advanced Programming (CS 204)',
        'Data Structures (CS 300)',
        'Algorithms (CS 301)',
        'Formal Languages and Automata Theory (CS 302)',
      ],
    },
    {
      area: 'AI & data',
      courses: [
        'Introduction to Data Science (CS 210)',
        'Machine Learning (CS 412)',
        'Artificial Intelligence (CS 404)',
        'Network Science (CS 414)',
        'Statistical Modelling (MATH 306)',
      ],
    },
    {
      area: 'Systems & software',
      courses: [
        'Database Systems (CS 306)',
        'Software Engineering (CS 308)',
        'Cloud Computing (CS 436)',
        'Mobile Application Development (CS 310)',
        'Logic and Digital System Design (CS 303)',
        'Human Computer Interaction (CS 449)',
      ],
    },
    {
      area: 'Mathematics',
      courses: [
        'Calculus I–II',
        'Linear Algebra (MATH 201)',
        'Introduction to Probability (MATH 203)',
        'Discrete Mathematics (MATH 204)',
        'Differential Equations (MATH 202)',
      ],
    },
    {
      area: 'Projects',
      courses: [
        'Undergraduate Project (PROJ 201)',
        'Internship Project (CS 395)',
        'Graduation Project Design and Implementation (ENS 491 / ENS 492)',
      ],
    },
  ],
};

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  note?: string;
  href?: string;
}

/** Certificates of Competency, NVIDIA Deep Learning Institute */
export const nvidiaCertificates: Certificate[] = [
  {
    title: 'Building Transformer-Based Natural Language Processing Applications',
    issuer: 'NVIDIA DLI',
    date: 'Mar 2024',
  },
  {
    title: 'Building Conversational AI Applications',
    issuer: 'NVIDIA DLI',
    date: 'Dec 2023',
  },
  {
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA DLI',
    date: 'Dec 2023',
  },
  {
    title: 'Fundamentals of Accelerated Computing with CUDA C/C++',
    issuer: 'NVIDIA DLI',
    date: 'Dec 2023',
  },
];

export const courseraCertificates: Certificate[] = [
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    date: 'Jan 2024',
    note: 'with honors',
    href: 'https://www.coursera.org/verify/U75JK4GRGMEG',
  },
  {
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    date: 'Feb 2024',
    href: 'https://www.coursera.org/verify/8Z3FKK6MMJP5',
  },
  {
    title: 'Databases and SQL for Data Science with Python',
    issuer: 'IBM',
    date: 'May 2023',
    href: 'https://www.coursera.org/verify/RAMUGK5BWTGY',
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM Skills Network',
    date: 'Mar 2023',
    href: 'https://www.coursera.org/verify/84A7ZFWCYJWJ',
  },
];

export const otherLearning: Certificate[] = [
  {
    title: 'Koç University – Softtech Machine Learning Winter School',
    issuer: 'Koç University & Softtech',
    date: 'Nov 2023',
    note: 'attendance',
  },
  {
    title: 'KOSGEB Entrepreneurship Training (Traditional Entrepreneur)',
    issuer: 'KOSGEB',
    date: 'Oct 2023',
    note: 'attendance',
  },
  {
    title: 'Flutter & Dart: The Complete Guide (2023 Edition), 30 h',
    issuer: 'Udemy',
    date: 'Nov 2023',
  },
  {
    title: 'MongoDB Database Developer Course in Python, 9 h',
    issuer: 'Udemy',
    date: 'Jul 2023',
  },
  {
    title: 'Python for mobile apps backend & APIs (Flask framework), 6.5 h',
    issuer: 'Udemy',
    date: 'Sep 2023',
  },
  {
    title: 'Python: Sıfırdan İleri Seviye Programlama, 42 h',
    issuer: 'Udemy',
    date: 'Feb 2023',
  },
];

export const activities = [
  {
    role: 'Head of Sponsorship',
    org: 'kAi NVIDIA Student Club',
    period: 'Aug 2023 — Jun 2024',
    text: 'Led the sponsorship team, securing corporate sponsorship for the NVIDIA-affiliated AI student club and managing company relations, event coordination, branding and fundraising.',
  },
  {
    role: 'Newsletter Author',
    org: 'kAi NVIDIA Student Club',
    period: 'Aug 2023 — Nov 2023',
    text: 'Wrote weekly AI/ML industry content (5–6 hours per week) for club members.',
  },
];
