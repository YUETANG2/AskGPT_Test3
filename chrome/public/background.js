/*const url = "https://esm.run/@google/generative-ai";

async function loadModuleFromURL(url) {
    try {
      const file = await fetch(url);
      // Do something with the imported module
      const scriptCode = await response.text();
      return eval(scriptCode)
    } catch (error) {
      console.log(error);
    }
}

let chat;
let counter = 0;

async function getChat() {
    const GoogleGenerativeAI = await loadModuleFromURL(url)

    // Access your API key (see "Set up your API key" above)
    let API_KEY = "AIzaSyAN9bDdVHlKGvez3DkZitnB5H6Zo5pQXCY";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    return model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
}


let askGPT = async(question) => {
  if(counter == 0){
    chat = await getChat();
    counter++;
  }

  // For text-only input, use the gemini-pro model
  const result = await chat.sendMessage(question);
  const response = await result.response;
  const text = response.text();
  return text;
}

chrome.runtime.onMessage.addListener(
   async function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");

      if (request.context === "upload highlighted text"){
        try{
            let answer = await askGPT(request.content + "\nElaborate more on this")
            sendResponse(answer);
        }catch(err){
            console.log(err);
        }
      }
      
        /*console.log("message received");
        sendResponse(request.content + "I have read your content~");
        
    }
); 
*/

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Access your API key (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();



//create AskGPT context manual
chrome.runtime.onInstalled.addListener(async () => {
      chrome.contextMenus.create({
        id: 'OpenAskGPT',
        title: "Open AskGPT",
        type: 'normal'
      });
});

//open side panel (our AskGPT chatbox page)
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("Try to open AskGPT")
    console.log(info);
    if(info.menuItemId == 'OpenAskGPT') {
        chrome.sidePanel.open({ windowId: tab.windowId });
    }
});
