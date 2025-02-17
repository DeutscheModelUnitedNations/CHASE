# Contributing

If you want to contribute to this project, please stick to the following guidelines. Thank you for your work!

In all contributions, please stick to the [code of conduct](./CODE_OF_CONDUCT.md) and be aware that your contribution will be published under [the projects license](./LICENSE.md).

## Working with issues

Wether you want to tackle an already existing issue or bring you own one, we recommend to explain your suggested solution in the issue discussion, before beginning implementation. Issues which we think are good for newcomers are flagged as [good first issue](https://github.com/DeutscheModelUnitedNations/munify/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) and provide a good entry into contributing to munify.

## Working with branches

Github allows for easy branch creation from an issue. We recommend to do so. We require you to develop on a branch and later create a pull request which will then get reviewed and eventually merged into the main branch. Since code reviews take up a lot of time, please be patient and try to commit well documented and clearly structured code. The best documentation is always the one explaining the _why_.

## Commit messages

We try to stick as close to the [conventional commit specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) as possible:

- `feat:` a new feature
- `fix:` a bugfix
- `style:` stylistic changes to the App
- `wip:` work in progress
- `format & lint:` formatting and linting changes
- `typing:` changes to fulfill typing requirements
- `perf:` a code change that improves performance
- `docs:` a documentation update
- `test:` a test update
- `chore:` project housekeeping
- `refactor:` refactor of the code without change in functionality
- `build:` changes that affect the build system or external dependencies
- `ci:` changes to CI configuration files and scripts
- `revert:` reverts a previous commit
- `merge:` use when merging branches

If you are using the vscode extension [rioukkevin.vscode-git-commit](https://marketplace.visualstudio.com/items?itemName=rioukkevin.vscode-git-commit), the right settings for the convention above should be applied through the settings.json automatically.

Below are examples of well-formatted commits:

```
✨ feat (Frontend): implement login button and modal
branch: login

🐞 fix (General): address error in login body
branch: login

📚 docs (Backend): add examples
branch: setup
```