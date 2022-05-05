export default class DraggableImage {
  constructor(imageSource, canvasContext, canvas) {
    this.image = new Image
    this.context = canvasContext
    this.canvas = canvas

    this.image.src = imageSource
    this.image.addEventListener("load", this.draw.bind(this))

    this.isDragging = false

    this.x = 0
    this.y = 0
    this.offset = {}
  }

  isMovementWithinCanvas(event) {
    if ((event.y - this.offset.y) < 0) {
      return false
    }

    if ((event.x - this.offset.x) < 0) {
      return false
    }

    if ((event.y - this.offset.y) + this.height > this.canvas.height) {
      return false
    }

    if ((event.x - this.offset.x) + this.width > this.canvas.width) {
      return false
    }

    return true
  }

  draw() {
    this.width = this.image.naturalWidth
    this.height = this.image.naturalHeight

    this.context.drawImage(this.image, this.x, this.y, this.width, this.height)

    if (this.isDragging) {
      this.context.strokeStyle = "green"
      this.context.strokeRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2)
    }
  }
}
