export default function (fn) {
	let canRun = true
	return function () {
		if (!canRun) return
		canRun = false
		setTimeout(() => {
			fn.apply(this, arguments)
			canRun = true
		}, 1000)
	}
}