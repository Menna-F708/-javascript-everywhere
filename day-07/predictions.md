# React Rendering Assignment — 0.1

## 1 — What renders?

function A() {
const user = { name: "Omar", age: 30 };
return <p>{user}</p>;
}
**Output:**

Error: Objects are not valid as a React child.

**Actual:**

Objects are not valid as a React child.

**Explaining:**

لأن `user` عبارة عن Object، وReact مش بتقدر تعرضه مباشرةً كـ child داخل JSX. لو عايزين نعرض الاسم، نكتب `user.name` بدل `user`.

---

## 2 — What renders when items is []?

function B({ items }: { items: string[] }) {
return <div>{items.length && <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>}</div>;
}

**Output:**

`0`

**Actual:**

`0`

**Explaining:**

لأن `items` عبارة عن Array فاضية، فـ `items.length` بتساوي `0`. والـ `&&` في JavaScript بترجع أول قيمة Falsey بتقابلها، وهي هنا `0`. وReact بتعرض الرقم `0` كـ child عادي.

---

## 3 — The user clicks three times. What does the console show, and what does the button show?

function C() {
let count = 0;
return <button onClick={() => { count++; console.log(count); }}>{count}</button>;
}

**Output:**

Console: `1, 2, 3`

Button: `0`

**Actual:**

Console: `1, 2, 3`

Button: `0`

**Explaining:**

لأن `count` متغير عادي باستخدام `let`، والـ Event Handler بيعدّل نفس المتغير مع كل ضغطة، فالقيم اللي بتظهر في الـ Console هي `1` ثم `2` ثم `3`. لكن تغيير المتغير العادي مش بيطلب من React تعمل Re-render، عشان كده الزرار بيفضل يعرض القيمة الأصلية `0`.

---

## 4 — What number does the button show after ONE click?

function D() {
const [n, setN] = useState(0);
return <button onClick={() => { setN(n + 1); setN(n + 1); setN(n + 1); }}>{n}</button>;
}
**Output:**

`1`

**Actual:**

`1`

**Explaining:**

لأننا استخدمنا `setN(n + 1)` ثلاث مرات، لكن التلاتة بيقرؤوا نفس قيمة `n` من الـ Render الحالي، وهي `0`. بالتالي، كل استدعاء بيطلب تحديث القيمة إلى `1`، وبعد ما React تجمع التحديثات وتعمل Re-render، الزرار بيعرض `1` مش `3`.

---

## 5 — And this one, after ONE click?

function E() {
const [n, setN] = useState(0);
return <button onClick={() => { setN((c) => c + 1); setN((c) => c + 1); setN((c) => c + 1); }}>{n}</button>;
}
**Output:**

`3`

**Actual:**

`3`

**Explaining:**

لأننا استخدمنا Functional State Updates عن طريق `setN((c) => c + 1)`. كل دالة بتستقبل القيمة السابقة للتحديث، وبتضيف عليها `1`. بالتالي، التحديثات بتتنفذ بالتتابع: `0` تصبح `1`، ثم `2`، ثم `3`. عشان كده الزرار بيعرض `3` بعد ضغطة واحدة.

---

## 6 — The user clicks once. What changes on screen?

function F() {
const [list, setList] = useState<number[]>([1, 2]);
return <button onClick={() => { list.push(3); setList(list); }}>{list.join(",")}</button>;
}
**Output:**

`1,2`

**Actual:**

`1,2` (المتوقع في الظروف العادية عند تشغيل المثال بشكل مستقل).

**Explaining:**

لأن `list.push(3)` بتعدّل الـ Array الأصلية مباشرةً، فبتصبح `[1, 2, 3]`. بعد كده `setList(list)` بتمرّر نفس مرجع الـ Array، مش Array جديدة. React بتقارن المرجع الجديد بالقديم باستخدام `Object.is`، ولأن المرجع نفسه، بتتجاهل التحديث عادةً ومش بتعمل Re-render بسببه. عشان كده الشاشة بتفضل تعرض `1,2`، رغم إن الـ Array نفسها اتعدّلت في الذاكرة. لو حصل Render آخر لسبب مختلف، ممكن يظهر التغيير.
