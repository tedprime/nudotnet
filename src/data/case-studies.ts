export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  badge: string;
  oneLiner: string;
  problem: string;
  whatWeBuilt: string[];
  stack: string[];
  outcome: string;
  href: string | null;
  image: string | null;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'trcn',
    name: 'TRCN Test Taker Platform',
    category: 'Government / EdTech',
    badge: 'Government Deployment',
    oneLiner:
      "Nigeria's national teacher certification exam system for the Teachers Registration Council of Nigeria.",
    problem:
      'TRCN needed a single system to run the national teacher certification exam end-to-end, from candidate registration through live invigilation, at a scale spanning every state in the federation.',
    whatWeBuilt: [
      'The full candidate journey — exam lookup, exam delivery',
      'A live proctoring grid with human and AI-assisted monitoring',
      'Instructor tools for exam and question-bank management',
      'Admin dashboards for oversight and reporting',
      'A companion lesson note platform for TRCN-registered teachers',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC', 'AI Proctoring'],
    outcome:
      'A national-scale certification system trusted to run Nigeria’s official teacher licensing exam.',
    href: null,
    image: '/images/Trcn-web.jpeg',
  },
  {
    slug: 'certigo',
    name: 'Certigo',
    category: 'SaaS / Own Product',
    badge: 'Own Product',
    oneLiner:
      'A multi-tenant cloud examination platform for organizations that need to run secure, proctored exams at scale.',
    problem:
      'Institutions and enterprises running certification exams needed a single platform that could serve multiple organizations independently, each with its own admins, instructors, and candidates.',
    whatWeBuilt: [
      'Role-scoped portals for Superadmin, Admin, Proctor and Instructor',
      'Multi-tenant architecture so every organization operates in isolation',
      'Human and AI-assisted proctoring',
      'Exam authoring, scheduling, and results management',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Multi-tenant SaaS', 'AI Proctoring', 'WebRTC'],
    outcome: 'A production SaaS platform in active use by organizations worldwide.',
    href: 'https://usecertigo.com',
    image: '/images/Certigo-web.jpeg',
  },
  {
    slug: 'atoile-micro-naija',
    name: 'Atoile Micro Naija',
    category: 'Government / Embassy Project',
    badge: 'Government Deployment',
    oneLiner:
      "A platform built for the French Embassy's project in Nigeria.",
    problem:
      'The French Embassy needed a public-facing platform to represent and support its project work in Nigeria.',
    whatWeBuilt: [
      'A full public-facing platform for the project',
      'Content structure covering the project’s programs and initiatives',
    ],
    stack: ['Vite', 'React', 'Node.js', 'Content Management'],
    outcome: 'A live platform serving the French Embassy’s project in Nigeria.',
    href: 'https://atoilemicronaija.com',
    image: '/images/Atlmn-web.jpeg',
  },
  {
    slug: 'darafunmi-precision',
    name: 'Darafunmi Precision',
    category: 'Enterprise / Industrial',
    badge: 'Client Project',
    oneLiner:
      'A platform for a calibration and precision testing company, from service booking to certificate generation.',
    problem:
      'Darafunmi needed to move calibration record-keeping and certification off manual processes and into a system that could manage clients, bookings, and structured certificate numbering.',
    whatWeBuilt: [
      'Calibration record management',
      'Certificate generation with a structured numbering system',
      'Service bookings and quote requests',
      'Client and internal team management',
    ],
    stack: ['React', 'Vite', 'Node.js', 'MySQL', 'Document Generation'],
    outcome: 'A live operating system for Darafunmi’s calibration and testing business.',
    href: 'https://darafunmi.com',
    image: '/images/Darafunmi-web.jpeg',
  },
  {
    slug: 'slan',
    name: 'Slan',
    category: 'EdTech / Own Product',
    badge: 'Own Product',
    oneLiner:
      'A national e-learning and certification platform for school leaders across all 37 Nigerian states.',
    problem:
      'Serving and aspiring principals, headteachers, proprietors, and quality assurance officers across Nigeria needed a structured, self-paced path to leadership certification.',
    whatWeBuilt: [
      'A full course, track, module, and unit hierarchy',
      'Assessments and certification issuance',
      'A pathway-paced, online learning experience built for national scale',
    ],
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Learning Management'],
    outcome:
      'A national certification pathway for school leadership across all 37 states.',
    href: null,
    image: '/images/Slan-web.jpeg',
  },
  {
    slug: 'tacbay',
    name: 'Tacbay',
    category: 'Marketplace / Own Product',
    badge: 'Own Product',
    oneLiner:
      'A web and mobile platform connecting artisans with clients, with a learning track to pick up new skills.',
    problem:
      'Clients needed a reliable way to find and connect with skilled artisans, while aspiring artisans needed an accessible way to learn a trade.',
    whatWeBuilt: [
      'Artisan discovery and client connection, on web and mobile',
      'A learning track for anyone to pick up a new skill',
    ],
    stack: ['Flutter', 'Dart', 'Laravel', 'PostgreSQL'],
    outcome: 'A live marketplace connecting artisans and clients.',
    href: 'https://www.tacbay.app',
    image: '/images/Tacbay-web.jpeg',
  },
  {
    slug: 'bidooze',
    name: 'Bidooze',
    category: 'Marketplace SaaS / Partnership',
    badge: 'TedPrime × SpaceX — TedSpace',
    oneLiner:
      'A live SaaS auction marketplace spanning buyer, auctioneer, and admin experiences.',
    problem:
      'Running live auctions online requires three coordinated experiences at once — bidders competing in real time, auctioneers running the sale, and admins overseeing the marketplace.',
    whatWeBuilt: [
      'A buyer site for real-time bidding',
      'An auctioneer panel for running live auctions',
      'An admin panel for marketplace oversight',
    ],
    stack: ['Next.js', 'Real-time Bidding', 'PostgreSQL'],
    outcome:
      'A live auction marketplace, built as TedSpace — a partnership between TedPrime and SpaceX.',
    href: 'https://bidooze.com',
    image: '/images/Bidooze-web.jpeg',
  },
];
