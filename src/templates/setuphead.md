# Install CLI

Optic is an [open source project](https://github.com/opticdev) backed by YCombinator. It's great for documenting APIs and can output Swagger, API Clients or static documentation.

~~~bash
$ npm install @useoptic/cli -g 
~~~

# Setup API
In order to learn your API spec, Optic needs to know:

- How to run your API's integration tests
- Which paths you want it to document


This configuration is defined in an `optic.yml` file placed in the root directory of your API repository. First navigate to your API repository: 

~~~bash
$ cd path/to/repo
~~~

Then create an `optic.yml` manually or by running `optic setup:init`.  

~~~yml
document:
  id: your-api-name        # pick a slug for your API
  version: 0.1.0           # a semantic version for the API
  run_tests: npm run test  # the command that runs your tests
  paths:                   # the paths you want Optic to document
    - /self
    - /self/memberships/:teamId
    - /self/posts/:postId
~~~

Optic will only document paths that are listed in the `optic.yml`. Since it might take a few minutes to fill out the paths section of the file, we suggest picking 3 paths to start and adding the remaining ones at the end of the tutorial.

