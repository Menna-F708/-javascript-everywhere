\# Day 01 Notes



\## Node.js



Node.js lets me run JavaScript outside the browser.



The browser is mainly used to run JavaScript for websites, while Node.js lets me run JavaScript on my computer.



\## npm



npm is used to install and manage packages for JavaScript projects.



\## Git vs GitHub



Git is used to track changes in my code.



GitHub is a website where I can store my Git repositories online.



So:



\* Git = version control

\* GitHub = online place for my repositories



\## Commands I Learned



git init — creates a new Git repository.



git add . — adds my files to the staging area.



git commit -m "message" — saves my changes.



git remote add origin URL — connects my project to GitHub.



git remote set-url origin URL — changes the GitHub repository URL.



git push -u origin main — uploads my code to GitHub.



git remote -v — shows the connected GitHub repository.



\## What Broke?



Nothing broke during the setup.



I checked that Git was installed and that my project was connected to GitHub correctly.



\## Task 3.4



\### 1. When do you use `let` instead of `const`?



I use let when I know that the value will change later.



\### 2. What does `typeof \[]` return, and why is that surprising?



typeof \[] returns "object".



This is surprising because an array is usually thought of as a separate type, but in JavaScript arrays are objects.



\### 3. What is the difference between `===` and `==`, and why do we only use `===`?



=== checks the value and the type.



== can convert the type before comparing.



We use === because it is safer and more predictable.



\### 4. When would you use `while` instead of `for`?



I use while when I don't know exactly how many times the loop will run.



I use for when I usually know how many times I want the loop to run.









