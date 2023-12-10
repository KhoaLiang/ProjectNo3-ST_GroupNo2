# This is the guide for run test Level 0


# This is the guide for run test Level 1
**Requirement:**  Installing node version 16 (visit https://nodejs.org/en)

## Init Code:
```bash
    git clone https://github.com/KhoaLiang/ProjectNo3-ST_GroupNo2
```
## Installation dependencies:

```bash
    cd project

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