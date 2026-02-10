export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "charity" | "education" | "company" | "news";
  image?: string;
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "SLD's Relief Efforts: Building Hope After Natural Disasters",
    slug: "sld-relief-efforts-building-hope-after-natural-disasters",
    excerpt: "When tornadoes and hurricanes devastated Florida, Michael Newell and the SLD team stepped up to help rebuild communities, delivering essential supplies and constructing homes for families in need.",
    content: `
      <p>When tornadoes and hurricanes devastated Florida, Michael Newell and the Standard Land Development team didn't hesitate to step up and help our community rebuild. Our commitment to serving others goes beyond just building homes—it's about being there when our neighbors need us most.</p>
      
      <h2>Rapid Response and Community Support</h2>
      <p>In the aftermath of the natural disasters, our team worked tirelessly around the clock to provide immediate relief. We mobilized our resources and 54 dedicated team members to deliver essential supplies including:</p>
      <ul>
        <li>Food and water for affected families</li>
        <li>Clothing and personal care items</li>
        <li>Construction materials and tools</li>
        <li>Emergency shelter assistance</li>
      </ul>
      
      <h2>Rebuilding Communities, One Home at a Time</h2>
      <p>Our construction expertise became invaluable as we helped rebuild homes destroyed by the storms. With over 2,100 homes built throughout our history, we applied our knowledge and experience to help families get back on their feet.</p>
      
      <p>Michael Newell personally led the efforts, ensuring that every family received the support they needed. The team's dedication and hard work demonstrated our core values: integrity, community service, and genuine care for those we serve.</p>
      
      <h2>Long-Term Impact</h2>
      <p>Beyond immediate relief, we continue to work with affected communities to ensure long-term recovery. Our commitment doesn't end when the news cameras leave—we're here for the long haul, helping families rebuild their lives and their homes.</p>
      
      <p>This experience reinforced our belief that building homes is about more than construction—it's about building hope, resilience, and stronger communities.</p>
    `,
    author: "Standard Land Development",
    date: "2024-01-15",
    category: "charity",
    image: "/blog/narutal.png",
    featured: true,
    tags: ["charity", "community", "disaster relief", "construction"],
  },
  {
    id: "2",
    title: "Learn to Build with Michael J. Newell - Empowering the Next Generation of Builders",
    slug: "learn-to-build-with-michael-j-newell",
    excerpt: "Michael J. Newell launches Learn To Build, a comprehensive program teaching aspiring developers how to build houses efficiently and profitably. Discover how this initiative is solving the housing deficit in the USA.",
    content: `
      <p>On behalf of Michael J. Newell and the entire Standard Land Development team, we want to sincerely thank you for your interest in learning about the exciting world of ground-up construction. Michael is very passionate about helping aspiring developers start their journey.</p>
      
      <h2>About Learn to Build</h2>
      <p>Learn to Build is Michael J. Newell's educational initiative designed to teach builders how to construct houses efficiently and profitably in stages. Launched in 2022, this program represents Michael's commitment to sharing his knowledge and experience with the next generation of builders.</p>
      
      <h2>Solving the Housing Deficit</h2>
      <p>At just 31 years old, Michael J. Newell recognized a critical need in the construction industry: the lack of skilled builders who understand how to build efficiently and profitably. The housing deficit in the USA continues to grow, and Michael saw an opportunity to make a real difference.</p>
      
      <p>Learn to Build addresses this challenge by teaching:</p>
      <ul>
        <li>Efficient construction techniques and methodologies</li>
        <li>Profitability strategies for builders</li>
        <li>Stage-by-stage construction processes</li>
        <li>Project management and resource allocation</li>
        <li>Quality control and best practices</li>
      </ul>
      
      <h2>Program Structure</h2>
      <p>The Learn to Build program offers comprehensive training that covers everything from initial planning to final construction. Students learn through a combination of:</p>
      <ul>
        <li>Hands-on construction experience</li>
        <li>Classroom instruction and theory</li>
        <li>Real-world project examples</li>
        <li>Mentorship from experienced builders</li>
        <li>Networking opportunities with industry professionals</li>
      </ul>
      
      <h2>Michael's Vision</h2>
      <p>Michael's passion for teaching stems from his belief that knowledge should be shared. Having successfully built over 2,100 homes and leading a team of 54 dedicated professionals, he understands the challenges and opportunities in the construction industry.</p>
      
      <p>"I want to help aspiring developers start their journey with the right knowledge and tools," says Michael. "By teaching efficient and profitable building techniques, we can collectively address the housing deficit and create more opportunities for homeownership."</p>
      
      <h2>Join the Movement</h2>
      <p>If you're interested in learning about ground-up construction and want to be part of the solution to America's housing deficit, Learn to Build offers the education and mentorship you need to succeed.</p>
      
      <p>For more information about Learn to Build courses and programs, visit our website or contact Standard Land Development.</p>
    `,
    author: "Standard Land Development",
    date: "2022-08-22",
    category: "education",
    image: "/blog/learn-michael.png",
    featured: true,
    tags: ["education", "construction", "training", "learn to build"],
  },
  {
    id: "3",
    title: "Michael J. Newell: Builder from Florida Teaching Steps to Solve Housing Deficit",
    slug: "michael-j-newell-builder-teaching-housing-deficit-solution",
    excerpt: "At just 31 years old, Michael J. Newell launches Learn To Build, a program to teach builders how to build houses efficiently and profitably in stages, addressing the critical housing deficit in the USA.",
    content: `
      <p>Michael J. Newell, a successful builder from Florida, has taken on a mission to solve one of America's most pressing challenges: the housing deficit. Through his innovative Learn to Build program, he's teaching the next generation of builders how to construct homes efficiently and profitably.</p>
      
      <h2>A Young Leader with Big Vision</h2>
      <p>At just 31 years old, Michael has already made a significant impact in the construction industry. As the founder and CEO of Standard Land Development, he has overseen the construction of over 2,100 homes and built a team of 54 dedicated professionals.</p>
      
      <p>But Michael's vision extends beyond just building homes—he wants to empower others to do the same. Recognizing the critical shortage of skilled builders and the growing housing deficit, he launched Learn to Build in 2022.</p>
      
      <h2>The Housing Deficit Challenge</h2>
      <p>The United States faces a significant housing shortage, with millions of families unable to find affordable homes. This deficit affects communities across the country, from urban centers to rural areas.</p>
      
      <p>Michael's approach to solving this problem is twofold:</p>
      <ol>
        <li><strong>Education:</strong> Teaching builders efficient and profitable construction techniques</li>
        <li><strong>Scale:</strong> Empowering more builders means more homes can be constructed</li>
      </ol>
      
      <h2>Learn to Build Methodology</h2>
      <p>The Learn to Build program teaches a stage-by-stage approach to construction that emphasizes:</p>
      <ul>
        <li>Efficiency in every phase of construction</li>
        <li>Profitability without compromising quality</li>
        <li>Sustainable building practices</li>
        <li>Time management and resource optimization</li>
      </ul>
      
      <h2>Impact and Results</h2>
      <p>Since launching Learn to Build, Michael has helped numerous aspiring builders start their careers in construction. The program's success is measured not just in the number of students, but in the homes they go on to build.</p>
      
      <p>By sharing his knowledge and experience, Michael is creating a multiplier effect: each builder he trains can go on to build dozens or hundreds of homes, significantly contributing to addressing the housing deficit.</p>
      
      <h2>Looking Forward</h2>
      <p>Michael's commitment to education and community service continues to grow. Through both Standard Land Development's construction projects and Learn to Build's educational programs, he's making a lasting impact on America's housing landscape.</p>
      
      <p>As he says, "Building homes is important, but building builders is how we'll solve the housing deficit for generations to come."</p>
    `,
    author: "Standard Land Development",
    date: "2022-11-23",
    category: "education",
    image: "/blog/construcciones.webp",
    featured: true,
    tags: ["education", "michael newell", "housing deficit", "construction training"],
  },
  {
    id: "4",
    title: "Developer Michael J. Newell Takes Charge of the Housing Market to Make Homes More Affordable for Middle-Class Americans",
    slug: "michael-newell-affordable-housing-middle-class-americans",
    excerpt: "Rising housing costs and flat wages are putting a strain on American workers. Michael Newell, CEO of Standard Land Development and M.J. Newell Homes, is compelled to act and rewrite the story with his Learn to Build course and commitment to affordable housing.",
    content: `
      <p>Rising housing costs and flat wages are putting a strain on American workers. Worker stress levels are at an all-time high due to the affordable housing crisis. For the past 40 years, wage growth has lagged behind price increases. During that time, rent increased steadily. Having watched the housing crisis worsen, Michael Newell, CEO of Standard Land Development and M.J. Newell Homes, is compelled to act and rewrite the story.</p>
      
      <h2>Learn to Build: Empowering the Next Generation</h2>
      <p>Michael Newell has used his two businesses and other resources to help in this area of need. He believes that by inspiring others to work in the construction industry, his company, M.J. Newell Homes and Standard Land Development (SLD), can make a difference. Michael Newell has created a course called "Learn to Build," in which he details every building process step. He believes he has finally perfected the process by writing it down and standardizing it.</p>
      
      <p>In Newell's words, "if you are just getting started in the field or are ready to take your business to the next level, I am confident that I can teach you the process and help you succeed. Whether it's getting the right people on board, installing the right pieces of software, negotiating with manufacturers, or raising money." Newell feels it's crucial to assist those less knowledgeable than himself. He intends to do so by imparting the knowledge he's acquired to others to foster a rise in the global supply of skilled architects and engineers.</p>
      
      <h2>Affordable Housing for the Middle Class</h2>
      <p>Standard Land Development and M.J. Newell Homes are some of the best builders and service providers for middle-class American consumers. Their goal is to make it possible for everyone in the United States to live in a secure environment at a reasonable cost. "To prevent low-income renters from spending too much of their paychecks on rent, we propose capping rent at no more than 25% of monthly income. Thus, it is ensured that families will not need to cut back on basic needs as they expand," Newell explained.</p>
      
      <h2>Infrastructure First Approach</h2>
      <p>Before any houses or businesses are built, SLD develops the necessary roads, sewage, and electrical systems. The M.J. Newell Homes brand is Standard Land Development's second arm. M.J. Newell Homes promotes, sells, and maintains all of Standard Land Development's properties. Several new communities have been built by Standard Land Development in Florida. M.J. Newell Homes offers its customers the choice between personalizing one of six pre-designed model homes or choosing from a library of pre-existing floor plans.</p>
      
      <h2>Florida's Premier Builder</h2>
      <p>When it comes to establishing brand-new Florida neighborhoods, nobody does it better than Standard Land Development. They have completed over 1,950 buildings in Florida. M.J. Newell Homes has built more than 600 houses over the years. The construction of as many as 490 single-family homes is planned for this year. Nothing could be accomplished without a reliable team with a solid commitment to teamwork.</p>
      
      <h2>Ambitious Growth Plans</h2>
      <p>By 2023, M. J. Newell Homes hopes to have reached an annual production rate of 1,200 homes. To better the American housing market, Standard Land Development and M.J. Newell Homes plan to build a 987-unit build-to-rent single-family home community in Central Florida, a 1754-unit build-to-sell single-family home community in South Florida, a 160,000-square-foot retail plaza, 1266 single-family homes on in-fill lots, a 312-unit townhome community in Central North Carolina, and a 96-unit apartment building in Western South Carolina.</p>
      
      <p>As long as there is a market for it, Standard Land Development will continue to construct reasonably priced homes for Americans all over the country.</p>
    `,
    author: "Digital Nod",
    date: "2022-10-25",
    category: "news",
    image: "/blog/IMG_5733.jpg",
    featured: false,
    tags: ["affordable housing", "middle class", "learn to build", "construction"],
  },
  {
    id: "6",
    title: "Standard Land Development and M.J. Newell Homes Expand Homeownership Across Florida",
    slug: "sld-mj-newell-homes-expand-homeownership-florida",
    excerpt: "Standard Land Development and M.J. Newell Homes are teaming up to deliver affordable housing throughout Florida. With a goal of 1,200 homes annually, CEO Michael J. Newell leads a mission to make quality homes accessible to American families.",
    content: `
      <p>Standard Land Development (SLD) and M.J. Newell Homes are partnering to provide affordable housing options across Florida. Under the leadership of CEO Michael J. Newell, both companies work in synergy: SLD develops land and infrastructure, while M.J. Newell Homes handles sales, marketing, and maintenance—creating a complete solution for families seeking quality homes.</p>
      
      <h2>A Dual-Structure Approach to Homeownership</h2>
      <p>SLD manages land development—building roads, utilities, and infrastructure before any construction begins. M.J. Newell Homes handles the operational side: sales, marketing, and long-term maintenance. Together, they offer prospective homeowners the flexibility to build their ideal home from scratch or choose from six high-quality model designs.</p>
      
      <h2>1,200 Homes Per Year: Solving the Affordable Housing Crisis</h2>
      <p>The companies aim to build 1,200 homes annually, directly addressing the affordable housing crisis in America. Michael J. Newell, CEO of both organizations, has established a core principle: rents should never exceed one-fourth of a family's net monthly income.</p>
      
      <p>"We believe that low-income rents shouldn't exceed one-fourth of a person's net monthly income," says Newell. "This ensures families can make ends meet without financial strain and focus on what matters most—their future."</p>
      
      <h2>Proven Success and Sustained Growth</h2>
      <p>This approach has driven significant growth over the past five years. By combining infrastructure expertise with customer-focused operations, SLD and M.J. Newell Homes have established themselves as trusted names in Florida real estate.</p>
      
      <h2>Quality Living at Accessible Prices</h2>
      <p>The vision is clear: provide high-quality living spaces at a price point that most income earners can afford. These organizations are committed to tackling soaring housing costs in the United States—simply put, they want to help more people become homeowners.</p>
      
      <p>Through affordable housing options, Standard Land Development and M.J. Newell Homes are improving the lives of families across Florida and beyond, one home at a time.</p>
      
      <p><em>Originally published via Newsfile Corp., February 13, 2023.</em></p>
    `,
    author: "Standard Land Development",
    date: "2023-02-13",
    category: "news",
    image: "/blog/1w5a0741-1.webp",
    featured: true,
    tags: ["affordable housing", "Florida", "homeownership", "Michael Newell", "partnership"],
  },
  {
    id: "5",
    title: "Real Estate Developer Michael J. Newell Applies a Win-Win Approach to Business, Creating Affordable Housing for Everyday Americans",
    slug: "michael-newell-win-win-approach-affordable-housing",
    excerpt: "If a CEO can carefully harness his team's individual strengths, this will effectively catapult the team ahead in rapid time. Michael J. Newell has applied a 'team mentality' strategy at Standard Land Development and M.J. Newell Homes with enormous growth as a result.",
    content: `
      <p>If a CEO can carefully harness his team's individual strengths, this will effectively catapult the team ahead in rapid time. Businesses often forget that their employees, even vendors, are all important in its success, but not Michael J. Newell. Newell has applied a "team mentality" strategy at Standard Land Development and M.J. Newell Homes. As a result, both businesses have experienced enormous growth within a 5 year period.</p>
      
      <h2>Two Companies, One Vision</h2>
      <p>Michael Newell is the founder and CEO of Standard Land Development and M.J. Newell Homes. Standard Land Development establishes communities all throughout Florida. SLD's process is to develop the plot of land by-way-of building the roads, installing sewer systems, electricity and other infrastructure as needed before erecting the development of homes or industrial buildings. M.J. Newell Homes is the second component of the business that provides both the sale and customer service of all homes built by Standard Land Development. The customer may purchase from 6 different model home options or custom build their dream abode directly through M.J. Newell Homes.</p>
      
      <h2>Prime-Value Homes at Economical Rates</h2>
      <p>Standard Land Development and M.J. Newell Homes are providing superior quality homes for the everyday American. "We want to make prime-value homes available at an economical rate to all Americans. We believe that affordable housing should be no more than a quarter of their income. This ensures that families can live comfortably while affording the necessities that a growing family requires," says the owner and CEO of M.J. Newell Homes.</p>
      
      <h2>Scale and Team</h2>
      <p>M.J. Newell Homes has built over 600 residential dwellings to date. This year alone, they expect to have built 490 single-family homes. However, none of this could be possible without a team mentality, as well as a strong team. Collectively, both companies consist of over 200 team members from contractors to office personnel.</p>
      
      <h2>The Power of a Team</h2>
      <p>"The power of a team [is] crucial. [You must] recruit individuals who are both strong and trustworthy. I knew in order to be successful, I'd have to enlist first-line powerhouses," states Newell. Subsequently, Michael J. Newell has diligently invested hundreds of hours with each team member to achieve multi-linear success throughout the organization. He strongly believes that managing a business means getting to know your employees and cultivating a culture of respect and appreciation.</p>
      
      <p>"During the early days of my construction career, I spent most days on the job site getting acquainted with the crew, as well as showing my gratitude for their work. I became familiar with each of their strengths which made that specific job site function with success. At 5:00 pm, I filled up a cooler with cold beer to finish off their work day. This simple yet effective gesture helped to create a formative trust between me and my team. I believe this is what set me apart from other builders," says Michael J. Newell.</p>
      
      <h2>Solving the Housing Crisis Together</h2>
      <p>Like most Americans, Michael Newell has watched the housing crisis continue to grow in the United States and as result, he has strategically employed both of his businesses to help solve our country's predicament. Newell believes that he cannot solve the housing crisis alone, however, by sharing his construction knowledge with others, he believes this can ultimately impact the housing deficit in our nation.</p>
      
      <p>Michael Newell says, "I feel that a new builder who comes into this industry will only strengthen the market. Our country needs good builders who can supply the growing demand for new construction. New builders create opportunities for subcontractors to hire more crew members and become malleable with their time and prices." Newell concludes, "The advantages of business transparency has a positive domino-effect not just for me and my team, but for millions of other Americans."</p>
      
      <h2>Win-Win Philosophy</h2>
      <p>In a world where most people attempt to suppress others to gain power for themselves, Newell believes it's a detriment to society if we don't look for a "win-win" solution in business and help each other along the way. The success of M.J. Newell Homes is indicative of this code of conduct. By 2023, M. J. Newell Homes will build 1200+ units per year. Standard Land Development will continue to develop sites statewide for residential, commercial and industrial creating affordable housing for the everyday American.</p>
      
      <h2>About MJ Newell Homes</h2>
      <p>MJ Newell Homes is founded on ethical business and social principles. At MJ Newell Homes, their team of professionals are not only experienced, but personable agents. They meticulously guide their clients throughout the entire process of buying a new home and understand that it is one of the most important investments for any individual or family. Their priority is to provide comprehensive support to their clients from beginning to end, starting with the selection of their ideal home to the financial process and all the way up to the successful delivery of their brand new home.</p>
    `,
    author: "M.J. Newell Homes",
    date: "2022-09-07",
    category: "company",
    image: "/blog/casas.webp",
    featured: false,
    tags: ["win-win", "team mentality", "affordable housing", "company culture"],
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};
