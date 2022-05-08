# Coding Test Instructions

Your task is to use the Star Wars API, aka SWAPI to fetch all the vehicles featured in Star Wars films
and present them into a UI according to the rough mock up provided.

You do not need to adhere to the mockup exactly, but your work should roughly resemble it.

1. Present the list of vehicles on the page.
2. With each vehicle, show all of the films each vehicle is featured in.
3. When clicking on a particular film, the film details should populate into the film section.

REST APIs:

Vehicles: https://swapi.dev/api/vehicles?format=json (data might be spread across multiple pages, use search params to specify page)
Films: https://swapi.dev/api/films/3/?format=json

Rules:

1. Use ReactJS with hooks and Typescript to complete this task.
2. You can see the API implementation and data format by exploring the API docs at https://swapi.dev/.
3. You can use any styling utility of your choice, eg. Tailwind, Bootstrap or Material-UI.

Bonus:

1. Optimize number of network calls / cache API requests
2. Add sorting functionality
3. Add filtering functionality
