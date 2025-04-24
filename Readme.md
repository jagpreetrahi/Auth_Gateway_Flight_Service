This is a starting template , which anyone can  use  for own project , by keeping some of the important code principle and project management  recommendation.

'Feel Free to change anything based on own use'.

Let's look out  the Node_JS template ->

`src` -> It's a folder inside which all the actual core functionality or source code regarding the project will reside there , this will not include any kind of testing.

`You might have to make a separate tests folder for unit testing`.

Let's take a look inside the `src` folder

  - `config` -> In this folder everything related to any configurations or setUp 
  of a library or module will be done here.

  ```
    Example : Setting up 'dotenv'
  ```  
  So that we can use environment variables anywhere in a cleaner way , this is done in the 
  `server-config.js` file . One more example can be to setup logging library
  that can aid you to prepare meaningful logs , so configuration for this library should also be done here.

  - `controllers` -> This  is a middle layer folder for view and model . In controller we are just receive the incoming requests and data , then pass it to the business layer or model , and once model layer returns an output , we structure the API response in controllers , form of  object and send the output.

  - `middlewares` -> They are just going to catch the incoming requests where we can write our authenticators , validators etc.

  - `routers` -> In this folder , we register a routes  and bind the corresponding middleware and controllers to it.

  - `repositories` -> This folder contain all the logic using which we interact with database by writing queries, all the raw queries or ORM queries will done here.

  - `services` -> It contains the business logic and interacts with repositories folder for data from the database.

  - `utils` -> It contains the error classes , helper methods etc.

### Setup the project

  - Download this template from github and open it in your likely text editor.

  - Go inside the folder path and execute the following command:
  ```
    npm install
  ```  

  - In the root directory create a `.env` file and add the following env variables
    ```
       PORT = <port number of your choice>
    ```  
   Example,
   ```
    PORT = 3000;
   ```
  - Go inside the `src`  folder and execute the following command:
  ```
    npx sequelize init
  ```

  - By executing the above cmd you will get the migration , seeders and models folder along with a `config.json` file inside the config folder.

  - If you're setting up your development environment, then write the username of your database , password of your database and in dilect key mention whatever database you are want to using for example : mariadb , mysql , sqlite etc.

  - If you're setting up test or production environment, make sure you also replace the host key with the hosted database url

  - To run the server execute
  ```
     npm run dev
  ```

  OR,  if you have latest version of  Node.JS  then you can use this command to  run the server.
   ```
     node --watch <path>
   ```        