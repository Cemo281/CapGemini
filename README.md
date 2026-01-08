# CapGemini

-Be aware of the users in your database and verify that it is coherent with the entities, enventually update a few users manually to have the roles if they stay null when launching the back

How to use: -Launch the backend (via an IDE of your choice for exemple or via springboot commands) -Launch the frontend (in a terminal: cd project-crud -> ng serve)

You should be on the login page. Connect with an user with either role (role OBLIGATORY) by inputting the username and the password corresponding according to your DB. -> Redirection to the accueil page

UNLOGGED: -blocked from everything except the login page

USER: -can see every entity via the corresponding pages -does not have acces to other fonctionnalities

ADMIN: -includes USER -has acces to forms to add, and the buttons to edit or delete, entities on the corresponding pages. WARNING: IF YOU CHANGE THE USER ROLE YOU ARE CURRENTLY LOGGING TO USER INSTEAD OF ADMIN, THE FRONT WILL NOT IMMEDIATELY REMOVE THE BUTTONS AND FORMS BUT YOU WILL HAVE AN ERROR WHEN TRYING TO MODIFY THE DB-> THIS ALSO MEANS YOU CAN REMOVE ALL ADMINS, THREAD WITH CAUTION