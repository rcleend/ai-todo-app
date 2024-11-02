import { Request, Response } from 'express';
import axios from 'axios';

export const getSuggestions = async (req: Request, res: Response) => {
  const { keyword } = req.body;
  try {
    // // Replace with your AI API call
    // const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
    //   prompt: `Suggest tasks related to: ${keyword}`,
    //   max_tokens: 50,
    //   n: 3,
    //   stop: null,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
    //   },
    // });

    // const suggestions = response.data.choices.map((choice: any) => choice.text.trim());
    const suggestions = ['Task 1', 'Task 2', 'Task 3'];

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI suggestions.' });
  }
}; 