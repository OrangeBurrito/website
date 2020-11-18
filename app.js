console.log('app.js')

function copyMcServerUrl() {
	let serverUrl = 'mc.radrealms.com'
	const listener = function (e) {
		e.preventDefault()
		e.clipboardData.setData('text/plain', serverUrl)
	}

	document.addEventListener('copy', listener)
	document.execCommand('copy')
	document.removeEventListener('copy', listener)
	document.getElementById('copied').style.display = "block";
}

const button = document.querySelector('button')
const copyResult = document.getElementById('copied')


button.addEventListener('click', showHide)

function showHide() {
	console.log('tada!')
	copyResult.classList.add('show')
	setTimeout(() => {
		console.log('timeout!')
		copyResult.classList.remove('show')
	}, 2000)
}