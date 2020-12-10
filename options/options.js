import {shortlink, copyStringToClipboard, storage} from "../script/app.js"

const checkbox = ["copy_on_click", "clipboard", "notification", "int_point"]
async function check(){
    for (const element of checkbox){
        const object = await storage([element])
        document.getElementById(element).checked=object[element]
    }   
}
check()

for (const element of checkbox){
    document.getElementById(element).addEventListener('change', (event) => {
        chrome.storage.sync.set({ [element]: document.getElementById(element).checked})
      })
}

async function cp_command(){
    const item = await storage(['clipboard_command'])
    let string = ""
    if(item.clipboard_command.altKey){
        string+="Alt + "
    }if(item.clipboard_command.shiftKey){
        string+="Shift + "
    }if(item.clipboard_command.ctrlKey){
        string+="Ctrl + "
    }
    string+=item.clipboard_command.key.toUpperCase()
    document.getElementById("command").value = string
    
}
cp_command()

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