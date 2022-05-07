# Super Drag and Drop 5,000

Super Drag and Drop 5,000 is a simple application that uses the `<canvas>` HTML tag and JavaScipt. The purpose of this application is to demonstrate an understanding of how canvas, images, and user interaction all work together.

## Dependencies

- NodeJS
- Yarn Package Manager

### Installing Node JS

This applcation uses NodeJS to bundle front-end assets. To run this application you'll need to install Node one of the following ways:

- A Node version manager (⭐️ Recommended)
  - [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
  - [asdf](https://asdf-vm.com)
- [Node.js website](https://nodejs.org/en/)

### Installing Yarn

Once NodeJS is installed you'll want to install [Yarn Package Manger](https://yarnpkg.com). This application uses Yarn Package Manger to manage it's dependencies.

Head over to the [Yarn installation page](https://yarnpkg.com/getting-started/install) for more instructions on setting up Yarn.

## Running the Application

First make sure you have all the project dependencies installed by running:

```
yarn
```

Once the dependencies are installed you can start the application by running the following command:

```
yarn start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

That's it! 🙌 The `start` command will run a build script to ensure the front-end assets are compiled and then start up a local web server.

## Availiable Commands

- `yarn start` - Bundles assets and starts a local web server
- `yarn build` - Bundle assets
- `yarn dev` - Watches assets and starts a webpack development server.

## Technical Decisions

Before deciding on the final architecture for this web application I experimented with using React for rendering views. This added an extra layer of complexity to interacting with the canvas so I decided to stick to plain old ES6 classes.

### Webpack

Webpack was chosen as the asset bundler of choice to provide a base convention for organizing the code in this project. Webpack provided me with a local development server that refreshed itself when working on the project to speed up development time. This was great because after setting up the webpack configuration I was able to organize the `src` folder in the project in a way that made sense for solving the problem as well as having a base convetion to extend with more features.

### ES6 Classes

Like I mentioned before I chose to use plain ES6 classes to manage the canvas as well as the images being rendered to the canvas stage. I've never worked with canvas before this project so creating basic classes removed any extra complexities that frameworks like React or Vue might have introduced.

Since I'm using webpack to bundle these classes I settled with the following structure:

- `src/components` - Each component lives in this folder and uses an index.js file to keep imports clean and easy to read. Having components live in their own folder also allows me to group related utilities or helpers. This also would allow something like redux to be introduced in the future if needed.
- `src/images` - All image assets should be placed here. I added an alias to the webpack config to make it easier to import these images when needed.
- `src/utilities` - Small functional utilities that are not speicifc to one component live here. Just like the images folder, the utilities folder has an alias in the webpack config to make imports clean and easy to read.

### Development Decisions

Finally I chose to implement an event listener when the page was resized to also resize the canvas stage. The `Canvas` component manages this and the aspect ratio is calculated on each resize event as well. I created a very simple throttle utility that is used with the resize event. The purpose of this utility is to limit the amount of redrawing the canvas has to do when the browser is resized.

The `DraggableImage` class really shines here because it keeps track of it's positioning when rendered. This made it easier for collision detecting when I wanted to make sure the image couldn't be dragged outside of the canvas stage.

One of the last things I considered implmenting was either scaling the rendered image or moving then when the canvas stage is resized. Ultimately I didn't implement this because I was plesently surprised with the `isMovementWithinCanvas` method that I created on the `DraggableImage` class. I noticed when I was resizing the canvas that my logic holds up and allows you to move a partially out of bounds image back to the stage. I thoght it was a cool side effect.

## Questions from the original README

### How long did it take you to complete this assignment?

4 - 5 hours

Like I mentioned before I have never worked with the HTML `<canvas>` tage before so I needed some time to study and familirize myself.

### What about this assignment did you find most challenging?

Implementing the drag and drop functionality. It's a different challenge compared to working with HTML elements like images and draging them around on the page using positioning. It was a nice change of pace to listen to mouse movements and keep track of them in a different way to accomplish drag and drop functionality on the canvas stage.

This ultimately led to another cool side effect that I implemented. I noticed when I was creating the drag and drop funtionality I wanted to reorder the layer of the images. For example if I clicked on an image that was behind another I could be "picking up" the image behind to drag and drop versus the one that's on top. I accomplised this by doing two things:

1. Selecting the element to pick up by looping backwards over my elements array in the `Canvas` class. Looping over my elements array backwards closer mimiced the rendering layers I was seeing.
2. When the mousedown event happens and I select an element to drag I slice it out of the elements array and add it to the end of the elements array. This kind of acts like a stack so I can image my elements array as layers.

### What about this assignment did you find unclear?

The rendering behavior of the canvas. It was clear to me that the canvas should occupy the most space. What wasn't clear to me is how the responsive behavior should work. The solution I settled on was to listen to window events and resize the canvas accordingly.

### Do you feel like this assignment has an appropriate level of difficulty?

For me it did. This assignment challenged me to learn new things and get out of my comfort zone. I also appreciate that this assignment allowed me to feel comfortable writing plain old JavaScript again.

### Briefly explain the technical decisions you made in this project, i.e. architecture, code-splitting, libraries, or other decisions and tradeoffs.

Please see the [Technical Decisions](#technical-decisions) section above for more detail
