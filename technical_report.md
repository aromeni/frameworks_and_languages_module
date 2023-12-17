Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### (name of Issue 1)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### (name of Issue 2)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------


## Midddleware

Middleware is software that acts as a bridge or intermediary layer in the processing of requests and responses in a web application. It's used to modify, manage, or intercept HTTP requests and responses as they flow through the application and has certain key characteristerics such as:

- Interception: Middleware has the ability to intercept both incoming requests and outgoing responses.

- Modularity: It enables modular and reusable code. Different middleware functions can handle different aspects like logging, error handling, or authentication.

- Chain of Responsibility: Middleware functions are typically organized in a sequence or pipeline. Each middleware function can either terminate the request-response cycle or pass control to the next middleware in the chain.

- Diverse Functionalities: Common uses include handling static files, parsing request bodies, managing sessions, implementing CORS, logging, and more.

### Middlewaer in NestJS
NestJS, while built on ExpressJS (or Fastify), provides a more structured and modular approach to middleware, aligning with its overall architecture that's heavily influenced by Angular.

- Class-based Middleware: In NestJS, middleware can be class-based, offering more structure and reusability. Middleware classes implement the NestMiddleware interface.
- Signature: use(req: Request, res: Response, next: Function) { ... }
- Module-based Organization: Middleware in NestJS is typically associated with modules, allowing for better organization and scope management.
- Dependency Injection: NestJS middleware supports dependency injection, making it easier to integrate other services or providers.
- Route Binding: Middleware can be bound to specific routes or globally to all routes within a module.

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
In ExpressJS, middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. It's used for executing code, making changes to the request and the response objects, ending the request-response cycle, or calling the next middleware in the stack.

- Signature: function(req, res, next) { ... }
Use Cases: Logging, body parsing, authentication, error handling.
- Execution: Middleware functions are executed sequentially as they are defined in the application, using app.use() or router.use().
- Asynchronous Operations: Middleware can handle async operations and ensure the next middleware is called only after async tasks are completed.



ExpressJS
```javaScript
app.use(express.json()); // Parses incoming JSON requests

```


 Problem Middleware Solves:
 ------------------------- 
- Middleware in web applications specifically addresses the problem of managing cross-cutting concerns. Cross-cutting concerns are those functionalities or aspects of an application that span across multiple areas of the system, impacting various components. Typical examples include logging, authentication, error handling, and request parsing.
- In the absence of middleware, these functionalities would often be replicated across different parts of the application, leading to code duplication, reduced maintainability, and potential inconsistencies. Middleware centralizes these common functionalities in a single, reusable component. This not only streamlines the application's architecture by reducing redundancy but also ensures that these essential operations are handled consistently across the entire application. The primary problem middleware solves, therefore, is the efficient and consistent handling of operations that are integral to multiple areas of an application, without cluttering the core business logic.


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
CORS (Cross-Origin Resource Sharing) addresses the significant challenge imposed by the web's same-origin policy, which, for security reasons, restricts web pages from making requests to a different domain than the one that served them. This policy, while crucial for web security, severely limits the functionality of modern web applications that often need to interact with multiple external APIs and resources hosted across various domains. CORS solves this by allowing servers to specify which origins are permitted to access their resources and under what conditions. By setting specific HTTP headers, CORS enables a safe and flexible way for web applications to integrate and interact with cross-domain resources, thus facilitating a more interconnected and functional web ecosystem, while still upholding the essential security constraints of the same-origin policy.

#### ExpressJS:
- https://expressjs.com/en/resources/middleware/cors.html
#### NestJS:
- https://docs.nestjs.com/security/cors#getting-started



## Basic Routing

Routing was implemented by manually parsing the URL and method in the server code.
For a technical description, routing in web frameworks refers to the mechanism that maps incoming HTTP requests to specific handlers based on the request path (URL) and method (GET, POST, etc.). It involves defining paths or patterns and associating them with functions or methods that execute when a request matches these patterns. This allows developers to design how the application responds to different client requests at various endpoints. 

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
- Routing addresses the challenge of directing user requests to the correct processing logic, organizing different actions based on URL patterns and HTTP methods.
- Why It's Important: Essential for creating a navigable web application, allowing for a structured approach to handle different user actions and requests.
- Benefits: Improves the organization and maintainability of web applications, enabling clear and logical structuring of different application functionalities. It is crucial for RESTful API design, allowing for clean and intuitive endpoint structures.
- Potential Issues: Without a well-structured routing system, a web application can become difficult to navigate and maintain, leading to potential confusion in request handling and increased risk of errors.


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

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)


In JavaScript, the .cloneNode(true) method is used to create a deep copy of a node and its entire subtree, including all of its attributes and all of its descendants. Setting this to false only copies the node.

This renderItemListFieldLookup object contains a set of functions, each designed to update a specific type of HTML element with given data.
