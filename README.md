Question-01:What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById-It select a single element by using its unique ID.
getElementsByClassName-It select all elements with  given class name.
querySelector-It matches first element a css selector
querySelectorAll-It maches a css selector,used in array type nodelist.
Question-02:How do you create and insert a new element into the DOM?
to create the element i need to use document.createElement("name")
then i have add content 
Then chose where to insert the new content by using following codes
parent.appendChild(name)
or
parent.inserBefore(name.referenceNode)
Inser anywhere
element.insertAdjacentElement(position,name)
Question-03:What is Event Bubbling and how does it work?
In javascript event bubbling occur if an event triggered on a child element automatically bubble up through its parent element in DOM tree. usually it starts with Event Triggered then Target Phase,Bubbling Phase and lastly Event Listeners
Question-04:What is Event Delegation in JavaScript? Why is it useful?
Event delegation is a technique where i can attach a single event listener to its parent element. Its like parent to childs responsibility. It is useful because its performance is efficient, use less memory.It has capability to run  dynamic content effortlessly.Codes are much cleaner and scalable.
Question-05:What is the difference between preventDefault() and stopPropagation() methods?
preventDefault()-stops browser default action for the respective event. But its not useful for DOM.
stopPropagation()-Stops event bubbling in the DOM tree and it does not stop browser default.
