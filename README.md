# Model Survey

A static site generator for comparing different web-based graph (node-edge) diagraming tools and libraries.  See the results [here:](http://concord-consortium.github.io/model-survey/)

These graph libraries might be used in whole or part for a system modeling web application.


### Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.

### Adding new Library reviews:

    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `open http://localhost:3333/`
    * Add content to `app/assests/libraries.json`
    * When things look good commit your changes, and build for gh-pages (next section)

### Build the static gh-pages site:
    * `./build.sh`

Under [MIT License](LICENSE)