import { useState, useEffect } from 'react';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showResults: boolean;
  quizCompleted: boolean;
  showConfirmation: boolean;
}

const questions: Question[] = [
  // Digital Marketing Section
  {
    id: 1,
    topic: "Digital Marketing Basics",
    question: "What is digital marketing?",
    options: [
      "Marketing only through email",
      "An umbrella term for marketing products/services using digital technologies, mainly on the Internet",
      "Marketing through television only",
      "Traditional print advertising"
    ],
    correctAnswer: 1,
    explanation: "Digital marketing is an umbrella term for the marketing of products or services using digital technologies, mainly on the Internet, but also including mobile phones, display advertising, and any other digital medium."
  },
  {
    id: 2,
    topic: "Digital Marketing Benefits",
    question: "Which of the following is NOT a benefit of digital marketing?",
    options: [
      "Reach the right audience",
      "Engage with your audience",
      "Limited geographic reach",
      "Maximize return on investment (ROI)"
    ],
    correctAnswer: 2,
    explanation: "Digital marketing offers global reach, not limited geographic reach. The main objectives include reaching the right audience, engaging with them, motivating action, and maximizing ROI."
  },
  {
    id: 3,
    topic: "SEO",
    question: "What does SEO stand for?",
    options: [
      "Social Engine Optimization",
      "Search Engine Optimization",
      "Sales Engine Optimization",
      "Site Enhancement Operation"
    ],
    correctAnswer: 1,
    explanation: "SEO stands for Search Engine Optimization. It's a powerful web marketing technique that helps websites rank better in search engine results when users enter queries."
  },
  {
    id: 4,
    topic: "PPC",
    question: "What is PPC (Pay-Per-Click) marketing?",
    options: [
      "A way to earn clicks organically",
      "A way of using search engine advertising to generate clicks to your website by paying for each click",
      "Free advertising on social media",
      "Email marketing campaigns"
    ],
    correctAnswer: 1,
    explanation: "PPC marketing is a way of using search engine advertising to generate clicks to your website, rather than 'earning' those clicks organically. Advertisers pay each time users click on their ad."
  },
  {
    id: 5,
    topic: "SMM",
    question: "What is the main goal of Social Media Marketing (SMM)?",
    options: [
      "To create content that users will share to increase brand exposure and broaden customer reach",
      "To only post once a month",
      "To avoid customer interaction",
      "To reduce brand awareness"
    ],
    correctAnswer: 0,
    explanation: "SMM is a form of Internet marketing that utilizes social networking websites. The goal is to produce content that users will share with their social network to help a company increase brand exposure and broaden customer reach."
  },
  {
    id: 6,
    topic: "SMM Advantages",
    question: "Which of the following is an advantage of SMM?",
    options: [
      "Decreased brand awareness",
      "Increased Brand Awareness",
      "Lower conversion rates",
      "Reduced customer satisfaction"
    ],
    correctAnswer: 1,
    explanation: "Advantages of SMM include: Increased Brand Awareness, More Inbound Traffic, Improved Search Engine Rankings, Higher Conversion Rates, Better Customer Satisfaction, Improved Brand Loyalty, and More Brand Authority."
  },
  {
    id: 7,
    topic: "Content Writing",
    question: "What is a website content writer?",
    options: [
      "Someone who only writes blog posts",
      "A person who specializes in providing relevant content for websites",
      "Someone who manages social media only",
      "A graphic designer"
    ],
    correctAnswer: 1,
    explanation: "A website content writer or web content writer is a person who specializes in providing relevant content for websites. Every website has a specific target audience and requires different types and levels of content."
  },
  {
    id: 8,
    topic: "Digital Marketing Tools",
    question: "Which of the following is a digital marketing tool?",
    options: [
      "Microsoft Word",
      "Sprout Social",
      "Calculator",
      "Notepad"
    ],
    correctAnswer: 1,
    explanation: "Digital marketing tools include: Sprout Social, Offerpop, Nanigans, Facebook's Power Editor, Twitter Native Platform, Emma, Marketo, and AdRoll."
  },
  {
    id: 9,
    topic: "Online vs Offline Marketing",
    question: "What is a key benefit of online marketing over offline marketing?",
    options: [
      "Higher costs",
      "High return on investment (ROI)",
      "Limited audience targeting",
      "Less control over budget"
    ],
    correctAnswer: 1,
    explanation: "Benefits of online marketing over offline include: High ROI, targeted audience (pay only for interested users), ability to start with small amounts, time-based advertising, and full control over location, budget, and time."
  },
  {
    id: 10,
    topic: "Digital Marketing Areas",
    question: "Which of the following is NOT a digital marketing area?",
    options: [
      "SEO (Search Engine Optimization)",
      "SMM (Social Media Marketing)",
      "TVM (Television Marketing)",
      "SEM (Search Engine Marketing)"
    ],
    correctAnswer: 2,
    explanation: "Digital marketing areas include: SEO, SMO (Social Media Optimization), SEM, and SMM. TVM is not a standard digital marketing area classification."
  },
  // Buyer Behavior Section
  {
    id: 11,
    topic: "Buyer Behavior Definition",
    question: "What is buyer behavior?",
    options: [
      "The way companies sell products",
      "The decision and acts people undertake to buy products or services for individual or group use",
      "The manufacturing process of products",
      "The distribution channel of products"
    ],
    correctAnswer: 1,
    explanation: "Buyer behavior refers to the decision and acts people undertake to buy products or services for individual or group use. It's synonymous with 'consumer buying behavior'."
  },
  {
    id: 12,
    topic: "Stages of Buyer Behavior",
    question: "What is the FIRST stage of buyer behavior?",
    options: [
      "Information search",
      "Need recognition",
      "Purchase decision",
      "Post-purchase evaluation"
    ],
    correctAnswer: 1,
    explanation: "The stages of buyer behavior are: 1) Need recognition/Identify the problem, 2) Search for information, 3) Evaluate alternatives, 4) Make a purchase decision, 5) Evaluate the purchase after making it."
  },
  {
    id: 13,
    topic: "Types of Buyer Behavior",
    question: "Which type of buyer behavior involves high involvement and high risk purchases like buying a house or car?",
    options: [
      "Habitual buying behavior",
      "Complex buying behavior",
      "Variety-seeking behavior",
      "Dissonance-reducing behavior"
    ],
    correctAnswer: 1,
    explanation: "Complex buying behavior occurs when a customer is highly involved in the buying process and does thorough research before purchase due to high economic or psychological risk (e.g., house, car, education course)."
  },
  {
    id: 14,
    topic: "Habitual Buying",
    question: "What characterizes habitual buying behavior?",
    options: [
      "High involvement and extensive research",
      "Low involvement with routine purchases of everyday products",
      "Switching brands for variety",
      "Fear of making wrong choices"
    ],
    correctAnswer: 1,
    explanation: "Habitual buying behavior is characterized by low involvement in purchase decisions. A client sees no significant difference among brands and buys habitual goods over a long period (e.g., everyday products)."
  },
  {
    id: 15,
    topic: "Variety-Seeking Behavior",
    question: "When does variety-seeking behavior occur?",
    options: [
      "When customers are highly loyal to one brand",
      "When customers switch among brands for variety or curiosity, not dissatisfaction",
      "When customers do extensive research",
      "When customers buy out of habit"
    ],
    correctAnswer: 1,
    explanation: "Variety-seeking behavior occurs when a customer switches among brands for the sake of variety or curiosity, not dissatisfaction, demonstrating a low level of involvement (e.g., choosing different soap brands for different scents)."
  },
  {
    id: 16,
    topic: "Buyer Behavior Patterns",
    question: "Which factor does NOT influence the amount of goods people buy?",
    options: [
      "Product durability",
      "Product price",
      "Buyer's purchasing power",
      "The color of the packaging"
    ],
    correctAnswer: 3,
    explanation: "Factors influencing purchase quantity include: Product durability, Product availability, Product price, Buyer's purchasing power, and Number of customers for whom the product is intended."
  },
  {
    id: 17,
    topic: "Consumer Behavior Analysis",
    question: "What is the most important factor affecting consumer behavior?",
    options: [
      "Geographical factors",
      "Psychological factors",
      "Social factors",
      "Personal factors"
    ],
    correctAnswer: 1,
    explanation: "Psychological factors are considered the most important factor affecting consumer behavior. Traits like perception, motivation, personality, beliefs, and attitude are important to decide why a consumer would buy a product."
  },
  {
    id: 18,
    topic: "Benefits of Studying Consumer Behavior",
    question: "Why is studying consumer behavior beneficial for businesses?",
    options: [
      "It helps understand customer thought processes and tune campaigns accordingly",
      "It increases product costs",
      "It reduces customer satisfaction",
      "It limits market reach"
    ],
    correctAnswer: 0,
    explanation: "Studying consumer behavior provides vital information about customer thought processes, helps understand attitudes, cultures, perceptions, and lifestyles, allowing marketers to tune campaigns for greater market reach."
  },
  {
    id: 19,
    topic: "Buyer Behavior Model",
    question: "What influences the buyer's decision-making process according to the model?",
    options: [
      "Only price",
      "Marketing stimuli and environmental factors, plus buyer's characteristics",
      "Only advertising",
      "Only product availability"
    ],
    correctAnswer: 1,
    explanation: "Under marketing stimuli (product, price, place, promotion) and environmental factors (economic, technological, political, cultural), a customer recognizes the need. The decision is affected by buyer's characteristics (beliefs, values, motivation)."
  },
  {
    id: 20,
    topic: "Post-Purchase Evaluation",
    question: "What happens during post-purchase evaluation?",
    options: [
      "The buyer decides not to purchase",
      "The buyer assesses whether the product met their expectations and may leave reviews",
      "The buyer searches for information",
      "The buyer compares alternatives"
    ],
    correctAnswer: 1,
    explanation: "After purchasing, the buyer assesses whether the product/service met their expectations. At this stage, they might leave online reviews or share feedback with subscribers, colleagues, or friends."
  },
  // Competition & Product Life Cycle Section
  {
    id: 21,
    topic: "Competitor Analysis",
    question: "What is the FIRST step in competitor analysis?",
    options: [
      "Performing SWOT",
      "Identify current and future competitors in the market",
      "Execute strategies",
      "Build competition portfolio"
    ],
    correctAnswer: 1,
    explanation: "The 7 steps for competitor analysis start with: 1) Identify current and future competitors, 2) Finding market share, 3) Performing SWOT, 4) Build competition portfolio, 5) Plan Strategies, 6) Execute strategies, 7) Follow up."
  },
  {
    id: 22,
    topic: "SWOT Analysis",
    question: "What does SWOT stand for?",
    options: [
      "Sales, Work, Operations, Technology",
      "Strengths, Weaknesses, Opportunities, Threats",
      "Strategy, Workforce, Organization, Tactics",
      "Systems, Workflow, Optimization, Testing"
    ],
    correctAnswer: 1,
    explanation: "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. It shows where you currently stand in your industry and what strategies can be most effective to stay on top."
  },
  {
    id: 23,
    topic: "Product Life Cycle",
    question: "What are the FOUR stages of the Product Life Cycle?",
    options: [
      "Planning, Execution, Review, Termination",
      "Introduction, Growth, Maturity, Decline",
      "Development, Launch, Sales, End",
      "Start, Rise, Peak, Fall"
    ],
    correctAnswer: 1,
    explanation: "The Product Life Cycle contains four distinct stages: Introduction, Growth, Maturity, and Decline. Each stage has specific characteristics and requires different product life cycle strategies."
  },
  {
    id: 24,
    topic: "Introduction Stage",
    question: "What characterizes the Introduction stage of PLC?",
    options: [
      "Peak sales and high profits",
      "Low sales, negative/low profits, high promotion expenses",
      "Declining sales",
      "Stable market share"
    ],
    correctAnswer: 1,
    explanation: "In the Introduction stage: sales growth is slow, profits are negative or low due to low sales and high distribution/promotion expenses. Focus is on selling to innovators and early adopters."
  },
  {
    id: 25,
    topic: "Growth Stage Strategies",
    question: "What is the main objective in the Growth stage?",
    options: [
      "To reduce expenditure",
      "To maximise market share",
      "To discontinue the product",
      "To maintain status quo"
    ],
    correctAnswer: 1,
    explanation: "The main objective in the Growth stage is to maximise market share. Product quality should be improved, new features added, and the firm can enter new market segments and distribution channels."
  },
  {
    id: 26,
    topic: "Maturity Stage",
    question: "What happens in the Maturity stage?",
    options: [
      "Sales growth accelerates rapidly",
      "Sales growth slows down or levels off after reaching a peak",
      "Product is first introduced",
      "Product is discontinued"
    ],
    correctAnswer: 1,
    explanation: "In the Maturity stage, sales growth slows down or levels off after reaching a peak. The market becomes saturated, competition increases, and profits may drop. This stage typically lasts longer than preceding stages."
  },
  {
    id: 27,
    topic: "Decline Stage Strategies",
    question: "What is the main objective in the Decline stage?",
    options: [
      "To maximise market share",
      "To reduce expenditure and 'milk' the brand",
      "To increase promotion",
      "To expand distribution"
    ],
    correctAnswer: 1,
    explanation: "In the Decline stage, the main objective is to reduce expenditure and 'milk' the brand. Strategies include cutting prices, selective distribution, reducing advertising to retain only loyal customers."
  },
  {
    id: 28,
    topic: "Introduction Stage Strategies",
    question: "Which strategy involves launching at high price and high promotional level?",
    options: [
      "Slow skimming",
      "Rapid skimming",
      "Rapid penetration",
      "Slow penetration"
    ],
    correctAnswer: 1,
    explanation: "Rapid skimming = high price + high promotion. Slow skimming = high price + low promotion. Rapid penetration = low price + high promotion. Slow penetration = low price + low promotion."
  },
  {
    id: 29,
    topic: "Competition Portfolio",
    question: "What should a competition portfolio include?",
    options: [
      "Only competitor names",
      "Each competitor's products, features, logistics, tangible and intangible features",
      "Only pricing information",
      "Only marketing budgets"
    ],
    correctAnswer: 1,
    explanation: "A competition portfolio includes each competitor's products, their features, logistics, tangible features (product qualities), and intangible features (product service). It needs to be updated regularly like MIS."
  },
  {
    id: 30,
    topic: "Strategy Execution",
    question: "Why is having a contingency plan important when executing strategies?",
    options: [
      "It's not important",
      "To anticipate competitor reactions and avoid long-term negative effects",
      "To increase costs",
      "To slow down implementation"
    ],
    correctAnswer: 1,
    explanation: "A contingency plan is important to anticipate competitor reactions. If a competitor reacts too strongly, the contingency plan helps avoid long-term negative effects to the brand/product."
  },
  // New Product Development Section
  {
    id: 31,
    topic: "Product Definition",
    question: "What is a PRODUCT in marketing terms?",
    options: [
      "Only physical goods",
      "Anything offered to market for attention, acquisition, use or consumption that might satisfy a want or need",
      "Only services",
      "Only digital items"
    ],
    correctAnswer: 1,
    explanation: "PRODUCT refers to anything that can be offered to market for attention, acquisition, use or consumption and that might satisfy a want or need. It includes physical objects and services."
  },
  {
    id: 32,
    topic: "New Product Development Process",
    question: "What is the FIRST stage of new product development?",
    options: [
      "Idea Screening",
      "Idea Generation",
      "Commercialization",
      "Market Testing"
    ],
    correctAnswer: 1,
    explanation: "The new product development process stages are: 1) Idea Generation, 2) Idea Screening, 3) Concept Development and Testing, 4) Business Strategy Development, 5) Product Development, 6) Market Testing, 7) Commercialization."
  },
  {
    id: 33,
    topic: "Idea Sources",
    question: "What are the TWO main sources of new product ideas?",
    options: [
      "Online and Offline",
      "Internal and External idea sources",
      "Local and International",
      "Paid and Free"
    ],
    correctAnswer: 1,
    explanation: "There are two sources of new ideas: Internal idea sources (employees, scientists, engineers, marketers) and External idea sources (distributors, suppliers, competitors, and most importantly, customers)."
  },
  {
    id: 34,
    topic: "Idea Screening",
    question: "What is the purpose of Idea Screening?",
    options: [
      "To generate more ideas",
      "To filter ideas and pick out good ones, dropping poor ones as soon as possible",
      "To launch the product",
      "To test the product with customers"
    ],
    correctAnswer: 1,
    explanation: "Idea screening means filtering ideas to pick out good ones and drop poor ones as soon as possible. Product development costs rise greatly in later stages, so early elimination of poor ideas is crucial."
  },
  {
    id: 35,
    topic: "Concept Testing",
    question: "What happens during Concept Testing?",
    options: [
      "The product is mass produced",
      "New product concepts are tested with groups of target consumers",
      "The product is discontinued",
      "Only internal testing is done"
    ],
    correctAnswer: 1,
    explanation: "New product concepts need to be tested with groups of target consumers. Concepts can be presented symbolically or physically, and consumers answer questions to find out consumer appeal and customer value."
  },
  {
    id: 36,
    topic: "Market Testing",
    question: "What is the purpose of Market Testing?",
    options: [
      "To skip product development",
      "To test the product and marketing program in realistic market settings before full investment",
      "To immediately commercialize",
      "To reduce product quality"
    ],
    correctAnswer: 1,
    explanation: "Market testing gives marketers experience with marketing the product before full introduction. It allows testing the product and entire marketing program (targeting, positioning, advertising, distribution, packaging) before full investment."
  },
  {
    id: 37,
    topic: "Commercialization",
    question: "What is Commercialization?",
    options: [
      "Ending the product life",
      "Introducing a new product into the market",
      "Testing the product internally",
      "Generating ideas"
    ],
    correctAnswer: 1,
    explanation: "Commercialization means introducing a new product into the market. At this point, highest costs are incurred (manufacturing facilities, advertising, sales promotion, marketing efforts)."
  },
  {
    id: 38,
    topic: "New Product Types",
    question: "Which type of new product is the RAREST?",
    options: [
      "Product improvements",
      "New-to-the-world products",
      "Additions to product lines",
      "Product modifications"
    ],
    correctAnswer: 1,
    explanation: "New-to-the-world products (inventions like first automobile or computer) are very rare. Most new products are actually product improvements on existing products."
  },
  {
    id: 39,
    topic: "Product Failure Causes",
    question: "Which is a common cause of new product failure?",
    options: [
      "Understanding consumer needs too well",
      "Failure to Understand Consumer Needs and Wants",
      "Too much market research",
      "Proper execution"
    ],
    correctAnswer: 1,
    explanation: "Common causes of product failure include: Failure to Understand Consumer Needs, Fixing a Non-Existent Problem, Targeting Wrong Market, Incorrect Pricing, Weak Team, Prolonged Development, and Poor Execution."
  },
  {
    id: 40,
    topic: "Advantages of New Product Development",
    question: "What is an advantage of new product development?",
    options: [
      "Creates a culture of innovation",
      "Guaranteed success",
      "No risks involved",
      "Always low cost"
    ],
    correctAnswer: 0,
    explanation: "Advantages include: Creates culture of innovation, drives higher value proposition, grows professional network, and consumers become anxious to test new products. However, it does involve risks."
  },
  // Digital Advertising Section
  {
    id: 41,
    topic: "Digital Advertising Definition",
    question: "What is digital advertising?",
    options: [
      "Only email marketing",
      "Businesses leveraging Internet technologies to deliver promotional advertisements to consumers",
      "Only social media posts",
      "Traditional print ads"
    ],
    correctAnswer: 1,
    explanation: "Digital advertising (Internet advertising/marketing) is when businesses leverage Internet technologies to deliver promotional advertisements to consumers through various digital channels."
  },
  {
    id: 42,
    topic: "Display Advertisements",
    question: "What are display advertisements?",
    options: [
      "Ads that show up in search results",
      "Online paid advertising using images and text, typically banners, landing pages, and popups",
      "Only video ads",
      "Email newsletters"
    ],
    correctAnswer: 1,
    explanation: "Display ads are online paid advertising using images and text. Popular forms include banners, landing pages, and popups. They differ from search ads as they don't show up in search results."
  },
  {
    id: 43,
    topic: "SEM vs SEO",
    question: "What is the difference between SEM and SEO?",
    options: [
      "There is no difference",
      "SEM is paid strategy, SEO is organic",
      "SEM is organic, SEO is paid",
      "Both are only for social media"
    ],
    correctAnswer: 1,
    explanation: "SEM (Search Engine Marketing) is a paid strategy where advertisers pay each time users click on the ad. SEO (Search Engine Optimization) is organic, using tactics like linking, keywords, and content to gain higher rank."
  },
  {
    id: 44,
    topic: "Remarketing",
    question: "What is Remarketing?",
    options: [
      "Marketing to new customers only",
      "Cookie-based technology that follows users around the internet to remarket to them again",
      "Email marketing",
      "Print advertising"
    ],
    correctAnswer: 1,
    explanation: "Remarketing (retargeting) is cookie-based technology that follows users around the internet to remarket to them again. It helps re-engage users who have previously interacted with your brand."
  },
  {
    id: 45,
    topic: "Affiliate Marketing",
    question: "What is Affiliate Marketing?",
    options: [
      "Marketing only through affiliates",
      "Promoting a company's product while earning a commission for each sale made",
      "Free marketing",
      "Internal marketing only"
    ],
    correctAnswer: 1,
    explanation: "Affiliate marketing is promoting a company's product while earning a commission for each sale. It's a 3-party agreement between advertiser, publisher, and consumer, widely adopted by bloggers."
  },
  {
    id: 46,
    topic: "Digital Marketing Advantages",
    question: "Which is NOT an advantage of digital marketing?",
    options: [
      "24/7 Marketing",
      "Low cost for operations",
      "Limited demographic targeting",
      "Global Marketing"
    ],
    correctAnswer: 2,
    explanation: "Digital marketing offers extensive demographic targeting (not limited). Other advantages include: 24/7 marketing, low operational costs, global reach, measurability, automation, and personalization."
  },
  {
    id: 47,
    topic: "Video Ads",
    question: "What is notable about video ads?",
    options: [
      "They have the lowest click-through rate",
      "They have the highest average click-through rate (1.84%) of any digital format",
      "They are only for TV",
      "They are declining in popularity"
    ],
    correctAnswer: 1,
    explanation: "Video ads are growing in popularity, especially with younger consumers. They have the highest average click-through rate (1.84%) of any digital format. 55% of consumers view videos in their entirety."
  },
  {
    id: 48,
    topic: "Digital Communications",
    question: "What does the digital marketing communications mix include?",
    options: [
      "Only email",
      "Display ads, PPC, SEO, affiliate marketing, and social media marketing",
      "Only traditional PR",
      "Only print media"
    ],
    correctAnswer: 1,
    explanation: "Digital marketing communications tools include: display ads, pay per click advertising, search engine optimization, affiliate marketing, and social media marketing - adapted from traditional marketing communications mix."
  },
  {
    id: 49,
    topic: "Opt-in Email Marketing",
    question: "What is Opt-in Email Marketing?",
    options: [
      "Sending emails without permission",
      "Visitors sign up for email newsletter with permission (permission marketing)",
      "Buying email lists",
      "Spam emails"
    ],
    correctAnswer: 1,
    explanation: "Opt-in email marketing means visitors or clients are encouraged to opt in (sign up) for an email newsletter with permission. This is also known as permission marketing."
  },
  {
    id: 50,
    topic: "Online PR",
    question: "What is Online/Digital PR?",
    options: [
      "Free publicity with no effort",
      "Digital marketing communications that encourage positive perception of your business through blogs, shares, viral campaigns",
      "Only press releases",
      "Only negative publicity"
    ],
    correctAnswer: 1,
    explanation: "Online PR encourages positive perception through blogs, re-tweets, Facebook shares, viral campaigns, news mentions, and podcasts. It requires investment in effort and cash - it's not free."
  },
  // Marketing Strategy & Customer Section
  {
    id: 51,
    topic: "Customer Benefit",
    question: "What is Customer Benefit?",
    options: [
      "The profit the company makes",
      "The real or perceived value a customer experiences through interaction with a company",
      "The cost of the product",
      "The marketing budget"
    ],
    correctAnswer: 1,
    explanation: "Customer Benefit refers to the real or perceived value that a customer experiences through interaction with a company. It may include problem resolution, achievement of desired outcome, or fulfillment of a need."
  },
  {
    id: 52,
    topic: "Online Reviews Benefits",
    question: "How do online reviews benefit businesses?",
    options: [
      "They decrease visibility",
      "They provide free advertising and improve search engine results",
      "They only harm businesses",
      "They have no impact"
    ],
    correctAnswer: 1,
    explanation: "Online reviews provide: Free advertising (exposure to readers), Improved search engine results (Google considers review mentions), Peer recommendations (70% trust online opinions), and constructive criticism."
  },
  {
    id: 53,
    topic: "Customer Centricity",
    question: "What is Customer Centricity?",
    options: [
      "Focusing only on sales numbers",
      "An approach focusing on providing positive customer experience to drive profit and gain competitive advantage",
      "Ignoring customer feedback",
      "Focusing only on products"
    ],
    correctAnswer: 1,
    explanation: "Customer centricity is an approach focusing on providing positive customer experience to drive profit and gain competitive advantage. It builds trust, loyalty, reputation, and increases positive word of mouth."
  },
  {
    id: 54,
    topic: "Customer Satisfaction Importance",
    question: "How much more expensive is it to acquire a new customer than keep a current one?",
    options: [
      "2-3 times",
      "6-7 times",
      "1-2 times",
      "No difference"
    ],
    correctAnswer: 1,
    explanation: "It is 6-7 times more expensive to acquire a new customer than to keep a current one. Loyal customers are worth up to 10 times as much as their first purchase."
  },
  {
    id: 55,
    topic: "Sales vs Customer Centricity",
    question: "What is the problem with sales-centric organizations?",
    options: [
      "They focus too much on customers",
      "They focus on sales numbers without considering customer feelings, leading to short-term sales but losing long-term loyalty",
      "They have no sales targets",
      "They always satisfy customers"
    ],
    correctAnswer: 1,
    explanation: "Sales-centric organizations focus on meeting sales numbers and market share without considering customer feelings. This creates short-term product sales culture at the expense of long-term customer loyalty."
  },
  {
    id: 56,
    topic: "Marketing Objectives",
    question: "What are marketing objectives?",
    options: [
      "Random goals",
      "Specific targets for marketing set by the business to achieve corporate objectives",
      "Only sales targets",
      "Only advertising budgets"
    ],
    correctAnswer: 1,
    explanation: "Marketing objectives are specific targets for marketing set by the business to achieve corporate objectives. Examples: Increase sales by 10%, Launch new product, Achieve 95% customer satisfaction, Increase retail outlets by 250."
  },
  {
    id: 57,
    topic: "Online Business Benefits",
    question: "Which is a benefit of online business?",
    options: [
      "High startup costs",
      "You can sell while you sleep",
      "Limited to local markets",
      "Difficult to track results"
    ],
    correctAnswer: 1,
    explanation: "Benefits of online business include: Low startup cost, Free marketing, Sell while you sleep, No borders, Environment-friendly, Easy tracking, Easy customer communication, Manage from anywhere, Faster transactions."
  },
  {
    id: 58,
    topic: "Consumer Trust",
    question: "According to Nielsen survey, what percentage trusted consumer opinions posted online?",
    options: [
      "30%",
      "50%",
      "70%",
      "90%"
    ],
    correctAnswer: 2,
    explanation: "A 2015 Nielsen survey of 30,000 internet consumers from 58 countries found that 83% trusted recommendations from people they knew, while 70% trusted consumer opinions posted online."
  },
  {
    id: 59,
    topic: "Customer Relationship",
    question: "How do online review sites help build customer relationships?",
    options: [
      "They don't help at all",
      "They allow businesses to reply to reviews and show they're interested in customer opinions",
      "They only show negative reviews",
      "They prevent communication"
    ],
    correctAnswer: 1,
    explanation: "Online review sites allow businesses to read reviews from various customers and reply to both positive and negative reviews, demonstrating interest in customer opinions. This helps customers know the person behind the business."
  },
  {
    id: 60,
    topic: "Marketing Strategy",
    question: "What do marketing strategies explain?",
    options: [
      "How to reduce costs only",
      "How the marketing function fits in with the overall strategy for a business",
      "Only advertising tactics",
      "Only sales techniques"
    ],
    correctAnswer: 1,
    explanation: "Marketing strategies explain how the marketing function fits in with the overall business strategy. Once identified, the business must develop action plans with marketing objectives to turn strategy into reality."
  },
  // CRM Section
  {
    id: 61,
    topic: "CRM Definition",
    question: "What does CRM stand for?",
    options: [
      "Customer Relationship Management",
      "Consumer Relationship Management",
      "Corporate Resource Management",
      "Customer Retention Marketing"
    ],
    correctAnswer: 0,
    explanation: "CRM stands for Customer Relationship Management (also referred to as Consumer Relationship Management). It's an approach to manage a company's interaction with current and potential customers using data analysis."
  },
  {
    id: 62,
    topic: "Strategic CRM",
    question: "What does Strategic CRM concentrate on?",
    options: [
      "Only sales automation",
      "Development of a customer-centric business culture",
      "Only technology implementation",
      "Only data collection"
    ],
    correctAnswer: 1,
    explanation: "Strategic CRM concentrates on the development of a customer-centric business culture. It encompasses strategy development and answers questions like 'which customers do we serve?' and 'how do we deliver value?'"
  },
  {
    id: 63,
    topic: "Operational CRM Components",
    question: "Which is NOT a component of Operational CRM?",
    options: [
      "Sales force automation",
      "Marketing automation",
      "Service automation",
      "Financial accounting"
    ],
    correctAnswer: 3,
    explanation: "Operational CRM components include: Sales force automation, Marketing automation, and Service automation. Financial accounting is not a direct component of Operational CRM."
  },
  {
    id: 64,
    topic: "Analytical CRM",
    question: "What does Analytical CRM do?",
    options: [
      "Only stores customer names",
      "Analyses customer data from multiple sources to improve customer service",
      "Only handles sales",
      "Only manages emails"
    ],
    correctAnswer: 1,
    explanation: "Analytical CRM analyses customer data collected through multiple sources to help improve customer service. Analytics help find problems which are then solved accordingly."
  },
  {
    id: 65,
    topic: "CRM Advantages",
    question: "Which is an advantage of CRM?",
    options: [
      "Decreased customer service",
      "Improved customer services and increased personalized service",
      "Less customer knowledge",
      "More time wasted"
    ],
    correctAnswer: 1,
    explanation: "CRM advantages include: Improved customer services, Increased personalized (one-to-one) service, Customer segmentation, Improved marketing customization, Time saving, and Improved customer knowledge."
  },
  {
    id: 66,
    topic: "CRM in Practice",
    question: "Which is a CRM system in practice?",
    options: [
      "Only paper files",
      "Call centers, Contact-center automation, Social media, Location-based services",
      "Only email",
      "Only phone calls"
    ],
    correctAnswer: 1,
    explanation: "CRM systems in practice include: Call centers (personalized communication), Contact-center automation, Social media engagement, Location-based services (geographic campaigns), and B2B transaction integration."
  },
  {
    id: 67,
    topic: "CRM Criticisms",
    question: "Which is a criticism of CRM?",
    options: [
      "Always perfect implementation",
      "CRM technologies become ineffective without proper management",
      "No costs involved",
      "Always immediate results"
    ],
    correctAnswer: 1,
    explanation: "CRM criticisms include: Inadequate use of consumer connections, Difficulty translating data into action plans, Ineffectiveness without proper management, Customer dissatisfaction with wait times, Expensive/difficult implementation."
  },
  {
    id: 68,
    topic: "Customer Segmentation",
    question: "What is customer segmentation in CRM?",
    options: [
      "Treating all customers the same",
      "Categorizing customers according to similarities such as jobs, industries, etc.",
      "Ignoring customer differences",
      "Only segmenting by age"
    ],
    correctAnswer: 1,
    explanation: "Customer segmentation helps categorize customers according to similarities such as jobs, industries, etc. Subdividing customers based on known attributes further improves customer pricing and service."
  },
  {
    id: 69,
    topic: "Lead Management",
    question: "What does Lead Management in CRM do?",
    options: [
      "Ignores sales leads",
      "Keeps track of sales leads and their distribution, manages campaigns",
      "Only handles complaints",
      "Only manages existing customers"
    ],
    correctAnswer: 1,
    explanation: "Lead Management keeps track of sales leads and their distribution. It involves efficient campaign management, designing customized forms, and tracking lead progression through the sales funnel."
  },
  {
    id: 70,
    topic: "Digital Marketing Strategies",
    question: "Which is NOT a digital marketing strategy?",
    options: [
      "Email marketing",
      "Content marketing",
      "Telegraph marketing",
      "Video marketing"
    ],
    correctAnswer: 2,
    explanation: "Digital marketing strategies include: Email marketing, Content marketing, Video marketing, Mobile marketing. Telegraph marketing is not a digital marketing strategy."
  },
];

export default function App() {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: Array(questions.length).fill(null),
    showResults: false,
    quizCompleted: false,
    showConfirmation: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestion] = selectedAnswer;

    setState(prev => ({
      ...prev,
      answers: newAnswers,
      currentQuestion: prev.currentQuestion + 1,
    }));

    setSelectedAnswer(null);

    if (state.currentQuestion >= questions.length - 1) {
      setState(prev => ({ ...prev, quizCompleted: true }));
    }
  };

  const handlePreviousQuestion = () => {
    if (state.currentQuestion > 0) {
      setSelectedAnswer(state.answers[state.currentQuestion - 1]);
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmitQuiz = () => {
    const unansweredCount = state.answers.filter(a => a === null).length;
    if (unansweredCount > 0) {
      setState(prev => ({ ...prev, showConfirmation: true }));
    } else {
      calculateResults();
    }
  };

  const confirmSubmit = () => {
    calculateResults();
    setState(prev => ({ ...prev, showConfirmation: false }));
  };

  const cancelSubmit = () => {
    setState(prev => ({ ...prev, showConfirmation: false }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    state.answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setState(prev => ({ ...prev, showResults: true }));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const restartQuiz = () => {
    setState({
      currentQuestion: 0,
      answers: Array(questions.length).fill(null),
      showResults: false,
      quizCompleted: false,
      showConfirmation: false,
    });
    setSelectedAnswer(null);
    setTimeElapsed(0);
  };

  const currentQ = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;
  const answeredCount = state.answers.filter(a => a !== null).length;

  // Calculate results
  let correctCount = 0;
  state.answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correctCount++;
    }
  });
  const percentage = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                📚 Marketing Mastery Quiz
              </h1>
              <p className="text-sm text-gray-300 mt-1">University Level • {questions.length} Questions</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-green-400">⏱️ {formatTime(timeElapsed)}</div>
              <div className="text-sm text-gray-300">{answeredCount}/{questions.length} Answered</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!state.showResults ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Progress</span>
                <span className="text-yellow-400 font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {currentQ.topic}
                </span>
                <span className="text-gray-400 text-sm">Question {state.currentQuestion + 1} of {questions.length}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-6 leading-relaxed">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedAnswer === index
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-yellow-400 shadow-lg shadow-purple-500/30'
                        : 'bg-white/5 border-2 border-white/10 hover:border-purple-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        selectedAnswer === index
                          ? 'bg-yellow-400 text-purple-900'
                          : 'bg-white/20 text-white'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selectedAnswer === index && (
                        <span className="text-yellow-400 text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={state.currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  state.currentQuestion === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 border border-white/20'
                }`}
              >
                ← Previous
              </button>

              <div className="flex gap-3">
                {state.currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedAnswer === null
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30'
                    }`}
                  >
                    🏆 Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedAnswer === null
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30'
                    }`}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Question Navigator */}
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
              <div className="flex flex-wrap gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAnswer(state.answers[index]);
                      setState(prev => ({ ...prev, currentQuestion: index }));
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                      index === state.currentQuestion
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110 shadow-lg'
                        : state.answers[index] !== null
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Score Card */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-center shadow-2xl border border-green-400/30">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl text-green-100 mb-6">You've completed the Marketing Mastery Quiz!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-yellow-300">{correctCount}/{questions.length}</div>
                  <div className="text-green-100 mt-2">Correct Answers</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-yellow-300">{percentage}%</div>
                  <div className="text-green-100 mt-2">Score</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-yellow-300">{formatTime(timeElapsed)}</div>
                  <div className="text-green-100 mt-2">Time Taken</div>
                </div>
              </div>

              <div className="mt-8">
                {percentage >= 80 ? (
                  <div className="text-2xl font-bold text-yellow-300">🌟 Outstanding Performance! 🌟</div>
                ) : percentage >= 60 ? (
                  <div className="text-2xl font-bold text-yellow-300">👍 Great Job! Keep Learning! 👍</div>
                ) : (
                  <div className="text-2xl font-bold text-yellow-300">📚 Keep Studying! You Can Do Better! 📚</div>
                )}
              </div>
            </div>

            {/* Review Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                📋 Detailed Review
              </h3>
              
              <div className="space-y-6">
                {questions.map((q, index) => {
                  const userAnswer = state.answers[index];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl p-6 border-2 ${
                        isCorrect
                          ? 'bg-green-900/30 border-green-500/50'
                          : 'bg-red-900/30 border-red-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                          isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs bg-purple-600 px-2 py-1 rounded">{q.topic}</span>
                            <span className="text-sm text-gray-400">Q{index + 1}</span>
                          </div>
                          <h4 className="text-lg font-semibold mb-3">{q.question}</h4>
                          
                          <div className="space-y-2 mb-3">
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  optIndex === q.correctAnswer
                                    ? 'bg-green-600/50 border border-green-400'
                                    : optIndex === userAnswer && !isCorrect
                                    ? 'bg-red-600/50 border border-red-400'
                                    : 'bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{String.fromCharCode(65 + optIndex)}.</span>
                                  <span>{option}</span>
                                  {optIndex === q.correctAnswer && (
                                    <span className="text-green-400 ml-auto">✓ Correct</span>
                                  )}
                                  {optIndex === userAnswer && !isCorrect && (
                                    <span className="text-red-400 ml-auto">✗ Your Answer</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                            <div className="font-semibold text-blue-300 mb-2">💡 Explanation:</div>
                            <p className="text-gray-200">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Restart Button */}
            <div className="text-center">
              <button
                onClick={restartQuiz}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                🔄 Take Quiz Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {state.showConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-3xl p-8 max-w-md w-full border-2 border-red-500 shadow-2xl">
            <div className="text-6xl text-center mb-4">😤</div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-red-300">
              Go finish up the quiz you imbecile!
            </h2>
            <p className="text-center text-gray-300 mb-6">
              You have {questions.length - answeredCount} unanswered question(s). 
              Please complete all questions before submitting!
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelSubmit}
                className="flex-1 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all"
              >
                Go Back
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl font-bold transition-all"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>Marketing Mastery Quiz • University Level Assessment</p>
          <p className="text-sm mt-2">Topics: Digital Marketing, Buyer Behavior, Product Life Cycle, New Product Development, CRM & More</p>
        </div>
      </footer>
    </div>
  );
}
