# frontend-seeds-basic
HTML + CSS + JS seeds. Perfect for Web anything.

## Why frontend-seeds-basic

Templates provided in a template store somewhere are sometimes package a lot of stuff people probably wouldn't need
(think components such as carousels, image sliders for a simple Web app). Codes get bloated and the whole codebase
turns into a mess, as soon as the pages are populated with styles and scripts. Suddenly, it isn't fun to code the whole
thing anymore.

**frontend-seeds-basic** aims to solve the problem by providing a minimal, yet efficient headstart for front-end
templates. It uses exceptional dependency management by [Bower](http://bower.io), simple build system by [Gulp]
(http://gulpjs.com), and flexible [SASS](http://sass-lang.com) styles preprocessing.

Potentially, frontend-seeds-basic can be used with your JavaScript framework of choice, since it doesn't include stuff
the developer thinks "you need". All the basic stuff to get you started with your technology of choice in mind.

## How to Use
1. Clone this repo.
2. Checkout to your frameworks of choice: `$ git checkout <branch>`. See the available frameworks below.
3. Run `npm install`.
4. Run `bower install`.
4. Remove `.git`

Currently supported styles are:

| Branch       | Frameworks                                                             |
| ------------ | ---------------------------------------------------------------------- |
| `master`     | [Bootstrap](http://getbootstrap.com) + [jQuery](http://jquery.com)     |
| `foundation` | [Foundation](http://foundation.zurb.com) + [jQuery](http://jquery.com) |

## License
GNU GPLv3. See LICENSE for details.
