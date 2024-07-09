# Contribution guide

## Creating a new template

Templates are git repositories that have a `package.json` file with a `graphinx` key. This key specifies how to build the site, where to write the generated data, and where to copy static files into.

Here's how to create a new template:

1. Create a new git repository
2. Initialize a new node package, using the package manager of your choice (npm, yarn, pnpm or bun - all are handled by graphinx)
1. Add graphinx as a dependency (this is important to [prevent version mismatches](#versioning))
3. Specify a `graphinx` key in your `package.json` with the following contents:
    - `inject`: Where to write the generated data. Can be a .js or a .ts. 

       It's useful to include a stub file in your repository, so that you don't get errors while developing your template:

       ```
       echo "import type { BuiltData } from 'graphinx';" > path/to/injected.data.ts
       echo "export const data = {} as BuiltData;" > path/to/injected.data.ts
       ```

       You can also generate data from graphinx's `example/` directory, or from your own example data; without building an entire documentation site, with `graphinx generate`
    - `out`: Path to the directory where the built site will be
    - `static`: Where to copy static files into -- can be left out, but users of your template won't be able to specify `static` in their config
    - `pages`: Where to copy pages into -- can be left out, same as `static`
    - `dotenv`: Tells Graphix to write a .env file.
        - `path`: Where to write the .env file
        - `variables`: an array of env variables to put in the file
    - `metadata`: Serves as documentation only for now
        - `modules`: Object mapping metadata keys to a description. Documents metadata that can be passed to modules' intro through YAML frontmatter.
4. Specify a `package.json` script named `build`, that graphinx will run after installing dependencies

### Multiple templates in one repository

You can totally have multiple templates in one repository. Just create a directory for each template. Users will have to specify `owner/repo/path/to/directory` instead of `owner/repo`.

### Outside of github

You can use any valid git repository URL, not just github. Users will have to specify the entire URL instead of just `owner/repo`

### Versioning

You should version your templates by using git tags, so that users can pin them to a specific version. The version should also match the Graphinx version the template is compatible with. If you release new incompatible template versions between two compatible Graphinx version, add suffixes: for example, if you have two versions of your template that both are compatible with Graphinx v0.5.0, the first should be tagged `v0.5.0`, and the second `v0.5.0-1`, then `v0.5.0-2`, etc.

When the user's installed Graphinx version is incompatible with the version you specified in your `package.json`'s `dependencies`, Graphinx will prevent the user from using the template, and suggest upgrading Graphinx (where relevant) or pinning / upgrading a pinned template version. For example:

```
❌ The template you're using requires Graphinx ^0.10.0, but you are running 0.9.0
   => Consider upgrading Graphinx to 0.10.0.
      You should also be able to pin the template version in your config file with template: ...#vX.Y.Z:

        - template: graphinx/templates/default
        + template: graphinx/templates/default#v0.9.0

   (Note that the template may not have this tag, verify by visiting the template's repository)
```

### A tip: re-using the markdown template's logic

If you want to create a new template but can reuse the markdown template's logic, you can depend on [@graphinx/markdown](https://npmjs.com/package/@graphinx/markdown).

It exposes a function to render all modules as markdown files in `out`, given the built data and the GraphQL Schema (which can be built from `data.schema` with [graphql](https://npmjs.com/package/graphql)'s `buildSchema` function.
