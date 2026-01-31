import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/mongodb/database";
import About from "@/models/About";
import Experience from "@/models/Experience";
import Project from "@/models/Projects";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Fetch all portfolio data dynamically
async function fetchPortfolioData() {
  await connectToDb();
  
  const [aboutData, experienceData, projectData] = await Promise.all([
    About.find().lean(),
    Experience.find().sort({ _id: -1 }).lean(),
    Project.find().lean(),
  ]);

  return {
    about: aboutData,
    experience: experienceData,
    projects: projectData,
  };
}

// Format portfolio data into a context string for AI
function formatPortfolioContext(data: any): string {
  let context = "You are an AI assistant helping visitors learn about a full stack developer's portfolio. This is a FULL STACK PORTFOLIO showcasing both frontend and backend development skills. Here's the information:\n\n";

  // About information
  if (data.about && data.about.length > 0) {
    const about = data.about[0];
    context += "ABOUT:\n";
    if (about.title) context += `Title: ${about.title}\n`;
    if (about.role) context += `Role: ${about.role}\n`;
    if (about.shortDesc) context += `Short Description: ${about.shortDesc}\n`;
    if (about.totalExperience) context += `Total Experience: ${about.totalExperience}\n`;
    if (about.totalProjects) context += `Total Projects: ${about.totalProjects}\n`;
    if (about.description && Array.isArray(about.description)) {
      context += `Description: ${about.description.join(" ")}\n`;
    }
    if (about.resume) context += `Resume: ${about.resume}\n`;
    context += "\n";
  }

  // Experience information
  if (data.experience && data.experience.length > 0) {
    context += "WORK EXPERIENCE:\n";
    data.experience.forEach((exp: any, index: number) => {
      context += `${index + 1}. ${exp.role || "Role"} at ${exp.company || "Company"}\n`;
      if (exp.duration) context += `   Duration: ${exp.duration}\n`;
      if (exp.description && Array.isArray(exp.description)) {
        context += `   Description: ${exp.description.join(" ")}\n`;
      }
    });
    context += "\n";
  }

  // Projects information
  if (data.projects && data.projects.length > 0) {
    context += "PROJECTS:\n";
    data.projects.forEach((project: any, index: number) => {
      context += `${index + 1}. ${project.title || "Project"}\n`;
      if (project.description) context += `   Description: ${project.description}\n`;
      if (project.category) context += `   Category: ${project.category}\n`;
      if (project.technology && Array.isArray(project.technology)) {
        context += `   Technologies: ${project.technology.join(", ")}\n`;
      }
      if (project.feature && Array.isArray(project.feature)) {
        context += `   Features: ${project.feature.join(", ")}\n`;
      }
      if (project.github) context += `   GitHub: ${project.github}\n`;
      if (project.live) context += `   Live Demo: ${project.live}\n`;
    });
    context += "\n";
  }

  // Skills information (Static data)
  context += "SKILLS & TECHNOLOGIES:\n";
  context += "Frontend Development: HTML, CSS, Javascript, React, Next.js, Bootstrap, Tailwind CSS, Shadcn UI, Redux Toolkit, Zustand, Zod, React Native\n";
  context += "Backend Development: Node.js, Express.js, Next.js, MongoDB, Prisma\n";
  context += "Tools & Technologies: Git, GitHub, Docker, Postman, AWS\n";
  context += "\n";

  // Services information (Static data)
  context += "SERVICES OFFERED:\n";
  context += "1. Quick Load Website: Ensuring swift website loading times, seamless interaction without lag, and delivering an optimal user experience.\n";
  context += "2. Cross-Device Compatible: Websites designed to be compatible with various resolutions including desktops, tablets, and mobile devices, ensuring a seamless user experience across different platforms.\n";
  context += "3. Web Designs: Specialize in creating customized, interactive, and visually appealing designs to meet preferences and needs.\n";
  context += "4. Search Engine Optimization (SEO): Proficient in delivering websites that are highly optimized for search engines, ensuring optimal visibility and performance.\n";
  context += "\n";

  // Contact information (Static data)
  context += "CONTACT INFORMATION:\n";
  context += "Email: ashminsharma203@gmail.com\n";
  context += "Social Links:\n";
  context += "- Instagram: https://instagram.com/ashmin_sharma_\n";
  context += "- GitHub: https://github.com/Ashwin201\n";
  context += "- LinkedIn: https://www.linkedin.com/in/ashmin-sharma-6a4867257\n";
  context += "\n";

  context += "\n\nIMPORTANT INSTRUCTIONS:\n";
  context += "- Answer ONLY what is asked - be direct and concise, no unnecessary information\n";
  context += "- Do NOT copy-paste or quote the information verbatim\n";
  context += "- Do NOT say 'click here' or 'click this link' - just provide the link directly and it will be clickable\n";
  context += "- When providing links, include the full URL directly in your response\n";
  context += "- Use bullet points (• or -) ONLY when listing items that need clarity, such as:\n";
  context += "  * When listing project names (e.g., 'How many projects do you have?')\n";
  context += "  * When listing work experiences or job roles\n";
  context += "  * When listing skills or technologies\n";
  context += "  * When listing services offered\n";
  context += "  * When providing any numbered or named lists\n";
  context += "- For regular conversational answers, write in plain, flowing paragraphs\n";
  context += "- Use bold text for titles/headings by wrapping them in **text** format\n";
  context += "- Paraphrase and explain the information in a conversational, friendly manner\n";
  context += "- Be concise - answer the question directly without extra fluff\n";
  context += "- If asked about something not in the portfolio, politely say you don't have that information\n";
  context += "- At the END of your response ONLY, add exactly 2 relevant suggested questions\n";
  context += "- Format suggested questions like this (on separate lines, no title, just the questions):\n";
  context += "  If you want i can also help you with: \n";
  context += "  [question 1]\n";
  context += "  [question 2]\n";
  context += "- Only add suggested questions at the very end, not in the middle of your response\n";
  context += "- Make the questions short, natural, and relevant to the conversation\n";
  context += "- Use the context above to inform your answers, but express everything in your own natural language";

  return context;
}

export async function POST(req: NextRequest) {
  let lastMessage: Message | null = null;
  let portfolioData: any = null;
  
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Fetch all portfolio data dynamically
    portfolioData = await fetchPortfolioData();
    const context = formatPortfolioContext(portfolioData);

    // Get the last user message
    lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Check if Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "API key not configured", 
          response: "The AI service is not configured. Please contact the administrator." 
        },
        { status: 500 }
      );
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use only gemini-3-flash-preview model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: {
        temperature: 0.9, // Higher temperature for more natural, varied language
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Convert messages to the format expected by Gemini
    const conversationHistory = messages.slice(-20).map((msg: Message) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Include context with the conversation
    // For first message, prepend context to the first user message
    // For follow-ups, prepend context to maintain awareness of portfolio data
    const firstUserMessage = conversationHistory.find((msg) => msg.role === "user");
    if (firstUserMessage) {
      if (messages.length === 1) {
        // First message - include full context with instructions
        firstUserMessage.parts[0].text = `${context}\n\nNow, based on the above information, answer the user's question naturally in your own words. Do not copy-paste the information. Paraphrase and explain it conversationally:\n\n${firstUserMessage.parts[0].text}`;
      } else {
        // Follow-up messages - include context reminder to maintain awareness
        firstUserMessage.parts[0].text = `${context}\n\n[Continue the conversation using the portfolio information above. Answer naturally in your own words, not by copying the text. Previous messages are below for context.]\n\n${firstUserMessage.parts[0].text}`;
      }
    }

    const result = await model.generateContent({
      contents: conversationHistory,
    });

    const response = await result.response;
    const aiResponse = response.text();

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("Error in ask-ai route:", error);
    console.error("Error details:", error.message, error.stack);
    
    return NextResponse.json(
      { 
        error: "Failed to process request", 
        response: "I'm experiencing technical difficulties. Please try again later." 
      },
      { status: 500 }
    );
  }
}

