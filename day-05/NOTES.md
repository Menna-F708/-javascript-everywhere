\# Day 05 Notes



\## What



Documented the Day 05 learning work, including JavaScript modules, async patterns, browser modules, and Git workflow practice.



\## Why



Keep the main learning points and project workflow documented for future reference.



\## How to test



Run the Day 05 report with:



```bash

npm --prefix day-05/project run report

```



Verify that the report runs successfully and prints the student results.

## Browser project

Open `day-05/project/index.html` with Live Server to test the browser module.





# Day 05 Notes

 
---

# Part 1–2 — Promises & Async

## 1. What is a Promise?

الـ Promise هو object بيمثل نتيجة عملية asynchronous لسه هتخلص، زي request للـ API أو قراءة بيانات.

يعني بدل ما أستنى العملية تخلص وأوقف البرنامج كله، أنا بقول:

> "أنا مش عارف النتيجة لسه، بس لما تخلص هعرف إذا كانت نجحت ولا فشلت."

الـ Promise ليه 3 حالات:

* `pending` → العملية لسه شغالة.
* `fulfilled` → العملية خلصت بنجاح.
* `rejected` → العملية فشلت.

أهم حاجة إن الـ Promise **settles مرة واحدة فقط**.

يعني أول ما يوصل لـ `fulfilled` أو `rejected`، خلاص حالته ثبتت ومينفعش تتغير.

وده مهم جدًا لأنه بيمنع مشكلة كانت ممكن تحصل في Day 04، لما callback ممكن يتم استدعاؤه أكتر من مرة بالغلط.

مثال:

```js
resolve("Done");
resolve("Again");
reject("Error");
```

النتيجة هتفضل:

```text
Done
```

لأن أول `resolve` هو اللي عمل settlement للـ Promise.

---

## 2. الـ missing `return` bug

من الأخطاء المهمة جدًا إن أنسى أعمل `return` للـ Promise.

مثال:

```js
function getData() {
  fetchData().then((data) => {
    return data;
  });
}
```

هنا ممكن أتوقع إن:

```js
const result = getData();
```

يرجعلي البيانات.

لكن الحقيقة إن `getData()` نفسها مش بتعمل `return`.

فالنتيجة:

```text
undefined
```

لأن الـ `return data` بيرجع من callback بتاع `.then` فقط، مش من `getData`.

الحل:

```js
function getData() {
  return fetchData().then((data) => {
    return data;
  });
}
```

القاعدة اللي فهمتها:

> لو عايزة الـ Promise اللي جوه يكمل معايا بره، لازم أعمله `return`.

---

## 3. `.catch` و `try/catch` بدل `if (err)`

في الـ callbacks كان ممكن كل callback يستقبل:

```js
(err, data)
```

وبالتالي أكرر:

```js
if (err) {
  // handle error
}
```

في كل خطوة.

مع الـ Promise أقدر أعمل:

```js
doSomething()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

بدل ما أعمل `if (err)` في كل callback، أي rejection يقدر يمشي في الـ chain لحد `.catch`.

ومع `async/await` أستخدم:

```js
try {
  const data = await doSomething();
} catch (error) {
  console.log(error);
}
```

فـ `.catch` مع Promise و `try/catch` مع `await` بيدوني طريقة أوضح للتعامل مع الأخطاء.

---

## 4. `Promise.all` vs `allSettled` vs `race` vs `any`

* `Promise.all` → لازم كل الـ Promises تنجح، وأول rejection يفشل العملية كلها.
* `Promise.allSettled` → يستنى كل الـ Promises ويطلع نتيجة كل واحدة سواء نجحت أو فشلت.
* `Promise.race` → أول Promise يخلص هو اللي يحدد النتيجة، نجاح أو فشل.
* `Promise.any` → أول Promise ينجح هو اللي يحدد النتيجة، ولو كلهم فشلوا يحصل rejection.

---

## 5. ليه `.then` بتشتغل قبل `setTimeout(..., 0)`؟

مثال:

```js
Promise.resolve().then(() => {
  console.log("then");
});

setTimeout(() => {
  console.log("timeout");
}, 0);
```

الناتج:

```text
then
timeout
```

السبب إن callback بتاع Promise بيتحط في **microtask queue**.

أما callback بتاع `setTimeout` بيتحط في **task/macrotask queue**.

بعد ما الـ synchronous code يخلص، الـ event loop بيخلص الـ microtasks الأول، وبعدها ينتقل للـ timer.

وعشان كده:

```js
setTimeout(..., 0)
```

مش معناها "شغّل فورًا".

---

## 6. `await` بيوقف إيه؟

`await` بيوقف تنفيذ **الـ async function الحالية** مؤقتًا لحد ما الـ Promise يخلص.

لكن مش بيوقف JavaScript كله.

مثال:

```js
async function loadData() {
  const data = await fetchData();

  console.log(data);
}
```

لما التنفيذ يوصل لـ `await`، الـ function تستنى النتيجة.

لكن الـ event loop يقدر يشغل حاجات تانية في الوقت ده.

يعني:

```text
await
  ↓
الـ async function تستنى
  ↓
JavaScript مش متجمد
  ↓
لما الـ Promise يخلص نكمل
```

---

## 7. Sequential vs Parallel

قبل كل `await`، السؤال اللي لازم أسأله لنفسي هو:

> هل العملية دي محتاجة نتيجة العملية اللي قبلها؟

لو آه، غالبًا لازم أشتغل Sequential.

مثال:

```js
const user = await getUser();

const posts = await getPosts(user.id);
```

هنا `getPosts` محتاجة `user.id`.

فلازم الأولى تخلص قبل الثانية.

لكن لو العمليات مستقلة:

```js
const users = getUsers();
const posts = getPosts();

const [usersData, postsData] = await Promise.all([
  users,
  posts,
]);
```

هنا أقدر أشغلهم مع بعض.

في Task 5.2 قست الفرق بين الـ Sequential والـ Parallel.

**Sequential timing:**

```text
[اكتبي هنا رقم الـ timing الحقيقي من Task 5.2]
```

**Parallel timing:**

```text
[اكتبي هنا رقم الـ timing الحقيقي من Task 5.2]
```

اللي فهمته من التجربة إن الـ Sequential غالبًا بياخد وقت العمليات ورا بعض، بينما الـ Parallel بيخلي العمليات المستقلة تبدأ مع بعض، فإجمالي الوقت بيكون أقرب للعملية الأبطأ.

فالقرار مش:

> "أستخدم Parallel وخلاص."

لكن:

> "هل العمليات مستقلة عن بعض؟"

---

## 8. ليه `forEach(async ...)` مش بيستنى؟

مثال:

```js
items.forEach(async (item) => {
  await save(item);
});

console.log("Done");
```

ممكن `"Done"` تظهر قبل ما كل عمليات `save` تخلص.

السبب إن `forEach` مش بيستنى الـ Promise اللي الـ async callback بترجعه.

لو عايزة أستنى كل العمليات:

```js
await Promise.all(
  items.map((item) => save(item))
);
```

هنا `map` بتعمل array من الـ Promises، و`Promise.all` بيستنى كلهم.

---

## 9. ليه `return await` مهم داخل `try`؟

الفرق مهم خصوصًا مع `try/catch`.

مثال:

```js
try {
  return await doSomething();
} catch (error) {
  console.log(error);
}
```

هنا الـ `await` بيخلي الـ function تستنى الـ Promise جوه الـ `try`.

فلو الـ Promise عمل rejection، الـ `catch` يقدر يمسكه.

أما:

```js
try {
  return doSomething();
} catch (error) {
  console.log(error);
}
```

هنا أنا رجعت الـ Promise نفسه قبل ما rejection يحصل.

فالـ `catch` ده مش بالضرورة يمسك rejection بتاع الـ Promise.

اللي فهمته:

> `return await` مهم لما محتاجة الـ rejection يدخل في نفس `try/catch`.

---

# Part 3 — Modules

## 1. What is a Module?

الـ Module هو ملف JavaScript مستقل بيحتوي على code متعلق بحاجة معينة.

بدل ما أحط كل المشروع في ملف واحد ضخم، أقسمه لملفات، وكل ملف يحدد إيه اللي يسمح للملفات التانية تستخدمه.

مثال:

```text
grade-lib.js
     |
     | export
     ↓
report.js
     |
     | import
     ↓
uses letterGrade()
```

### الثلاث قواعد الأساسية

### 1. Export

لازم أحدد إيه اللي هطلعه:

```js
export function letterGrade(score) {
  // ...
}
```

### 2. Import

الملف التاني يستورده:

```js
import { letterGrade } from "./grade-lib.js";
```

### 3. تشغيله كـ module

في المتصفح:

```html
<script type="module" src="./main.js"></script>
```

---

# 2. `module.exports` vs `exports`

في CommonJS عندي:

```js
module.exports = something;
```

ودي بتحدد الحاجة اللي الـ module هيصدرها.

وفيه:

```js
exports.myFunction = myFunction;
```

ودي shortcut في البداية لـ:

```js
module.exports.myFunction = myFunction;
```

لكن فيه trap مهم:

```js
exports = myFunction;
```

ده مش معناه:

```js
module.exports = myFunction;
```

لأن `exports` في البداية reference لنفس object بتاع `module.exports`.

لو عملت:

```js
exports = ...
```

أنا غيرت reference بتاع `exports` نفسه.

لكن Node لسه بيستخدم:

```js
module.exports
```

عشان كده لو عايزة أغير الـ exported value بالكامل، أستخدم:

```js
module.exports = myFunction;
```

---

# 3. Named vs Default exports

### Named export

```js
export { letterGrade, average };
```

وأستورد:

```js
import { letterGrade, average } from "./grade-lib.js";
```

### Default export

```js
export default letterGrade;
```

وأستورد:

```js
import letterGrade from "./grade-lib.js";
```

أنا أفضل **Named exports** لما الملف فيه أكتر من function.

السبب إن الاسم بيكون واضح وقت الـ import، وبعرف أنا بستورد إيه.

مثال:

```js
import {
  average,
  letterGrade,
  isPassing,
} from "./grade-lib.js";
```

أوضح بالنسبة لي من إن كل حاجة تكون default.

---

# 4. خمس اختلافات بين CommonJS و ESM

| CommonJS                          | ESM                                        |
| --------------------------------- | ------------------------------------------ |
| `require()`                       | `import`                                   |
| `module.exports`                  | `export`                                   |
| `exports`                         | `export default` / named `export`          |
| شائع جدًا في مشاريع Node القديمة  | نظام modules القياسي الحديث في JavaScript  |
| طريقة تشغيل وتحليل modules مختلفة | مدعوم مباشرة في المتصفح مع `type="module"` |

مثال CommonJS:

```js
const math = require("./math");
```

مثال ESM:

```js
import { add } from "./math.js";
```

---

# 5. Live bindings vs copies — #15 vs #16

الـ ESM imports مش مجرد copy عادية للقيمة.

هي **live bindings**.

يعني الـ imported name مربوط بالـ exported binding نفسه.

الفكرة:

```text
Module A
   |
   | exported binding
   ↓
Module B
   |
   | imported binding
```

فأنا في Module B بستخدم الـ binding اللي جاي من Module A، ومش بقدر أعمل assignment للـ imported binding نفسه.

في #15 و #16، الفرق المهم اللي فهمته إن الـ import في ESM مش معناه:

> "هاتلي نسخة مستقلة من القيمة وخلاص."

لكن معناه أقرب لـ:

> "اربطني بالـ exported binding."

وده سبب مهم في فهم سلوك الـ modules.

---

# 6. ليه module page تحتاج Live Server؟

لما أكتب:

```html
<script type="module" src="./main.js"></script>
```

المتصفح بيتعامل مع الملف كـ JavaScript module.

لما أفتح الصفحة مباشرة بـ:

```text
file://...
```

ممكن يحصل مشكلة في تحميل الـ modules بسبب browser security / CORS behavior.

وده حصل معايا في Task 8.

الحل كان تشغيل الصفحة عن طريق **Live Server** بحيث الصفحة تشتغل من HTTP server.

والـ:

```html
type="module"
```

بيخلي المتصفح يتعامل مع `main.js` كـ module، وبالتالي أقدر أستخدم:

```js
import ...
export ...
```

---

# 7. Task 7.4 — `letterGrade`

في Task 7.4 قارنت عدد السطور والـ copies الخاصة بـ `letterGrade`.

الفكرة الأساسية كانت إن لو كتبت نفس function في أكتر من مكان، فأنا بعمل **duplication**.

يعني بدل:

```text
grade-lib.js
   └── letterGrade()

report.js
   └── copy of letterGrade()

another-file.js
   └── another copy
```

الأفضل يكون عندي implementation واحدة:

```text
grade-lib.js
   └── letterGrade()
          ↑
          |
      import
      /    \
 report.js  other-file.js
```

### عدد السطور في Task 7.4

**النسخة الأولى:**

```text
[اكتبي هنا line count الحقيقي من Task 7.4]
```

**النسخة بعد استخدام/import الـ shared function:**

```text
[اكتبي هنا line count الحقيقي من Task 7.4]
```

الهدف كان إن `letterGrade` يبقى له مصدر واحد بدل نسخ نفس الـ logic في أكتر من مكان.

---

# Part 4 — Git

# 1. Working Tree vs Staging Area vs History

أنا بفكر في Git كده:

```text
┌─────────────────┐
│   Working Tree  │
│  files I edit   │
└────────┬────────┘
         │
      git add
         ↓
┌─────────────────┐
│ Staging Area    │
│ changes ready   │
│ for commit      │
└────────┬────────┘
         │
      git commit
         ↓
┌─────────────────┐
│     History     │
│     commits     │
└─────────────────┘
```

### Working Tree

دي الملفات اللي أنا بغير فيها حاليًا.

### Staging Area

دي التغييرات اللي اخترت أحطها في الـ next commit.

مثال:

```bash
git add report.js
```

### History

بعد:

```bash
git commit -m "Refine report output"
```

التغيير يدخل في Git history.

---

# 2. `.gitignore`

في المشروع استخدمت:

```gitignore
node_modules/
.env
.DS_Store
Thumbs.db
.vscode/
```

## ليه `node_modules/`؟

لأنه generated files، وبيتم تثبيته تاني من:

```bash
npm install
```

عن طريق `package.json` و`package-lock.json`.

## ليه `.env`؟

لأنه ممكن يحتوي secrets، زي:

```text
API_KEY=...
DATABASE_PASSWORD=...
```

الحاجات دي مينفعش تتعمل لها commit.

## لو secret اتعمله push؟

لو secret وصل للـ remote بالفعل، مجرد إضافة:

```gitignore
.env
```

مش كفاية.

لازم أغير الـ secret نفسه أو أعمله rotate، لأن السر القديم بقى exposed.

وبعدها لو محتاج، أنضف أثره من history.

---

# 3. Fast-forward vs Merge Commit

## Fast-forward

حصل معايا لما دمجت:

```text
feature/day-05
```

في `main`.

لو `main` ما اتحركش في اتجاه مختلف، Git يقدر يحرك pointer مباشرة.

مثال:

```text
A---B---C  main
         \
          D---E  feature
```

بعد الـ merge:

```text
A---B---C---D---E  main
```

مفيش merge commit جديد.

---

## Merge Commit

لما الفرعين يكون عندهم commits مختلفة، Git ممكن يعمل merge commit.

وده حصل معايا في Conflict بتاع `PASS_MARK`.

الشكل بيكون تقريبًا:

```text
      C---D
     /     \
A---B       M
     \     /
      E---F
```

الـ `M` هو الـ merge commit.

وفي الـ log عندي ظهر:

```text
*   d16de7f Resolve pass mark conflict
|\
```

وده دليل إن الـ commit ده merge commit.

---

# 4. إزاي أحل Conflict؟

في Task 9 عملت conflict على:

```js
const PASS_MARK = 60;
```

كان عندي تغيير مختلف على كل branch.

لما عملت:

```bash
git merge experiment/pass-mark
```

Git قال:

```text
CONFLICT (content): Merge conflict in day-05/project/main.js
Automatic merge failed; fix conflicts and then commit the result.
```

فتحت الملف ولقيت:

```text
<<<<<<< HEAD
const PASS_MARK = 50;
=======
const PASS_MARK = 70;
>>>>>>> experiment/pass-mark
```

المعنى:

```text
<<<<<<< HEAD
نسخة main
=======
نسخة branch التاني
>>>>>>> experiment/pass-mark
```

أنا اخترت القيمة النهائية:

```js
const PASS_MARK = 60;
```

وشلت كل الـ markers:

```text
<<<<<<<
=======
>>>>>>>
```

بعد كده عملت:

```bash
git diff --check
```

وبعدين اختبرت المشروع:

```bash
npm --prefix day-05/project run report
```

والـ report اشتغل بنجاح.

بعدها:

```bash
git add day-05/project/main.js
```

ثم:

```bash
git commit -m "Resolve pass mark conflict"
```

وبكده الـ merge اكتمل.

---

# 5. الـ PR Loop

الـ Pull Request workflow اللي طبقته كان:

```text
git switch main
        ↓
git pull
        ↓
git switch -c docs/day-05-notes
        ↓
write NOTES.md
        ↓
git add
        ↓
git commit
        ↓
git push -u origin docs/day-05-notes
        ↓
Open Pull Request
        ↓
Review
        ↓
Review comment
        ↓
Second commit
        ↓
git push
        ↓
Merge PR
        ↓
Delete branch on GitHub
        ↓
git switch main
        ↓
git pull
        ↓
git branch -d docs/day-05-notes
```

وده طبقته فعلًا في Task 10.

الـ PR كان:

```text
docs/day-05-notes → main
```

وعملت فيه review comment على `Files changed`، وبعدها عملت commit تاني وشوفته ظهر في الـ PR قبل الـ merge.

---

# 6. Undo commands — أستخدم أنهي واحد وإمتى؟

## لو عملت `git add` بالغلط

أستخدم:

```bash
git restore --staged <file>
```

ده يشيل الملف من الـ staging، لكن التعديل نفسه يفضل موجود.

---

## لو عايزة ألغي تعديل محلي

لو التعديل مش محتاجاه:

```bash
git restore <file>
```

وده بيرجع الملف لآخر نسخة موجودة في Git.

لازم آخد بالي لأنه ممكن يمسح التعديل المحلي.

---

## لو آخر commit محتاج تعديل قبل الـ push

أستخدم:

```bash
git commit --amend
```

وده استخدمته لتعديل commit message.

---

## لو عملت push بالفعل

لازم أكون أكثر حذرًا.

لو أقدر أصلح المشكلة بــ commit جديد، ده غالبًا أبسط وأأمن.

لو لازم أغير history على remote، ممكن أستخدم:

```bash
git push --force-with-lease
```

لكن مش أستخدم force push بشكل عشوائي، لأنه ممكن يأثر على ناس تانية شغالة على نفس branch.

---

# One Bug I Hit

أهم bug قابلته في Day 04 كان مع `setTimeout`.

كتبت:

```js
setTimeout(sayHi(), 1000);
```

بدل:

```js
setTimeout(sayHi, 1000);
```

## إيه الغلط؟

لما أكتب:

```js
sayHi()
```

أنا بقول:

> شغّل `sayHi` دلوقتي.

لكن `setTimeout` محتاج function يقدر يشغلها بعد الوقت المحدد.

يعني المفروض أديه:

```js
sayHi
```

مش:

```js
sayHi()
```

الغلط خلّى `sayHi()` تشتغل فورًا، وبعدها القيمة اللي رجعتها اتبعت لـ `setTimeout` بدل function.

وكان عندي:

```text
Hi
```

بتظهر فورًا بدل ما تستنى ثانية، وبعدها ظهر error لأن الـ argument اللي اتبعت لـ `setTimeout` مش callback function بالشكل المطلوب.

## الحل

غيرت:

```js
setTimeout(sayHi(), 1000);
```

إلى:

```js
setTimeout(sayHi, 1000);
```

والفرق اللي حفظته:

```js
sayHi() // شغّل function الآن
sayHi   // ابعت function لحد يشغلها
```

 
---

# Day 05 — What I Took Away

أهم حاجات ثبتت عندي من Day 05:

* الـ Promise له 3 states.
* الـ Promise بيعمل settle مرة واحدة.
* لازم أخد بالي من `return` مع Promise chains.
* `.catch` و`try/catch` بيسهلوا error handling.
* `Promise.all` و`allSettled` و`race` و`any` مش نفس الحاجة.
* الـ microtasks بتتعمل قبل timer tasks.
* `await` بيوقف الـ async function، مش JavaScript كله.
* لازم أسأل قبل كل `await`: هل العملية دي محتاجة اللي قبلها؟
* `forEach(async ...)` مش بيستنى الـ async operations.
* الـ modules بتقسم المشروع لأجزاء منظمة.
* `exports` و`module.exports` مش نفس الاستخدام.
* Named exports أوضح بالنسبة لي في الملفات اللي فيها functions كتير.
* ESM بيستخدم `import/export`.
* Git عنده Working Tree وStaging Area وHistory.
* `.gitignore` بيمنع files معينة من tracking، لكنه مش بيلغي secret اتنشر بالفعل.
* الـ conflict بيتحل يدويًا وبعده لازم أعمل test.
* الـ PR بيمثل workflow من branch → review → merge.
* بعد الـ merge لازم أرجع `main` وأعمل `pull`.
* اختيار أمر الـ undo بيعتمد على أنا وصلت لفين في Git workflow.
