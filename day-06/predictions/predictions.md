 # TypeScript Predictions — Day 06

## p01

```ts
let score = 92;

score = "92";

console.log(score);
```

**Prediction**

* **tsc:** هيظهر خطأ `TS2322`؛ لأن `score` اتحدد نوعه كـ `number` من القيمة الأولى، وبالتالي مينفعش نسند له `string`.
* **node:** هيطبع `92` كنص، لأن JavaScript لا تطبق TypeScript type checking وقت التشغيل.

**Actual `tsc`**

```text
predictions/p01.ts:3:1 - error TS2322:
Type 'string' is not assignable to type 'number'.
```

**Actual `node`**

```text
92
```

**Why:** توقعي كان صحيح؛ TypeScript يرفض تغيير نوع المتغير، بينما JavaScript runtime لا يطبق هذا القيد.

---

## p02

```ts
const grade = "A";

let other = "A";

const g1: "A" | "B" = grade;

const g2: "A" | "B" = other;

console.log(g1, g2);
```

**Prediction**

* **tsc:** هيظهر خطأ `TS2322` عند `g2`؛ لأن `other` نوعها `string`، بينما `g2` يقبل `"A"` أو `"B"` فقط.
* **node:** هيطبع `A A`؛ لأن TypeScript types لا توجد في JavaScript runtime.

**Actual `tsc`**

```text
predictions/p02.ts:5:7 - error TS2322:
Type 'string' is not assignable to type '"A" | "B"'.
```

**Actual `node`**

```text
A A
```

**Why:** توقعي كان صحيح؛ `const` يسمح بـ literal type أضيق، بينما `let` استنتجت `string`.

---

## p03

```ts
function add(a: number, b: number) { return a + b; }

console.log(add(2, "3" as any));
```

**Prediction**

* **tsc:** مش هيظهر خطأ؛ لأن `as any` يسمح بتمرير `"3"` رغم أن الدالة تتوقع `number`.
* **node:** **هتوقع يطبع `5`**، لأن `"3"` ممكن تتحول إلى رقم أثناء العملية الحسابية.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
23
```

**Why I was wrong:** نسيت إن `+` مع وجود `string` بيعمل **string concatenation**، والـ `any` غطّى المشكلة عند TypeScript لكنه لم يغيّر قيمة `"3"` إلى number.

**Mechanism:** `any` يتجاوز static type checking، وJavaScript `+` يختار concatenation عندما يكون أحد الطرفين string.

---

## p04

```ts
const scores = [90, 80];

const top = scores[5];

console.log(top.toFixed(1));
```

**Prediction**

* **tsc:** **مش هيظهر خطأ**؛ لأن `noUncheckedIndexedAccess` غير مفعّل، وبالتالي توقعت أن `scores[5]` تكون `number`.
* **node:** هيحصل `TypeError` لأن `scores[5]` هي `undefined`.

**Actual `tsc`**

```text
predictions/p04.ts:3:7 - error TS2451:
Cannot redeclare block-scoped variable 'top'.

predictions/p04.ts:4:13 - error TS18047:
'top' is possibly 'null'.

predictions/p04.ts:4:17 - error TS2339:
Property 'toFixed' does not exist on type 'Window'.
```

**Actual `node`**

```text
TypeError: Cannot read properties of undefined (reading 'toFixed')
```

**Why I was wrong:** ركزت على `noUncheckedIndexedAccess` ونسيت أن اسم `top` نفسه بيتعارض مع متغير `top` الموجود في DOM typings.

**Mechanism:** global scope collision مع `Window.top` أدى إلى type checking مختلف عن المتوقع.

---

## p05

```ts
const found = [90, 80].find((n) => n > 95);

console.log(found.toFixed(1));
```

**Prediction**

* **tsc:** هيظهر `TS18048` لأن `find()` ممكن ترجع `undefined`.
* **node:** هيحصل `TypeError` عند استدعاء `toFixed()`.

**Actual `tsc`**

```text
predictions/p05.ts:3:13 - error TS18048:
'found' is possibly 'undefined'.
```

**Actual `node`**

```text
TypeError: Cannot read properties of undefined (reading 'toFixed')
```

**Why:** توقعي كان صحيح؛ `find()` لم تجد عنصرًا، فرجعت `undefined`.

---

## p06

```ts
function greet(name?: string) {
  return `Hi ${name.toUpperCase()}`;
}

console.log(greet());
```

**Prediction**

* **tsc:** هيظهر `TS18048` لأن `name` ممكن تكون `undefined`.
* **node:** هيحصل `TypeError` عند استدعاء `toUpperCase()`.

**Actual `tsc`**

```text
predictions/p06.ts:2:46 - error TS18048:
'name' is possibly 'undefined'.
```

**Actual `node`**

```text
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```

**Why:** توقعي كان صحيح؛ optional parameter يعني أن القيمة ممكن تكون `undefined`.

---

## p07

```ts
const pair: [string, number] = ["Sara", 92, true];

console.log(pair);
```

**Prediction**

* **tsc:** هيظهر `TS2322` لأن الـ tuple متوقعة عنصرين فقط، لكن القيمة فيها ثلاثة.
* **node:** لو شغّلنا JavaScript الناتجة رغم خطأ TypeScript، هتطبع الـ array بكل عناصرها.

**Actual `tsc`**

```text
predictions/p07.ts:2:7 - error TS2322:
Type '[string, number, boolean]' is not assignable to type '[string, number]'.
```

**Actual `node`**

```text
[ 'Sara', 92, true ]
```

**Why:** توقعي كان صحيح؛ الـ tuple constraint موجود في TypeScript فقط، بينما JavaScript تتعامل معها كـ array عادية.

---

## p08

```ts
interface Student {
  name: string;
  score: number;
}

const s: Student = {
  name: "Sara",
  score: 92,
  age: 20
};

console.log(s);
```

**Prediction**

* **tsc:** هيظهر `TS2353` لأن `age` ليست property معروفة في `Student`.
* **node:** لو شغّلنا JavaScript الناتجة، الـ object سيحتوي على `age`.

**Actual `tsc`**

```text
predictions/p08.ts:3:47 - error TS2353:
Object literal may only specify known properties,
and 'age' does not exist in type 'Student'.
```

**Actual `node`**

```text
{ name: 'Sara', score: 92, age: 20 }
```

**Why:** توقعي كان صحيح؛ excess property checking يحدث عند TypeScript، وليس runtime.

---

## p09

```ts
interface Student {
  name: string;
  score: number;
}

const data = {
  name: "Sara",
  score: 92,
  age: 20
};

const s: Student = data;

console.log(s);
```

**Prediction**

* **tsc:** مش هيظهر خطأ؛ لأن `data` تحتوي على كل properties المطلوبة في `Student`.
* **node:** هيطبع الـ object بكل properties.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
{ name: 'Sara', score: 92, age: 20 }
```

**Why:** توقعي كان صحيح؛ excess property checking تختلف عندما يكون الـ object محفوظًا أولًا في variable.

---

## p10

```ts
interface Student {
  readonly id: number;
  tags: string[];
}

const s: Student = {
  id: 1,
  tags: []
};

s.tags.push("ts");

console.log(s);
```

**Prediction**

* **tsc:** مش هيظهر خطأ؛ `readonly` تمنع تغيير `id` نفسها، لكنها لا تجعل محتوى `tags` readonly.
* **node:** هيطبع الـ object مع `ts` داخل `tags`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
{ id: 1, tags: [ 'ts' ] }
```

**Why:** توقعي كان صحيح؛ `readonly` على property لا يعني أن object/array المشار إليها أصبحت immutable.

---

## p11

```ts
const raw: unknown = JSON.parse('{"name":"Sara"}');

console.log(raw.name);
```

**Prediction**

* **tsc:** هيظهر `TS18046` لأن `unknown` لازم نعمل لها narrowing قبل الوصول إلى `name`.
* **node:** هيطبع `Sara` لأن `unknown` لا توجد في JavaScript runtime.

**Actual `tsc`**

```text
predictions/p11.ts:3:13 - error TS18046:
'raw' is of type 'unknown'.
```

**Actual `node`**

```text
Sara
```

**Why:** توقعي كان صحيح؛ `unknown` قيد static فقط.

---

## p12

```ts
const raw: any = JSON.parse('{"name":"Sara"}');

console.log(raw.nmae.toUpperCase());
```

**Prediction**

* **tsc:** مش هيظهر خطأ بسبب `any`.
* **node:** **هتوقع يطبع `SARA`** لأن `raw` تحتوي على `name`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```

**Why I was wrong:** قرأت اسم property بسرعة ولم أنتبه أن الكود يستخدم `nmae` بدل `name`، و`any` سمحت للخطأ يعدي من TypeScript.

**Mechanism:** `any` يلغي تقريبًا type checking لهذه القيمة، لكنه لا يمنع runtime errors الناتجة عن properties غير الموجودة.

---

## p13

```ts
function label(x: string | number) {
  if (typeof x === "string") return x.toUpperCase();

  return x.toFixed(1);
}

console.log(label("a"), label(2));
```

**Prediction**

* **tsc:** مش هيظهر خطأ بسبب `typeof` narrowing.
* **node:** هيطبع `A 2.0`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
A 2.0
```

**Why:** توقعي كان صحيح؛ `typeof` عمل narrowing للـ union.

---

## p14

```ts
function first<T>(items: T[]): T {
  return items[0];
}

const n = first([1, 2, 3]);

const s = first(["a"]);

console.log(n + 1, s + 1);
```

**Prediction**

* **tsc:** مش هيظهر خطأ؛ TypeScript يستنتج `T` كـ `number` في الاستدعاء الأول و`string` في الثاني.
* **node:** هيطبع `2 a1`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
2 a1
```

**Why:** توقعي كان صحيح؛ generic inference حافظ على النوع المناسب لكل استدعاء.

---

## p15

```ts
function longest<T extends { length: number }>(
  a: T,
  b: T
): T {
  return a.length >= b.length ? a : b;
}

console.log(
  longest("abc", "de"),
  longest([1], [1, 2])
);

console.log(longest(10, 20));
```

**Prediction**

* **tsc:** هيظهر `TS2345` عند `longest(10, 20)` لأن `number` لا يحتوي على `length`.
* **node:** لو شغّلنا JavaScript الناتجة رغم الخطأ، هتطبع:

```text
abc [ 1, 2 ]
20
```

**Actual `tsc`**

```text
predictions/p15.ts:4:21 - error TS2345:
Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

**Actual `node`**

```text
abc [ 1, 2 ]
20
```

**Why:** توقعي كان صحيح؛ generic constraint يتم فحصه بواسطة TypeScript ولا يتحول إلى runtime check.

---

## p16

```ts
async function getScore(): Promise<number> {
  return 92;
}

const score: number = getScore();

console.log(score);
```

**Prediction**

* **tsc:** هيظهر `TS2322` لأن `getScore()` ترجع `Promise<number>` وليس `number`.
* **node:** هتظهر `Promise { 92 }`.

**Actual `tsc`**

```text
predictions/p16.ts:3:7 - error TS2322:
Type 'Promise<number>' is not assignable to type 'number'.
```

**Actual `node`**

```text
Promise { 92 }
```

**Why:** توقعي كان صحيح؛ `async` تجعل return value داخل Promise.

---

## p17

```ts
async function getScore(): Promise<number> {
  return 92;
}

const score = await getScore();

console.log(score.toFixed(1));
```

**Prediction**

* **tsc:** هيظهر `TS1378` لأن الـ `tsconfig` الحالي لا يسمح بـ top-level `await`.
* **node:** **هتوقع يشتغل ويطبع `92.0` لأن Node الحديثة تدعم top-level await.**

**Actual `tsc`**

```text
predictions/p17.ts:3:15 - error TS1378:
Top-level 'await' expressions are only allowed when the 'module'
option is set to 'es2022', 'esnext', 'system', 'node16',
'node18', 'node20', 'nodenext', or 'preserve',
and the 'target' option is set to 'es2017' or higher.
```

**Actual `node`**

```text
Warning: Module type ... is not specified...

ReferenceError: Cannot determine intended module format
because both 'exports' and top-level await are present.

code: 'ERR_AMBIGUOUS_MODULE_SYNTAX'
```

**Why I was wrong:** افترضت أن دعم Node لـ top-level `await` كفاية، لكن الـ compiled output كان فيه CommonJS `exports` مع top-level `await`، فـ Node لم يستطع تحديد module format.

**Mechanism:** **Top-level await + CommonJS/ESM module detection conflict.**

---

## p18

```ts
try {
  throw new Error("boom");
} catch (err) {
  console.log(err.message);
}
```

**Prediction**

* **tsc:** هيظهر `TS18046` لأن `err` نوعها `unknown`.
* **node:** هيطبع `boom`.

**Actual `tsc`**

```text
predictions/p18.ts:3:27 - error TS18046:
'err' is of type 'unknown'.
```

**Actual `node`**

```text
boom
```

**Why:** توقعي كان صحيح؛ TypeScript تتعامل مع caught errors كـ `unknown` في الإعدادات الحالية، بينما JavaScript runtime يستطيع الوصول للـ Error object.

---

## p19

```ts
type Student = {
  name: string;
  score: number;
};

const s = {
  name: "Sara",
  score: 92
} as Student;

const t = {
  name: "Omar"
} as Student;

console.log(s.score, t.score);
```

**Prediction**

* **tsc:** مش هيظهر خطأ لأن `as Student` يسمح بعمل type assertion.
* **node:** هيطبع `92 undefined`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
92 undefined
```

**Why:** توقعي كان صحيح؛ type assertion لا تضيف properties إلى object.

---

## p20

```ts
enum Grade {
  A,
  B
}

console.log(Grade.A);
```

**Prediction**

* **tsc:** مش هيظهر خطأ.
* **node:** هيطبع `0`.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
0
```

**Why:** توقعي كان صحيح؛ numeric enum يبدأ افتراضيًا من `0`.

---

## p21

```ts
type Student = {
  name: string;
  score: number;
};

const update: Partial<Student> = {
  score: 80
};

const full: Required<Partial<Student>> = {
  score: 80
};

console.log(update, full);
```

**Prediction**

* **tsc:** هيظهر `TS2741` لأن `Required` تجعل كل properties مطلوبة، وبالتالي `name` لازم تكون موجودة.
* **node:** لو شغّلنا JavaScript الناتجة، هتطبع:

```text
{ score: 80 } { score: 80 }
```

**Actual `tsc`**

```text
predictions/p21.ts:4:7 - error TS2741:
Property 'name' is missing in type '{ score: number; }'
but required in type 'Required<Partial<Student>>'.
```

**Actual `node`**

```text
{ score: 80 } { score: 80 }
```

**Why:** توقعي كان صحيح؛ utility types تغير الـ static type فقط ولا تضيف properties وقت التشغيل.

---

## p22

```ts
const sizes = {
  S: 1,
  M: 2
};

type Size = keyof typeof sizes;

const a: Size = "M";

const b: Size = "L";

console.log(a, b);
```

**Prediction**

* **tsc:** هيظهر `TS2322` لأن `Size` هي `"S" | "M"` فقط.
* **node:** لو شغّلنا JavaScript الناتجة رغم الخطأ، هتطبع `M L`.

**Actual `tsc`**

```text
predictions/p22.ts:5:7 - error TS2322:
Type '"L"' is not assignable to type '"M" | "S"'.
```

**Actual `node`**

```text
M L
```

**Why:** توقعي كان صحيح؛ `keyof typeof sizes` استخرج keys الموجودة فعليًا في object.

---

## p23

```ts
console.log(
  typeof null,
  typeof [],
  typeof NaN,
  typeof 10n
);
```

**Prediction**

* **tsc:** مش هيظهر خطأ.
* **node:** هيطبع:

```text
object object number bigint
```

**Actual `tsc`**

```text
No type error.
```

**Actual `node`**

```text
object object number bigint
```

**Why:** توقعي كان صحيح؛ هذه نتائج `typeof` المعروفة في JavaScript.

---

## p24

```ts
const list = [];

list.push(1);

list.push("two");

console.log(list);
```

**Prediction**

* **tsc:** مش هيظهر خطأ حسب الإعدادات الحالية.
* **node:** هيطبع:

```text
[ 1, 'two' ]
```

**Actual `tsc`**

```text
No type error.
```

**Actual `node`**

```text
[ 1, 'two' ]
```

**Why:** توقعي كان صحيح؛ المصفوفة الفارغة في هذا السياق سمحت باستنتاج type مناسب للتعديلات المتتالية.

---

## p25

```ts
let big = 10n;

big = big + 5;

console.log(big);
```

**Prediction**

* **tsc:** هيظهر `TS2365` لأن `bigint` لا يمكن جمعه مباشرة مع `number`.
* **node:** هيحصل `TypeError`.

**Actual `tsc`**

```text
predictions/p25.ts:4:7 - error TS2365:
Operator '+' cannot be applied to types 'bigint' and '5'.
```

**Actual `node`**

```text
TypeError: Cannot mix BigInt and other types,
use explicit conversions
```

**Why:** توقعي كان صحيح؛ JavaScript نفسها تمنع خلط `BigInt` مع `Number` في العملية الحسابية.

---

## p26

```ts
const pair: [string, number] = ["Sara", 92];

pair.push(100);

console.log(pair.length, pair);
```

**Prediction**

* **tsc:** **هتوقع يظهر خطأ** لأن `[string, number]` tuple طولها محدد بعنصرين، وبالتالي توقعت أن `push()` ممنوعة.
* **node:** هتوقع `2 [ 'Sara', 92 ]` لأن الـ tuple المفروض تظل بطولها الأصلي.

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
3 [ 'Sara', 92, 100 ]
```

**Why I was wrong:** الـ tuple تحدد أنواع العناصر ومواقعها الأساسية، لكنها ما زالت Array ويمكن استدعاء `push()` عليها.

**Mechanism:** **Tuple type checking لا يعني runtime immutability أو fixed runtime length.**

---

## p27

```ts
const settings = {
  theme: "dark"
} as const;

settings.theme = "light";

console.log(settings.theme);
```

**Prediction**

* **tsc:** هيظهر `TS2540` لأن `as const` تجعل `theme` readonly.
* **node:** لو شغّلنا JavaScript الناتجة رغم الخطأ، هتطبع `light`.

**Actual `tsc`**

```text
predictions/p27.ts:3:10 - error TS2540:
Cannot assign to 'theme' because it is a read-only property.
```

**Actual `node`**

```text
light
```

**Why:** توقعي كان صحيح؛ `readonly` الناتجة عن `as const` static constraint وليست runtime freezing.

---

## p28

```ts
const score: number = Number("12px");

console.log(
  score,
  typeof score,
  Number.isNaN(score)
);
```

**Prediction**

* **tsc:** مش هيظهر خطأ لأن `Number()` ترجع `number` حتى لو القيمة `NaN`.
* **node:** هيطبع:

```text
NaN number true
```

**Actual `tsc`**

```text
No type error for this snippet.
```

**Actual `node`**

```text
NaN number true
```

**Why:** توقعي كان صحيح؛ `NaN` نفسها من نوع `number` في JavaScript.

---

# Wrong Predictions Summary

الـ 5 predictions اللي تعمدت أخليهم غلط:

| Snippet | Prediction الغلط       | Actual                        | Mechanism                             |
| ------- | ---------------------- | ----------------------------- | ------------------------------------- |
| p03     | `5`                    | `23`                          | `+` مع string → concatenation         |
| p04     | `tsc` بدون error       | `tsc` errors                  | Global `top` / `Window.top` collision |
| p12     | `SARA`                 | `TypeError`                   | `any` لا تمنع runtime errors          |
| p17     | `92.0`                 | `ERR_AMBIGUOUS_MODULE_SYNTAX` | Top-level `await` + module format     |
| p26     | `tsc` error + length 2 | `tsc` accepts + length 3      | Tuple ليست runtime-fixed/immutable    |

# Important Note

لما تشغلي:

```bash
npx tsc -p predictions
```

**أول مرة** ظهر عندك `44 errors` بسبب إن كل الملفات كانت في نفس global scope، فحصلت conflicts مثل:

```text
score
top
pair
Student
s
raw
getScore
```

لكن بعد ما تم عزل/تصحيح الـ compilation setup، الـ output النظيف اللي عندك أصبح:

```text
Found 15 errors in 15 files.
```

وده هو الـ output اللي نعتمد عليه في الـ **actual `tsc` predictions**، وليس الـ 44 error الناتجين عن الـ cross-file redeclarations.
