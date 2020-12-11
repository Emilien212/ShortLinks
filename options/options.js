import {shortlink, copyStringToClipboard, storage} from "../script/app.js"

const checkbox = ["copy_on_click", "clipboard", "notification", "int_point", "blacklist"]
async function start(){
    for (const element of checkbox){
        const object = await storage([element])
        document.getElementById(element).checked=object
        document.getElementById(element).addEventListener('change', (event) => {
            chrome.storage.sync.set({ [element]: document.getElementById(element).checked})
        })
    }
    const blacklist_input = await storage(["blacklist_input"])
    document.getElementById("blacklist_input").value = blacklist_input.join(', ')
    const item = await storage(['clipboard_command'])
    let string = ""
    if(item.altKey){
        string+="Alt + "
    }if(item.shiftKey){
        string+="Shift + "
    }if(item.ctrlKey){
        string+="Ctrl + "
    }
    string+=item.key.toUpperCase()
    document.getElementById("command").value = string
}
start()

document.getElementById("command").addEventListener("keyup", function(e){
    document.getElementById("command").addEventListener("focus", function(){
        document.getElementById("command").value = ""
    })
    if(e.key!="Control" && e.key!="Alt" && e.key!="Shift" && e.key!="Backspace"){
        document.getElementById("clipboard").focus()
        chrome.storage.sync.set({ clipboard_command: {key : e.key, keyCode : e.code, altKey: e.altKey, shiftKey : e.shiftKey, ctrlKey: e.ctrlKey, keyCode : e.keyCode}})
        cp_command()
    }
}, false)

document.getElementById("blacklist_input").addEventListener("input", function(){
    const sites = []
    for(const site of document.getElementById("blacklist_input").value.split(',')){
        sites.push(site.trim())
    }
    chrome.storage.sync.set({blacklist_input : sites})
})
