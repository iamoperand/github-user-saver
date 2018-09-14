# GitHub User Saver

### It is live [here](https://github-user-saver.netlify.com/)

## Approach


### Project Setup

1. **ESLint:** It is used to make the code readable and also to add linting to the project.

2. **Lint-Staged:** To apply linting to all the git-staged files.

3. **Husky:** To make it easy to work with git-hooks. In this case, `precommit` hook.


### Firebase

1. Stored all the config details in `.env.local` file, so as to make them inaccessible.


### Styling

1. Used [ant-design](https://ant.design/) so as to provide the inbuilt UI components that I can directly use.

2. To customize the ant-design components, I have used `styled-components`. Also, I have made a customized UI kit of my own at `src/components/StyledComponents`.

3. At locations, where there is no need to make a StyledComponent (because that thing is not getting used at many places), I have used `inline-styling`.


### Deployment

1. Used `netlify` to deploy the react-app as it's super fast for hosting static-websites.

