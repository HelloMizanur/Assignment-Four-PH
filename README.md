# Difference Between Selectors

Selectors are just ways to grab elements from your HTML so you can use them in JavaScript.

getElementById – Finds one element by its ID. Since IDs are unique, it only gives you one element. It’s also very fast.

getElementsByClassName – Finds all elements with a certain class name. It gives you a list of them.

querySelector – Lets you use CSS-style selectors like #id or .class. It only returns the first match it finds.

querySelectorAll – Same idea as querySelector, but it returns all matching elements instead of just one.

# Creating and Inserting a New Element

When you want to add something new to the page, you usually do three things:

Create it – Use document.createElement() to make the element.

Add content or styling – Set its text with .textContent or give it a class with .className.

Put it on the page – Use .appendChild() or .prepend() to insert it into a parent element.

That’s basically the process.

# What is Event Bubbling?

Event bubbling is how events move up the page.

If you click a button inside a div, the click first happens on the button. Then it moves up to the div, then to the body, and so on. So even though you clicked the button, its parent elements also “see” that click unless you stop it.

# Event Delegation

Event delegation means adding one event listener to a parent element instead of adding listeners to every child.

This is helpful because:

It improves performance (fewer event listeners).

It still works if you add new elements later.

The parent listens for events and checks which child triggered it.

# preventDefault() vs stopPropagation()

They sound similar but do different things.

preventDefault() stops the browser’s default behavior. For example, it can stop a form from submitting or a link from opening.

stopPropagation() stops the event from moving up to parent elements. So only the clicked element handles it.
