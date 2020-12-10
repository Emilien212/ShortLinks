function storage(key) {
    return new Promise(resolve => {
        chrome.storage.sync.get(key, function(item){
            resolve(item)
        })
    })
}


async function shortlink(url){
    const blacklist = []

    if (blacklist.some(blacklisted => url.host === blacklisted)){
        return url.href
    }
    if(url.host.match(/www.amazon.(\w{2})/)){
        const ID = url.pathname.match(/(dp|gp\/product)\/([A-Z 0-9]{10})/)[0]
        const shorturl = url.origin + "/" + ID.replace("gp/product", "dp")
        return shorturl
    }
    if(url.host.match(/www.ebay.(\w{2})/)){
        const ID = url.pathname.match(/([0-9]{12})/)[0]
        const shorturl = url.origin + "/itm/" + ID
        return shorturl
    }
    switch(url.host){
        case 'www.youtube.com':
            if(url.search.match(/(?<=\?v\=).+?(?=&|$)/)!=null){
                const shorturl = `https://youtu.be/${url.search.match(/(?<=\?v\=).+?(?=&|$)/)[0]}`
                return shorturl
            }else{
                const shorturl = url.href.replace('&feature=youtu.be', '')
                return shorturl
            } 
    }
    if(await storage(["int_point"]).int_point){   
        return url.href.split('?')[0]
    }
    else{
        return url.href
    }
}

async function copyStringToClipboard(str) {
	const el = document.createElement("textarea")
	el.value = str
	el.setAttribute('readonly', '')
	el.style = {display: 'none'}
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
    document.body.removeChild(el)
    if (await storage(['notification']).notification){
        chrome.notifications.create("notification", {type: "basic", iconUrl : "./../assets/ShortLinks.png", title: "ShortLinks", message: "Link successfully shortened and copied !"}, function(){})
    }
}

export {copyStringToClipboard, shortlink, storage}