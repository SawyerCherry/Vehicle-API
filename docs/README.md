Docsify Version of this readme: https://sawyercherry.github.io/Vehicle-API/#/

# Vehicle API

> The vehicle API is a RESTful API for storing Vehicle information such as Make, Model, Year, and VIN number of the Vehicle. 


### How To get Started

1. Fork or clone this repo
2. Open the project in VSCode, run npm start to start the server 
3. Post to `/users` to create an account
4. Get `/users` to find your  _id
5. POST to `/vehicles` to create a vehicle associated with your _id
6. GET `/vehicles` to see all stored vehicles


###  Endpoints For /vehicles
* GET all Vehicles by http://localhost:3000/vehicles/all-vehicles
* POST a new Vehicle by http://localhost:3000/vehicles/new-vehicle
* GET a vehicle by search using _id http://localhost:3000/vehicles/idhere
* PUT to update a vehicle in database by _id http://localhost:3000/vehicles/idhere
* DELETE a vehicle form the database by _id http://localhost:3000/vehicles/idhere

### Endpoints For /users
* GET all users http://localhost:3000/users
* POST a new user to create account http://localhost:3000/users
* GET the users details (no password) http://localhost:3000/users/idhere
* PUT to update an existing user by _id http://localhost:3000/users/idhere
* DETETE an existing user by _id http://localhost:3000/users/idhere


### Example
* GET all vehicles http://localhost:3000/vehicles/all-vehicles
```
    {
        "allVehicles": [
            {
                "_id": "60ef7b6def863d05ff60cf8f",
                "make": "Ford",
                "model": "F150",
                "year": "2013",
                "vin": "1FTFW1EF2DKF94015",
                "creator": "60ef6ccd3c751c043afb0ba5",
                "createdAt": "2021-07-15T00:03:57.775Z",
                "updatedAt": "2021-07-15T00:03:57.775Z",
                "__v": 0
            }
        ]
    }
    
```