# RANDOM PICKER

- In this two-day project, you'll be building an app from scratch that lets user add some items and pick one randomly

## What we practice

- react hooks we know (useState, useEffect, useContext, useReducer, etc.)
- timer functions (setTimeout, setInterval)
- react library for modal(popup window)
- media queries
- localStorage
- app deploy

## Before we start...

- make sure you understand the app as a whole
- then think about the steps you need
- create a vite react app **under your account** and work from it
- while working on Step 1 & 2, it's recommended that
  - get the code done by actively discussing together
  - share screens whenever it's necessary
  - a lead person might want to share one's own screen as a guide 
  - feel free to use ai for research (but no code generated from it :p)

### [Step 1] Form - Add and Remove an Item, Render Items Accordingly

![step1](./step1.png)

- create a component `RandomPicker` and work in it

- create `h2` saying "add items and pick one"

- create a form with an input and a button 
  - input adds an item to play
  - button plays the random picker

- with `useState`, get an item from the user input

- do following with `useReducer`:

  1. `initialSate` will be an object with one property to begin with: `{items: an array}`

  2. write a `reducer` function to handle action types below:

  - `ADD` add an item into an items array
  - `DELETE` delete an item from an items array

  3. add event handlers for the actions above and handle some errors on submitting the form:

  - if no input is provided, alert the user "no input"
  - if the input already exists, alert the user "item already exists"

once the items are rendered(after adding/deleting) properly, let's move onto the next

### [Step 2] Play & Reset - Pick one Item randomly after Displaying each Item at certain intervals, Reset the state

- add a boolean property `isPlaying` into `initialState`. default value is set to `false`

- add two more actions in `reducer` function:

  - `PLAY` - toggles the boolean value of `isPlaying`

  - `PICK` - get one item randomly from the `items` array
    (hint) write a function that accepts an array as argument and get a random element out of it
    - call the function in the place of `PICK` value

- On clicking `play` button, call a function `handlePlay` in which...

  - action type `PLAY` is triggered.
  - `isPlaying` value is toggled.
  - note: if there's only one item in an items array, alert the user "minimum 2 items required to play".

- while `isPlaying` is true (toggled by clicking the play button)

  - we will listen to this state update and trigger the action type `PICK`. in order to achieve this, **useEffect** will come very handy

  - when action type `PICK` is triggered:

    - all the items in an `items` array will be displayed one after another **at certain intervals** for 2 ~ 3 seconds. use timer function `setTimeout` &`setInterval`

    [MDN for setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

    - the value of `h2` is changed to the random outputs from the action type `PICK`.

    - while it's playing, deactivate/hide the `play` button, and the list of items, as well
      - only `h2` is shown 

## Main logic is done. Now you may split the tasks with the team members and finish your project

### [Step 3] Brush up

1. Use `localStorage` and save state's `items` array in it

(hint: useEffect)

- whenever the `items` array updates, localStorage array will be updated as well
- on page reload, the saved items must appear (modify `initialState`)
- use `localStorage.setItem()` & `localStorage.getItem()` methods to get & set item from and to localStorage
  - don't forget to parse & stringify the data

2. Add `reset` button

- add an action type `RESET` in `reducer` function
- onClick, the state gets reset
- localStorage becomes an empty array

3. use gif images for a funny effect

- save some links from [giphy](https://giphy.com/) in an array
- add a new action type `PICK_GIF`, apply the same logic as the action type `PICK`
- render the random gif images at certain intervals for 2 seconds while `isPlaying` is true

4. Replace all the alerts with modal

- research & use a react library: [one example](https://www.npmjs.com/package/reactjs-popup)
- read the documentation closely and apply modal

5. Move the reducer to a context

- split the component and move some part of `jsx` to small sub-components(`Form`, `Items`, `Modal`)
- make sure the components subscribe to the reducerContext & directly access the data if necessary

6. Style your app

- visual aspect is important, do your best
- with some animation effects (e.g. blinking effect at the end)
- by using media queries, create a breakpoint for mobile device

### [BONUS Challenge] - takes time, it can be done later on your own
- while `playing`, slow down the interval speed at the end! (promise & async might do the job)
- add an action `UPDATE` that modifies the chosen item

### [Final Step] Deploy app

- after lunch on the 2nd day, we deploy our app together in the main room
- make sure that basic functionalities work properly 
- you can always modify your app even after the app is published. no worries if styling and extra features are not done yet.
- get a nice `README.MD` about your app. explain what it is about and technologies used. add the deployed link.

[reference app](https://randompicker-weather.onrender.com/)

