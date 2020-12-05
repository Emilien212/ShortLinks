const checkbox = ["copy_on_click", "clipboard", "notification"]
for (const element of checkbox){
    chrome.storage.sync.get([element], function(items){
        document.getElementById(element).checked=items[element]
    })
}

for (const element of checkbox){
    document.getElementById(element).addEventListener('change', (event) => {
        chrome.storage.sync.set({ [element]: document.getElementById(element).checked})
      })
}

function cp_command(){
    chrome.storage.sync.get("clipboard_command", function(items){
        let string = ""
        if(items.clipboard_command.altKey){
            string+="Alt + "
        }if(items.clipboard_command.shiftKey){
            string+="Shift + "
        }if(items.clipboard_command.ctrlKey){
            string+="Ctrl + "
        }
        string+=items.clipboard_command.key.toUpperCase()
        document.getElementById("command").value = string
    })
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