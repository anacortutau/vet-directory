# Title

VET DIARY

## Description

Double functionality web application, to be able to search for veterinarians near your location and on the other hand if you are a veterinarian you can both schedule your patients and follow them up

## User Stories

- homepage: As a user I want to able to access the homepage so that I see what the app is about and login and signup 
- sign up: As a user I want to sign up on the webpage.
- login: As a user I want to be able to log in on the webpage so that I can get back to my account
- logout: As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- events create: The user can create their own patients
- events list: The logged in user has access to the list only of his patients
- events edit: I can edit the patient profile and update it

## Backlog

- when the user logs in to the page, welcome by name


## Routes

- GET /
    - renders the homepage

- GET /user/signup
    - redirect to/if user logged in
    - renders the signup form

- POST /user/signup
    - redirect to/if user logged in
    - body:
        - name
        - address
        - city
        - phone
        - days
        - hours
        - email
        - password

- GET /user/login
    - redirect to/if user logged in
    - renders the login form

- POST /user/login
    - redirect to/if user logged in
    - body:
        - email
        - password

- POST /user/logout
    - body: (empty)

- GET /user/search
    - renders an external user to search for a vet filtering by city

- POST /user/search
    - renders an external user to search for a vet filtering by city
    - renders the entire list of vets in that city
    - body of each veterinarian:
        - name
        - address
        - city
        - phone
        - days
        - hours
        - email

- GET /user/:id
    - renders the user logged details page

- POST /user/:id
    - renders the user logged details page
    - body: 
        - name
        - address
        - city
        - phone
        - days
        - hours
        - email


- GET /user/:id/edit
    - renders the user who is logged in to edit their form data

- POST /user/:id/edit
    - renders the user who is logged in to edit their form data
    - body: 
         name
        - address
        - city
        - phone
        - days
        - hours
        - email

- POST /user/delete
    - renderss the user to be deleted


- GET /pet/create
    - renders to the create pet form

- POST /pet/create
    - renders to the create pet form
    - body: 
        - name
        - owner
        - category
        - age
        - weigth
        - triage
        - diagnostic
        - treatement
        - user
    - relate this route to the user that is logged in so that it can only be the one that has access to their patients

- GET /pet/list
    - renders the list of patients that the logged in user has.

- GET /pet/:id
    - render patient details

- POST /pet/:id
   - renders patient details
   - body: 
        - name
        - owner
        - category
        - age
        - weigth
        - triage
        - diagnostic
        - treatement

- GET /pet/:id/edit
    - renders so that the logged in user can update the information of their patients

- POST /pet/:id/edit
   - renders so that the logged in user can update the information of their patients
   - body:
        - name
        - owner
        - category
        - age
        - weigth
        - triage
        - diagnostic
        - treatement

- POST /pet/delete
    - renders so that the logged in user can delete their patients


## Models

- User model
    - name: string
    - address: string
    - city: string
    - phone: number
    - days: string
    - hours: string
    - email: string
    - password: string

- Pet model
    - name: string
    - owner: string
    - category: string and enum
    - age: number
    - weight: number
    - triage: string
    - diagnostic: string
    - tratement: string
    - user: [ObjectId<User>]


## Links

### Git
[Link Repo](https://github.com/anacortutau/vet-directory.git)
[Link Deploy](https://vet-app-directory.herokuapp.com/)

### Slides
[Link Slides.com](https://docs.google.com/presentation/d/1Qg6kWnyIv0C6QuGXJ0uXwq_mgt-EonpP0jNvVgEEvvQ/edit?usp=sharing)


































## States y States Transitions



## Task



## Links

### Git


### Slides
