# ES6
* [Rapid ES6 Training](https://app.pluralsight.com/library/courses/rapid-es6-training)

#  Scopes
```
let productId = 12;
{
	let productId = 2000;
}
console.log(productId);
```

#  Arrow Functions
```
var getPrice = () => 5.99;
console.log(getPrice());

var getPrice = count => count * 4.00;
console.log(getPrice(2));

var getPrice = (count, tax) => count * 4.00 * (1 + tax);
console.log(getPrice(2, .07));

var getPrice = (count, tax) => {
	var price = count * 4.00;
	price *= (1 + tax);
	return price;
}
console.log(getPrice(2, .07));
```

#  Default function parameters
```
var getProduct = function(productId = 1000){
	console.log(productId);
}
getProduct();
```

#  Rest (params)
```
var showCategories = function(productId, ...categories){
	console.log(categories);
};
showCategories(123);
```

#  Spread
```
var prices = [12, 20, 18];
var maxPrice = Math.max(...prices);
console.log(maxPrice);

var prices = [12, 20, 18];
var newArray = [...prices];
console.log(newArray);

var chars = [..."43210"];
```

#  Destructuring Array
```
var salary = ['32000', '50000', '75000'];
let [low, average, high] = salary;

var salary = ['32000', '50000', '75000'];
let [low, ...remaining] = salary;

```

#  Destructuring Objects
```
let salary = {
	low: '32000',
	average: '50000',
	high: '75000'
};

let {low, average, high} = salary;

let salary = {
	low: '32000',
	average: '50000',
	high: '75000'
};

let {low: newLow, average: newAverage, high: newHigh} = salary;

```

#  Destructuring Strings
```
let s1 = 'AB'

let [first, second] = s1;
```

#  Object Literals
```
var price = 5.99, quantity = 30;
var productView = {
	price,
    quantity,
	calculateValue(){
		return this.price * this.quantity
	},
	"function name"(){
		return this.price * this.quantity
	}
};
productView["function name"]();

var field = 'dynamicField';
var price = 5.99;
var productView = {
	[field]: price
};
console.log(productView);
```

#  for of loops
```
var categories  = ['hardware','software','vaporware'];
for (var item of categories){
	console.log(item);
}

var codes  = "ABCDE";
for (var code of codes){
	console.log(code);
}
```

#  Octal and Binary Literals
```
var value = 0o10;
var value = 0b10;
```

#  Template Literals
```
let invoiceNum = '1350';
console.log(`Invoice Number: ${invoiceNum}`);

let nums = `A
B
C`;
console.log(nums);
```

#  Modules
* Module is executed when it is loaded
* Import statements get hoisted

file1.js
```
import someValue from 'module1.js';
import * as values from 'module1.js';
```

module1.js
```
let projectId = 99;
let projectName = 'BuildIt';
export {projectId as default, projectName};
```

#  Classes
```
class Task{
	constructor(){
		this.name = 'name';
	}
	
	static getDefaultId(){
		return 0;
	}
	
	showId(){
		console.log('99');
	}
}
let task = new Task();
```

#  Extends
```
class Project{
	constructor(name){
		this.name = name;
	}
}

class SoftwareProject extends Project{
	constructor(...args)
	{
		super(...args);
	}
}

let s = new SoftwareProject('ABC');

class Project{
	constructor(name){
		this.name = name;
	}
}

class SoftwareProject extends Project{
	constructor(name){
		super(name);
		}

}

let s = new SoftwareProject('ABC');
```

#  String Extensions
```
"Santa Barbara".startsWith("Santa");
"Santa Barbara".endsWith("Santa");
"Santa Barbara".includes("Santa");
"Santa Barbara".repeat(10);
"Santa Barbara".test('Santa');
```

#  Number Extensions
```
Number.parseInt("45");
Number.parseFloat("45.00");
Number.isInteger(45);
```

#  Promises
```
function doAsync(){
	return Promise.resolve('Some String');
}

function doAsync(){
	return Promise.reject('Some Error');
}

doAsync().then(
	function(resp) {},
	function(err) {}
);

let p1 = new Promise(...);
let p2 = new Promise(...);

Promise.all([p1, p2]).then(
	function(resp) {},
	function(err) {}
);

Promise.race([p1, p2]).then(
	function(resp) {},
	function(err) {}
);

```

#  Array Extensions
```
let salaries = Array.of(9000);

let amounts = [800, 810, 820];
let salaries = Array.from(amounts, v => v.+100);

salaries.find(v => v >= 750);
salaries.findIndex(v => v >= 750);

salaries.copyWithin(dest, source);

```

## Authors

* **David Ikin**