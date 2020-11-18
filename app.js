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
const copyTriangle = document.getElementById('triangle')

button.addEventListener('click', showHide)

function showHide() {
	copyMcServerUrl()
	copyResult.classList.add('show')
	copyTriangle.classList.add('show')
	setTimeout(() => {
		console.log('timeout!')
		copyResult.classList.remove('show')
		copyTriangle.classList.remove('show')
	}, 1000)
}