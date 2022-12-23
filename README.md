It is the rest API backend subsystem for the eshop. The frontend project is in https://github.com/kimg5/eshop-frontend.git.
Ihe features includes 
1. provide the role based access control for API. That means API can be protected based on the users's role.
2. The user's authatication is based on simply implementation of JWT( not include the time refreshing and security sign)
3. provide the product related CRUD APIand users CRUD API

The project based on Node JS with
1. express framework
2. bcrypt lib
3. body-parser
4. cors
5. dotenv
6. jsonwebtoken
7. express-async-errors
8. mongoose
9. validator
10.mongoDB

Install guider:
1. clone the porject
2. npm install
3. add .evn file to the project root folder and give the password of your mongoDB
   MONGODB_PWD = ${your password}

