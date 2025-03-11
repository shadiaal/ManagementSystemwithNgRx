# Documentation for Angular App and Microservices with NgRx Integration

## 1. Instructions on Setting Up the Angular App and Microservices 

### Setting Up the Angular App

1. **Clone the Angular project:**
   To get started, clone the repository containing the Angular application.
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   Use npm (Node Package Manager) to install all the required dependencies.
   ```
   npm install
   ```

3. **Run the Angular app locally:**
   Once the dependencies are installed, you can run the application locally using Angular CLI. This will start a development server.
   ```
   ng serve
   ```
   After running the command, navigate to `http://localhost:4200` in your web browser to access the app.

### Setting Up Microservices:

For the backend services (microservices), follow these steps:

1. **Clone the microservices repository:**
   ```
   git clone <repository-url>
   cd <microservices-folder>
   ```

2. **Run the microservices locally:**
   ```
   dotnet run
   ```

   If you're using multiple microservices, ensure each service is running on different ports (e.g., `http://localhost:5009`, `http://localhost:5398`, etc.).


### Running Both Angular and Microservices Together:

1. Ensure both the Angular application and microservices are running simultaneously.
2. The Angular app will call the backend services through HTTP requests to perform actions like fetching data, adding new items, etc.

---

## 2. Description of How NgRx is Integrated for State Management 

NgRx is a reactive state management library for Angular, built using the Redux pattern, that allows for centralized application state and provides actions, reducers, and effects to handle application logic.

### Integration Steps for NgRx:

1. **Install NgRx dependencies:**
   To start using NgRx, first, install the necessary packages:
   ```
   npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
   ```

2. **Define the State:**
   Define the application's state in a central file, usually within a `store` folder.
   

3. **Create Actions:**
   Define the actions that will modify the state, such as loading tasks, adding tasks, or handling errors.

4. **Create Reducers:**
   Reducers define how the state changes in response to an action.
  

5. **Create Effects (Optional for async operations like HTTP requests):**
   NgRx effects allow for side effects such as making HTTP requests or interacting with external APIs. Effects listen to dispatched actions and perform actions like calling APIs.
 

6. **Register Store, Reducers, and Effects:**
   In your app's module, configure NgRx Store and Effects:
  
7. **Dispatching Actions:**
   In your component, dispatch actions like loading tasks or adding new tasks:
  
By following the steps above, you integrate NgRx for state management in your Angular app while keeping the app's state centralized and reactive. 
