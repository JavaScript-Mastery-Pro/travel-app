export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;
  if (!month || !day || !year) {
    return dateString;
  }
  return `${month} ${day}, ${year}`;
};

export function parseMarkdownToJson(markdownText: string): any {
  const regex = /```json\n([\s\S]+?)\n```/;
  const match = markdownText.match(regex);

  if (match && match[1]) {
    try {
      const jsonObject = JSON.parse(match[1]);
      return jsonObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.error("No valid JSON found in markdown text.");
    return null;
  }
}
