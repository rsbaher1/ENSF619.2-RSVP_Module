# ENSF619.2-RSVP_Module

This is a course project for ENSF 619.2 F21. 

The purpose of this project is to demonstrate OSS techniques and eventually have a functioning node-based Events RSVP Module

## Installation  

Please follow these instructions to have a working copy of this project on your machine.  
NOTE: You will need a Google account to setup this project  

1. Local Machine Setup:
   - Clone the repository
   - Install Node (and npm) version 14 LTS  
		- I recommend using nvm (Node version management) it simplifies node development: `nvm install lts/fermium`, `nvm use lts/fermium`  
   - Using npm install the following packages: firebase-functions, express, cors, firebase-admin.
   - cd into the root folder then the functions folder and run `npm install`   
2. Firebase Setup:  
   - Login to the firebase website using your google account  
   - Create a new project by clicking the "Add Project" button and follow the prompts  
   - Select the Firestore database from the menu on the left side and follow the prompts to create the database  
   - Go to the project settings, click the service accounts tab, then press the "Generate new private key" button to save your permissions file  
      - Please rename the downloaded file as "permissions.json" and save it in the root directory of the project. This file is used for authenticating your DB requests  
   - create a `.env` in the root folder of the project and your DB URL: `DB_URL="<your db URL>"`  

---
### Licensing
This project is licensed under the MIT license and is copyright Regina Baher. Please see LICENSE for the full license.
