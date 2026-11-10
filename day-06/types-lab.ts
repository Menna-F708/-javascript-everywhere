// 2.1 Annotate and infer
let age = 22; // inferred type: number

let nameOne = "Menna"; // inferred type: string

const isDeveloper = true; // inferred type: true

let scores = [90, 85, 95]; // inferred type: number[]

const user = {
  name: "Sara",
  age: 20,
}; // inferred type: { name: string; age: number }

let price: number = 150;
// TypeScript could infer number, so I'd normally leave the annotation out

let score = 90;

// Error:
// Type 'string' is not assignable to type 'number'.

// score = "90";

let x = "A";
const y = "A";
// Hover:
// x → string
// y → "A"
//
// let يسمح بتغيير القيمة، لذلك النوع اتوسع إلى string.
// const لا يمكن إعادة تعيينه، لذلك TS احتفظ بالـ literal type "A"

// ========================================
// 2.2 The Primitives
// ========================================

// ----------------------------------------
// 1. String + Template Literal
// ----------------------------------------

const userName = "Menna";

const welcomeMessage = `Welcome, ${userName}!`;

// Three string methods
console.log(welcomeMessage.toUpperCase());

console.log(welcomeMessage.toLowerCase());

console.log(welcomeMessage.includes("Menna"));

// ----------------------------------------
// 2. Numbers
// ----------------------------------------

const temperature = 28; // number

const productPrice = 149.99; // number

const balance = -50; // number

// Floating-point precision
const total = 0.1 + 0.2;
// Result: 0.30000000000000004
// JavaScript floating-point precision issue.

// Division by zero
const divisionResult = 10 / 0;
// Result: Infinity

// Converting an invalid string to number
const convertedValue = Number("abc");
// Result: NaN
// NaN is still a number in JavaScript.

// ----------------------------------------
// 3. Boolean from a comparison
// ----------------------------------------

const itemsInCart = 3;

const hasItems = itemsInCart > 0;

// Result: true
// Type: boolean

// ----------------------------------------
// 4. BigInt
// ----------------------------------------

const hugeAmount = 9007199254740992n;

// bigint above Number.MAX_SAFE_INTEGER

// Correct BigInt calculation
const updatedAmount = hugeAmount + 20n;

// bigint + bigint is valid

// Rejected BigInt + number mix

// Error:
// Operator '+' cannot be applied to types 'bigint' and 'number'.

// const invalidAmount = hugeAmount + 20;

// ----------------------------------------
// 5. Symbols
// ----------------------------------------

const firstToken = Symbol("account");

const secondToken = Symbol("account");

 console.log((firstToken as symbol) === (secondToken as symbol));
// false
// Each Symbol() creates a unique symbol,
// even when the descriptions are the same.

// ----------------------------------------
// 6. string | null
// ----------------------------------------

let selectedCategory: string | null = "Books";

selectedCategory = null;

// null: بستخدمها لما أكون عايزة أمثل
// بشكل صريح إن مفيش قيمة حاليًا.

// ----------------------------------------
// 7. string | undefined
// ----------------------------------------

let searchedProduct: string | undefined;

// undefined: بستخدمها لما القيمة ممكن تكون
// مش موجودة أو لسه مش متوفرة.

searchedProduct = "Laptop";

// ----------------------------------------
// 8. null assigned to plain string
// ----------------------------------------

let customerName: string = "Mariam";

// Error:
// Type 'null' is not assignable to type 'string'.

// customerName = null;

// ========================================
// 2.3 Arrays, tuples, objects
// ========================================

// ----------------------------------------
// 1. number[] with map, filter, reduce
// ----------------------------------------

const prices = [100, 200, 300];

// map
const updatedPricesMap = prices.map((item) => item + 10);

// inferred type: number[]
console.log(updatedPricesMap);

// filter
const updatedPricesFilter = prices.filter((item) => item > 150);

// inferred type: number[]
console.log(updatedPricesFilter);

// reduce
const totalPriceReduce = prices.reduce((total, item) => total + item, 0);

// inferred type: number
console.log(totalPriceReduce);

// ----------------------------------------
// 2. Empty arrays and type inference
// ----------------------------------------

const firstList = [];

// inferred type: any[]

const secondList: number[] = [];

// inferred type: number[]

// ----------------------------------------
// 3. Mixed array and union mistake
// ----------------------------------------

let mixedArr: (string | number)[] = ["Menna", 22, "React", 100];

// let mixedArrTwo: string | number[] = ["Menna", 22];

// Error:
// Type '(string | number)[]' is not assignable to type 'string | number[]'.

// ----------------------------------------
// 4. readonly array
// ----------------------------------------

const numbers: readonly number[] = [10, 20, 30];

// numbers.push(50);

// Error:
// Property 'push' does not exist on type 'readonly number[]'.

// ----------------------------------------
// 5. Named tuple with optional element
// ----------------------------------------

let personDetails: [name: string, age?: number];

function getUser(): [name: string, age?: number] {
  return ["Menna", 22];
}

const [userNameFromTuple, userAgeFromTuple] = getUser();

// userNameFromTuple → string
// userAgeFromTuple → number | undefined

// ----------------------------------------
// 6. Object type
// ----------------------------------------

type UserProfile = {
  userName: string;
  phone?: number;

  profile: {
    city: string;
  };

  skills: {
    name: string;
    level: number;
  }[];
};

const profileUser: UserProfile = {
  userName: "Menna",

  phone: 123456789,

  profile: {
    city: "Alexandria",
  },

  skills: [
    {
      name: "JavaScript",
      level: 90,
    },
    {
      name: "TypeScript",
      level: 80,
    },
  ],
//   email: "menna@example.com",
  // object literal may only specify known properties, and 'email' does not exist in type 'UserProfile'
};

// ========================================
//  2.4 Conversions and typeof
// ========================================
const numberUsingNumber = Number("68");

const numberUsingParseInt = parseInt("68");

const numberUsingPlus = +"68";

// ----------------------------------------
// Input where the conversions differ
// ----------------------------------------

const numberWithNumber = Number("68px");

const numberWithParseInt = parseInt("68px");

const numberWithPlus = +"68px";
 
  // ----------------------------------------
 // 2. Number to string + falsy values
 // ----------------------------------------

 const numberToString = String(68);

 
 const boolWithZero = Boolean(0);
 
 const boolWithNegativeZero = Boolean(-0);
 
 const boolWithFalse = Boolean(false);
 
 const boolWithNaN = Boolean(NaN);
  
 const boolWithNull = Boolean(null);
 
 const boolWithBigIntZero = Boolean(0n);
 
 const boolWithEmptyString = Boolean("");
 
 const boolWithUndefined = Boolean(undefined);


// ----------------------------------------
// 3. typeof table for primitives + null
// ----------------------------------------

const stringType = typeof "Menna";
 
const numberType = typeof 22;
 
const booleanType = typeof true;
 
const bigintType = typeof 100n;
 
const symbolType = typeof Symbol("id");
 
const undefinedType = typeof undefined;
 
const nullType = typeof null;
 
 
// ----------------------------------------
// 4. Type assertion does NOT convert the value
// ----------------------------------------

const fakeNumber = "5" as unknown as number;

console.log(fakeNumber);
 
console.log(typeof fakeNumber);
 
 const realNumber = Number("5");

console.log(realNumber);
 
console.log(typeof realNumber);
 
  

 
