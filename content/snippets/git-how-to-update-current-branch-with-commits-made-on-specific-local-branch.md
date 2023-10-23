---
title: "Git: How to update current branch with commits made on another local branch"
description: Here's how you can update branches of your local repository with commits made on another specific local branch
tags: [git]
---

To update the current branch of your local repository with commits made on another specific local branch, which in this case is the `main` branch, you can use the following command:

```bash
git pull . main
```

This command is using the `git pull` command to update the local repository with changes from the remote repository.

Here's what each part of the command does:

- `git pull`: This is a command used in Git to fetch and integrate changes from a remote repository into the current branch of the local repository.
- `.`: This specifies the remote repository to pull from. In this case, the `.` means the current repository, so it will pull changes from the same repository that the local branch is already tracking.
- `main`: This specifies the remote branch to pull changes from. In this case, it's pulling changes from the `main` branch of the current repository.

So this command is essentially updating the current branch of the local repository with any changes made to the `main` branch of the same repository.

You can also use this command to update the current branch of the local repository with changes from a different remote repository. For example, if you wanted to update the current branch of the local repository with changes from the `main` branch of the `origin` remote repository, you could use the following command:

```bash
git pull origin main
```

This command is essentially the same as the previous one, except it's pulling changes from a different remote repository.

Alright. That's it. I hope you found this useful! Happy coding!
