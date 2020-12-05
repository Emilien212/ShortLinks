import {shortlink, copyStringToClipboard} from "../script/app.js"

chrome.runtime.onMessage.addListener(function(request, sender){
    chrome.management.getSelf(function(value){
        if(sender.id==value.id){
            chrome.storage.sync.get(['clipboard', 'clipboard_command'], function(item){
                if(item.clipboard){
                    if(request.altKey==item.clipboard_command.altKey && request.shiftKey==item.clipboard_command.shiftKey && request.ctrlKey==item.clipboard_command.ctrlKey && request.keyCode==item.clipboard_command.keyCode){
                        chrome.tabs.query({active:true, lastFocusedWindow:true}, tabs=>{
                            const url = new URL(tabs[0].url)
                            copyStringToClipboard(shortlink(url))
                        }) 
                    }
                }
            })
        }
    })
})