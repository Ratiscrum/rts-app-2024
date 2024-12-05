# Ratiblue - App 2024

## Setup

- Clone the repository
- Download and install pnpm with the command `corepack enable` in your terminal
- Install the dependencies with `pnpm install`
- Create a `.env.local` file in the root of the project with the same keys as in the file `.env.local.example` and fill them with the correct values.
- Run the project with `pnpm dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development

- This project is set up with Husky for pre-commit hooks
    - You can see the commands that are run before comitting in the `.husky` folder
    - I think you need to run this command once at the beginning : `pnpm run prepare`
- This project is set up with ESLint and Prettier for code formatting and linting
    - You can run the command `pnpm run lint` to check for linting errors and `pnpm run format:write` to auto format the code

## Technologies

- Next.js 15
- Shadcn for components and theming
- TailwindCSS for styling
