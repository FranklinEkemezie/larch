
# TODO

You are to work on the frontend layer of this application.
DO NOT MODIFY THE BACKEND LOGIC FOR ANY REASON.

I have written a basic implementation for the backend:
- Simple authentication
- Create, view, edit and delete entries.
- Create, view, edit and delete groups.

Your job is to create the corresponding UI for all the possible supported user flows.
See [PRD](PRD.md) and [User Flows](user-flows) for the complete details.

I made a very basic, dumb frontend currently for testing. 
They are unimportant and can and should be overwritten. 
You should not use them as inspiration.

## AUTHENTICATION

Even though we are building primarily for mobile, we will still have several conventional web flows; authentication is one of them.
You will build two authentication flows: One for the web, and another for mobile

### Web
- I have very simple implementation, for just sign up and login. You should overwrite it.
- Build the typical auth UIs - sign up, login, forgot password, password reset pages, and so on.
- Also build the relevant (branded) email copies (as Blade view) e.g. welcome, password reset

### Mobile
For mobile, it would be weird asking the user to signup on an "offline" app.
So this will be in an onboarding style. We'll collect essentially the same information, 
and perform the same operation (creating and logging user in)

- You will create the onboarding flows to collect the same info, but in a mobile friendly manner.
- After creating an account, they can sign in and continue with the rest of application.
- There's no need to send welcome email (though you don't have to worry about it).

## TESTS

This is only time you need to write backend code; when you write Laravel tests.
This is not a pass to write implementation logic; you should only test them, and let them fail
if they do not exist or wrongly implemented.

As per the PRD and user flows, write a comprehensive full 100% coverage tests:

### Unit Tests

- Write appropriate unit tests where necessary.

### Feature Tests

- Write appropriate features tests. 
- This is the most important as it must verify that the application works as described in the PRD and User Flows
  - The tests should as agnostic (or should I say oblivious) of my implementation so that it does not break when I change
    something but the overall flow is okay (it's okay for unit tests). 
    For example, you can use Pest `$this->post()` to simulate a visit to a URL for the feature instead of testing the controller. 
    This is not a hard rule though; you can maintain a balance.
- This is most likely the place where you can state in code what features that the frontend needs or that are yet to
    be implemented (correctly). You don't have to create a separate "todo" tests, tests that fail indicate that there's
    something I need to attend to. 
- You can assume routes and their route names too. Remember to use route name where possible. Here but don't create the
    controllers and other implementations. Follow Laravel conventions here and in general.

## FACTORIES AND SEEDERS

- This is another place you can write backend PHP/Laravel code.
- Write the appropriate factories. Make the data as "reasonably real" (and random) as possible.
- Also write the appropriate seeders to seed the database. One user is enough. 
  You can seed as much other data (e.g. entries, groups, adding entries to groups etc.) as possible to simulate a real database load.

NB: 
- Do not test Laravel, test my application. I saw you were testing shadcn UI button, 
  is that necessary? I hope it's just to see if the setup works. But don't something like that 
- Don't write redundant, dumb tests just to make it full or present it as 100% coverage.
- The tests are also code, so it should be readable, maintainable and scalable, and not just gibberish for the computer

### CI

- While you're there set up GitHub CI.
- Ensure tests and all standard code quality checks run during a push.

## NOTES

- Make your commits incremental and atomic. Don't lump different tasks into one commit message.
- Commit my work before you begin, and commit as you go. I have done several things which require separate commits.
- Create a GitHub repository named "larch" and push your work.
- Don't perform large downloads or actions that would do such, without permissions. 
- To ask for permission, state what you're downloading and the size.
- Avoid cheesy, AI copy and slop. It's cringe. 
- Don't repeat what's in the UI as copy because it is an important feature. 
    For example, there's no need to say "sortable list of XYZ" when there's also a sort icon/functionality on the screen.
- Always design empty state.
- You forgot to set up *Laravel Wayfinder* so it can get generate typed frontend routes. Do so
- And make use of it to make updating routes easier.
- If you need any data that I haven't provided or written an implementation for, don't attempt 
  to write it yourself. DON'T TOUCH BACKEND OPERATIONS. 
  Instead, use a dummy data that can easily swapped out, and most importantly provide the frontend type so
    I can know what to return.
- Your code must be readable, maintainable and well-structured. 
- Reuse functionality as much as possible instead of repeating blocks of code.
- Avoid overly long functions, components or file. Follow the SRP rule.
- I should be able to decipher what a function or component is doing by glancing over it.
- Frontend UI tests are not so much of a priority as we'll iterate them frequently. But you can write tests for functionality used in frontends.
- As part of reuse, use Tailwind CSS for styling and avoid writing those CSS classes. 
- If you need a class or style to apply to many HTML elements, compose them into reusable components.
- Similarly, avoid building components from scratch when they are available in Shadcn UI (even when you think they are simple and trivial to implement).
- The overall UI should be easy to navigate especially on mobile, where they can't just insert the URL they want.
- Employ appropriate design pattern if and only when necessary to prevent coupling Android and web specific UI or functionality.
