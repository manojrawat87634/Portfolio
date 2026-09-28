export interface CaseStudy {
  overview: string;
  role: string;
  architectureHighlights: string[];
  keyChallenges: {
    challenge: string;
    solution: string;
  }[];
  databaseSchemaHighlights?: string[];
  sanitizedGistUrl?: string | null;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Institute Management System (IMS)',
    description:
      'Comprehensive ERP solution for educational institutes featuring dynamic fee invoice generation based on course duration, unpaid fee tracking, automated attendance, class & batch management, and role-based authentication.',
    tags: ['Java', 'Spring Boot', 'React', 'REST API', 'AWS'],
    images: [
      '/projects/1/p1.png',
      '/projects/1/p2.png',
      '/projects/1/p3.png',
      '/projects/1/p4.png',
      '/projects/1/p5.png',
      '/projects/1/p6.png',
      '/projects/1/p7.png',
      '/projects/1/p8.png',
      '/projects/1/p9.png',
      '/projects/1/p10.png',
    ],
    githubUrl: null,
    liveUrl: 'https://ims.ifda.in',
    caseStudy: {
      overview:
        'A full-scale enterprise ERP engineered to digitize operations across educational institutes. Handles student onboarding, multi-tier batch scheduling, attendance logging, and dynamic fee calculations across varying course durations.',
      role: 'Lead Full-Stack Architect',
      architectureHighlights: [
        'Spring Boot backend architecture adhering to Layered (Controller-Service-Repository) pattern.',
        'Spring Security & JWT for Role-Based Access Control (RBAC) across Admin, Faculty, and Students.',
        'Deploys on AWS EC2 with MySQL RDS, utilizing database transaction boundaries (`@Transactional`) for financial operations.',
      ],
      keyChallenges: [
        {
          challenge:
            'Dynamic Duration-Based Fee Calculation: Courses vary in duration and installment terms, creating complex unpaid fee edge cases.',
          solution:
            'Engineered a custom calculation engine in Spring Boot that computes invoices dynamically based on duration vectors and triggers automated alerts for pending dues.',
        },
        {
          challenge:
            'Batch Migration Consistency: Shifting students across batches without fragmenting attendance logs or invoice histories.',
          solution:
            'Implemented ACID transactional boundaries and strict foreign-key relational mappings in MySQL to preserve historical integrity during batch transfers.',
        },
      ],
      databaseSchemaHighlights: [
        'Users & Security (RBAC Roles, Tokens)',
        'Courses, Batches & Student Enrollments',
        'Fee Ledgers, Invoices & Payment Logs',
        'Attendance & Batch Transfer Audits',
      ],
    },
  },
  {
    id: 2,
    title: 'Dynamic Educational Portal & SEO Hub',
    description:
      'High-performance, SEO-optimized institute website designed for top search rankings ("best computer institute", "app development"). Features dynamic course listings, trainer profiles, and lead generation funnels.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'SEO', 'AWS'],
    images: [
      '/projects/2/p1.png',
      '/projects/2/p2.png',
      '/projects/2/p3.png',
      '/projects/2/p4.png',
      '/projects/2/p5.png',
    ],
    githubUrl: null,
    liveUrl: 'https://ifdainstitute.com',
    caseStudy: {
      overview:
        'A high-traffic web portal built to rank for competitive educational keywords while providing a dynamic CMS for course catalogs, faculty profiles, student testimonials, and admissions funnels.',
      role: 'Full-Stack Developer & Technical SEO Specialist',
      architectureHighlights: [
        'MERN stack architecture with server-side optimizations for maximum search indexing speed.',
        'RESTful APIs served via Node.js/Express, hosted on AWS behind Nginx reverse proxy.',
        'Structured schema markup (JSON-LD) integrated for rich search snippets and keyword positioning.',
      ],
      keyChallenges: [
        {
          challenge:
            'Keyword Ranking Optimization: Competing for top SERP rankings against major established institute portals.',
          solution:
            'Implemented automated dynamic meta-tag generation, clean canonical routes, fast TTFB, and structured rich snippets, propelling core terms like "best computer institute" into top rankings.',
        },
      ],
      databaseSchemaHighlights: [
        'Dynamic Courses & Syllabus Modules',
        'Trainers & Faculty Directory',
        'Lead Inquiries & Student Registrations',
      ],
    },
  },
  {
    id: 3,
    title: 'IT & Operations Inventory Management System',
    description:
      'Internal asset and operations tracking tool to monitor hardware/software inventory lists, handle dynamic support tickets, and trigger automated notification alerts for raised tickets.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS'],
    images: [
      '/projects/3/p1.jfif',
      '/projects/3/p2.jfif',
      '/projects/3/p3.jfif',
      '/projects/3/p4.jfif',
      '/projects/3/p5.jfif',
      '/projects/3/p6.jfif',
      '/projects/3/p7.jfif',
      '/projects/3/p8.jfif',
    ],
    githubUrl: null,
    liveUrl: 'https://it.ifda.in/login',
    caseStudy: {
      overview:
        'An enterprise operations hub built to track hardware/software assets across departments, streamline internal IT support ticket workflows, and dispatch real-time alerts to engineers.',
      role: 'Full-Stack Developer',
      architectureHighlights: [
        'Centralized MERN stack inventory engine with real-time lifecycle tracking for IT hardware.',
        'Automated event notification system integrating socket/email notifications upon ticket state changes.',
        'Deployed on AWS cloud infrastructure with secure authentication layers for internal staff.',
      ],
      keyChallenges: [
        {
          challenge:
            'Ticket Lifecycle Tracking: Managing asynchronous ticket escalations without notification delays.',
          solution:
            'Designed a state machine for ticket statuses (Open -> In Progress -> Resolved) with event listeners triggering automatic alerts to assigned IT staff.',
        },
      ],
      databaseSchemaHighlights: [
        'Hardware & Software Asset Records',
        'Support Ticket Workflows & Logs',
        'Departmental Access Rights',
      ],
    },
  },
  {
    id: 4,
    title: 'Perth Removalist',
    description:
      'A platform for Perth Removalist providing location-based moving and relocation services, enabling customers to search locations, get instant estimates, and schedule moves.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    images: ['/projects/4/p1.png', '/projects/4/p2.png'],
    githubUrl: null,
    liveUrl: 'https://heretomovewa.com.au/',
    caseStudy: {
      overview:
        'A customer-facing service portal engineered for a Western Australia removalist business. Features location-based quote discovery, service booking, and interactive customer inquiry management.',
      role: 'Full-Stack Developer',
      architectureHighlights: [
        'MERN stack web application built for fast mobile responsiveness and low friction booking.',
        'Express.js API routing handling quote queries and location validation.',
      ],
      keyChallenges: [
        {
          challenge:
            'Location Search & Service Matching: Allowing users to seamlessly select suburban zones and calculate service coverage.',
          solution:
            'Built dynamic location filtering components linked to an optimized MongoDB location index.',
        },
      ],
      databaseSchemaHighlights: [
        'Service Rates & Regional Zones',
        'Customer Booking Enquiries',
      ],
    },
  },
];