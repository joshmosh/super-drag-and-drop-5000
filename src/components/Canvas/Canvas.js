import DraggableImage from "components/DraggableImage"

import { CANVAS_CONFIG } from "./helpers/constants"

import throttle from "utilities/throttle"

export default class Canvas {
  constructor(selector) {
    this.canvas = document.getElementById(selector)
    this.context = this.canvas.getContext("2d")
    this.elements = []

    this.width = this.canvas.width
    this.height = this.canvas.height

    this.resize()

    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this))

    window.addEventListener("resize", () => {
      throttle(this.resize.bind(this), 150)
    })
  }

  resize() {
    const maximumHeight = window.innerWidth / CANVAS_CONFIG.ASPECT_RATIO

    if (maximumHeight >= window.innerHeight) {
      this.canvas.height = window.innerHeight
      this.canvas.width = canvas.height * CANVAS_CONFIG.ASPECT_RATIO
    } else {
      this.canvas.width = window.innerWidth
      this.canvas.height = maximumHeight
    }

    this.width = this.canvas.width
    this.height = this.canvas.height

    this.redraw()
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  redraw() {
    this.clear()

    this.elements.forEach((element) => {
      element.draw()
    })
  }

  drawImage(imageSource) {
    const draggableImage = new DraggableImage(imageSource, this.context, this.canvas)

    this.elements.push(draggableImage)
  }

  mouseDown(event) {
    this.selectedElement = this.#getSelectedElement(event)

    if (this.selectedElement) {
      this.canvas.addEventListener("mousemove", this.mouseMove.bind(this))
      this.canvas.addEventListener("mouseup", this.mouseUp.bind(this))

      const index = this.elements.indexOf(this.selectedElement)

      if (index >= 0) {
        this.elements.splice(index, 1)
        this.elements.push(this.selectedElement)
      }

      this.selectedElement.isDragging = true

      this.selectedElement.offset = {
        x: event.x - this.selectedElement.x,
        y: event.y - this.selectedElement.y
      }

      this.redraw()
    }
  }

  mouseMove(event) {
    if (this.selectedElement && this.selectedElement.isDragging) {
      if (this.selectedElement.isMovementWithinCanvas(event)) {
        this.selectedElement.y = event.y - this.selectedElement.offset.y
        this.selectedElement.x = event.x - this.selectedElement.offset.x
      }

      this.redraw()
    }
  }

  mouseUp() {
    if (this.selectedElement) {
      this.selectedElement.isDragging = false
    }

    this.redraw()
  }

  #getSelectedElement(event) {
    for (let i = (this.elements.length - 1); i >= 0; i--) {
      const element = this.elements[i]

      const mouseInElement =
        event.x >= element.x &&
        event.x <= element.x + element.width &&
        event.y >= element.y &&
        event.y <= element.y + element.height

      if (mouseInElement) {
        return element
      }
    }
  }
}
