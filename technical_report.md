Technical Report
================

The purpose of this report is to analyse and evaluate a server/client prototype created without web development frameworks. The implications, challenges, and potential drawbacks of a "framework-less" development style have been carefully examined in this prototype. The report highlights crucial areas where the lack of frameworks affects application development, including maintainability, scalability, efficiency, and security.

In an era where web development frameworks like Flask, React, Vue.js, and Express.js have become fundamental tools for developers, this report scrutinizes how their absence can hinder the development process. These frameworks provide essential features – robust security, modular architectures, middleware, and efficient state management – which are pivotal for crafting sophisticated, user-oriented web applications.

By examining specific shortcomings in the framework-less prototype and comparing them with framework-supported methodologies, the report delineates the operational benefits and enhanced productivity provided by modern frameworks. The critique encompasses a thorough investigation of issues on both the client and server sides, including illustrative code snippets and discussions on why certain practices fall short of framework-based standards.

The ultimate aim of this discourse is to guide a shift towards more robust and scalable development methods that align with contemporary web development protocols. The insights offered herein advocate for methodologies that elevate the security, performance, and quality of web applications, steering clear of the pitfalls associated with a framework-less approach.


Critique of Server/Client prototype
---------------------

### Overview
The critique of the framework-less server/client prototype reveals several key issues impacting both the client-side and server-side code. These issues stem primarily from the absence of the structured approach and features provided by modern frameworks.

### Name of Issue: Lack of Middleware for Common Tasks (Server-Side Issue)

Code Snippet Example:
```python
def serve_app(func_app, port, host=''):
    # Code setup for serving the app, handling requests manually
```
Why This Pattern Is Problematic:
- Server-side code without middleware for logging, error handling, and request processing is verbose and inefficient. This method needs manual implementation of similar functionality across routes, adding complexity and redundancy. The lack of modular, simplified middleware in popular frameworks makes maintenance onerous and reduces scalability and efficiency.




### Name of Issue: Lack of State Management (Client-Side Issues)

Code Snippet Example:
```javascript
function create_item(event) {
    // ...
    post_item(get_item_data_from_form_element(event.target.parentElement));
}
```

Why This Pattern Is Problematic:
- The absence of a structured state management system can lead to scattered and uncoordinated state updates, making the application's data flow hard to track and debug. It becomes challenging to manage complex states, particularly in interactive applications, leading to potential data inconsistencies and a decrease in code maintainability.


### Name of Issue: Manual DOM Manipulation (Client-Side Issue)

Code Snippet:
```javascript
function renderItems(data) {
    const $item_list = document.querySelector(`[data-page="items"] ul`);
    const new_item_element = () => document.querySelector(`[data-page="items"] li`).cloneNode(true);
    // Further DOM manipulations...
}
```

Why This Pattern Is Problematic:
- Manual DOM manipulation, as seen in the example, may lead to complex, hard-to-maintain code as the programme expands. Explicitly addressing each UI update increases the possibility of inconsistencies and bugs/problems. It lacks the efficiency and clarity of current reactive UI update mechanisms, making the code less scalable and harder to work with.



### Name of Issue: Inefficient Request Handling( Server-Side Issue)

Code Snippet:

```python
def serve_app(func_app, port, host=''):
    # Handling requests and responses manually
```

Why This Pattern Is Problematic:
- Manually handling HTTP requests and responses can be inefficient and error-prone. This approach lacks the optimizations and conveniences offered by established server frameworks, such as automatic request parsing, content negotiation, and standardized error handling. It can lead to repetitive code and makes it harder to ensure consistency and reliability in request handling.





### Name of Issue: Security Concerns
Code Snippet:
```python
# Implementation of HTTP server and handling of requests
```
Why This Pattern Is Problematic:
- Framework-less implementations generally neglect input validation, SQL injection, XSS prevention, and error handling. For safe application development, frameworks usually provide built-in security capabilities or easy-to-integrate security extensions.



### Recommendations

- Why the Existing Implementation Should Not Be Used:
The prototype/framework-less implementation provides granular control but struggles with maintainability, scalability, and security. Manual DOM manipulations, unstructured state management, and poor request handling raise bug and vulnerability risk. Lack of established patterns and features makes a codebase hard to extend and adapt to complex needs.

- Suggested Direction - Frameworks:
Adopting a web framework like React for the client-side and Express.js or Flask for the server-side is recommended. Frameworks offer structured approaches to state management, component-based architectures, and efficient request handling. They come with built-in security features, community support, and extensive libraries, significantly enhancing development speed, application performance, and maintainability. These frameworks streamline building complex, scalable, and secure web applications, aligning with modern web development best practices.



Server Framework Features
-------------------------


## Midddleware

HTTP requests and answers are modified, managed, and intercepted by web application middleware. Its ability to intercept data both ways improves code modularity by allowing function reuse across logging, error handling, and authentication. Middleware functions establish a chain of responsibility where each function can end the request-response cycle or pass control. This system handles static files, parses request bodies, manages sessions, implements CORS, and logs, improving web application performance and scalability.

### Middleware in NestJS
NestJS, enhancing ExpressJS's capabilities, introduces a structured approach to middleware with its class-based, module-integrated system. This setup not only allows for reusable middleware but also facilitates better organization through module-based architecture. It supports dependency injection for seamless service integration and provides flexible middleware binding, either to specific routes or across entire modules, optimizing the development and management of web applications.

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
In ExpressJS, middleware functions, defined as function(req, res, next) { ... }, manage the request-response cycle by accessing and modifying request and response objects, and controlling the flow to subsequent middleware. Commonly used for tasks like logging, parsing, authentication, and error handling, they execute sequentially and adeptly handle asynchronous operations, ensuring smooth progression within the app's processing pipeline.



ExpressJS
```javaScript
app.use(express.json()); // Parses incoming JSON requests

```


 Problem Middleware Solves:
 ------------------------- 
- Middleware in web applications efficiently manages cross-cutting concerns—key functionalities like logging, authentication, error handling, and request parsing that impact multiple parts of a system. By centralizing these functionalities, middleware avoids code duplication and inconsistency, enhancing maintainability. It streamlines the application's architecture, ensuring consistent handling of essential operations across various components without burdening the core business logic.


#### ExpressJS:
- https://expressjs.com/en/guide/using-middleware.html
#### NestJS:
- https://docs.nestjs.com/middleware



## Cross-Origin Resource Sharing (CORS) Handling


CORS is a security feature that allows or restricts web applications from making requests to a domain different from the domain from which the first resource was served. In technical terms, CORS involves adding specific HTTP headers to inform the browser whether requests to a different domain are allowed. This is crucial for APIs consumed by web applications hosted on different domains.

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


Problem Solving
--------------

CORS (Cross-Origin Resource Sharing) effectively addresses the limitations of the web's same-origin policy, which restricts web pages from accessing resources from different domains for security reasons. While important for security, this policy can hinder the functionality of modern web applications needing to interact with external APIs and resources across various domains. CORS allows servers to define accessible origins and conditions, enabling safe and flexible cross-domain interactions through specific HTTP headers. This solution enhances the functionality and interconnectivity of web applications while maintaining crucial security standards.



#### ExpressJS:
- https://expressjs.com/en/resources/middleware/cors.html
#### NestJS:
- https://docs.nestjs.com/security/cors#getting-started



## Basic Routing

In the server code, routing was manually implemented by parsing the URL and method. Technically, routing in web frameworks is the process of mapping incoming HTTP requests to appropriate handlers based on their path and method. It entails defining URL patterns and linking them to specific functions that activate upon matching requests. This allows developers to design how the application responds to different client requests at various endpoints. 

```python
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
Routing addresses the challenge of steering user requests to the appropriate logic, based on URL patterns and HTTP methods. It's crucial for developing user-friendly web applications, effectively organizing and handling various user actions and requests. This streamlined approach not only simplifies application architecture and RESTful API design but also enhances overall organization and maintainability. However, a lack of efficient routing can lead to navigation difficulties, increased maintenance complexities, and potential errors in request processing.


#### ExpressJS:
- https://expressjs.com/en/guide/routing.html
#### NestJS:
- https://docs.nestjs.com/controllers#routing


Server Language Features
-----------------------


### Decorators in NestJS

Decorators in NestJS are a TypeScript feature used to modify the behaviour of classes or properties without altering the actual code. Decorators are used extensively in NestJS for routing, dependency injection, and module configuration. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

```typescript
@Controller('users')
export class UsersController {
    @Get()
    findAll() {
        // ...
    }
}
```
##### Problem Solving / Benefits:

- Decorators in TypeScript, utilized extensively in frameworks like NestJS, address the challenge of cleanly and declaratively enhancing classes and their members with additional behaviours or configurations, without intruding into the core logic. They offer a streamlined way to augment classes with additional behaviour without complicating core logic.  They reduce code clutter, foster modularity, and improve maintainability. By allowing succinct and clear expression of extended functionalities, decorators refine the development process and enhance code quality.

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

#### Problem it's Solving / Benefits:
- Async/Await in JavaScript addresses the intricacies of asynchronous programming by streamlining the code into a cleaner, synchronous-like flow. It moves developers away from the tangles of callbacks and nested promises, enhancing code clarity and error management. This advancement is pivotal in server-side environments, like those using Node.js, by enabling more readable and maintainable code structures, significantly improving development efficiency.
Basically, simplifies handling of asynchronous operations, making code more readable and maintainable by avoiding callback hell and improving error handling.


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

- Vue.js's Reactive Data Binding addresses the task of maintaining synchronisation between the user interface and application data.
It removes manual DOM changes, which may be error-prone and time-consuming in complicated systems. Vue.js makes UI development faster and safer by updating the DOM as data changes. This reactive technique provides a smooth and dynamic user experience by rapidly reflecting data changes in the UI, improving developer productivity and user interaction.



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

- React Hooks streamline state management within functional components, overcoming the complexities of class-based architecture. They provide an elegant and efficient means to handle state and life-cycle events, which previously led to convoluted code structures. The introduction of Hooks has paved the way for a more intuitive and maintainable codebase, promoting flexibility and facilitating testing—addressing fundamental issues in state management for contemporary web applications.

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

- In traditional web development, managing interdependent UI elements often leads to tangled, hard-to-maintain code.
React's component architecture, empowered by props, elegantly resolves the intricacies of UI construction, enabling developers to create scalable interfaces from self-contained components. This modularity fosters reusability and clarity, ensuring components are both isolated and interoperable. This paradigm not only streamlines development but also fortifies the maintainability of complex UIs, offering a clear structure for easier debugging and enhancement.



### Reference Url:
- https://legacy.reactjs.org/docs/components-and-props.html



### Methods in Vue.JS

Technically, Vue.js provides a methods option for defining functions that can be used in the component's template. These methods often involve changing the state, handling events, or implementing complex logic that can be triggered in the template.


- Code Snippet:
```javascript
methods: {
    create_item() {
        // Logic to create an item
        // ...
    },
    deleteItem(id) {
        // Logic to delete an item
        // ...
    },
    // Other methods...
}
```

### Problem being solved/Benefit

- Vue.js Methods are design to address the challenge of embedding interactive logic directly within component templates, which can lead to disorganized and hard-to-debug code. They offer a way to define behaviours and actions separately, simplifying component logic and promoting a cleaner, more maintainable codebase. This approach resolves issues of code complexity and enhances the development experience by allowing for more organized and intuitive interaction handling within components.

### Reference Url:
- https://vuejs.org/guide/essentials/event-handling.html#method-event-handlers


Client Language Features
------------------------

### React.js: JSX (JavaScript XML)

JSX is a syntax extension for JavaScript, used in React to describe UI components in a way that resembles HTML. It allows developers to write UI structures in a declarative manner within JavaScript code, enhancing the readability and expressiveness of component markup.
JSX, is central to React's development philosophy, providing a clear and efficient way to design and implement UI components. It epitomizes React's approach to bridging the gap between logic and markup, streamlining the development process of complex interfaces.
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

Vue.js template directives tackle the complexities of managing dynamic DOM updates, in a clear and efficient manner, eliminating the need for verbose JavaScript code that complicates maintenance and increases error risk. They provide a declarative approach to UI changes, automating the rendering process based on state variations. This streamlined method reduces boilerplate, enhances code clarity, and simplifies the creation of interactive interfaces, boosting developer productivity and application quality.



### Reference Url:
- https://vuejs.org/guide/essentials/template-syntax.html
- https://vuejs.org/api/built-in-directives.html




Conclusions
-----------

#### Why frameworks are recommended

Incorporating frameworks in web development is highly recommended for their structured approach that significantly boosts efficiency, maintainability, and scalability. Client-side frameworks like React and Vue.js, along with server-side ones such as Express.js and Flask, bring invaluable features such as integrated state management, reactive data binding, and efficient routing. They simplify complex tasks like asynchronous processing and middleware management, and offer essential security features. By fostering best practices, frameworks enhance the reliability and security of applications. Their comprehensive tool sets and community support streamline the development process, enabling the creation of sophisticated, high-quality web applications that meet modern standards and user expectations.\


#### Which frameworks should be used and why

Choosing the right web development framework depends on the project type, desired features, and the development team's expertise. For client-side development, React and Vue.js are top contenders. React, with its JSX syntax and hooks, is ideal for dynamic UIs and complex applications due to its component-based architecture. Vue.js is appreciated for its simplicity and reactive data binding, suitable for a variety of project sizes. On the server side, Express.js offers efficiency and scalability for Node.js applications, particularly for RESTful APIs and SPAs, while Flask's simplicity and extensibility make it a go-to for small to medium-sized Python projects. The selection should be guided by the project's specific needs and the team's familiarity with the frameworks, ensuring an efficient development process and successful outcome.


