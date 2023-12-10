# This is the guide for run test Level 0 (IDE projects)

## Before running N_Nghia/Level 0/submitFile.side

**Requirement 1:** Change rows in testcases that have value of `C:\Users\APC\Desktop\ValidFile1.txt` to `<this project directory in your machine>\N_Nghia\files\ValidFile1.txt`<br/>
**Requirement 2:** Change rows in testcases that have value of `C:\Users\APC\Desktop\ValidFile2.txt` to `<this project directory in your machine>\N_Nghia\files\ValidFile2.txt`<br/>
**Requirement 3:** Change rows in testcases that have value of `C:\Users\APC\Desktop\EmptyFile.txt` to `<this project directory in your machine>\N_Nghia\files\EmptyFile.txt`<br/>
**Requirement 4:** Change rows in testcases that have value of `C:\Users\APC\Desktop\BigFile.pdf` to `<this project directory in your machine>\N_Nghia\files\BigFile.pdf`

# This is the guide for run test Level 1 (test scripts)

**Requirement:** Installing node version 16 (visit https://nodejs.org/en)

## Init Code:

```bash
    git clone https://github.com/KhoaLiang/ProjectNo3-ST_GroupNo2
```

## Installation dependencies:

```bash
    npm install
```

## Run Test

### Post Question to forum (Moodle 4.2):

```bash
    npx jest -- PostQuestion.test.js
    or
    npm run PostQuestion
```

### Add New Badge (Moodle 4.2):

```bash
    npx jest -- AddNewBadge.test.js
    or
    npm run AddNewBadge
```

### Create new course (Moodle 4.3):

```bash
    npx jest -- createNewCourse.test.js
    or
    npm run createNewCourse
```

### Submit file (Moodle 4.2):

```bash
    npx jest -- submitFile.test.js
    or
    npm run submitFile
```

<<<<<<< HEAD
### Create new course (Moodle 4.3):

```bash
    npx jest -- createNewCourse.test.js
    or
    npm run createNewCourse
```


### Create new Quiz (Moodle 4.3):

```bash
    npm run AddNewQuiz
```

### Create new Event (Moodle 4.3):

```bash
    npm run AddNewEvent
```

=======
### Change profile info (Moodle 4.3):

```bash
    npx jest -- profileChange.test.js
    or
    npm run profileChange
```
>>>>>>> 0ff7151ff378727fde111f72e4ad7b858947c608
