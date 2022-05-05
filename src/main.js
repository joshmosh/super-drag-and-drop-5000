import Canvas from "components/Canvas"

import catImage from "images/cat.png"
import dogImage from "images/dog.png"

import "./styles/main.scss"

const canvas = new Canvas("canvas")

canvas.drawImage(catImage)
canvas.drawImage(dogImage)
