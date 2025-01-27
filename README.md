# myeeko.github.io

## Pull and Push GitHub from VS Code terminal

#### Check git installed
```
git --version
```

#### Setup user profile
```
git config --global user.name ""
```
```
git config --global user.email ""
```

#### Set branch to main
```
git config --global init.defaultBranch main
```

#### Initialise Repository
```
git init
```

#### Add to queue locally
for all modified files:
```
git add .
```
or for specific modified files:
```
git add index.html
```


#### Commit to repository locally
```
git commit -m "Initial Commit"
```

#### Push to Github
```
git remote add origin git@github.com:_____/_____.git
```
```
git branch -M main
```
for first time commit:
```
git push -u origin main
```
have already pushed previously:
```
git push 
```

#### Pull from Github
```
git pull
```

#### Git Ignore
1. have file .gitignore
1. any files listed in .gitignore wont be pushed to GitHub

#### Shortcuts
shorter version of commands to commit all:

```
git commit -am "message"
```
```
git push
```
shorter version of commands to commit specific files which will intern have specific commit messages:
```
git add index.html && git commit -m "message"
```
```
git push
```
