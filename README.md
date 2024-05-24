# Ask Genie

# Installation
- Clone repo to your machine
- `npm i`
- `npm run build`
- Go to chrome extension in your browser
- Click on "Manage Extension"
- Click on "Load Unpacked" and select the build folder

## Inspiration
Imagine a world where answers are just a click away, effortlessly woven into your browsing experience. Inspired by the frustration of constantly toggling between tasks, we crafted a game-changing Chrome extension chat box. No more disruptions, no more wasted time - just instant access to AI-powered insights, seamlessly integrated into your browser. Our innovation transforms the way users engage with information, providing unparalleled convenience with a simple highlight-and-inquire feature. Say goodbye to the hassle of navigating to external sources; say hello to a smarter, more efficient browsing experience. Our solution is not just a chatbox; it's a bridge to instant knowledge, always within reach, anytime, anywhere.

## What it does
What it does is allow users to open our AI-powered chat box (a side panel) through the context menu, as well as instantly prompt web content into the chat box through the context menu. It helps speed up users' learning and troubleshooting processes and provides a smoother workflow.

## How we built it
- Chrome Extension Framework
- React.js
- Tailwind CSS
- Gemini API
- Chrome API

## Challenges we ran into
- Integration Hurdle with React
- When using the React framework to build our Chrome extension, we discovered that the side panel, constructed with React, lacked access to the browser's contents—a crucial feature for our project. To address this challenge, we delved into the Chrome extension documentation and refactored our React files. We incorporated service-worker.js and content-scripts.js, successfully establishing a communication bridge between the side panel and the Chrome browser.
- When developing the UI with tailwind, chrome extension development tool doesn't support live updates. We have to constantly write "npm run build" and re-upload the folder to test out our changes.
- Multiple consoles to check out error messages (popup.js, sidepanel.js, servide-workers.js each has a console)

## Accomplishments that we're proud of
- It's us first time building a Chrome Extension with React.JS! Our team was able navigate obsurness incompatibility issues between react and the chrome extension framework.
- There was a lot of pervious examples that uses react to build the chrome extension for us to follow, we are proud that we tried to be optimistics despite limited resources to eventually finish the project.

## What we learned
- Build a Chrome Extension!

## What's next for AskGenie
- What sets our project apart is the vision for the next phase: we aim to empower users by summarizing their conversations into concise, user-friendly bullet points. This invaluable feature ensures that users can effortlessly revisit and reference their past interactions, eliminating the need to repeat questions. Our chatbox becomes a personalized knowledge repository, allowing users to build on their insights and experience a streamlined information retrieval process. It's not just about answering questions instantly; it's about creating a seamless and intelligent knowledge-sharing experience for the user, revolutionizing the way we navigate and learn in the digital landscape.
