import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful AI assistant. Provide clear, concise responses."
        },
        ...messages
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

export const generateFollowUpQuestions = async (conversation) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Generate 3 relevant follow-up questions based on the conversation. Format as a JSON array of strings."
        },
        {
          role: "user",
          content: `Generate follow-up questions for this conversation: ${JSON.stringify(conversation)}`
        }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
  } catch (error) {
    console.error('Error generating follow-up questions:', error);
    return [];
  }
};
