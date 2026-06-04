export const interviewData = [
  {
    name: "Dhanika Perera",
    title: "Tech Innovator & Entrepreneur",
    issue: "Issue 7",
    image: "/Resources/Exposition - University Magazine_files/dhanika perera.png",
    isHighlighted: true,
    tags: ["Entrepreneurship", "Tech Innovation"],
    quote: "Disrupting ecosystems through digital engineering platforms.",
    company: "Bhasha"
  },
  {
    name: "Deepal Sooriyaarachchi",
    title: "Leading Corporate Leader",
    issue: "Issue 0",
    image: "/Resources/Exposition - University Magazine_files/deepal sooriyarachchi.png",
    isHighlighted: false,
    tags: ["Leadership", "Strategy"],
    quote: "Sustaining corporate governance in a volatile market.",
    company: "Strategic Perspectives"
  },
  {
    name: "Danik Perera",
    title: "Tech Innovator & Entrepreneur",
    issue: "Issue 17",
    image: "Resources/dhanika.jpg",
    isHighlighted: true,
    tags: ["Entrepreneurship", "Tech Innovation"],
    quote: "Disrupting ecosystems through digital engineering platforms.",
    company: "Bhasha"
  },
  {
    name: "Sushena Rananga",
    title: "Technology Leader & Innovation Specialist",
    issue: "Issue 15",
    image: "Resources/sushena.jpg",
    isHighlighted: true,
    tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
    quote: "Leading technological advancement and digital transformation initiatives across industries.",
    company: "Director/Co-founder at Creative Software"
  },
  {
    name: "Dhanik Perera",
    title: "Tech Innovator & Entrepreneur",
    issue: "Issue 78",
    image: "Resources/dhanika.jpg",
    isHighlighted: true,
    tags: ["Entrepreneurship", "Tech Innovation"],
    quote: "Disrupting ecosystems through digital engineering platforms.",
    company: "Bhasha"
  },
  {
    name: "Mr. Ksun Kalhara",
    title: "Musician",
    issue: "Issue 2",
    image: "/Resources/Exposition - University Magazine_files/kasun.png",
    isHighlighted: true,
    tags: ["Music", "Aesthetics"],
    quote: "Musician blending traditional and contemporary Sri Lankan sounds.",
    company: "Independent Artist"
  },
  {
    name: "Susena Ratunga",
    title: "Technology Leader & Innovation Specialist",
    issue: "Issue 15",
    image: "Resources/sushena.jpg",
    isHighlighted: true,
    tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
    quote: "Leading technological advancement and digital transformation initiatives across industries.",
    company: "Director/Co-founder at Creative Software"
  },
  {
    name: "Depal Soriyaarachchi",
    title: "Leading Corporate Leader",
    issue: "Issue 20",
    image: "Resources/deepal.jpg",
    isHighlighted: false,
    tags: ["Leadership", "Strategy"],
    quote: "Sustaining corporate governance in a volatile market.",
    company: "Strategic Perspectives"
  },
  {
    name: "S Ratunga",
    title: "Technology Leader & Innovation Specialist",
    issue: "Issue 15",
    image: "Resources/sushena.jpg",
    isHighlighted: true,
    tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
    quote: "Leading technological advancement and digital transformation initiatives across industries.",
    company: "Director/Co-founder at Creative Software"
  },
  {
    name: "Susena Ra",
    title: "Technology Leader & Innovation Specialist",
    issue: "Issue 15",
    image: "Resources/sushena.jpg",
    isHighlighted: true,
    tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
    quote: "Leading technological advancement and digital transformation initiatives across industries.",
    company: "Director/Co-founder at Creative Software"
  }
];

// Clean duplicates automatically and export unique speaker profiles
export const uniqueInterviewData = interviewData.filter((value, index, self) =>
  self.findIndex(item => item.name === value.name) === index
);

export const voicesData = [
  {
    name: "Mr. Asela Waidyalankara",
    tagline: "Cyber Security & AI Policy Leader",
    subtext: "Educator & Global Speaker",
    quote: "Had an amazing time at the event organized by University of Kelaniya Management and Information Technology Students. As a panelist discussing 'Data Democracy: Empowering Individuals in the Digital Age,' our discussion highlighted crucial topics around data democratization and universal access. It was an important forum that effectively addressed the challenges and opportunities we face in navigating the digital age, demonstrating how empowering individuals with data can help organizations gain competitive advantage.",
    image: "/Resources/Exposition - University Magazine_files/asela.jpeg"
  },
  {
    name: "Mr. Deepal Sooriyarachchi",
    tagline: "Former Managing Director of AVIVA N...",
    subtext: "Management Consultant & Author",
    quote: "For me being part of Exposition 20 was truly a privilege. The meticulous planning and flawless execution by the University of Kelaniya undergraduates of the exposition layout process left a professional impression on all attendees involved.",
    image: "/Resources/Exposition - University Magazine_files/deepal sooriyarachchi.png"
  },
  {
    name: "Prof. Roshan G. Ragel",
    tagline: "Senior Lecturer , University of Perade...",
    subtext: "CEO, LEARN",
    quote: "It was a pleasure to be part of the Exposition Issue 20 Industrial Forum. The session was well-curated, with an engaging moderator and insightful panel discussions tackling industrial milestones realistically.",
    image: "/Resources/Exposition - University Magazine_files/ProfRagel-Photo4-1.jpg"
  },
  {
    name: "Mr. Thusara Rathnaweera",
    tagline: "Deputy General Manager",
    subtext: "Head of MX Biz @ Samsumg Sri Lanka",
    quote: "The event was organized with professional standards, showcasing the exceptional commitment of University of Kelaniya students. As a guest speaker, I witnessed profound technical acumen and operational coordination.",
    image: "/Resources/Exposition - University Magazine_files/thushara.jpeg"
  },
  {
    name: "Mr. Kosala Weerasena",
    tagline: "Former Deputy General Manager @ S...",
    subtext: "Charted Telecom Engineer",
    quote: "Impressed with the talents of undergraduates (belonging to Department of Industrial Management, Faculty of Science, University of Kelaniya) exhibited during the event execution pipelines and corporate technical tracks.",
    image: "/Resources/Exposition - University Magazine_files/kosala.png"
  },
  {
    name: "Mrs. Kanchana Priyakantha",
    tagline: "Co-Founder & CEO of KReader",
    subtext: "Director / Co-Founder of KBooks",
    quote: "The meticulous planning, festive atmosphere, and adept use of technology were truly commendable. From leadership to presentations, the organizing team managed delivery standards beautifully.",
    image: "/Resources/Exposition - University Magazine_files/kanchana priyakantha.jpg"
  }
];

export const deckCards = [
  {
    index: 0,
    title: "Mountain Peak Extraction",
    category: "Nature",
    tag: "LOG // 01",
    image: "/Resources/Exposition - University Magazine_files/1.png"
  },
  {
    index: 1,
    title: "Neon Grid Highrise",
    category: "Urban",
    tag: "LOG // 02",
    image: "/Resources/Exposition - University Magazine_files/2.png"
  },
  {
    index: 2,
    title: "Cyber Isolation Audit",
    category: "Abstract",
    tag: "LOG // 03",
    image: "/Resources/Exposition - University Magazine_files/3.png"
  },
  {
    index: 3,
    title: "Rootcode AI Briefing",
    category: "People",
    tag: "LOG // 04",
    image: "/Resources/Exposition - University Magazine_files/4.png"
  },
  {
    index: 4,
    title: "Sylvan Canopy Recon",
    category: "Nature",
    tag: "LOG // 05",
    image: "/Resources/Exposition - University Magazine_files/5.png"
  },
  {
    index: 5,
    title: "Monolith Architecture",
    category: "Urban",
    tag: "LOG // 06",
    image: "/Resources/Exposition - University Magazine_files/6.png"
  },
  {
    index: 6,
    title: "Prismatic Signal Shift",
    category: "Abstract",
    tag: "LOG // 07",
    image: "/Resources/Exposition - University Magazine_files/7.png"
  },
  {
    index: 7,
    title: "Tactical Network Node",
    category: "Urban",
    tag: "LOG // 08",
    image: "/Resources/Exposition - University Magazine_files/8.png"
  }
];
