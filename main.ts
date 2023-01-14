import fs from 'fs';
import moment from 'moment';
import { SimpleGit, simpleGit } from 'simple-git';

function isValidGitDirectory(path: string): boolean {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

async function gitStatus(path: string) {
  const git: SimpleGit = simpleGit({ baseDir: path });

  try {
    const status = await git.status();
    const activeBranch = status.current;
    const modified = !status.isClean();

    const commitHistory = await git.log();
    const headCommit = commitHistory.latest;
    const author = headCommit!.author_name;
    const headCommitTimeStamp = moment(headCommit!.date);
    const now = moment();
    const lessThanOneWeek = now.diff(headCommitTimeStamp, 'days') < 7;

    console.log('active branch: ', activeBranch);
    console.log('local changes: ', modified);
    console.log('recent commit: ', lessThanOneWeek);
    console.log('blame Rufus: ', author === 'Rufus');
  } catch (error) {
    console.log('Error', error);
  }
}

//get args as gitDirectory
const gitDirectory = process.argv[2];

//check if gitDirectory is valid
if (isValidGitDirectory(gitDirectory)) {
  gitStatus(gitDirectory);
} else {
  console.log('Invalid git directory');
}
