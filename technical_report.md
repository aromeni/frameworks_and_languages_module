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

Server Framework Features
=======================

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
A basic CORS handling implemented by setting the Access-Control-Allow-Origin header directly in your HTTP response.

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

Routing was implemented by manually parsing the URL and method in your server code. 

```python
# Example from your custom server implementation
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

For a technical description, routing in web frameworks refers to the mechanism that maps incoming HTTP requests to specific handlers based on the request path (URL) and method (GET, POST, etc.). It involves defining paths or patterns and associating them with functions or methods that execute when a request matches these patterns. This allows developers to design how the application responds to different client requests at various endpoints.
- Problem Solved: Routing addresses the challenge of directing user requests to the correct processing logic, organizing different actions based on URL patterns and HTTP methods.
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

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)


In JavaScript, the .cloneNode(true) method is used to create a deep copy of a node and its entire subtree, including all of its attributes and all of its descendants. Setting this to false only copies the node.

This renderItemListFieldLookup object contains a set of functions, each designed to update a specific type of HTML element with given data.
