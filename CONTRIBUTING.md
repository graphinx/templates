# Contribution guide

## Creating a new template

1. Create a new directory
2. Initialize a new node package, using the package manager of your choice (npm, yarn, pnpm or bun - all are handled by graphinx)
3. Specify a `graphinx` key in your `package.json` with the following contents:
    - `inject`: Where to write the generated data. Can be a .js or a .ts
    - `out`: Path to the directory where the built site will be
    - `static`: Where to copy static files into -- can be left out, but users of your template won't be able to specify `static` in their config
    - `pages`: Where to copy pages into -- can be left out, same as `static`
    - `dotenv`: Tells Graphix to write a .env file.
        - `path`: Where to write the .env file
        - `variables`: an array of env variables to put in the file
    - `metadata`: Serves as documentation only for now
        - `modules`: Object mapping metadata keys to a description. Documents metadata that can be passed to modules' intro through YAML frontmatter.
4. Specify a script named `build`, that graphinx will run after installing dependencies

### A tip: re-using the markdown template's logic

If you want to create a new template but can reuse the markdown template's logic, you can depend on [@graphinx/markdown](https://npmjs.com/package/@graphinx/markdown).

It exposes a function to render all modules as markdown files in `out`, given the built data and the GraphQL Schema (which can be built from `data.schema` with [graphql](https://npmjs.com/package/graphql)'s `buildSchema` function.