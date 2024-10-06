import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Define the type for the chat message
type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Function to generate chat completion
export async function generateChatCompletion(
  messages: ChatMessage[],
  model: string = "gpt-4o-mini"
) {
  try {
    // Filter out messages with null content
    const validMessages = messages.filter(msg => msg.content !== null);

    const completion = await openai.chat.completions.create({
      model: model,
      messages: validMessages,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    throw error;
  }
}

// Define the system prompts
export const systemPrompts = {
  blogPost: {
    formal: "You are an expert content writer specializing in creating formal, professional blog posts...",
    casual: "You are a friendly and approachable blogger with a knack for creating engaging, conversational content...",
    persuasive: "You are a skilled copywriter with expertise in crafting compelling blog posts...",
    informative: "You are an educational content creator specializing in clear, concise, and informative blog posts..."
  },
  socialMedia: {
    formal: "You are a professional social media manager for a corporate brand...",
    casual: "You are a trendy social media influencer known for your relatable and fun content...",
    persuasive: "You are a social media marketing expert specializing in conversion-oriented content...",
    informative: "You are a trusted source of information on social media..."
  },
  marketingCopy: {
    formal: "You are a professional copywriter for high-end, luxury brands...",
    casual: "You are a creative copywriter for youth-oriented brands...",
    persuasive: "You are an expert in direct response copywriting...",
    informative: "You are a technical copywriter specializing in product descriptions and features..."
  },
  email: {
    formal: "You are a professional email copywriter for corporate communications...",
    casual: "You are a friendly email marketer for a lifestyle brand...",
    persuasive: "You are an email marketing specialist focusing on sales and conversions...",
    informative: "You are an email content creator for an educational platform..."
  }
};

// Add this new function
export async function generateContent(
  userPrompt: string,
  systemPrompt: string,
  contentType: string
) {
  try {
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    const generatedContent = await generateChatCompletion(messages);
    if (!generatedContent) {
      throw new Error('No content generated');
    }
    return generatedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}