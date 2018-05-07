# SBrick Drive by React

## What is it?
This project creates a drag-n-drop web user interface for the RESTful client of [SBrick Drive](https://github.com/hingyeung/sbrick-drive), an library that simplifies the integration with [SBrick](https://www.sbrick.com).

## How to play?
1. `npm run start` starts the webapp.
2. Drag instructions on the left to the instruction queue on the right.
3. Click "Play" when ready to send queued instructions to SBrick Drive.
4. Click "Clear" to remove all pending instructions.

## Development
`npm run start-stub-server` starts a stub server to simulate a running instance of the RESTful server of SBrick Drive.

### Note with Typescript definition for react-beautiful-dnd (6.0.0)
The [Typescript type definition for react-beautiful-dnd](https://www.npmjs.com/package/@types/react-beautiful-dnd) wasn't up-to-date with react-beautiful-dnd (6.0.0) at the time of writing.

I manually copied up-to-date type definition file from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-beautiful-dnd/index.d.ts to node_modules/@types/react-beautiful-dnd/index.d.ts.

Also needed to add:
export type DraggableStyle = DraggingStyle | NotDraggingStyle;

## LICENSE
ISC

## Feedback
Drop me a line at samli@samuelli.net
