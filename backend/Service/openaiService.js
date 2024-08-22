import OpenAI from 'openai';

//we need to get the messages from frontend
const getAiResponse = async (model, message) => {
  //send the message to openai and retrieve ai response, send it back to frontend
  const response = await chatCompletion(message);
  return response;
}

//send message to openai
const chatCompletion = async (message) => {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: message
  });

  return completion.data.choices[0].message.content;
}

//return the message
module.exports = { getAiResponse };
