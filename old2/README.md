# MUNify CHASE

> CHASE stands for *CHAiring SoftwarE*

MUNify CHASE is a Software to managing Debates of Model United Nations Conferences with tools like speakers lists, digital voting and resolution editing. It is part of the MUNify Project, which aims to provide a comprehensive Software Suite for Model United Nations Conferences. MUNify is an Open Source Project by the german non-profit organization [Deutsche Model United Nations (DMUN) e.V.](https://dmun.de).

![munify](./screenshots/chase_landing_page.png)
*(Landing page of the CHASE software component)*

The project is still under development. It is currently not recommended to use it for a conference. If you are interested in using it, please contact us via the discussion section of this repository.

We are happy to recieve feedback, contributions and donations. Please see below for more information.

### Internal Tools

- [todo-sync](./todo-sync) -> A tool to sync #todo comments from the code to [this static website](https://deutschemodelunitednations.github.io/munify-chase/)

## Develop Locally

Make sure you have [Docker](https://www.docker.com/get-started/), [bun](https://bun.sh/) and [node](https://nodejs.org/en/download/current) installed

Clone the project

```bash
  git clone https://github.com/DeutscheModelUnitedNations/munify-chase
```

Go to the project directory

```bash
  cd munify-chase
```

Install root dependencies

```bash
  bun i
```

Now go to the component you would like to run and follow the instructions/run the start scripts.
All root level scripts can be found in the [package.json](./package.json) file. Run them with `bun run <nameOfScript>`.

### Development in a Devcontainer
A devcontainer is a containerized development environment. It is a good way to ensure that all developers have the same environment and to avoid the "it works on my machine" problem. A devcontainer is defined in the [.devcontainer](./.devcontainer) directory. To use it, you need to have [Docker](https://www.docker.com/get-started/) and [VSCode](https://code.visualstudio.com/) installed. The Container is preconfigured with all the tools you need to develop the project.

## FAQ

#### Can I use this for my conference outside of DMUN?

Yes. We encourage and allow usage for other conferences. Please see our license for more detailed information on this.

Note that the project is still under development and it is not recommended to use it without our consultation for a conference at the moment. The current state of the of the App is tested on a few DMUN conferences. If you are interested in using it, please contact us via the discussion section of this repository. We are happy to help you with the setup and usage, as long as you use it for your own conferences in line with our non-profit spirit.

Note also that this is primarily a project for DMUN conferences and might not be 100% suitable for your conferences needs and compatable with your rules of procedure. If you want guidlines on how to adapt the Code to your needs, please contact us via the discussion section of this repository. We are also happy to help.

#### Ok, but how?

You would need to deploy the app yourself, on your own servers and do all the neccessary setups. This can be an owerwhelming task so feel free to contact us when you need help. In some cases it might be possible for us to run the infrastructure and grant you access, please contact us in case you would like to know more about this. Depending on the use case and complexity, we might need to charge a service fee.

#### Can I help you building the project?

Yes, you can! Please refer to the contributing section below.

#### Can you add a feature?

For feature suggestions, please post in the discussion section of this repository. You can find it [here](https://github.com/DeutscheModelUnitedNations/munify-chase/discussions). If you want to write it yourself, please see the contributing section below.

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.

By contributing you agree to release your contributtion under the projects license.

## License

*This aspect is work in progress since the project is currently in its development phase. If you want to use the project or one of its components nonetheless, please contact us via the discussion section.*

[LICENSE](./LICENSE)

## Support us / Donations
You can support our work by donating to our non-profit organization [Deutsche Model United Nations (DMUN) e.V.](https://dmun.de).
Please contact our board for details on how to donate by sending an email to [vorstand@dmun.de](mailto:vorstand@dmun.de).

All donations are tax deductible in Germany and we are happy to provide you with a donation receipt. The money will be used to support our development of MUNify if you don't specify a different purpose.

## Impressions

![munify](/screenshots/chase_mission_control.png)
![munify](/screenshots/chase_speakers_list.png)