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
  stack?: string[];
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
      period: 'Apr 2025 – Present',
      bullets: [
        'Own **manual and automation testing** across **cart, billing, inventory, order management** and **restaurant POS** modules.',
        'Automate repeatable flows with **Selenium + Python**, verify endpoints in **Postman**, and run **JMeter** performance checks.',
        'Write **test cases, scenarios and reporting workflows**; analyse requirements to surface **edge cases** and cover **functional and non-functional** areas.',
        'Log and track defects in **Jira** with clear reproduction steps, working with developers to raise **quality and user experience**.',
      ],
      stack: ['Selenium', 'Python', 'Postman', 'JMeter', 'Jira'],
    },
    {
      role: 'Support Engineer',
      company: 'Danfe Solution Pvt. Ltd.',
      location: 'Sinamangal',
      period: 'Present',
      bullets: [
        'Resolve **client-side technical issues**: **printer connectivity, driver setup and configuration**, plus software **installation, updates and troubleshooting**.',
        'Keep client communication clear and timely; **escalate complex cases** to internal teams for quick resolution.',
        '**Document issues, fixes and client feedback** so recurring problems drop over time.',
      ],
      stack: ['Client support', 'Troubleshooting', 'Escalation'],
    },
    {
      role: 'Quality Assurance Intern',
      company: 'Search Eyes Business Solution',
      location: 'Bhaktapur',
      period: 'Dec 2024 – Apr 2025',
      bullets: [
        'Validated **ERP and transactional workflows**: **accounting, HR, inventory**.',
        'Tested **UI/UX across devices** (Responsive Test Chrome extension) and verified **payments (cash/card), order processing and data integrity**.',
        'Tracked bugs with **Jira and Excel**, used API tools for data checks, and worked in **Agile/Scrum sprints** with developers.',
      ],
      stack: ['ERP', 'Jira', 'Excel', 'Agile/Scrum'],
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
    'Automation Engineer ISTQB, Mindluster: Selenium WebDriver with Python, PyTest/Unittest, waits, assertions, test data, reusable functions, Page Object Model.',
  ],
  other: 'College project, Money Transfer Service app built in Java.',
};

export const runHighlights = [
  { label: 'Test cases', value: '350+' },
  { label: 'Bug reports', value: '120+' },
  { label: 'Automations', value: '18' },
  { label: 'Products QA', value: '9' },
];
