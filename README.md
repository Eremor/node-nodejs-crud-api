# node-nodejs-crud-api

## Description
Implementing a simple CRUD API using an in-memory database

## Technical requirements
- Use 22.x.x version (22.9.0 or upper) of Node.js

## Install
Clone the project to yourself
Install the packages with command:
```bash
npm install
```

## Usage
Rename the file `.env.example` to `.env` and specify the port value on which the application will run in the format `number`
**It is recommended to specify port 4000**

The application supports operation in 3 modes:
- `development mode`,
- `production mode`,
- `multiple mode`

To run the application in development mode, run command:
```bash
npm run start:dev
```

To run the application in production mode, run command:
```bash
npm run start:prod
```
The build process will start and then will run the bundled file
You can check the bundled file in the folder `dist`

To run the application in multiple mode, run command:
```bash
npm run start:multi
```

**ATTENTION**
After starting in any of the modes and executing a request to get all users, an array of three previously added users will be returned
This solution is the choice of the application author

## Error handling
To test the implementation of the 500 error, add `throw new Error()` to the beginning of any method in the file `controllers\user\user.ts` (the server responds with `status code 500` and displays the message `Internal Server Error`)
Requests to non-existent endpoints are processed (the server responds with `status code 404` and displays the message `Endpoint not found`)

## Testing
To run tests, run the command:
```bash
npm run test
```
The tests cover eight scenarios

## Technologies
The following technologies were used in the development of this application:
- `Node.js` version 22
- `TypeScript` version 5
- `Webpack` and its plugins
- `Jest` and its plugins
- `dotenv`
- `uuid`
- `ts-node-dev`

## License
This project is released under the MIT license.