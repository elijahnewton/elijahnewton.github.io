---
id: lesson-6
title: "JavaScript Basics: Syntax & DOM"
duration: "2.5 hours"
objectives:
    - Learn JavaScript syntax
    - Manipulate the DOM
    - Handle events
keywords:
    - javascript
    - syntax
    - dom
    - events
---

# JavaScript Basics: Syntax & DOM

Overview
- Short, practical introduction to core JavaScript syntax and DOM manipulation with hands-on examples.

Prerequisites
- Basic HTML & CSS
- A text editor and a modern browser

Estimated time
- 2.5 hours (lecture + practice)

## Learning Objectives
- Read and write basic JavaScript syntax
- Select and update DOM elements
- Attach and handle events

## 1. Language Essentials
- Script inclusion:
```html
<script src="script.js" defer></script>
```
- Comments: `//` and `/* ... */`
- Variables:
```js
const name = "Alice";
let count = 0;
var legacy = true; // avoid in modern code
```
- Data types: string, number, boolean, object, array, null, undefined

## 2. Control Flow & Functions
- Conditionals and loops:
```js
if (count > 0) { ... }
for (let i = 0; i < 5; i++) { ... }
```
- Functions:
```js
function add(a, b) { return a + b; }
const mult = (a, b) => a * b;
```

## 3. DOM Selection & Manipulation
- Selectors:
```js
const el = document.getElementById('id');
const first = document.querySelector('.class');
const list = document.querySelectorAll('li');
```
- Change content and attributes:
```js
el.textContent = 'Hello';
el.innerHTML = '<strong>Hi</strong>';
el.setAttribute('data-state', 'active');
```
- Class and style:
```js
el.classList.add('hidden');
el.style.color = 'red';
```
- Create and insert nodes:
```js
const p = document.createElement('p');
p.textContent = 'New paragraph';
document.body.appendChild(p);
```

## 4. Events
- Add event listeners:
```js
button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked', e);
});
```
- Common events: click, input, submit, change, keydown
- Delegation pattern example:
```js
document.querySelector('#list').addEventListener('click', (e) => {
    const item = e.target.closest('li');
    if (item) { /* handle item */ }
});
```

## 5. Mini Project: Counter Example
HTML:
```html
<button id="inc">+1</button>
<span id="count">0</span>
```
JS:
```js
const btn = document.getElementById('inc');
const countEl = document.getElementById('count');
let count = 0;
btn.addEventListener('click', () => {
    count += 1;
    countEl.textContent = count;
});
```

## 6. Exercises
1. Build a todo list: add, remove, toggle complete (persist in localStorage optional).  
2. Create a form that validates input and shows error messages without reloading.  
3. Implement event delegation to handle clicks on dynamic list items.

## 7. Hints / Solutions (brief)
- Use `createElement`, `appendChild`, and `dataset` for todo items.  
- Prevent default submit with `e.preventDefault()` and validate values.  
- Attach a single listener to the parent for delegation.

