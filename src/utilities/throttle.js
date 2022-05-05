let throttling

export default function throttle(callback, timeToWait) {
  if (throttling) return

  throttling = true

  setTimeout(() => {
    callback()

    throttling = false
  }, timeToWait)
}
