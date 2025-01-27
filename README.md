## Pull and Push GitHub from VS Code terminal
This is a quick guide for pulling and pushing changes to GitHub using the VS Code terminal. It’s mainly for my own reference, but if you find it useful, feel free to use it!

#### Check if Git is installed
```
git --version
```

#### Set up user profile
```
git config --global user.name "Your Name"
```
```
git config --global user.email "your.email@example.com"
```

#### Set the default branch to `main`
```
git config --global init.defaultBranch main
```

#### Initialize the repository
```
git init
```

#### Stage changes locally
To add **all modified files**:
```
git add .
```
To add **specific files only**:
```
git add index.html
```

#### Commit changes to the repository locally
```
git commit -m "Initial Commit"
```

#### Push changes to GitHub
Set the remote repository:
```
git remote add origin git@github.com:<username>/<repository>.git
```
Rename the branch to `main`:
```
git branch -M main
```
For the **first commit**:
```
git push -u origin main
```
For subsequent commits:
```
git push
```

#### Pull changes from GitHub
```
git pull
```

#### Add a `.gitignore` file
1. Create a file named `.gitignore`.
2. Add filenames or patterns of files you want to exclude from being pushed to GitHub.

#### Shortcuts
To **commit all changes** with a message:
```
git commit -am "Your commit message"
```
Then push:
```
git push
```
To **stage specific files**, commit, and push:
```
git add index.html && git commit -m "Your commit message"
```
```
git push
```

#### Disclaimer
While I’ve done my best to make this as helpful and reliable as possible, please remember that you’re using this at your own risk. I can’t guarantee everything will work perfectly, and I’m not responsible for any hiccups or issues that may arise along the way. I hope it helps, but always double-check and proceed with care. 🌟
