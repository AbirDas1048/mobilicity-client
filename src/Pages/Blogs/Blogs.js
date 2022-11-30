import React from 'react';

const Blogs = () => {
    return (
        <div className='my-5'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body ">
                    <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>
                    <div>
                        <p>
                            We can use URL to store some data e.g.

                            The id of the current item, being viewed
                            Filter parameters
                            Pagination offset and limit
                            Sorting data

                            Keeping such data in the URL allows users to share deep links with others.
                        </p>
                        <br />
                        <p>The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.</p>
                        <br />
                        <p>The third option is to use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.</p>
                    </div>
                </div>
            </div>

            <br />
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body ">
                    <h2 className="card-title"> How does prototypical inheritance work?</h2>
                    <div>
                        <p>Every object with its methods and properties contains an internal and hidden property known as Prototype. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
                    </div>
                </div>
            </div>

            <br />
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body ">
                    <h2 className="card-title"> What is a unit test? Why should we write unit tests?</h2>
                    <div>
                        <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.

                            Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </div>
            </div>

            <br />
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body ">
                    <h2 className="card-title"> React vs. Angular vs. Vue?</h2>
                    <div>
                        <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.

                            They can be used almost interchangeably to build front-end applications, but they’re not 100 percent the same, so it makes sense to compare them and understand their differences.

                            Each framework is component-based and allows the rapid creation of UI features.

                            However, they all have a different structure and architecture — so first, we’ll look into their architectural differences to understand the philosophy behind them.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;