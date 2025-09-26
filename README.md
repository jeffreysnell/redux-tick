# Redux-Tick

Redux-Tick is a JavaScript library designed to manage periodic actions (or "ticks") in a Redux-based application. It provides a `Ticker` class and utility functions to start, stop, and manage tickers efficiently.

## Features

- Manage periodic actions with configurable intervals.
- Integrates seamlessly with Redux.
- Supports multiple tickers with independent configurations.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

### Importing the Library

To use Redux-Tick in your project, import the necessary modules:

```javascript
import { Ticker } from './src/ticker';
import { gcd } from './src/maths';
```

### Creating a Ticker

You can create a new `Ticker` instance with a configuration object:

```javascript
const ticker = new Ticker({
    interval: 1000, // Default interval in milliseconds
    actions: {
        action1: { interval: 2000 },
        action2: { interval: 3000 },
    },
});
```

### Binding a Redux Store

Bind a Redux store to the ticker:

```javascript
ticker.bindStore(store);
```

### Starting and Stopping the Ticker

Start the ticker:

```javascript
ticker.start();
```

Stop the ticker:

```javascript
ticker.stop();
```

### Utility Functions

#### `gcd(numbers)`

Calculate the greatest common divisor (GCD) of an array of numbers:

```javascript
const result = gcd([12, 15, 21]);
console.log(result); // Output: 3
```

## Running Tests

To run the test suite, execute:

```bash
npm test
```

## Building the Project

To build the project, run:

```bash
npm run build
```

The output will be available in the `dist/` directory.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
