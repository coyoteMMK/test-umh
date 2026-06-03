import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { text = '', numQuestions = 10, title = '', career = '', year = '', subject = '' } = body;

    const token = process.env.HF_API_TOKEN;
    const model = process.env.HF_MODEL || 'google/flan-t5-small';

    if (!token) {
      return new Response(JSON.stringify({ error: 'HF_API_TOKEN not configured in environment' }), { status: 500 });
    }

    const prompt = `Genera ${numQuestions} preguntas de opción múltiple a partir del siguiente texto. Devuélvelo exactamente en formato JSON sin explicaciones, con la estructura {"title":"...","career":"...","year":"...","subject":"...","questions":[{"q":"...","a":["...","...","..."],"answer":0}, ...] }.

Texto:\n${text}`;

    const hfResp = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 512 } }),
    });

    const hfData = await hfResp.json();

    // Try to extract the generated text from common HF responses
    let generated = '';
    if (Array.isArray(hfData) && hfData[0] && typeof hfData[0].generated_text === 'string') {
      generated = hfData[0].generated_text;
    } else if (typeof hfData.generated_text === 'string') {
      generated = hfData.generated_text;
    } else if (typeof hfData === 'string') {
      generated = hfData;
    } else {
      generated = JSON.stringify(hfData);
    }

    // Attempt to parse JSON substring from the model output
    const first = generated.indexOf('{');
    const last = generated.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      const jsonStr = generated.slice(first, last + 1);
      try {
        const parsed = JSON.parse(jsonStr);
        // Ensure required metadata present
        parsed.title = parsed.title || title || 'Generado';
        parsed.career = parsed.career || career || '';
        parsed.year = parsed.year || year || '';
        parsed.subject = parsed.subject || subject || '';
        return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (e) {
        // fallthrough
      }
    }

    return new Response(JSON.stringify({ error: 'no_json', raw: generated }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

export default POST;
