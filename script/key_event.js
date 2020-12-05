if (window == top) {
    window.addEventListener('keyup', function(e){
        chrome.runtime.sendMessage({key : e.key, keyCode : e.code, altKey: e.altKey, shiftKey : e.shiftKey, ctrlKey: e.ctrlKey, keyCode : e.keyCode})
    }, false)
}
    