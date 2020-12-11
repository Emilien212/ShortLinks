import {shortlink, copyStringToClipboard, storage} from "../script/app.js"

chrome.runtime.onMessage.addListener(async function(request, sender){
    chrome.management.getSelf(async function(value){
        if(sender.id==value.id){
            const item = await storage(['clipboard_command'])
            if(await storage(['clipboard'])){
                if(request.altKey==item.altKey && request.shiftKey==item.shiftKey && request.ctrlKey==item.ctrlKey && request.keyCode==item.keyCode){
                    chrome.tabs.query({active:true, lastFocusedWindow:true}, async tabs=>{
                        const url = new URL(tabs[0].url)
                        await copyStringToClipboard(await shortlink(url))
                    }) 
                }
            }
            
        }
    })
})