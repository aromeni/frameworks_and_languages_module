Technical Report
================

The purpose of this report is to analyse and evaluate a server/client prototype created without web development frameworks. The implications, challenges, and potential drawbacks of a "framework-less" development style have been carefully examined in this prototype. The report highlights crucial areas where the lack of frameworks affects application development, including maintainability, scalability, efficiency, and security.

In an era where web development frameworks like NestJS, NextJs, Django, React, Vue.js, and Express.js etc have become fundamental tools for developers, this report scrutinizes how their absence can hinder the development process. These frameworks provide essential features – robust security, modular architectures, middleware, and efficient state management – which are pivotal for crafting sophisticated, user-oriented web applications.

By examining specific shortcomings in the framework-less prototype and comparing them with framework-supported methodologies, the report delineates the operational benefits and enhanced productivity provided by modern frameworks. The critique encompasses a thorough investigation of issues on both the client and server sides, including illustrative code snippets and discussions on why certain practices fall short of framework-based standards.

The ultimate aim of this discourse is to guide a shift towards more robust and scalable development methods that align with contemporary web development protocols. The insights offered herein advocate for methodologies that elevate the security, performance, and quality of web applications, steering clear of the pitfalls associated with a framework-less approach.


Critique of Server/Client prototype
---------------------

### Overview
The critique of the framework-less server/client prototype reveals several key issues impacting both the client-side and server-side code. These issues stem primarily from the absence of the structured approach and features provided by modern frameworks.

### Name of Issue 1: Lack of Middleware for Common Tasks (Server-Side Issue)

Code Snippet Example:
```python
def serve_app(func_app, port, host=''):
    # Code setup for serving the app, handling requests manually
```
https://github.com/aromeni/frameworks_and_languages_module/blob/bb86f3f05a9f95303eb98a144ab9de07ca038f4f/example_server/app/http_server.py#L99-L100

Why This Pattern Is Problematic:
- Server-side code without middleware for logging, error handling, and request processing is verbose and inefficient. This method needs manual implementation of similar functionality across routes, adding complexity and redundancy. The lack of modular, simplified middleware in popular frameworks makes maintenance onerous and reduces scalability and efficiency.




### Name of Issue 2: Lack of State Management (Client-Side Issues)

Code Snippet Example:
```javascript
function create_item(event) {
    // ...
    post_item(get_item_data_from_form_element(event.target.parentElement));
}
```
https://github.com/aromeni/frameworks_and_languages_module/blob/bb86f3f05a9f95303eb98a144ab9de07ca038f4f/example_client/index.html#L343-L344

Why This Pattern Is Problematic:
- The absence of a structured state management system can lead to scattered and uncoordinated state updates, making the application's data flow hard to track and debug. It becomes challenging to manage complex states, particularly in interactive applications, leading to potential data inconsistencies and a decrease in code maintainability.


### Name of Issue 3: Manual DOM Manipulation (Client-Side Issue)

Code Snippet:
```javascript
function renderItems(data) {
    const $item_list = document.querySelector(`[data-page="items"] ul`);
    const new_item_element = () => document.querySelector(`[data-page="items"] li`).cloneNode(true);
    // Further DOM manipulations...
}
```
https://github.com/aromeni/frameworks_and_languages_module/blob/bb86f3f05a9f95303eb98a144ab9de07ca038f4f/example_client/index.html#L402

Why This Pattern Is Problematic:
- Manual DOM manipulation, as seen in the example, may lead to complex, hard-to-maintain code as the programme expands. Explicitly addressing each UI update increases the possibility of inconsistencies and bugs/problems. It lacks the efficiency and clarity of current reactive UI update mechanisms, making the code less scalable and harder to work with.



### Name of Issue 4: Inefficient Request Handling( Server-Side Issue)

Code Snippet:

```python
def serve_app(func_app, port, host=''):
    # Handling requests and responses manually
```
https://github.com/aromeni/frameworks_and_languages_module/blob/bb86f3f05a9f95303eb98a144ab9de07ca038f4f/example_server/app/http_server.py#L99-L100

Why This Pattern Is Problematic:
- Manually handling HTTP requests and responses can be inefficient and error-prone. This approach lacks the optimizations and conveniences offered by established server frameworks, such as automatic request parsing, content negotiation, and standardized error handling. It can lead to repetitive code and makes it harder to ensure consistency and reliability in request handling.




### Recommendations

- Why the Existing Implementation Should Not Be Used:
The prototype/framework-less implementation provides granular control but struggles with maintainability, scalability, and security. Manual DOM manipulations, unstructured state management, and poor request handling raise bug and vulnerability risk. Lack of established patterns and features makes a codebase hard to extend and adapt to complex needs.

- Suggested Direction - Frameworks:
Using frameworks like React for the client-side and Express.js or NestJS for the server-side is highly recommended. They provide organized state management, component-based structures, and optimized request processing, community support, along with robust security and rich libraries. This accelerates development and ensures maintainable, high-performing applications that adhere to modern standards.



Server Framework Features
-------------------------


## Midddleware

HTTP requests and response are modified, managed, and intercepted by web application middleware. Its ability to intercept data both ways improves code modularity by allowing function reuse across logging, error handling, and authentication. Middleware functions establish a chain of responsibility where each function can end the request-response cycle or pass control. This system handles static files, parses request bodies, manages sessions, implements CORS, and logs, improving web application performance and scalability.

### Middleware in NestJS

NestJS
```Javascript
@Module({...})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(CatsController);
    }
}
```

### Middleware in ExpressJS

ExpressJS
```javaScript
app.use(express.json()); // Parses incoming JSON requests

```


 Problem Middleware is trying to Solve:
 ------------------------- 
- Web middleware effectively handles cross-cutting issues like logging, authentication, error handling, and request processing that affect many system components. Middleware centralises these functions to reduce code duplication and inconsistency, improving maintainability. It simplifies the application's design to ensure important actions are handled consistently across components without burdening the business logic.


#### ExpressJS:
- https://expressjs.com/en/guide/using-middleware.html
#### NestJS:
- https://docs.nestjs.com/middleware



## Cross-Origin Resource Sharing (CORS) Handling


CORS, security feature permits or prohibits web apps from requesting resources from domains other than the first. CORS uses HTTP headers to tell the browser if queries to other domains are authorized. This is essential for APIs used by cross-domain web apps.

 Found in http_server.py
```python
RESPONSE_DEFAULTS = {
    'Access-Control-Allow-Origin': '*',
    # Other defaults...
}
```
A basic CORS handling implemented by setting the Access-Control-Allow-Origin header directly in the HTTP response.

ExpressJS uses the cors middleware for more configurable CORS handling.

```javascript
const cors = require('cors');
const app = require('express')();

app.use(cors());
```
NestJS allows CORS configuration in the main.ts file when bootstrapping the application.

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS with default settings
  await app.listen(3000);
}
bootstrap();
```


Problem CORS is trying to Solve
-------------------------------

CORS resolves the web's same-origin policy restrictions that limit resource sharing across domains, balancing security with functionality. It permits web apps to safely request external resources, ensuring seamless integration of disparate services while upholding security through controlled HTTP headers.



#### ExpressJS:
- https://expressjs.com/en/resources/middleware/cors.html
#### NestJS:
- https://docs.nestjs.com/security/cors#getting-started



## Basic Routing

Technically, the process of routing in web frameworks involves associating incoming HTTP requests with corresponding handlers based on URL patterns and methods. It requires setting up defined paths which are then linked to specific functions, triggering the appropriate response when requests match these predefined routes.

```python
// python routing example
if __name__ == "__main__":
    #... setup code
    if request.path == '/' and request.method == 'GET':
        # handle home route
```


This code implementation addressed some key features, albeit in a more rudimentary way compared say ExpressJS and NestJS which provide  a structured and more feature-rich approaches.


ExpressJS provides a structured way to define routes.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Home Page'));
app.post('/item', (req, res) => {
    // handle POST request to '/item'
});
```

NestJS uses decorators for clean and expressive routing.

```typescript
import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHome() {
        return 'Home Page';
    }

    @Post('/item')
    createItem() {
        // handle POST request to '/item'
    }
}
```


### Problem Solved: 
Routing is fundamental in directing user requests to the right application logic, using URL patterns and HTTP methods. It's a cornerstone for building intuitive web applications, neatly managing user interactions. By clarifying app structure and API endpoints, routing enhances both usability and maintainability. Conversely, inefficient routing systems may complicate navigation and upkeep, raising the likelihood of processing errors.

#### ExpressJS:
- https://expressjs.com/en/guide/routing.html
#### NestJS:
- https://docs.nestjs.com/controllers#routing


Server Language Features
-----------------------


### Decorators in NestJS

NestJS leverages TypeScript decorators to give modular and maintainable functionality to classes and functions. The @ symbol is followed by an expression that evaluates to a function that executes at runtime with class or property information. It improves code readability and maintainability by letting developers declaratively define behaviour like routing pathways and dependency injection in the class description.

```typescript
// NestJS decorator example
@Controller('users')
export class UsersController {
    @Get()
    findAll() {
        // ...
    }
}
```
##### Problem Solving / Benefits:

- TypeScript decorators, as used in NestJS, streamline the enhancement of classes by attaching new behaviours in a clear, non-intrusive manner, solving the problem of code bloat and improving maintainability. They enable precise and maintainable extensions of functionality, refining development and code quality.

Reference URLs:
- https://www.typescriptlang.org/docs/handbook/decorators.html
- https://docs.nestjs.com/controllers

###  Async/Await (Both in ExpressJS and NestJS)

Technically, Async/Await is a syntactical feature in JavaScript for handling asynchronous operations in a more readable and synchronous manner. It allows developers to write code that handles promises without the need for callbacks, reducing nesting and improving readability.

```javascript
// ExpressJS example
app.get('/data', async (req, res) => {
    try {
        const data = await getData();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
```

#### Problem Async/Await is Solving / Benefits:
- Async/Await in JavaScript simplifies asynchronous programming, eliminating complex callbacks for a cleaner, more straightforward code flow. This key advancement, especially crucial in server-side Node.js environments, enhances code readability and maintainability, and streamlines error handling—vastly improving development efficiency.


Reference URLs:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://zellwk.com/blog/async-await-express/



Client Framework Features
-------------------------


### Reactive Data Binding in Vue.JS

Technically, Vue.js's reactive data binding system automatically updates the UI in response to changes in the application's state. This is accomplished through Vue's reactive system, which tracks changes to data and efficiently updates the DOM.
- Code  Snippet:
```javascript
data() {
    return {
        item: {
            description: ''
        },
        // other data properties...
    }
},
```
### Problem being solved

- Vue.js's reactive data binding solves the problem of keeping the UI in sync with data. By automating DOM updates, it reduces errors and simplifies UI maintenance, ensuring a dynamic user experience that immediately reflects data changes, boosting developer efficiency and user engagement. 
It removes manual DOM changes, which may be error-prone and time-consuming in complicated systems.





### Reference Url:
- https://vuejs.org/guide/extras/reactivity-in-depth.html



### State Management with Hooks in ReactJS

React's Hooks API, particularly useState, allows functional components to maintain internal state. This feature provides a way to encapsulate and manage the state within components without using classes.
- Code Snippet:
```jsx
const [formData, setFormData] = useState({
    user_id: '',
    lat: '',
    lon: '',
    // other fields...
});
```

### Problem being solved

- React Hooks address the intricacies of state management and lifecycle handling in functional components, which class-based architectures made cumbersome. They simplify stateful logic, foster cleaner code, and enable easier testing, thus resolving core challenges in modern web app state management.



### Reference Url:
- https://legacy.reactjs.org/docs/hooks-intro.html



###  Props and Component Composition in React.JS
Technically, React.js uses props (short for properties) to pass data and event handlers to components. This feature, coupled with component composition, enables the building of complex UIs from smaller, reusable components.
- Code Snippet:

```jsx
function ItemCard({ item, onDelete }) {
    return (
        <div>
            {/* Display item details */}
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
}
```
### Problem being solved

- React's props and component composition tackle UI complexity by allowing developers to build interfaces with isolated, reusable components. This system simplifies development, enhances maintainability, and supports scalable UI construction, effectively addressing code entanglement issues.



### Reference Url:
- https://legacy.reactjs.org/docs/components-and-props.html



Client Language Features
------------------------

### React.js: JSX (JavaScript XML)

JSX in React is a JavaScript syntax extension that provides a seamless way to write UI elements resembling HTML, improving the legibility and structure of code and streamlining the creation of complex interfaces within JavaScript's logic flow.

- Code Snippet:

```jsx
// React component using JSX
function ItemCard({ item, onDelete }) {
    return (
        <div>
            <img src={item.image} alt="item" />
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
}
```

### Problem being solved/Benefit
- JSX resolves the intricacies of UI creation within JavaScript, replacing clunky createElement calls with an HTML-like syntax for better readability and maintainability. It streamlines the development experience, reduces errors, and merges JavaScript logic with UI markup effectively, leading to cleaner code and a more productive build process.

### Reference Url:
- https://legacy.reactjs.org/docs/introducing-jsx.html
- https://legacy.reactjs.org/docs/jsx-in-depth.html

### Template Directives in Vue.js
Technically, Vue.js's template directives are syntactical markers that command the framework to perform actions on DOM elements dynamically. Directives such as `v-if` for conditional displays, `v-for` for list rendering, and `v-model` for creating two-way bindings, allow developers to declaratively link the DOM to the application's reactive state. This mechanism abstracts away direct DOM manipulation, enabling a more intuitive and maintainable approach to crafting interactive and responsive user interfaces.
- Code Snippet Example:

```html
<input v-model="item.description" />
```

### Problem being solved/Benefit

Template directives in Vue.js make dynamically modifying the DOM easier and more efficient. They allow developers to declaratively express UI modifications in response to state changes without the difficult and error-prone JavaScript code needed for direct DOM manipulation. This simplifies development and makes applications more responsive, solving dynamic user interface issues.



### Reference Url:
- https://vuejs.org/guide/essentials/template-syntax.html
- https://vuejs.org/api/built-in-directives.html




Conclusions
-----------

#### Why frameworks are recommended

Incorporating frameworks in web development is highly recommended for their structured approach that significantly boosts efficiency, maintainability, and scalability. Client-side frameworks like React and Vue.js, along with server-side ones such as Express.js and NestJS, bring invaluable features such as integrated state management, reactive data binding, and efficient routing. They simplify complex tasks like asynchronous processing and middleware management, and offer essential security features. By fostering best practices, frameworks enhance the reliability and security of applications. Their comprehensive tool sets and community support streamline the development process, enabling the creation of sophisticated, high-quality web applications that meet modern standards and user expectations.\


#### Which frameworks should be used and why

Choosing the right web development framework depends on the project type, desired features, and the development team's expertise. For client-side development, React and Vue.js are top contenders. React, with its JSX syntax and hooks, is ideal for dynamic UIs and complex applications due to its component-based architecture. Vue.js is appreciated for its simplicity and reactive data binding, suitable for a variety of project sizes. On the server side, Express.js offers efficiency and scalability for Node.js applications, particularly for RESTful APIs and SPAs, while NestJS's 
 or even Flask's simplicity and extensibility make it a go-to for small to medium-sized Python projects. The selection should be guided by the project's specific needs and the team's familiarity with the frameworks, ensuring an efficient development process and successful outcome.


