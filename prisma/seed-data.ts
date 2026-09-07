// Raw seed content — the site's original hardcoded copy, moved here so it
// can be loaded into Postgres once and then managed through the admin panel.
// prisma/seed.ts contains the orchestration logic; this file is pure data.

export const PROJECTS: {
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
  imageUrl: string | null;
  featured: boolean;
}[] = [
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
    imageUrl: '/images/Trcn-web.jpeg',
    featured: true,
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
    imageUrl: '/images/Certigo-web.jpeg',
    featured: true,
  },
  {
    slug: 'atoile-micro-naija',
    name: 'Atoile Micro Naija',
    category: 'Government / Embassy Project',
    badge: 'Government Deployment',
    oneLiner: "A platform built for the French Embassy's project in Nigeria.",
    problem:
      'The French Embassy needed a public-facing platform to represent and support its project work in Nigeria.',
    whatWeBuilt: [
      'A full public-facing platform for the project',
      'Content structure covering the project’s programs and initiatives',
    ],
    stack: ['Vite', 'React', 'Node.js', 'Content Management'],
    outcome: 'A live platform serving the French Embassy’s project in Nigeria.',
    href: 'https://atoilemicronaija.com',
    imageUrl: '/images/Atlmn-web.jpeg',
    featured: false,
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
    imageUrl: '/images/Darafunmi-web.jpeg',
    featured: false,
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
    href: 'https://slan.tedprime.net',
    imageUrl: '/images/Slan-web.jpeg',
    featured: true,
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
    imageUrl: '/images/Tacbay-web.jpeg',
    featured: false,
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
    imageUrl: '/images/Bidooze-web.jpeg',
    featured: true,
  },
];

// The dynamic list of training/capacity programs — admins can add more of
// these later without a code change; these 3 are just the ones that existed
// before the Program model went dynamic.
export const PROGRAMS: { slug: string; name: string }[] = [
  { slug: 'agile', name: 'AGILE' },
  { slug: '3mtt', name: '3MTT' },
  { slug: 'digital-centers', name: 'Digital Centers' },
];

export const TRAINING_SESSIONS: { programSlug: string; name: string; description: string }[] = [
  {
    programSlug: 'agile',
    name: 'Day 1: Empowering Master Trainers: A Journey into Digital Literacy',
    description:
      'In the heart of the Adolescent Girls Initiative for Learning Empowerment (AGILE) Project, a group of eager Master Trainers gathered, each carrying a shared aspiration—to bridge the digital divide and enhance their knowledge of essential productivity tools. Over several immersive sessions, guided by the experienced Mr. Olalekan Adeeko, they embarked on a transformative journey into the world of computers, Microsoft Word, and Microsoft PowerPoint on interactive mode using simple to complex approach methods. Participants were provided with some tasks and were grouped for the purpose of the entire workshop activities',
  },
  {
    programSlug: 'agile',
    name: 'Day 2: Setting the Stage for Digital Proficiency',
    description:
      'The training commenced with an introduction to computers and basic digital skills. Participants, drawn from diverse backgrounds, ranged from those with minimal exposure to technology to individuals seeking to refine their expertise. The primary goal was clear—to ensure every trainer walked away with a newfound confidence in navigating the digital landscape. This training was more than just an educational session; it was a gateway to empowerment, enabling participants to effectively train adolescent girls and foster digital literacy within their communities.',
  },
  {
    programSlug: 'agile',
    name: 'Day 3: Embracing Digital Transformation in Education',
    description:
      'The third day of the Adolescent Girls Initiative for Learning Empowerment (AGILE) Project training was a pivotal step in equipping Master Trainers with essential digital skills for modern teaching. The sessions, led by Mr. Olalekan Adeeko and Dr. Oluwakemi Olurinola, focused on virtual teaching platforms, remote learning strategies, multimedia content creation, and artificial intelligence tools in education. Participants engaged in interactive exercises, practical demonstrations, and collaborative discussions, reinforcing the importance of digital fluency in modern education.',
  },
  {
    programSlug: 'agile',
    name: 'Day 4: Promoting Digital Etiquette and Safety and Climate Change Education: A Call to Action',
    description:
      'The day began with Mr. Olalekan Adeeko leading a session on Digital Etiquette and Safety. This session emphasized online communication best practices, cybersecurity essentials, and student digital citizenship. Mr. Emmanuel Kilaso took participants through an insightful session on Climate Change Education, covering climate change concepts, teaching sustainable solutions, and utilizing digital tools for environmental awareness.',
  },
  {
    programSlug: 'agile',
    name: 'Day 5 Evaluating Teacher Competence and Action Plan for Kwara AGILE Master Trainers',
    description:
      'Participants explored the relevance of digital tools for assessments in classrooms such as Microsoft Forms and Designing Rubrics for quality evaluation. Mr. Odeogbola Ayodele delivered a session on action planning with emphasis on key activities, expected outcomes, and necessary technical support required for effective implementation in AGILE Implementing schools. The plan was structured into short-term and medium-to-long-term activities, with a focus on fostering a growth mindset among educators and students.',
  },
  {
    programSlug: 'agile',
    name: 'Projects and Certificates Presentation',
    description:
      'Participants were grouped into 10 to present their projects they kickstarted on Wednesday in the presence of Facilitators and the SPIU Team. 3 Teams were award cash gifts for their outstanding performance. The projects presented were tailored to several activities and expectations in all Kwara AGILE schools post Master Trainers Workshop. Certificates of Achievement as Master Trainers were presented to the participants, validating their competencies on Digital Literacy Skills with the session handled by the SPIU Team with Project Coordinator, Digital Skills Subcomponent Team Lead for Kwara AGILE and TedPrime Team in attendance.',
  },
];

const BASELINE_IMAGES = [
  '/images/baseline-a.jpeg',
  '/images/baseline-b.jpeg',
  '/images/baseline-c.jpeg',
  '/images/baseline-d.jpeg',
  '/images/baseline-e.jpeg',
];

const FLAGOFF_IMAGES = [
  '/images/agile-flagoff/flagoff-a.jpg',
  '/images/agile-flagoff/flagoff-b.jpg',
  '/images/agile-flagoff/flagoff-c.jpg',
  '/images/agile-flagoff/flagoff-d.jpg',
  '/images/agile-flagoff/flagoff-e.jpg',
  '/images/agile-flagoff/flagoff-f.jpg',
  '/images/agile-flagoff/flagoff-g.jpg',
  '/images/agile-flagoff/flagoff-h.jpg',
  '/images/agile-flagoff/flagoff-i.jpg',
  '/images/agile-flagoff/flagoff-j.jpg',
  '/images/agile-flagoff/flagoff-k.jpg',
  '/images/agile-flagoff/flagoff-l.jpg',
  '/images/agile-flagoff/flagoff-m.jpg',
  '/images/agile-flagoff/flagoff-n.jpg',
  '/images/agile-flagoff/flagoff-o.jpg',
];

// Standalone program-level galleries not tied to a specific write-up (e.g.
// AGILE's Flag-Off carousel). AGILE's Baseline photos are no longer here —
// they're the intro write-up's own `images` below instead.
export const GALLERY_IMAGES: { programSlug: string; group: string | null; imageUrl: string }[] = [
  ...FLAGOFF_IMAGES.map((imageUrl) => ({ programSlug: 'agile', group: 'Flag-Off', imageUrl })),
];

export const PROGRAM_WRITEUPS: {
  programSlug: string;
  title: string;
  body: string;
  images: string[];
}[] = [
  {
    programSlug: 'agile',
    title: 'BASELINE COMPETENCY ASSESSMENT (PRE-TEST)',
    body: 'The Competency Assessment took place on Wednesday, January 15, 2025, at Bovina Hotel, with selected teachers from 15 local government and aimed to select top teaachers for Train-The Trainer model of engagement and to further train the adolescent girls under the AGILE project. Our team began the day by setting up the venue and arranging seating for the participants.\n\nThe event recorded an impressive turnout, with a total of 179 participants taking the Pre- Assessment Competency Test. Of this number, 80 participants were onsite, while 99 participated online.\n\nThe high level of participation was encouraging and demonstrated the teachers’ enthusiasm and commitment to the program. This successful pre-assessment session marks a strong start to the AGILE initiative in Kwara State.',
    images: BASELINE_IMAGES,
  },
  {
    programSlug: '3mtt',
    title: '3MTT Program',
    body: 'TEDPRIME HUB & Support Initiative, a dedicated service provider for the 3 Million Technical Talent (3MTT) program, successfully executed two cohorts of intensive technical training between January and October 2024. Operating from its facility in Idi Aba, Abeokuta, the hub played a crucial role in advancing the national agenda of creating 3 million digital jobs. Across both cohorts, TEDPRIME HUB onboarded 570 participants, providing comprehensive training in in-demand digital skills such as Cybersecurity, UI/UX, Product Management, Data Science, AI & Machine Learning, Cloud Computing, DevOps, and Animation. The program emphasized practical, project-based learning and culminated in capstone project presentations. Notable achievements include the consistent delivery by highly knowledgeable instructors, provision of essential learning resources including power supply, free internet, and laptops, and significant success stories such as participants winning brand new laptops and a Cybersecurity team securing ₦500,000 at the 3MTT Hackathon. While maintaining good completion rates and positive participant feedback, TEDPRIME HUB continuously refined its approach to maximize impact and prepare participants for the digital job market.',
    images: ['/images/3mtt-winners.jpeg'],
  },
  {
    programSlug: 'digital-centers',
    title: 'KEKE High School Project',
    body: 'Project Background: Nigerian Breweries’ Maltina Teacher of the Year program (introduced in 2015) celebrates outstanding educators across Nigeria. In 2023 the national award went to Ms. Adeola Adefemi, an English teacher at Keke Senior High School in Agege, Lagos. To honor her achievement and uplift the school, the Nigerian Breweries–Felix Ohiwerei Education Trust Fund donated a state-of-the-art Digital Language Laboratory to Keke Senior High. The lab donation aligns with NB’s CSR mission “to address infrastructural deficits in our education system”. As NB’s Corporate Affairs Director Sade Morgan noted, the new lab “would enhance the quality of teaching and improve learning outcomes” at the school. TedPrime was engaged as the lead contractor and consultant for this project, working closely with NB and school stakeholders to design, build and commission the new language lab. Keke Senior High – already known for excellence (it won the Lagos State “Governor’s Quiz” and “Lagos Reads” competitions in recent years) – now has cutting-edge language-learning infrastructure to match its academic record.',
    images: ['/images/keke.jpeg'],
  },
  {
    programSlug: 'digital-centers',
    title: 'Iperu-Remo Technovation Space',
    body: 'The Iperu-Remo Technovation Space is a dedicated digital innovation hub designed to provide public schools in Iperu-Remo with access to modern technology education and practical digital learning. Established to serve schools without functional ICT laboratories, it offers a centralized environment where students take turns to engage in hands-on training in computer literacy, coding, and STEM-based innovation. Strategically located within the community for easy accessibility, the space bridges the digital learning gap and fosters 21st-century skills development among young learners. TedPrime Hub served as the technical contractor for the project, handling the design, installation, and deployment of the facility’s ICT infrastructure including computers, servers, networking, and solar power systems — ensuring a fully functional, sustainable, and future-ready learning space.',
    images: ['/images/iperu.jpeg'],
  },
];

export const CAPABILITIES: {
  section: 'HOME' | 'SOLUTIONS';
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    section: 'HOME',
    icon: 'Code2',
    title: 'Custom Software Development',
    description: 'Web and mobile systems built around how your organization operates.',
  },
  {
    section: 'HOME',
    icon: 'Cloud',
    title: 'SaaS Platform Engineering',
    description: 'Multi-tenant platforms architected to scale.',
  },
  {
    section: 'HOME',
    icon: 'ShieldCheck',
    title: 'Examination & Certification Systems',
    description: 'Assessment platforms with human and AI proctoring.',
  },
  {
    section: 'HOME',
    icon: 'Landmark',
    title: 'Government & Enterprise IT',
    description: 'Infrastructure and systems built for national scale.',
  },
  {
    section: 'SOLUTIONS',
    icon: 'Code2',
    title: 'Custom Software Development',
    description:
      'Web and mobile systems designed around how your organization actually operates, from first line of code to production.',
  },
  {
    section: 'SOLUTIONS',
    icon: 'Cloud',
    title: 'SaaS Platform Engineering',
    description:
      'Multi-tenant platforms built to serve many organizations from a single, reliable codebase — architected to scale.',
  },
  {
    section: 'SOLUTIONS',
    icon: 'ShieldCheck',
    title: 'Examination & Certification Systems',
    description:
      'End-to-end assessment platforms — registration, exam delivery, live human and AI-assisted proctoring, results, and certification issuance.',
  },
  {
    section: 'SOLUTIONS',
    icon: 'ServerCog',
    title: 'IT Infrastructure & Systems Integration',
    description:
      'Infrastructure, hardware, and integration work that keeps mission-critical systems running.',
  },
  {
    section: 'SOLUTIONS',
    icon: 'Landmark',
    title: 'Government & Public-Sector Digitalization',
    description:
      'Digital systems built to operate at national scale, for agencies and institutions that cannot afford downtime.',
  },
];

export const INDUSTRIES: { title: string; description: string }[] = [
  {
    title: 'Government',
    description:
      'National agencies and public institutions running certification, licensing, and public-facing digital services at scale.',
  },
  {
    title: 'Education',
    description:
      'Certification bodies, academies, and institutions delivering assessments and structured learning pathways.',
  },
  {
    title: 'Enterprise',
    description:
      'Businesses that need bespoke systems for operations, service delivery, and customer-facing platforms.',
  },
];

export const PAGE_HEROES: {
  page:
    | 'HOME'
    | 'SOLUTIONS'
    | 'ABOUT'
    | 'PROJECTS'
    | 'CONTACT'
    | 'EDUBOX'
    | 'NEWS_BAC';
  order: number;
  eyebrow: string;
  body: string;
  image: string;
  bgColor: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  ctaExternal: boolean;
}[] = [
  {
    page: 'HOME',
    order: 0,
    eyebrow:
      "Advancing Nigeria's and Africa's Economic Digital Ecosystem \nwith Quality Hardware and Software",
    body: "Enhancing quality digital infrastructure and solutions for Nigeria's and Africa's economic development.",
    image: '/images/hardware.jpg',
    bgColor: '#1e90ff',
    ctaLabel: 'View Businesses',
    ctaHref: '/about',
    ctaExternal: false,
  },
  {
    page: 'HOME',
    order: 1,
    eyebrow: 'Discover Skilled Artisans \nNear You',
    body: 'Explore a world of craftsmanship at your fingertips. Find reliable artisans in your neighborhood, ready to bring expertise to your doorstep.',
    image: '/images/tacbay.jpg',
    bgColor: '#990000',
    ctaLabel: 'View Businesses',
    ctaHref: 'https://tacbay.app/',
    ctaExternal: false,
  },
  {
    page: 'HOME',
    order: 2,
    eyebrow: 'Crash the Complexity \nof Edubox',
    body: 'We are working to propel Nigeria into becoming one of the active key players of the United Nations Sustainable Development Goals in Education.',
    image: '/images/edubox.jpg',
    bgColor: '#FF6600',
    ctaLabel: 'View Businesses',
    ctaHref: '/edubox',
    ctaExternal: false,
  },
  {
    page: 'HOME',
    order: 3,
    eyebrow: "Shaping the Future of \nNigeria's Digital Workforce",
    body: "3MTT programme will generate a pipeline of technical talent in line with the Federal Government of Nigeria's vision of creating 3 million digital jobs by 2025.",
    image: '/images/3mtt.jpg',
    bgColor: '#054F31',
    ctaLabel: 'View Businesses',
    ctaHref: '/projects',
    ctaExternal: false,
  },
  {
    page: 'HOME',
    order: 4,
    eyebrow:
      'Certification Assessment Platform \nfor Government Agencies,\nEnterprises and Certifications',
    body: 'Trusted Exams, Intelligent Proctoring. The modern certification platform for organizations worldwide.',
    image: '/images/certigo.jpeg',
    bgColor: '#C084FC',
    ctaLabel: 'View Businesses',
    ctaHref: 'https://usecertigo.com/',
    ctaExternal: true,
  },
  {
    page: 'SOLUTIONS',
    order: 0,
    eyebrow: 'Solutions',
    body: 'Software systems, SaaS platforms, and IT infrastructure for government, institutions, and enterprises.',
    image: '/images/hardware.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
  {
    page: 'ABOUT',
    order: 0,
    eyebrow: 'Who We Are',
    body: 'A technology company building software systems, SaaS platforms, and IT infrastructure for government, institutions, and enterprise.',
    image: '/images/about.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
  {
    page: 'PROJECTS',
    order: 0,
    eyebrow: 'Our Projects',
    body: "Systems we've built for government, institutions, and enterprise — and the training programs that build capacity around them.",
    image: '/images/tedprimeB.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
  {
    page: 'CONTACT',
    order: 0,
    eyebrow: 'Contact Us',
    body: 'Visit us at our office for more enquiries or send us a message and will be glad to respond to you.',
    image: '/images/contact.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
  {
    page: 'EDUBOX',
    order: 0,
    eyebrow: 'TedPrime Hub',
    body: 'EduBox Device Technology',
    image: '/images/edubox.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
  {
    page: 'NEWS_BAC',
    order: 0,
    eyebrow: 'TedPrime Hub',
    body: 'NEWS',
    image: '/images/_A1A4699.jpg',
    bgColor: null,
    ctaLabel: null,
    ctaHref: null,
    ctaExternal: false,
  },
];

// The home events slider and the home events list used to be two
// independent hardcoded sets that duplicated one story (the French Embassy
// / BAC story), and that story was ALSO a separate NewsArticle. All three are
// unified here into one set of `Event` rows: `imageUrl` presence determines
// whether a row appears in the slider, and `slug`+`body` presence determines
// whether it links to its own /News/[slug] page instead of an external link.
export const EVENTS: {
  date: string;
  headline: string;
  description: string;
  imageUrl: string | null;
  link: string | null;
  external: boolean;
  slug?: string;
  body?: string;
}[] = [
  {
    date: 'March 2026',
    headline:
      "TedPrime and Others to Support French Embassy's Bilingual and Competitive Project in 22 Nigerian Tertiary Institutions",
    description:
      "TedPrime and Others to Support French Embassy's Bilingual and Competitive Project in 22 Nigerian Tertiary Institutions. ",
    imageUrl: '/images/_A1A4699.jpg',
    link: null,
    external: false,
    slug: 'bac',
    body: [
      'The French Embassy in Nigeria partnered with TedPrime Ltd and other partners to support its bilingual and competitive project aimed at promoting transversal skills, bilingual learning, diplomacy, technology and entrepreneurship in 22 Nigerian institutions.',
      'The initiative is a 2-year Project under the French Embassy Funds (FEF) which provides support to programmes benefitting local institutions, youth and communities.',
      'This was revealed by the Ambassador of France to Nigeria, Marc Fonbaustier during the launch of the project held at the French Embassy, Abuja recently.',
      'He enthused that over 5000 students in more than 200 faculties in 22 Nigerian tertiary Institutions are the targeted beneficiaries who will benefit from the major core themes of Bilingual and Competitive Project which are diplomacy, business, technology and agriculture',
      'He noted that apart from the 22 Tertiary institutions benefitting form the project, 11 other institutions will be supported with digital infrastructure and resources.',
      'The ambassador emphasized the importance of French Language to Nigeria’s national economic and social development especially as a nation surrounded by francophone countries.',
      'According to Fonbaustier, “through the French Embassy Funds (FEF), we are supporting institutions that invest in quality education, skills development and international openness.',
      '"This Project recognizes your institutions as key actors in shaping the future of bilingual education in Nigeria,” he said.',
      'Speaking on the fact that Africa’s strength lies in its youth, the ambassador posited that “young people are not fully equipped to save the major challenges of today\'s globalised world. Sometimes, they are not even informed about the best way to conquer the world,” he added.',
      'He therefore called for more support, participation, collaboration and feedback to make the project a success, stressing the French Embassy\'s ambition of supporting the three C\'s which he defined as competence, confidence and creativity.',
      'In her remarks, Head of Pedagogy, Attaché for Cooperation in the French Language and Coordinator for Bilingual And Competitive Project of the Department of Cooperation and Cultural Affairs, Madame Losange Magaly stressed the project\'s impact.',
      'She highlighted the success from the previous project under "À toi le micro, Naija" between 2023- 2025 and Bilingual And Competitive as Projects funded by Fonds Équipe France (FEF) a funding instrument established by the French Ministry of Europe and Foreign Affairs to empower expansion of the richness of the French Culture among foreign nations.',
      'In his presentation, the Director of Operations for TedPrime Limited, Mr Olalekan Adeeko shared the programme structure for the selected beneficiary institutions during the two year project spanning across digital infrastructure deployment and skills, technology and AI for bilingual development, and entrepreneurship through Hackathons.',
      'He appreciated the huge investment to education and language development in Nigeria through the Bilingual and Competitive Project.',
      'One of the Institutions’ beneficiaries and representatives, Prof. Robbin Anjola from Lead City University in her response appreciated the Embassy of France "for considering this strategic investment in developing the teaching and learning of French Language in Nigerian Institutions through digital cultural activities, technology equipment support, digital skills and development for both lecturers and students.”',
      'The event also featured the Ambassador Cocktail Dinner to celebrate the institutions and the International French Teachers’ Day in Nigeria.',
      'TedPrime Ltd is a corporate entity that positions itself for disruptive technologies, practices, innovation and human capital development in Nigeria.',
    ].join('\n\n'),
  },
  {
    date: 'Feb 2025',
    headline:
      'AGILE Project in Kwara State : Kwara Govt, TedPrime Hub Flag off Digital Training for Girls.',
    description:
      'AGILE Project in Kwara State : Kwara Govt, TedPrime Hub Flag off Digital Training for Girls.',
    imageUrl: '/images/agile.jpeg',
    link: 'https://www.youtube.com/watch?v=4-qpuDvlEDw',
    external: true,
  },
  {
    date: 'July 2022',
    headline:
      "Microsoft, Sterling Bank, NITDA announce Nigeria's Agro Digital Platforms for next decade",
    description:
      "Microsoft, Sterling Bank, NITDA announce Nigeria's Agro Digital Platforms for next decade",
    imageUrl: '/images/tedprimeC.jpg',
    link: 'https://www.vanguardngr.com/2022/07/microsoft-sterling-bank-nitda-announce-nigerias-agro-digital-platforms-for-next-decade/',
    external: true,
  },
  {
    date: 'Nov 2024',
    headline: 'TedPrime Students Shine at the 3MTT Impact Summit!',
    description: 'TedPrime Students Shine at the 3MTT Impact Summit!',
    imageUrl: '/images/3mtt-winners.jpeg',
    link: 'https://x.com/TedprimeHub/status/1861048847255892253',
    external: true,
  },
  {
    date: 'Sep 2023',
    headline:
      'We aim to bridge the gap between education, technology and Skills between the Global North and Nigeria.',
    description:
      'We aim to bridge the gap between education, technology and Skills between the Global North and Nigeria by providing schools, teachers, students and policy administrators the necessary skills through sustainable partnerships.',
    imageUrl: null,
    link: 'https://www.startupguide.com/tedprime-hub',
    external: true,
  },
  {
    date: 'Mar 2025',
    headline:
      "A Nigerian ed-tech organisation, TedPrime Hub, has unveiled a digital platform tailored to uplift Nigeria's artisans.",
    description:
      "A Nigerian ed-tech organisation, TedPrime Hub, has unveiled a digital platform tailored to uplift Nigeria's artisans and informal sector",
    imageUrl: null,
    link: 'https://punchng.com/firm-unveils-platforms-to-empower-artisans/',
    external: true,
  },
  {
    date: 'Feb 2025',
    headline: 'KWSG targets 28,000 school girls for digital skills training',
    description: 'KWSG targets 28,000 school girls for digital skills training',
    imageUrl: null,
    link: 'https://thereflection.com.ng/2025/02/17/kwsg-targets-28000-school-girls-for-digital-skills-training-stephen-olufemi-oni-ilorin/',
    external: true,
  },
];

export const PARTNER_LOGOS: { imageUrl: string; alt: string }[] = [
  { imageUrl: '/images/hp-business-partner.png', alt: 'HP Business Partner' },
  { imageUrl: '/images/microsoft-logo.svg', alt: 'Microsoft' },
  { imageUrl: '/images/us-consultate-logo.png', alt: 'US Consulate' },
  { imageUrl: '/images/3mtt.jpeg', alt: '3MTT' },
  {
    imageUrl: '/images/federal-ministry-communications.png',
    alt: 'Federal Ministry of Communications and Digital Economy',
  },
  { imageUrl: '/images/botswana-logo.svg', alt: 'Republic of Botswana' },
  { imageUrl: '/images/sterling-logo.png', alt: 'Sterling Bank' },
  { imageUrl: '/images/delware-logo.png', alt: 'Delware' },
  { imageUrl: '/images/federal-college-logo.png', alt: 'Federal College of Education' },
  { imageUrl: '/images/ghana-education-service.png', alt: 'Ghana Education Service' },
  { imageUrl: '/images/ogun-state-logo.png', alt: 'Ogun State, Nigeria' },
  { imageUrl: '/images/kat-logo.png', alt: 'KAT' },
  { imageUrl: '/images/nb-logo.png', alt: 'Nigerian Breweries' },
  { imageUrl: '/images/FEF.jpg', alt: 'French Education Fund' },
];

export const SECTION_INTROS: {
  section: 'HOME_ABOUT' | 'HOME_TRAINING';
  eyebrow: string;
  heading: string | null;
  body: string;
  secondaryBody: string | null;
}[] = [
  {
    section: 'HOME_ABOUT',
    eyebrow: 'Who We Are',
    heading: null,
    body: 'TedPrime is a technology company. We design, build, and operate software systems, SaaS platforms, and IT infrastructure for government agencies, institutions, and enterprises across Africa.',
    secondaryBody:
      "From national certification platforms to enterprise operating systems, our work spans some of the most demanding, highest-stakes environments — where reliability isn't optional.\n\nAlongside our core technology practice, we run training and capacity-development programs that help institutions build the digital skills their systems depend on.",
  },
  {
    section: 'HOME_TRAINING',
    eyebrow: 'Training & Capacity Development',
    heading: 'Building the skills our systems run on',
    body: 'Alongside our core technology work, we run national mentorship programs, hackathons, and technovation spaces that build digital capacity for the institutions we serve.',
    secondaryBody: null,
  },
];

export const ABOUT_GALLERY_IMAGES: { imageUrl: string; alt: string }[] = [
  { imageUrl: '/images/_A1A4699.jpg', alt: 'BAC' },
  { imageUrl: '/images/tedprimeA.jpg', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeB.jpg', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeC.jpg', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeD.png', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeE.jpg', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeF.jpg', alt: 'TedPrime' },
  { imageUrl: '/images/tedprimeG.jpg', alt: 'TedPrime' },
];

export const TRAINING_HIGHLIGHTS: { imageUrl: string; title: string; description: string }[] = [
  {
    imageUrl: '/images/_A1A4699.jpg',
    title: 'Bilingual and competitive',
    description:
      'The Bilingual and Competitive (BAC) is a project of the French Embassy Fund to promote French language in Nigerian Universities across the Six geo-political zones.',
  },
  {
    imageUrl: '/images/tedprimeC.jpg',
    title: 'Microsoft Agro-Tech Hackathon',
    description:
      'National Mentorship and Hackathon for 2000+ Youths as software developers, agric-preneurs and raising 10 startups across Nigeria',
  },
  {
    imageUrl: '/images/tedprimeF.jpg',
    title: 'National 3MTT Programme',
    description:
      'Federal Government 3 Million Technical Talent Fellowship for Youths as Ogun State Training Provider',
  },
  {
    imageUrl: '/images/tedprimeD.png',
    title: 'Iperu Remo Technovation Space',
    description:
      'Design, Deployment and Management of Iperu Remo Technovation Space to provide access to over 5,000 students and youths of Iperu Remo, Ogun State',
  },
  {
    imageUrl: '/images/tedprimeE.jpg',
    title: 'Digital Language Laboratory',
    description: 'Digital Language Learning Laboratory Project Construction',
  },
];
