# Minigit

Minigit is a lightweight Git-like version control system built with Node.js. It simulates core Git functionalities using native modules like `fs`, and `path`, while showcasing concepts like buffers, file system manipulation, and event-driven architecture.

> This project aims only for educational purposes

# Features

- `minigit init` – Initialize a new **repository** in the current **project**.
- `minigit add <file>` – Stage files for commit
- `minigit commit` – Commit staged files

# TODOS

- [ ] `minigit log` – View commit history
- [ ] `minigit status` – View modified or untracked files
- [ ] `minigit checkout <commitHash>` - Return to the commit project state
- [ ] `minigit diff <file>` – See differences between current and last committed version
- [ ] Implement streams to deal efficiently with huge files

# Acknowledgments

Huge thanks to [Joseph Heidari](https://github.com/agile8118) — all the Node.js knowledge and concepts applied in this project came from his course _Understanding Node.js: Core Concepts_.
