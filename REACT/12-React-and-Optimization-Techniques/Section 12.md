# Section 12

## How React Really Works
- ReactDOM is then responsible for working with the real DOM, which is part of the browser and therefore ReactDOM is responsible for bringing something onto the screen which the user is then able to see.
- React only cares about components, it cares about props, which is basically data you pass  to components to make components configurable  and to enable parent-child component communication 
- React cares about state which is internal data inside of a component and React cares about context which is component-wide data 
- Whenever props, state or context changes, components that use these concepts  are updated  by react and react checks whether this component  now wants to draw something new onto the screen and React will let ReactDOM know about that so that ReactDOM is able to bring that new screen that new component, that new ouptup to the screen 
- It is worth noting that reevaliating a component is not the same  as re rendering the DOM, so just because a component function is re-executed by React does not mean that the respective part of the actual real DOM is re-rendered or re-evaluated  instead we have to differentiate between our component part, our React part and the real DOM
![clipboard.png](6BxkuEXp1-clipboard.png)
But how exactly does this work?
![clipboard.png](DPjNbeHFA-clipboard.png)
- The real DOM is not changed all the time it's changed rarely and only when needed 
- It does this virtual DOM diffing  finding out the difference between two snapshots 
![clipboard.png](RMynnp9mL-clipboard.png)
![clipboard.png](4M8jp7Yas-clipboard.png)