
# Vending Machine

This demo project is built with TypeScript and Jest 

# Features

  - Accept valid coins
  - Reject invalid coins
  - Maintain product stock limit 
  - Return change in coins

### Installation

It requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and run the test.

```sh
$ cd VendingMachine
$ npm install
$ npm run test
```

#### Implemention description
The **Accounts** class is responsible for handling all coin related calculation and **ProductManager** class is responsible for managing the Items inside the vending machine. Possible minimal happy path tests, fail tests and exception tests are covered for both classes. 

**OrderManager** class is responsible for executing all orders and updating the **Notification** for the system. All the required test cases are covered for this **OrderManager** and necessary comments are available as inline comment format. 

### Todos

 - Write more tests
 - Improve return type for coin
 - Move test files into the Test folder
- Add User Interface 

License
----
MIT

