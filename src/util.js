import * as png from 'upng-js'
import jsQR from 'jsqr'

const fs = window.require('fs')

const convertImageURLToBlob = (url) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()

		request.open('GET', url, true)
		request.responseType = 'blob'
		request.onload = () => {
			resolve(request.response)
		}
		request.onerror = request.onabort = () => {
			reject()
		}

		request.send()
	})
}

const convertBlobToBuffer = (blob) => {
	const fileReader = new FileReader()

	return new Promise((resolve, reject) => {
		fileReader.onload = () => {
			resolve(
				Buffer.from(fileReader.result)
			)
		}
		
		fileReader.onerror = (event) => {
			reject(event.target.error.code)
		}
	
		fileReader.readAsArrayBuffer(blob)
	})
}

const decodeQRCodeByURL = (url) => {
	return new Promise((resolve, reject) => {
		convertImageURLToBlob(url)
			.then(convertBlobToBuffer)
			.then((arrayBufer) => {
				const data = png.decode(arrayBufer)
				const resultData = png.toRGBA8(data)

				const code = jsQR(resultData, data.width, data.height)
				if (code) {
					resolve(code)
				} else {
					reject()
				}
			})
	})
}

const decodeQRCodeByFile = (file) => {
	return new Promise((resolve, reject) => {
		const dataDecoded = png.decode(fs.readFileSync(file.path))
		const outData = png.toRGBA8(dataDecoded)

		const code = jsQR(outData, dataDecoded.width, dataDecoded.height)
		if (code) {
			resolve(code)
		} else {
			reject()
		}
	})
}

export { decodeQRCodeByFile, decodeQRCodeByURL }
