# Hospital-API

#### Summary 
It a hospitals data management application. Where there are hospitals where psychiatrist are registered and the psychiatrist have patients. 

## Tech stack used 
* Express JS
* Mongo DB 

## Frameworks and libraries 
* cors
* dotenv
* express
* express-async-errors
* http-status-codes
* jsonwebtoken
* mongoose
* swagger-ui-express
* yamljs
* nodemon


#### Setup

```bash
npm install && npm start
```

##### URL 
https://hospital-api-et5d.onrender.com/

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- hospital.js
- psychiatrist.js
- patient.js
- details.js



# Database 
I used MongoDB as my database. There are 4 Hospitals , 19 Psychiatrist and 51 patients. 


#### Hospital Model
- Name 

#### Psychiatrist Model
- Name
- *hospitalID* 

#### Patient Model
- Name 
- Address
- Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```
- Phone 
- Photo 
- *psychiatristID*


# API Endpoints

## /details
- Requires Hospital ID as params.
- Returns the details about the patient and psychiatrist.

## /psychiatrist/register 
- Requires a request body which has name and hospital's name. 
- Returns a message and the data created.

## /psychiatrist/:id 
- Requires Hospital ID as a parameter. (You can find all the Hospital IDs in "get all Hospital ID list") 
- Returns the psychatrist and hospital data.

## /psychiatrist
- Returns all the Psychiatrist data irrespective of the hospital they are from.

## /patients/:patientId
- Requires patient id as parameter.
- Returns all the patients of a particular psychiatrist.

## /patients
- Requires request body to create a patient docs.
- Returns the created data.

## /patients/:id
- Requires request params for the patient Id and request body for the updated data.
- Returns the updated data.

## /hospitals
- Requirs a request body to create a hospital.
- Returns the created hospital

## /hospitals
- Returns the list of Hospitals with its Id.

## /hospitals/:id
- Requirs a hospital Id. 
- Returns the deleted hospital data.

## Validation 

### Hospital Schema
-> Name - min length - 2 , unique and required.

### Psychiatrist Scema 
-> Name - min length 5, max length 30 , unique and required.

### Patient Schema
-> Name - min length 5, max length 50 and required.
-> Address - min length 10, max length 50 and required
-> Phone - length 13 (3 digits country code + 10 digit phone number) and required.
-> Email - unique , min length 5, required and match regex ``` /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ ```
-> PsychiatristID - objectID , required and Ref - Psychiatrist 
-> Photo - min length 5 and required


#### Security
- cors


Swagger UI is used for documentation.

