export interface MultimediaItem {
    id: number;
    title: string;
    type: 'video' | 'podcast';
    thumbnail: string;
    description: string;
    url: string;
    duration: string;
    date: string;
  }
  
  export const multimediaContent: MultimediaItem[] = [
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      type: "podcast",
      thumbnail: "/aiinhealth.jpg",
      description: "Exploring the potential impact of AI on medical diagnoses and treatment plans.",
      url: "https://youtu.be/GouqY6Kicj4?si=MGeq-5y9qHILjwIr",
      duration: "45:30",
      date: "2023-05-15"
    },
    {
      id: 2,
      title: "5G Technology Explained",
      type: "video",
      thumbnail: "/5gtech.png",
      description: "A comprehensive overview of 5G technology and its applications.",
      url: "https://youtu.be/RdO5uV2boag?si=OfZQyuRuROqKkuEp",
      duration: "12:45",
      date: "2023-05-10"
    },
    {
      id: 3,
      title: "The Rise of Quantum Computing",
      type: "podcast",
      thumbnail: "/quantumc.jpg",
      description: "An introduction to quantum computing and its potential applications.",
      url: "https://youtu.be/AVYRW9Qdp7Q?si=x0b4cYPIAKsYuDuh",
      duration: "37:20",
      date: "2023-06-12"
    },
    {
      id: 4,
      title: "Exploring the Metaverse",
      type: "video",
      thumbnail: "/metavserse.webp",
      description: "A visual dive into the metaverse and its implications on society.",
      url: "https://youtu.be/M4RWAvSmcEA?si=Qw5Psi_Wscx4bNsT",
      duration: "15:30",
      date: "2023-06-22"
    },
    {
      id: 5,
      title: "Space Exploration: The Next Frontier",
      type: "podcast",
      thumbnail: "/space.jpeg",
      description: "Discussing humanity's future in space exploration and colonization.",
      url: "https://youtu.be/Z_3ariM_qQ0?si=S4Qmr9wH07NkAse-",
      duration: "42:10",
      date: "2023-07-05"
    },
    {
      id: 6,
      title: "Blockchain Beyond Bitcoin",
      type: "video",
      thumbnail: "/blockchain.jpeg",
      description: "How blockchain technology can revolutionize industries beyond cryptocurrency.",
      url: "https://youtu.be/auhWoh030EI?si=ZcEPYWsVJIQ8m0Oi",
      duration: "20:40",
      date: "2023-07-10"
    },
    {
      id: 7,
      title: "The Future of Autonomous Vehicles",
      type: "podcast",
      thumbnail: "/futureofvehicles.jpeg",
      description: "Examining the rise of self-driving cars and the future of transportation.",
      url: "https://youtu.be/4aDyIKRcsvY?si=CW4RPA6lG_eBNMhW",
      duration: "38:50",
      date: "2023-07-25"
    },
    {
      id: 8,
      title: "The Ethics of Artificial Intelligence",
      type: "podcast",
      thumbnail: "/ethics.png",
      description: "Discussing the moral implications of AI development and deployment.",
      url: "https://www.youtube.com/live/kyIf3OwcC9c?si=uUI6Fiu3A9OE9re2",
      duration: "52:15",
      date: "2023-04-01"
    },
    {
      id: 9,
      title: "Virtual Reality in Education",
      type: "video",
      thumbnail: "/arineducation.jpeg",
      description: "Exploring how virtual reality is changing the landscape of education.",
      url: "https://youtu.be/XGkWh4v1hCE?si=7lB2XpiO-OjgyzC5",
      duration: "18:25",
      date: "2023-08-03"
    },
    {
      id: 10,
      title: "AI in Creative Industries",
      type: "podcast",
      thumbnail: "/aiincreativeindustries.png",
      description: "Exploring how AI is transforming the art, music, and entertainment industries.",
      url: "https://youtu.be/D384LUbMyxE?si=EiybTWqnvl8r9YZc",
      duration: "40:50",
      date: "2023-08-15"
    },
    {
      id: 11,
      title: "The Role of AI in Climate Change Solutions",
      type: "video",
      thumbnail: "/aiinclimate.jpg",
      description: "How AI can be leveraged to combat climate change and its impacts.",
      url: "https://youtu.be/FqGo5ZabqUI?si=B4GViJXuRPAI1qsJ",
      duration: "22:30",
      date: "2023-08-22"
    },
    {
      id: 12,
      title: "The Impact of Artificial Intelligence on Job Markets",
      type: "podcast",
      thumbnail: "/roleofai.jpeg",
      description: "A look at how AI is influencing employment and job markets around the world.",
      url: "https://youtu.be/q8WFARwA4NQ?si=Vm8Nmzz40ejpskOf",
      duration: "41:10",
      date: "2023-09-01"
    }
  ];
  