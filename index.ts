// install typescript globally in repo
// npm install -g typescript
// verifty with typescript -v -> tells us the version
// create typescript file
// extension is .ts
// write JavaScript - .ts recognizes it
let a = 5;
let b = 5;
let c = a + b;
console.log(c);
// compile typescript into plain javascript -> browsers read .js files
// compile one file -> tsc filename.ts
// compile all files in directory -> tsc *.ts


// DATA TYPES

// typed version of javascript
// specify types to different variables at time of creation
// name of variable -> : -> the name of the type -> = -> value
// 3 types
// 1 -> any
// 2 -> Built-in types
// 3 -> user-defined types

/// ANY TYPE
//// superset of all the data types in TypeScript
//// type : any -> equivalent to opting out of type checking for a variable.
//// let myVariable: any = 'This is a string'

/// BUILT IN TYPES
//// built in TypeScript
///// 1. enum
///// 2. class
///// 3. interface
///// 4. array
///// 5. tuple 


// OOP

// TypeScript supports all the features of object-oriented programming, such as classes and interfaces.

// Class
// temple of objects -> how object looks in terms of features and functionalities
// typescript has built in support for classes -> can use class keyword to easily declare one

// car class
class Car {
    // fields
    model: String;
    doors: Number;
    isElectric: Boolean;

    // car properties, initialized with constructor
    constructor(model: String, doors: Number, isElectric: Boolean) {
        this.model = model;
        this.doors = doors;
        this.isElectric = isElectric;
    }

    // one method
    displayMake(): void {
        // displays message using cars property
        console.log(`Thjis car is ${this.model}`)
    }
}

// new instance of this class
// to create Object of class, use keybord new
const Prius = new Car('Prius', 4, true);
// call constructor of class -> pass it the properties
// the method .displayMake() has access to the properties of Prius
Prius.displayMake(); // This car is a Prius

// Interface
// define structure of variables -> syntactical contract to which an object should conform
// example:

// object truck
class Truck {
    // fields
    model: 'Tacoma';
    make: 'Toyota';
    // one method
    display() {
        console.log('hi');
    }
};

// object signature
// {
//     model: String,
//     make: String,
//     display(): void
// }
// reuse signature -> declare in the form of interface
// to create interface -> use keyword interface

// interface called ITruck
interface ITruck {
    model: String,
    make: String,
    display(): void
}
// object myTruck
// myTruck is now binding to ITruck interface
// ensures that myTruck object defines all properties whare are in the interface
const myTruck: ITruck = {
    model: 'Tacoma',
    make: 'Toyota',
    display() => { console.log('hi!'); }
};

// glimpse into how typescript can make JavaScript more stable and less prone to bugs
// increasing number of react developers who are adopting it
// very useful for FE devs -> Happy coding :)
