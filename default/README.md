# @graphinx/template

Graphinx's default template.

It's a SvelteKit project made to be statically rendered.

At build time, the graphinx CLI injects the needed data statically in `src/lib/data.generated.ts`. This data is then returned by the various load functions.

## Development

1. Clone the repository
   ```
   git clone https://github.com/grahpinx/templates
   ```
2. Go to the default directory
   ```
   cd default
   ```
1. Install dependencies
    ```
    yarn
    ```
4. Start the development server (seeds the generated data file with example data if it doesn't exist yet)
    ```
    yarn dev
    ```
