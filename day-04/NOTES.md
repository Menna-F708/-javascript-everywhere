# Prove it's better

## Line Count

* Day 03 : **116 lines**
* Day 04 : **97 lines**

The Day 04 version is slightly shorter while adding clearer function signatures, destructuring, default values, spread syntax, and other modern JavaScript features.

---

## Function Comparison

### Day 03 — `isPassing`

```js
function isPassing(score, passMark = 60) {
  return score >= passMark;
}
isPassing(80, 60);
```

### Day 04 — `isPassing`

```js
function isPassing({ score, passMark = 60 }) {
  return score >= passMark;
}
isPassing({
  score: 80,
  passMark: 60
});
```

### What does the new signature tell the reader?

The Day 04 signature tells the reader that the function expects a **student-like object** containing a `score`, with an optional `passMark`.

The Day 03 signature only shows two positional values, so the reader has to remember which argument is the score and which argument is the passing mark.


<!-- ================================================================================================================================ -->

# Day 04 Notes

## Part 1 — Destructuring & Spread

### What destructuring does

الـdestructuring ببساطة بيسمحلي أطلع values من object أو array وأحطها في variables بطريقة مختصرة.

الـobject destructuring بيطابق على **اسم الـproperty**، لكن الـarray destructuring بيطابق على **الترتيب والـindex**.

مثال:

```js
const user = {
  name: "Menna",
  age: 25
};

const { name, age } = user;
```

هنا `name` أخدت `user.name` و`age` أخدت `user.age`.

لكن في الـarray:

```js
const numbers = [10, 20];

const [first, second] = numbers;
```

هنا `first` أخدت أول عنصر و`second` أخدت تاني عنصر حسب الـindex.

---

### What `const { a: b } = obj` creates

```js
const { a: b } = obj;
```

ده معناه: هات الـproperty اللي اسمها `a` وحط قيمتها في variable اسمه `b`.

يعني `b` هو الـvariable اللي اتعمل.

لكن ده **مش بيغير اسم الـproperty `a` جوه الـobject**، ومش بيعمل property جديدة اسمها `b` جوه الـobject.

---

### When a destructuring default fires

الـdefault value في destructuring بتشتغل لما القيمة تكون `undefined`.

```js
const { name = "Unknown" } = user;
```

لو `user.name` كانت `undefined`، هياخد `"Unknown"`.

لكن الـdefault **مش بيشتغل** مع:

* `null`
* `0`
* `false`

يعني الـdefault مرتبط تحديدًا بـ`undefined`.

---

### Why `const { x } = undefined` throws

مينفعش أعمل destructuring من `undefined` أو `null` لأن مفيش object أصلًا أطلع منه property.

```js
const { x } = undefined;
```

ده بيعمل `TypeError`.

الحل إني أتأكد إن عندي object، أو أدي default للـobject نفسه:

```js
const { x } = obj || {};
```

أو:

```js
const { x } = obj ?? {};
```

---

### Rest vs Spread

الطريقة اللي بفرق بيهم بيها بسرعة:

**Rest = بجمع values مع بعض.**

```js
const [first, ...rest] = numbers;
```

**Spread = بفرد أو بفك values.**

```js
const newArray = [...numbers];
```

فأنا بفتكرها كده:

> Rest بيجمع، Spread بيفرد.

---

### What shallow copy means

الـshallow copy معناها إني عملت copy للـobject نفسه، لكن الـnested objects جواه لسه بتشير لنفس الـreference.

وده عمللي مشكلة في Task 3.5، لأني عملت copy للـobject الخارجي وكنت فاكرة إن كل حاجة جواه بقت copy مستقلة، لكن لما عدلت في الـnested object، التعديل ظهر في الـoriginal كمان.

يعني:

```js
const copy = { ...student };
```

عمل copy للـ`student` من بره، لكن لو عندي:

```js
student.address
```

فالـ`address` لسه نفس الـreference.

---

### Why spread order matters when merging defaults

الـspread اللي بييجي **بعد كده بيقدر يعمل override** للقيم اللي قبله.

مثلاً:

```js
const result = {
  ...defaults,
  ...user
};
```

لو الاتنين عندهم نفس الـproperty، قيمة `user` هي اللي هتكسب.

عشان كده ترتيب الـspread مهم جدًا لما بعمل merge.

---

### `||` vs `??`

الفرق الأساسي إن `||` بيعتبر values زي `0` و`false` و`""` كأنها مفيهاش قيمة، لكن `??` بيعتبر بس `null` و`undefined` هما اللي مفيهمش قيمة.

مثلاً:

```js
const score = 0;

console.log(score || 50); // 50
console.log(score ?? 50); // 0
```

وده مهم لأن `0` ممكن تكون قيمة صحيحة فعلًا، ومش معنى إنها falsy إنها missing.

---

### My Task 7.5 answer

في Day 03 كان عندي:

```js
function isPassing(score, passMark = 60) {
  return score >= passMark;
}
```

وفي Day 04 بقت:

```js
function isPassing({ score, passMark = 60 }) {
  return score >= passMark;
}
```

الـsignature الجديدة بتوضح إن الـfunction متوقعة object فيه `score` و`passMark`، وبتوضح اسم كل قيمة بدل ما أعتمد على ترتيب الـarguments.

عدد الـlines في Day 03 كان: **[اكتبي العدد اللي طلعلك]**

عدد الـlines في Day 04 كان: **[اكتبي العدد اللي طلعلك]**

---

# Part 2 — Async & Callbacks

### What single-threaded means

الـJavaScript single-threaded يعني عنده Main Thread واحد بينفذ JavaScript code، فلو حطيته في شغل تقيل blocking، مش هيقدر ينفذ شغل JavaScript تاني في نفس الوقت.

في الـbrowser ده ممكن يخلي الصفحة تتجمد، والـuser مش هيقدر يتفاعل معاها لحد ما الشغل يخلص.

---

### Event Loop drawing

أنا بفهم الـEvent Loop بالشكل ده:
 
```text
             JavaScript
                 |
                 v
              Call Stack
                 |
        -------------------
        |                 |
        v                 v
   Browser APIs      Task Queues
                        |
              -------------------
              |                 |
              v                 v
        Microtask Queue    Task Queue
              |                 |
              ---------+---------
                       |
                       v
                  Event Loop
                       |
                       v
                  Call Stack
```

الـCall Stack بينفذ الـJavaScript، والـBrowser APIs بتتعامل مع حاجات زي timers، وبعد ما تخلص الـcallbacks بتروح للـqueues، والـEvent Loop بيشوف إمتى يقدر يرجع callback للـCall Stack.

---

### Why `setTimeout(fn, 0)` doesn't run immediately

`setTimeout(fn, 0)` مش معناها إن `fn` هتشتغل فورًا.

هي بتقول للـbrowser يحط الـcallback للتنفيذ بعد انتهاء الـcurrent synchronous code، والـtimer callback بيروح للـtask queue.

يعني لازم الـCall Stack يفضى الأول.

وكمان الـmicrotask queue زي `Promise.then()` ليها أولوية على الـtask queue بتاعة الـtimers.

---

### Why you can't return out of an async callback

مينفعش أعمل:

```js
function getData() {
  setTimeout(() => {
    return "data";
  }, 1000);
}
```

وأتوقع إن `getData()` ترجع `"data"`، لأن الـcallback هتشتغل بعدين، بعد ما `getData` نفسها تكون خلصت.

بدل كده بستخدم callback:

```js
function getData(callback) {
  setTimeout(() => {
    callback("data");
  }, 1000);
}
```

يعني بدل ما أرجع القيمة، بخلي function تانية تستقبلها لما تكون جاهزة.

---

### Error-first convention

الـerror-first callback convention معناه إن أول parameter للـcallback بيكون للـerror.

لو حصل error:

```js
callback(err);
```

ولو العملية نجحت:

```js
callback(null, data);
```

والـ`return` في:

```js
return callback(err);
```

مهم عشان أوقف الـfunction فورًا بعد ما أبلغ عن الـerror، وممنعش الكود يكمل وينادي الـcallback مرة تانية.

---

### Why `try/catch` can't catch an error inside `setTimeout`

لأن `setTimeout` callback مش بتتنفذ في نفس اللحظة اللي الـ`try` شغال فيها.

يعني:

```js
try {
  setTimeout(() => {
    throw new Error("Oops");
  }, 1000);
} catch (error) {
 }
```

الـ`try` بيكون خلص قبل ما الـcallback تشتغل، فلما الـerror يحصل بعدين، مبقاش فيه `try/catch` حوالينه.

---

### Three problems with callbacks

**1. Callback Hell:**
لما الـcallbacks تكتر وتدخل جوه بعض، الكود بيبقى nested وصعب أقراه وأعدله.

**2. Error handling:**
مع callbacks كتير، التعامل مع الـerrors ممكن يبقى متكرر ومشتت.

**3. Control flow:**
بيبقى صعب أتابع مين هيشتغل الأول ومين مستني مين، خصوصًا لما يكون عندي عمليات async كتير.

---

### Parallel vs Sequential

في Task 7 شغلت عمليات `getAttendance` كلها مع بعض، فكان الوقت تقريبًا وقت أبطأ عملية، حوالي **1000ms**.

لكن لو شغلتهم واحدة واحدة، كنت هجمع كل الـdelays، وكان الوقت حوالي **5500ms**.

حطيت النتائج باستخدام الـindex:

```js
results[index] = result;
```

عشان العمليات بتخلص بترتيب مختلف، لكن أنا محتاجة التقرير النهائي يفضل بنفس ترتيب الطلاب الأصلي.

---

# One Bug I Hit

الـbug اللي قابلني كان إني لما شغلت `hell.js` لوحده ظهرلي:

```text
ReferenceError: findStudent is not defined
```

المشكلة إن `findStudent` كانت مكتوبة في `fake-db.js`، وأنا كنت بحاول أستخدمها من `hell.js` من غير ما أكون عامل modules و`import/export` لسه.

فالحل في التاسك كان إني أحط كود الـfake database في أول الملف اللي بيستخدمه، لأن الـmodules لسه هنتعلمها بعدين.

بعد ما عملت كده، `findStudent` وباقي functions بقوا موجودين في نفس الـfile، والكود اشتغل.

<!-- ============================================================================================================================================================= -->
في Task 8 لما كنت بعمل الـFreeze، حطيت `blockFor(3000)`، وبعدها حاولت أغيّر رسالة الـ`message` قبل وبعد الـfreeze. اكتشفت إن رسالة `"Freezing..."` مش بتظهر على الشاشة قبل ما الـ3 ثواني يخلصوا، وبتظهر النتيجة النهائية بس. فهمت إن المشكلة إن `blockFor` بيحجز الـMain Thread، فالـBrowser مش بياخد فرصة يرسم التغيير في الـDOM غير بعد ما الـblocking code يخلص.

 