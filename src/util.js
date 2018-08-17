import * as png from 'upng-js'
import jsQR from 'jsqr'
import jpeg from 'jpeg-js'

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

const getFileExt = (file) => {
	const parts = file.split('.')
	return parts[parts.length - 1].toLowerCase()
}

const getDataByExt = (imageData, ext) => {
	let dataDecoded
	const out = {
		data: null,
		width: 0,
		height: 0,
	}

	if (ext === 'png') {
		dataDecoded = png.decode(imageData)
		out.data = png.toRGBA8(dataDecoded)
	} 
	
	if (ext === 'jpg' || ext === 'jpeg') {
		dataDecoded = jpeg.decode(imageData, true)
		out.data = dataDecoded.data
	}

	out.width = dataDecoded.width
	out.height = dataDecoded.height
	return out
}

const decodeQRCodeByURL = (url) => {
	return new Promise((resolve, reject) => {
		const ext = getFileExt(url)

		if (ext !== 'png' && (ext !== 'jpg' || ext !== 'jpeg')) {
			reject('unsupported format')
		}

		convertImageURLToBlob(url)
			.then(convertBlobToBuffer)
			.then((buffer) => {
				const out = getDataByExt(buffer, ext)
				const code = jsQR(out.data, out.width, out.height)

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
		const ext = getFileExt(file.path)

		if (ext !== 'png' && (ext !== 'jpg' || ext !== 'jpeg')) {
			reject('unsupported format')
		}

		const imageData = fs.readFileSync(file.path)
		const out = getDataByExt(imageData, ext)
		const code = jsQR(out.data, out.width, out.height)

		if (code) {
			resolve(code)
		} else {
			reject()
		}
	})
}

export { decodeQRCodeByFile, decodeQRCodeByURL }
