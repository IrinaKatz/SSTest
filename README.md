# SStask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

Testing task for the position of Frontend Developer

Testing task represents development of a small web application for managing orders.
It's a single page application with one page representing all the orders and a dialog window for
making a new order. 

Every order consists of different amount of modules (likes, reposts, subscribers)
that depend on the type of an order (user's account or post). Every module can be removed 
or stopped/activated. After removing the last module the order is also to be removed.

New order creation consists of the following steps:
1. UserInterface types the link to the social media resource (an account or a post)
2. The link is validated on the front side, the order type is specified
3. Depending on the type of the order all the available modules are represented
4. The user specifies data in the modules by his values
5. After the button "Add" is clicked the order is added to the orders list

The page is simply adaptive (only desktop and mobile versions).

All the functionaly must be developed according to designed layout using 
Angular 6+ and Bootstrap 4+. Any public modules for Angular could be used.

Serverside interaction is not needed. For server-like interaction the local storage should be used.
