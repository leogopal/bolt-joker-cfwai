export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { message } = await request.json();

    const prompt = `You are a friendly joke bot. Generate a funny, clean joke related to: ${message}. If the message doesn't specify a topic, generate a random joke. Keep it family-friendly and return ONLY the joke, no additional text.`;

    try {
      const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
        messages: [
          { role: 'system', content: 'You are a friendly joke bot that tells clean, family-friendly jokes.' },
          { role: 'user', content: prompt }
        ]
      });

      return new Response(JSON.stringify({ response: response.response }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to generate joke' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}
