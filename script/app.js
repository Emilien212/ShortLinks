const blackList = [
	// exemple : 'www.youtube.com'
]

function shortlink(url) {
	// Si c'est un site blacklisté, on renvoit directement le lien
	if (blackList.some(blackListedSite => url.host === blackListedSite))
		return url.href

	// Si c'est un site amazon
	if (url.host.match(/www.amazon.(\w{2})/)) {
		// On remplace le pathname par uniquement le /dp/ABCDE12345
		const newPathname = url.pathname.replace(
			/^(?:\/.*)?\/(?:dp|gp\/product)\/([A-Z 0-9]{10}).*$/,
			'/dp/$1',
		)

		return `${url.origin}${newPathname}`
	}

	// Si c'est un site ebay
	if (url.host.match(/www.ebay.(\w{2})/)) {
		// On remplace le pathname par uniquement le /itm/ABCDEF123456
		const newPathname = url.pathname.replace(
			/^\/itm\/.*\/(\d{12})$/,
			'/itm/$1',
		)
		return `${url.origin}${newPathname}`
	}

	// Sinon
	switch (url.host) {
		// Youtube
		case 'www.youtube.com':
			// Supprime les "&feature=youtu.be" à la fin des urls
			// obtenus à partir d'un lien raccourci
			return `${url.origin}${url.pathname}${url.search.replace(
				/^(\?v=.*)&feature=youtu.be$/,
				'$1',
			)}`

		default:
			break
	}

	// Si ce n'est aucun site spécial, on enlève tout ce qu'il y après
	// le premier "?"
	return url.href.split('?')[0]
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
	chrome.storage.sync.get(['notification'], item => {
		if (item.notification) {
			chrome.notifications.create(
				'notification',
				{
					type: 'basic',
					iconUrl: './../assets/ShortLinks.png',
					title: 'ShortLinks',
					message: 'Link successfully shortened and copied !',
				},
				function () {},
			)
		}
	})
}

export { copyStringToClipboard, shortlink }
