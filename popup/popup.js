import {shortlink, copyStringToClipboard, storage} from "../script/app.js"

async function popup(){
    if(await storage(['copy_on_click'].copy_on_click)){
        chrome.tabs.query({active:true, lastFocusedWindow:true}, async tabs=>{
            const url = new URL(tabs[0].url)
            await copyStringToClipboard(await shortlink(url))
        }) 
    }
}
popup()


document.getElementById("copy_button").addEventListener("click", async function(){
    chrome.tabs.query({active:true, lastFocusedWindow:true}, async tabs=>{
        const url = new URL(tabs[0].url)
        await copyStringToClipboard(await shortlink(url))
    }) 
})