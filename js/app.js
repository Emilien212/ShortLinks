function copyStringToClipboard(str) {
	const el = document.createElement('textarea')
	el.value = str
	el.setAttribute('readonly', '')
	el.style = { position: 'absolute', left: '-9999px' }
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
	const url = new URL(tabs[0].url);

	url.main_domain_name = url.host.match(/^(?:www\.)?(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|[a-z0-9][a-z0-9-]{0,61})(?:\.(?:[a-zA-Z]{2,}))?$/)[1]

	const except = ['youtube']

	if (except.includes(url.domaine_name)){
		console.log(url)
		copyStringToClipboard(url.href)
		console.log(url.href)
	}

	else if (url.main_domain_name === 'amazon') {
		console.log(url);
		const regex = new RegExp("/[a-zA-Z0-9]{10}", "i")
		console.log(url.pathname.match(regex))
		if (url.pathname.match(regex) != null){
			pathname = url.pathname.match(regex)
			shortlink = `${url.origin}/dp${pathname}`
		}else{
			console.log("null")
			shortlink = `${url.origin}`
		}
		copyStringToClipboard(shortlink)
		console.log(shortlink);
	}

	else{
		console.log(url);
		const origin = url.origin, pathname = url.pathname
		const shortlink = `${origin}${pathname}`
		copyStringToClipboard(shortlink)
		console.log(shortlink)
	}
});
