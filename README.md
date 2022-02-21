# <Hello Wordle/>

Yet another Wordle clone, with customizable gameplay. Made with React, Typescript, ChakraUI\
[Try out the demo!](https://hellowordle.xyz)

## Prerequisites
This app uses 2 APIS for the backend.
1. [OWL bot](https://owlbot.info/) For validating if the word attempt exists. You need to get your API token.
2. [Custom API](https://github.com/facundoleanez/wordle-server) For getting a random hidden word if it doesnt come encrypted through url params.

## Installation

### To Run Locally:

* Clone the repository and perform the following command line actions:
_with npm_
```bash
$> cd wordle-react
$> npm install
```
_with yarn_
```bash
$> cd wordle-react
$> yarn
```
* Create a **.env** from .env.example and set your _custom secret phrase for word encryption_, your _OWL bot token_ and if you have another API url for getting a hidden word. (In case you set it, it needs to be able to get random word with endpoint url/{wordLength}

* Start the server.
 _with npm_
```bash
npm start
```
_with yarn_
```bash
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


