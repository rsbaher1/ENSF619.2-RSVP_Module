# CONTRIBUTING
 

**GOAL:** Wedding/Event RSVP module that could be easily added to modern websites. NextJS is growing in popularity among web developers, and since it is based off NodeJS and ReactJS, this module will be created using NodeJS.  


## Hard Features  

### Must Haves:  
1. User can create Events.  
2. User can create and edit guest list and sub-groups for each event.  
   *Sub-group examples: bridesmaids, groomsmen, and Bridal Party which includes bridesmaids and groomsmen*  
3.	User can schedule emails to be sent to all guests or select groups (Ex. Bridal party, or guests that did not respond).  
      -  Emails can be updated/edited only before it is sent.  
4.	User can view and edit Guest’s responses for all events or select events.  
   *The responses would be: Attending, not attending, or No response.*  
5. User can add meal options to RSVP invitation.  
5.	Guests are only able to view events they are invited to.  
6. Guests are only able to select their RSVP response for the events they were invited to and for others on their invitation.  
   *For instance: a couple with children are all individual guests but placed on the same invitation. Either parent can RSVP for their own family but not another guest invited to the event.*  
7.	Guests have the ability to update their responses at anytime before the RSVP deadline.  

### Nice-to-Haves:  
1.	User can create and edit multiple events with different groups of guests or all guests.  
   For example, a Bachelorette party for Bridesmaids, Henna Party for all guests, and Wedding Reception for all guests.  
2.	Guests are able to opt-in to receive email reminders for RSVP deadlines.  
3. Google Photos integration: Each event has a google photos album where the user (event creator) and guests could upload and view photos taken at the event. The album should be created on the user's google account.  


## Soft Features  

- **Maintainable**: The module is designed to ease the process of adding features and bug. It should be easy for contributors to understand and work on it.  
- **User-Friendly**: The module is created with the user experience in mind. All important functionalities must be easy to find and understand by the user.  
- **Secure**: The module should be secure from online threats and only Users should have the ability to create events and guest lists, and only Guests should have the ability to send RSVP responses to events they are invited to. Guests cannot create or edit events nor guest lists for events.  


## Feature & Bug Reporting Guidelines  

If you would like to contribute this project please follow the following guidelines:  

1. For Existing Feature Requests/Issues:  
   - Assign the issue you want to work on to yourself.  
   - Create a new branch for your issue from the 'dev' branch.  
   - Once you complete all your work to complete the issue push your changes to the branch and submit a pull request (from your issue's branch to the dev branch).  
     - before submitting, please run `npm run lint` to ensure your code is clean and working.
   - Once your code changes are approved, the newly created branch for the issue will be merged and deleted.  
   
2. For non-existent Feature Requests:  
   - Go to the issues tab and create a new issue.
   - Label your issue as "Request", if you don't use this label, your request will not be processed.
   - Your request will be reviewed, if there is an issue it will be labeled as "invalid" and you will be asked to provided more information.
   - If the request is denied it will be labeled as "wontfix",
   - If the request is approved it will be labeled as "enhancement" and added to the backlog to be worked on.  
  
3. For Bug/Issue submissions:
   - Follow the same steps as above in #2 but instead of labeling the issue as a 'request' use the 'bug' label.  
  
4. For Documentation Issues:  
   Ie. README.md or CONTRIBUTING.md needs further clarification.
   - Follow the same steps as above in #2 but instead of labeling the issue as a 'request' use 'documentation'  
   
> *For more information please see the README file.*  
   
## Contributing   
  
After a Bug or Feature is processed it will be assigned to a developer.   
A new branch will be automatically created.  
Steps to follow:  
- Checkout newly created branch
- Complete any code and documentation changes
- Run Postman to ensure there are no bugs
- Commit and push your changes
- Create a Pull request to the dev branch
- Your changes will be review and if approved, merged into dev and the branch will be deleted.
  - if changes require revisions, the required revisions will be commented on the pull request and the pull request will be closed. 
  - Reopen the pull request once your revisions are added


---   

## OSS Policy

Any third-party components added to the project must be of the same license as this project (MIT) or have a compatible license. 
This means that any software that does not comply with the MIT license must be developed from scratch if there are no other alternatives that also comply with the MIT license.  

> *Please see: https://tldrlegal.com/ for more information on Licenses and compatibility.*  

---
> **Copyright Regina Baher, 2021.**  
> Licensed under MIT License.  
> *Please see LICENSE for full license.*  
