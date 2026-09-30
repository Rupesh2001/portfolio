export type SkillGroup = {
  label: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export type ProfileData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  languages: string[];
  profile: string;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  education: string[];
  training: string[];
  other: string;
};

export const profile: ProfileData = {
  name: 'Rupesh Mahat',
  title: 'Quality Assurance & Automation Engineer',
  location: 'Palanse, Bhaktapur, Nepal',
  email: 'rmmahat2010@gmail.com',
  phone: '9768407212',
  linkedin: 'https://linkedin.com/in/rupesh-mahat',
  github: 'https://github.com/Rupesh2001',
  languages: ['Nepali', 'English', 'Hindi'],
  profile:
    'Self-motivated QA professional who works well under pressure and deadlines, adapts quickly, and collaborates closely with developers.',
  experience: [
    {
      role: 'QA & Automation Engineer',
      company: 'Danfe Solution Pvt. Ltd.',
      location: 'Sinamangal',
      period: 'Apr 2025 to Present',
      bullets: [
        'Manual + automation testing: Selenium with Python, Postman API testing, JIRA defect management, JMeter performance testing',
        'Wrote test cases, scenarios, and reporting workflows for cart, billing, inventory, order management, restaurant POS',
        'Analyzed requirements, found edge cases, covered functional and non-functional areas',
        'Documented defects clearly and worked with teams to improve quality and UX',
      ],
    },
    {
      role: 'Support Engineer',
      company: 'Danfe Solution Pvt. Ltd.',
      location: 'Sinamangal',
      period: 'TODO',
      bullets: [
        'Client technical support: printer connectivity, drivers, configuration; installs, updates, troubleshooting',
        'Documented issues and solutions; escalated complex cases to internal teams',
      ],
    },
    {
      role: 'QA Intern',
      company: 'Search Eyes Business Solution',
      location: 'Bhaktapur',
      period: 'Dec 2024 to Apr 2025',
      bullets: [
        'Validated ERP and transactional workflows (accounting, HR, inventory)',
        'Responsive UI/UX testing across devices; payment (cash/card), order processing, data integrity checks',
        'Jira, Excel, API tools; Agile/Scrum sprints with developers',
      ],
    },
  ],
  skills: [
    {
      label: 'Testing',
      items: ['Manual', 'Test Planning and Test Cases', 'Bug Tracking and Reporting', 'Regression', 'Integration'],
    },
    {
      label: 'Automation',
      items: ['Selenium WebDriver', 'Python', 'PyTest/Unittest', 'Page Object Model'],
    },
    {
      label: 'API and Performance',
      items: ['Postman', 'JMeter'],
    },
    {
      label: 'Tools',
      items: ['Jira', 'Trello', 'Git', 'Excel'],
    },
    {
      label: 'Languages and Data',
      items: ['Java', 'PHP', 'JavaScript', 'HTML', 'MySQL', 'PostgreSQL', 'Oracle'],
    },
  ],
  education: [
    'Bachelor in Information Technology Management, Kantipur College of Management and Information Technology (completed)',
    '+2 Management, Modern College of Management, Bhaktapur (2075 BS)',
    'SLC, Gundu English Secondary School, Bhaktapur (2072 BS)',
  ],
  training: [
    'Quality Assurance, Mindrisers Institute of Technology: manual + Selenium/Python automation, mobile app testing (Android Studio), Jira and Trello',
    '"Automation Engineer ISTQB" course, Mindluster: Selenium WebDriver with Python, PyTest/Unittest, waits, assertions, test data, reusable functions, Page Object Model. Labelled as a course, not a certification.',
  ],
  other: 'College project, Money Transfer Service app built in Java.',
};

export const runHighlights = [
  { label: 'Test cases', value: '350+' },
  { label: 'Bug reports', value: '120+' },
  { label: 'Automations', value: '18' },
  { label: 'Products QA', value: '9' },
];
