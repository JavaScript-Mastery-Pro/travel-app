import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

interface Suggestion {
  suggestion: string;
}

export default function TravelMatch() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const genAI = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        });
        const prompt = `Generate 5 travel suggestions based on the following: Past Travel: 'I have travelled to paris eifel tower, Budget: $1500, Interests: 'museum, music , travelling', Hobbies: 'playing music ,dancing'. Provide suggestions , Smart Itinerary Planning, Best Deal Finder, Expense Prediction & Budgeting, and Personalized Recommendations. Put each suggestion on a new line. Return the results in json format. The json format should be like this: [{"suggestion": "suggestion text"}]`;

        const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        let text = response.text;

        console.log("Raw API Response:", text); // Log the raw response

        if (text) {
          text = text.replace(/^```json\n/, "").replace(/```$/, "");

          try {
            const parsedSuggestions: Suggestion[] = JSON.parse(text);
            console.log("Parsed JSON:", parsedSuggestions); // Log the parsed JSON
            setSuggestions(
              parsedSuggestions.filter((s) => s.suggestion !== undefined)
            );
          } catch (e) {
            setError(
              "Error parsing JSON response from AI. Invalid JSON received."
            );
            console.error("Invalid JSON:", text, e);
          }
        } else {
          setError("No suggestions found.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="text-white">
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-dark-100">
            {suggestion.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
