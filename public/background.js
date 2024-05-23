

//create AskGPT context manual
chrome.runtime.onInstalled.addListener(async () => {
      chrome.contextMenus.create({
        id: 'OpenAskGPT',
        title: "Open AskGPT",
        type: 'normal'
      });
      chrome.storage.local.set({
        'geminiAPI': ""
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
