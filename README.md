**The University of Melbourne**
# COMP30022 – IT PROJECT
# Team 075 Neuromancer
# SeeYa app

## Team Members
| Name        | Roles        |
| ------------- | ------------- |
|Xuanjian Zhang| Scrum master, back-end dev|
|Yanni Chen| Prodoct owner, Front-end dev|
|Yuchen Zhang| QA lead, Back-end dev|
|Mintao Hu| Back-end lead, Devops lead|
|Ta Hong Thuan| Front-end lead|

## Introduction
SeeYa is a personal CRM Calendar. Through SeeYa, users can schedule their events. \
Your friends can see your scheduled events calandar and choose to join in your events.

`Heroku link: https://seeya-neuromancer.herokuapp.com.`\
\
`Frontend repository: https://github.com/mintaohu/COMP30022_Frontend.`
#### Purpose of Seeya
* Make it convenient for users to use calendar app for event scheduling.
* As a personal CRM, manages customer relationship well.
* Provide a platform for public event convening
## Architecture of the app
Mock-up (Design of app) : AdobeXD\
PaaS (Platform as a service): Heroku\
MERN Stack:
* MongoDB - Database for storing information (non-relational database).
* Express - Minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* React - A JavaScript library for building user interfaces.
* Nodejs - A JavaScript runtime built on Chrome's V8 JavaScript engine.


## Features of Seeya (After logging in)
- [x] Add new agenda to calendar
- [x] Modify/Cancel existed agenda
- [x] Add/Delete friends to/from contact list
- [x] Edit privacy of agenda
- [x] Browse others' agenda
- [x] Join/Quit other's agenda
- [x] See online friends

## Instruction of using Seeya
* If you do not have an account for Seeya, feel free to create your own account to sign in.
  * Click top-right `Register` button. 
* Dummy account is also available for you to test with:
  * account: abc
  * password: abc
* After successfully logging in, you will be redirect to homepage of Seeya app. Seeya's homepage is splited into three parts:
  * The left most part: Recent Agenda - for which you can see recent agenda and add new agenda along with manage agenda.
  * The right most part: Contacts - which allow you to see contacts list and add/manage friends.
  * Middle part: Calendar - check events on different dates.
* My account button on top right corner allows you to edit personal information.
* Notification shows you recent notifications.
