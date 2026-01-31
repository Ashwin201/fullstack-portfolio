import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/mongodb/database";
import About from "@/models/About";
import Experience from "@/models/Experience";
import Project from "@/models/Projects";

// Configure route segment for longer timeout (Pro plan: 60s, Hobby: 10s)
export const maxDuration = 60; // Maximum duration for Pro plan
export const runtime = 'nodejs';

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Fetch all portfolio data dynamically with timeout
async function fetchPortfolioData() {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Database query timeout')), 5000)
  );
  
  const dataPromise = (async () => {
    await connectToDb();
    
    const [aboutData, experienceData, projectData] = await Promise.all([
      About.find().lean().limit(1), // Limit to 1 about entry
      Experience.find().sort({ _id: -1 }).lean().limit(10), // Limit to 10 experiences
      Project.find().lean().limit(20), // Limit to 20 projects
    ]);

    return {
      about: aboutData,
      experience: experienceData,
      projects: projectData,
    };
  })();

  return Promise.race([dataPromise, timeoutPromise]) as Promise<{
    about: any[];
    experience: any[];
    projects: any[];
  }>;
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

    // Use Groq API (free tier, fast inference)
    // Get free API key from https://console.groq.com/
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "API key not configured", 
          response: "The AI service requires a free API key. Please add GROQ_API_KEY to your environment variables. Get a free key at https://console.groq.com/" 
        },
        { status: 500 }
      );
    }

    // Build conversation messages for the AI
    const conversationMessages = messages.slice(-20).map((msg: Message) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    // Prepare the system prompt with portfolio context
    const systemPrompt = `${context}\n\nNow, based on the above information, answer the user's question naturally in your own words. Do not copy-paste the information. Paraphrase and explain it conversationally.`;

    // Use Groq API with Llama 3.1 8B (free and very fast)
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    };

    // Add timeout for API call (15 seconds max)
    const apiTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('AI API timeout')), 15000)
    );

    const apiPromise = (async () => {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Free model on Groq - very fast
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationMessages,
          ],
          temperature: 0.9,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    })();

    const aiResponse = await Promise.race([apiPromise, apiTimeout]) as string;

    // Extract suggested questions if present in the AI response
    // Try multiple patterns to catch different formats
    let suggestedQuestions: string[] = [];
    let finalAiResponse = aiResponse;

    // Pattern 1: "If you want i can also help you with: \n[question 1]\n[question 2]"
    const pattern1 = /If you want i can also help you with:[\s\S]*?\n\s*([^\n]+)\n\s*([^\n]+)/i;
    const match1 = aiResponse.match(pattern1);
    
    // Pattern 2: Questions with bullet points
    const pattern2 = /If you want i can also help you with:[\s\S]*?[•\-\*]\s*([^\n]+)[\s\S]*?[•\-\*]\s*([^\n]+)/i;
    const match2 = aiResponse.match(pattern2);
    
    // Pattern 3: Just look for numbered or bulleted questions at the end
    const pattern3 = /(?:If you want|You might also|I can also help)[\s\S]*?[•\-\*1-2]\s*([^\n]+)[\s\S]*?[•\-\*1-2]\s*([^\n]+)/i;
    const match3 = aiResponse.match(pattern3);

    if (match1) {
      suggestedQuestions = [match1[1].trim(), match1[2].trim()];
      finalAiResponse = aiResponse.replace(match1[0], '').trim();
    } else if (match2) {
      suggestedQuestions = [match2[1].trim(), match2[2].trim()];
      finalAiResponse = aiResponse.replace(match2[0], '').trim();
    } else if (match3) {
      suggestedQuestions = [match3[1].trim(), match3[2].trim()];
      finalAiResponse = aiResponse.replace(match3[0], '').trim();
    } else {
      // If AI didn't provide suggested questions, generate them based on the user's question
      const userQuestion = lastMessage.content.toLowerCase();
      if (userQuestion.includes("project") || userQuestion.includes("work")) {
        suggestedQuestions = ["What technologies do you use?", "What's your experience?"];
      } else if (userQuestion.includes("skill") || userQuestion.includes("tech")) {
        suggestedQuestions = ["What projects have you worked on?", "What's your experience?"];
      } else if (userQuestion.includes("experience") || userQuestion.includes("job")) {
        suggestedQuestions = ["What projects did you work on?", "What technologies do you know?"];
      } else if (userQuestion.includes("contact") || userQuestion.includes("email")) {
        suggestedQuestions = ["What services do you offer?", "Can I see your resume?"];
      } else if (userQuestion.includes("service")) {
        suggestedQuestions = ["How can I contact you?", "What's your experience?"];
      } else {
        suggestedQuestions = ["Tell me about your projects", "What technologies do you use?"];
      }
    }

    return NextResponse.json({ 
      response: finalAiResponse, 
      suggestedQuestions 
    });
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

