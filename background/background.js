import {shortlink, copyStringToClipboard, storage} from "../script/app.js"

chrome.runtime.onMessage.addListener(async function(request, sender){
    chrome.management.getSelf(async function(value){
        if(sender.id==value.id){
            const item = await storage(['clipboard', 'clipboard_command'])
            if(item.clipboard){
                if(request.altKey==item.clipboard_command.altKey && request.shiftKey==item.clipboard_command.shiftKey && request.ctrlKey==item.clipboard_command.ctrlKey && request.keyCode==item.clipboard_command.keyCode){
                    chrome.tabs.query({active:true, lastFocusedWindow:true}, async tabs=>{
                        const url = new URL(tabs[0].url)
                        await copyStringToClipboard(await shortlink(url))
                    }) 
                }
            }
            
        }
    })
})