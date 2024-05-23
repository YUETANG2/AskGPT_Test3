import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("geminiAPI", function (result) {
      let key = result.geminiAPI;
      if (key !== "") {
        resolve(key);
      } else {
        reject();
      }
    });
  });
};

async function run(prompt = "Write a story about a magic backpack.") {
  let apiKey = await getApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default run;
