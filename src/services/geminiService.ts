import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
// You'll need to add your API key to the environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string[];
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  constructor() {
    // No need to initialize chat for single message generation
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log('API Key check:', apiKey ? 'Present' : 'Missing');
      
      if (!apiKey) {
        return 'API key not configured. Please create a .env file in your project root with: VITE_GEMINI_API_KEY=your_api_key_here';
      }

      console.log('Sending message to Gemini:', message);
      
      // Create a system prompt for context
      const prompt = `You are a helpful AI assistant for AidBridge, a platform that connects people who care with animals and communities that need immediate assistance. You help users with questions about animal rescue, volunteering, NGO partnerships, and general support. Be friendly, informative, and encouraging.

User message: ${message}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      console.log('Gemini response:', responseText);
      return responseText;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Handle quota exceeded error specifically
      if (error instanceof Error && error.message.includes('429')) {
        console.log('Rate limit exceeded, using fallback response');
        return this.getFallbackResponse(message);
      }
      
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      return 'Sorry, I encountered an error. Please try again later.';
    }
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Provide helpful fallback responses based on common questions
    if (lowerMessage.includes('help') || lowerMessage.includes('rescue') || lowerMessage.includes('animal')) {
      return "I'd be happy to help with animal rescue! AidBridge connects people who care with animals in need. You can submit a help request on our website, and our network of volunteers and NGOs will assist. Would you like to know more about our emergency response system?";
    }
    
    if (lowerMessage.includes('volunteer') || lowerMessage.includes('help out') || lowerMessage.includes('participate')) {
      return "Great! We're always looking for volunteers. You can sign up as a volunteer on our website to help with animal rescue, care, or support. We have opportunities for both hands-on work and remote support. Would you like to learn more about volunteer opportunities?";
    }
    
    if (lowerMessage.includes('ngo') || lowerMessage.includes('organization')) {
      return "AidBridge partners with verified NGOs to maximize our impact. Organizations can register with us to coordinate rescue efforts and access our volunteer network. Would you like information about NGO registration or partnerships?";
    }
    
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! I'm your AI assistant for AidBridge. I help connect people who care with animals and communities that need immediate assistance. How can I help you today?";
    }
    
    // Default helpful response
    return "Thanks for your message! I'm here to help with AidBridge services including animal rescue, volunteering, and NGO partnerships. Due to API rate limits, I'm currently using a simplified response system. Please visit our website for detailed information or try again in a few minutes.";
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const response = await this.sendMessage(userMessage);
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.';
    }
  }
}

// Create a singleton instance
export const geminiService = new GeminiService(); 