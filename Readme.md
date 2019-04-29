## Rest API Sample Implementation

CRUD operations for Movies and Actors
* Get all the actors from a specific movie
* Get all the movies for a specific actor
* Add an actor to a movie
* Return a list of movies created in between two dates
* Return a list of actors that were in a released movie during a specific year

### Installation Instructions
* git clone this repository
##### Database
* The database scripts are present in 
a zip file located in the `sampleData` folder
* The installation instructions for the database can be found at:
https://dev.mysql.com/doc/sakila/en/sakila-installation.html

* After creating the database and running the scripts, we also need to set the connection string information in
`src/database/knexfile` 
   

##### Starting Web Server
* From the command prompt run `npm install` to install node modules
* From the command prompt run `npm start` to start the web server on default port 3000

##### Testing Endpoints
Below are endpoints for each of the operations
* CRUD operations for Movies  
POST /movies  
Payload:  
title, description, release_year  
PATCH /movie/{film_id}
Payload:  
title, description, release_year  
GET /movies  
GET /movie/{film_id}  
DELETE /movie/{film_id}

* CRUD operations for Actors  
POST /actors  
Payload:  
first_name, last_name  
PATCH /actor/{actor_id}
Payload:  
first_name, last_name  
GET /actors  
GET /actor/{actor_id}  
DELETE /actor/{actor_id}

* Get all the actors from a specific movie
GET /movie/{film_id}/actors  
* Get all the movies for a specific actor
GET /actor/{actor_id}/movies
* Add an actor to a movie
POST /movie/actor  
Payload:  
actor_id, film_id  
* Return a list of movies created in between two dates  
 /movies/start/{start_year}/end/{end_year}  
 _Note: The database only has releaseYear information so I used year instead of full date_ 

* Return a list of actors that were in a released movie during a specific year  
/actors/releaseyear/{release_year}

## Technology Stack Used

* Node.js
* Hapi.js
* Knex
* MySql


