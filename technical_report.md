Technical Report
================

The purpose of this report is to analyse and evaluate a server/client prototype created without web development frameworks. The implications, challenges, and potential drawbacks of a "framework-less" development style have been carefully examined in this prototype. The report highlights crucial areas where the lack of frameworks affects application development, including maintainability, scalability, efficiency, and security.\
Modern web development has witnessed the emergence of frameworks such as Flask, React, Vue.js, and Express.js, which have become essential instruments for constructing complex web applications in a methodical, secure, and efficient fashion. These components offer critical functionalities, including security measures, component-based architectures, middleware integration, and state management, that are indispensable for the development of advanced and user-centric applications. By contrasting the framework-less implementation with these industry standards, this report aims to highlight the advantages and efficiencies that frameworks bring about.\
The analysis presented in this report is rooted in a detailed examination of specific issues identified in both the client and server sides of the prototype. Each issue has been scrutinized with code examples, explaining why certain patterns or practices may be problematic, especially when compared to their counterparts in framework-based implementations.This report's overarching objective is to offer informative advice for embracing development approaches that are more resilient and scalable, in line with modern web development standards, while simultaneously criticising the framework-less approach. All things considered, this will help make online apps safer, faster, and of higher quality.




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

Decorators in NestJS are a TypeScript feature used to modify the behaviour of classes or properties without altering the actual code. Decorators are used extensively in NestJS for routing, dependency injection, and module configuration.Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

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

Decorators in TypeScript, utilized extensively in frameworks like NestJS, address the challenge of cleanly and declaratively enhancing classes and their members with additional behaviors or configurations, without intruding into the core logic. This approach solves the problem of code clutter and complexity that often arises from embedding auxiliary functionalities directly into business logic. By enabling a more modular, maintainable, and intuitive code structure, decorators greatly enhance the developer's ability to express intent and functionality in a readable and reusable manner, significantly improving both the development process and the quality of the resulting code.
Decorators provide a declarative and concise way to add metadata and functionality to classes, enhancing readability and maintainability.

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
- Async/Await in JavaScript fundamentally solves the problem of complexity in handling asynchronous operations. It transforms the way asynchronous code is written and managed, moving away from the often convoluted and hard-to-maintain callback patterns or nested promises. By allowing developers to write asynchronous code in a style that mimics synchronous code, Async/Await enhances readability, simplifies error handling, and makes the overall code structure more intuitive and maintainable. This feature represents a significant advancement in writing clean and efficient JavaScript code, especially in server-side environments like Node.js used in ExpressJS and NestJS
- Simplifies handling of asynchronous operations, making code more readable and maintainable by avoiding callback hell and improving error handling.

Reference URLs:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://zellwk.com/blog/async-await-express/



Client Framework Features
-------------------------

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

Vue.js's Reactive Data Binding tackles the challenge of keeping the user interface in sync with application data. It eliminates the need for manual DOM updates, a process that can be error-prone and cumbersome, particularly in complex applications. By automatically updating the DOM when data changes, Vue.js streamlines UI development, making it more efficient and less error-prone. This reactive approach ensures a seamless and dynamic user experience, where changes in data are immediately reflected in the UI, enhancing both developer productivity and user interaction.


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

React's "State Management with Hooks" addresses the challenge of managing and isolating state within functional components in a straightforward and intuitive manner. Prior to hooks, managing state and other React features like lifecycle methods were mostly confined to class components, leading to more complex code and less flexibility in structuring components. Hooks introduced a way to use state and other React features in functional components, simplifying component logic and enabling a more functional style of writing components. This shift enhances the modularity and reusability of components, making the codebase cleaner, more maintainable, and easier to test, thereby solving key challenges in component-based architecture and state management in modern web application development.

### Reference Url:
- https://legacy.reactjs.org/docs/hooks-intro.html



###  Props and Component Composition in React.JS
Technical Description:
React.js uses props (short for properties) to pass data and event handlers to components. This feature, coupled with component composition, enables the building of complex UIs from smaller, reusable components.
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

In traditional web development, managing interdependent UI elements often leads to tangled, hard-to-maintain code. Props and Component Composition in React are designed to solve the problem of building complex user interfaces in a scalable and maintainable way. React's approach allows developers to construct UIs from smaller, isolated components that communicate via props. This design promotes reusability, as components can be used in different contexts with different data. It also enhances the separation of concerns, as each component manages its own functionality and state, making the overall application easier to understand, debug, and maintain. Essentially, this architecture addresses the complexities of UI development by enabling a modular, component-based approach.


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

Vue.js Methods are specifically designed to solve the problem of organizing and managing interactive logic within a component. In web development, handling user interactions and other dynamic behaviors often leads to scattered and convoluted code, making it challenging to maintain and understand. Vue.js Methods address this by providing a clear and structured way to encapsulate such imperative logic. They allow developers to define functions that handle user actions, computations, or any side effects separately from the template. This separation not only enhances code readability and organization but also centralizes the action logic, making the components more self-contained and easier to manage. The benefit is a cleaner, more intuitive, and maintainable codebase, where the functionalities and interactions are clearly delineated within the component structure.

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
JSX in React directly addresses the problem of how to intuitively integrate UI templates with JavaScript logic in the development of web interfaces. In traditional web development, intertwining HTML and JavaScript often leads to complex and less readable code. JSX simplifies this integration, allowing for a more natural and seamless combination of markup and logic. This leads to more readable, maintainable, and intuitive code, significantly enhancing the developer's experience and productivity in building complex user interfaces. The benefit is a more streamlined and efficient development process, particularly for complex component-based UIs.

### Reference Url:
- https://legacy.reactjs.org/docs/introducing-jsx.html
- https://legacy.reactjs.org/docs/jsx-in-depth.html

### Template Directives in Vue.js
Technically, Vue.js employs template directives – special tokens in the markup that instruct the framework to do something to a DOM element. These include directives like v-if for conditional rendering, v-for for rendering lists, and v-model for two-way data binding, among others. They are powerful tools for directly manipulating the DOM based on the component's state.
Template directives are a fundamental aspect of Vue.js, offering a straightforward and elegant way to interact with the DOM. They encapsulate complex logic in simple, readable syntax, streamlining the process of building dynamic and responsive web interfaces
- Code Snippet Example:

```html
<input v-model="item.description" />
```

### Problem being solved/Benefit

Template directives in Vue.js specifically solve the problem of managing dynamic DOM updates in a clear and efficient manner. Traditional approaches to manipulating the DOM, especially in response to changing application state, often involve verbose and complex JavaScript code. This can lead to a codebase that's difficult to maintain and prone to errors. Vue.js's template directives offer a declarative way to handle these dynamic changes - whether it's showing or hiding elements based on conditions, rendering lists of data, or creating two-way data bindings. This approach streamlines the development process, significantly reducing the amount of boilerplate code required and making the code more readable and maintainable. The benefit is a more intuitive and efficient way to build interactive and dynamic UIs, enhancing both developer productivity and the overall quality of the web application.



### Reference Url:
- https://vuejs.org/guide/essentials/template-syntax.html
- https://vuejs.org/api/built-in-directives.html




Conclusions
-----------

#### Why frameworks are recommended

Incorporating frameworks in web development is highly recommended for their structured approach that significantly boosts efficiency, maintainability, and scalability. Client-side frameworks like React and Vue.js, along with server-side ones such as Express.js and Flask, bring invaluable features such as integrated state management, reactive data binding, and efficient routing. They simplify complex tasks like asynchronous processing and middleware management, and offer essential security features. By fostering best practices, frameworks enhance the reliability and security of applications. Their comprehensive tool sets and community support streamline the development process, enabling the creation of sophisticated, high-quality web applications that meet modern standards and user expectations.\


#### Which frameworks should be used and why

Choosing the right web development framework depends on the project type, desired features, and the development team's expertise. For client-side development, React and Vue.js are top contenders. React, with its JSX syntax and hooks, is ideal for dynamic UIs and complex applications due to its component-based architecture. Vue.js is appreciated for its simplicity and reactive data binding, suitable for a variety of project sizes. On the server side, Express.js offers efficiency and scalability for Node.js applications, particularly for RESTful APIs and SPAs, while Flask's simplicity and extensibility make it a go-to for small to medium-sized Python projects. The selection should be guided by the project's specific needs and the team's familiarity with the frameworks, ensuring an efficient development process and successful outcome.


