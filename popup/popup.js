import {shortlink, copyStringToClipboard} from "../script/app.js"

chrome.management.getSelf(function(value){
    console.log(value)
})

chrome.storage.sync.get(['copy_on_click'], function(result){
    if(result.copy_on_click){
        chrome.tabs.query({active:true, lastFocusedWindow:true}, tabs=>{
            const url = new URL(tabs[0].url)
            copyStringToClipboard(shortlink(url))
        }) 
    }
})

document.getElementById("copy_button").addEventListener("click", function(){
    chrome.tabs.query({active:true, lastFocusedWindow:true}, tabs=>{
        const url = new URL(tabs[0].url)
        copyStringToClipboard(shortlink(url))
    }) 
})
