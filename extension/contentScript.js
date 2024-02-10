(async () => { 
    function debounce(fn, delay) {
        let timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        };
      };
      
      
      let selection = "" //<- highlighted text

      document.addEventListener("selectionchange", debounce( async (event) => {
        //saved highlighted text from the broswer to selection
        selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();

        //check: print hightlighted text onto the broswer's console
        console.log(selection)
      }, 250));

      //send highlighted text to background script when right click is triggered
      document.addEventListener("contextmenu", async(event) => {
        console.log("a click is detected");
        if(event.button === 2){
            try{
                let response = await chrome.runtime.sendMessage({
                    context: "upload highlighted text",
                    content: selection
                });

                //output response
                console.log(response);
            }catch(err){
                console.log(err);
            }
        }
    })
})();
