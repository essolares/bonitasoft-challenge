# bonitasoft-challenge
## BonitaSoft Challenge

## Project Description

#### Cooking Website
This website allow us to have a record of recipes, we have three types of users or roles:
1. CHEF
	- We can add and administrate our recipes
2. USER
	- We can look and search recipes, also add comments.
3. ADMIN
	- We can get all the recipes and comments and check users.

We can register in the main page, and login to get access to our board.

#### Sample images

![Alt text](/images/img.jpg?raw=true "Home")
![Alt text](/images/img1.jpg?raw=true "Register")
![Alt text](/images/img2.jpg?raw=true "LogIn")
![Alt text](/images/img3.jpg?raw=true "Admin")
![Alt text](/images/img4.jpg?raw=true "User")
![Alt text](/images/img5.jpg?raw=true "Chef")

## Technical Details
- Database: Mysql
- Backend: Java / Spring Boot JPA
- Frontend: ReactJS / Bootstrap
- Secured with JWT / Spring security

Database Tables
- Users
- Roles
- User_roles
- Recipes
- Comments

### BACKEND

Backend folder

#### 1- Create and set your database in backend project

Set variables in Application.properties file
```
spring.datasource.url=jdbc:mysql://{host}:{port}/{database}
spring.datasource.username=user
spring.datasource.password=password
```

#### 2- Configure spring security
Set security configuration variables in Application.properties file
```
jwt.token.validity={token time}
jwt.signing.key={sign key}
jwt.authorities.key={auth key}
jwt.token.prefix={type of access token}
jwt.header.string={Header}
```

#### 3- Build and compile spring project challenge

#### 4- Run ChallengeApplication.
This create our tables for the first time and create our rest API services.

#### 5- Run file: /db/script.sql
This create our allowed roles and the admin user.

### FRONTEND

Backend folder
#### 1- Go to the project folder: cd challenge

#### 2- In the project directory, you can run:
```
npm install
# or
yarn install
```
Compiles for development
```
npm start
# or
yarn start
```

#### 3 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.






