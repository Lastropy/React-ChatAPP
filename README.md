# Secure Group Chat Application

**_Developed a real-time group chat application utilizing Socket.IO with Node.js to facilitate seamless communication between web clients and servers, using WebSockets._**

Made with 💕 using :

- React.js
- Node.js
- Socket.IO
- PostGRESQL
- TypeORM
- TypeScript (Backend) & JavaScript (Frontend)

## Key Features

a) It enables live room creation and joining with password-protected access, allowing users to compose messages and have them pushed promptly to all participants.

b) Implemented secure multi-user authentication using Auth0, with JWT-based API protection to ensure robust access control.

c) Integrated PostgreSQL with TypeORM for managing user, room, and message data, including message persistence to allow users to view chat history upon re-entry

## How To Start

a) _Go to server folder in the terminal and run:_

> npm i && npm run dev

This will start the server at port 5000 (default; can be edited in .env file)

b) _Go to client folder in the terminal and run:_

> npm i && npm run dev

This will start the server at port 5173 (default; can be edited in .env file)

c) Make sure to have PostGRESQL installed, with the configuration specified in .env file (can be modified.)

## Application Flow and Working

a) A user will have to login using his email or google credentials, on the Auth0 OAuth Server.

b) Upon successful login, their user record will be created (if not existing) in PostgreSQL using TypeORM and backend Socket.IO server.

c) Then they can either create a room or join an existing room.

d) Both the options will require them to enter a password.

e) When joining a room, a dropdown is there displaying existing rooms, which gets updated live using Socket.IO.

f) If room is being created, record of it will be created in PostgreSQL room entity.

g) Once they provide the room name and password ( either create or join existing) , they will be sent to a chat window, where if the room name and password is not correct, they will be sent back to the join or create room page.

h) If password and room name is correct, the currently logged in user subscribes to the room and can send and receive messages live from other users subscribed to the same room using a backend socketio server.

i) If a new message is created, it is also persisted in the PostGRESQL, so that next time somebody comes to the room, they can see existing messages.

j) Automatic reconnection is acheived using Socket.IO.

k) All frontend routes are protected using a Protected route component and Auth0 wrapper.

l) Backend is protected as access token will be required to do any kind of CRUD operation.
