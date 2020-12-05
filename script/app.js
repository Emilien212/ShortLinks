function shortlink(url){
    if(url.host.includes("amazon")){
        const ID = url.pathname.match(/(dp|gp\/product)\/([A-Z 0-9]{10})/)[0]
        const shorturl = url.origin + "/" + ID.replace("gp/product", "dp")
        return shorturl
    }else if(url.host.includes("ebay")){
        const ID = url.pathname.match(/([0-9]{12})/)[0]
        const shorturl = url.origin + "/itm/" + ID
        return shorturl
    }else if(url.host.includes("youtube")){
        return url.href
    }else{
        const shorturl = url.href.split('?')[0]
        return shorturl
    }
}

function copyStringToClipboard(str) {
	const el = document.createElement('textarea')
	el.value = str
	el.setAttribute('readonly', '')
	el.style = { position: 'absolute', left: '-9999px' }
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
    document.body.removeChild(el)
    chrome.storage.sync.get(['notification'], function(item){
        if(item.notification){
            chrome.notifications.create("notification", {type: "basic", iconUrl : "./../assets/ShortLinks.png", title: "ShortLinks", message: "Link successfully shortened and copied !"}, function(){})
        }
    })
}

export {copyStringToClipboard, shortlink}