# ENSF619.2-RSVP_Module

This is a course project for ENSF 619.2 F21. 

The purpose of this project is to demonstrate OSS techniques and eventually have a functioning node-based Events RSVP Module.  


## Installation  

Please follow these instructions to have a working copy of this project on your machine.  
NOTE: You will need a Google account to setup this project  

1. Local Machine Setup:
   - Clone the repository
   - Install Node version 16 LTS  
		- I recommend using nvm (Node version management). It simplifies node development.
		- *NOTE: npm is installed with Node, no further action needed*
   - Install Postman or another system that allows you to send HTTP requests and view the responses.  		
2. Firebase Setup:  
   - Login to the firebase website using your Google account  
   - Create a new project by clicking the "Add Project" button and follow the prompts  
   - Select the **Firestore database** from the menu on the left side and follow the prompts to create the database  
   - Go to the project settings, click the service accounts tab, then press the "Generate new private key" button to save your permissions file  
      - This file is used for authenticating your DB requests  
   - cd into the root folder, then the **functions** folder, and create a `.env` in the root folder of the project and add your DB URL: `DB_URL="<your db URL>"`  
     enter your permissions file name in the .env file: `PERMISSIONS="<full path to your permissions file>"` ex. `PERMISSIONS="../permissions.json"`
   - Now, we are ready to initialize our DB  
      - Open a terminal in the root of the project and run
        - `npm install -g firebase-tools`
        - `firebase login` 
        - `firebase init functions`   
      - You will be asked to associate the project with a Firebase project, select "Use existing Project" and follow the prompts  
      - Next, you will be asked which language to use, select "Javascript"  
      - Then you will be asked about Eslint, type 'y' for yes.  
      - Lastly, you will be asked if you want to install dependencies, type 'y' for yes.  
  - Then run `firebase init firestore` and use the default values.
  - add `  parser: "babel-eslint",` to the .eslintrc.js file
3. Initializing the Project:
   - Using npm install the following packages: firebase-functions, firebase-admin, firebase-tools, firebaseui, express, cors, babel-eslint@8.2.6, eslint@4.19.1, body-parser, dotenv.  
     - Install everything at once: `npm install dotenv body-parser firebase-functions express cors firebase-admin firebase-tools  babel-eslint@8 eslint@4.x`  
   - cd into the root folder, then the **functions** folder, and run `npm install`  
   - Run `npm run serve` to start the server.  
   - TODO: In the test folder you can find Postman files, upload them to your Postman App to ensure the module is working.   

---  
>  ### Contributing  
>  Please see CONTRIBUTING.md for guidelines on contributing to this project, submitting feature requests, issues, and even suggestions on improving the README.md and CONTRIBUTING.md.  
---  
### Common Errors
1. If you see an error while running `npm run lint` or `npm run serve` saying babel-eslint cannot be found, please uninstall `eslint` and `babel-eslint` and reinstall them: `npm install babel-eslint@8 eslint@4.x`
2. 	If when you run `npm run serve` to start the server, the **Functions emulator** starts but the **Firestore emulator** is not, please open a terminal in the root of the project and run the following command to start the **Firebase Emulator Suite**:
         `firebase emulators:start`
---  
### Licensing
This project is licensed under the MIT license and is copyright Regina Baher. Please see LICENSE for the full license.

