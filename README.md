# Star Wars Vehicles

## Running Application

npm install

npm run start

## User Flow

Once the application is running you will see a list of vehicles. You can click on the next and previous buttons to load more vehicles. In the vehicle list you'll see a list of films associated with each vehicle. You can select a film and the details for the film will show to the right of the list.

## Basic Architecture

For the basic architecture of the application I ended up using context to handle state management. In my current job we tend to use redux more just because of the large amount of data that needs to be shared between various features of the application. For this though, using context seemed more appropriate. At first I thought about just managing state locally and passing props but there were enough cases that I needed to update state in the child components as well as other reasons that I decided using context was better suited for this. I housed all my API calls and handlers in the VehiclesContextProvider as well as managed all state in there. There is a lot more styling that I want to do with this (just for fun) but the core structure of the UI is there. As for the filtering and sorting functionality, I started the filtering but ended up not finishing that. I will continue to work on it and update this as I go. I'm sure there are some better ways I could handle the API calls and the current implementation could use some refactoring but I think this is a viable solution for now.

![App Architecture](/src/assets/images/SW-Vehicles-App.drawio.png?raw=true "Basic Architecture")
