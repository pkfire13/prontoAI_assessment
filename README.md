# ProntoAI Coding Assessment

## Installation 

Run 
```
npm install
```
to install all dependencies.

## Usage
```
ts-node main.ts /path/to/git/repo
```

## Description

Using typescript and ts-node, this script leverages the npm package simple-git to get the information about a git repository. It
uses simple-git, momentjs and fs packages to get the status, branch and last commit of the git directory.

1. uses simple-git's status() method to get the active branch and the modified files of the git repository
2. uses simple-git's log() method to get the last commit date and author
3. uses momentjs to format the date of the last commit and delta time between the last commit and now


