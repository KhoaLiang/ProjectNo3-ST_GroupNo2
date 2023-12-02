const { By, Builder, until } = require("selenium-webdriver");
const { Select } = require('selenium-webdriver/lib/select');
const assert = require("assert");

describe(`Test trên chrome (tổng 21 testcases)`, () =>
{
      jest.setTimeout(60000);

      const valid1 = `${ __dirname }/files/ValidFile1.txt`;
      const valid2 = `${ __dirname }/files/ValidFile2.txt`;
      const valid3 = `${ __dirname }/files/ValidFile3.txt`;
      const bigFile = `${ __dirname }/files/BigFile.pdf`;
      const emptyFile = `${ __dirname }/files/EmptyFile.txt`;

      let reset = true;

      let driver;

      beforeAll(async function ()
      {
            driver = await new Builder().forBrowser("chrome").build();

            // Trước tiên người dùng cần phải đăng nhập với tư cách là admin
            await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox.moodledemo.net/?lang=en&redirect=0");

            let firstCourse = await driver.wait(until.elementLocated(By.xpath(`//a[@class='aalink' and contains(text(),'My first course')]`)), 10000);
            await firstCourse.click();

            // Tạo assignment
            // try
            // {
            let setMode = await driver.wait(until.elementLocated(By.name('setmode')), 10000);
            await setMode.click();
            // }
            // catch (err)
            // {
            //       let editMode = await driver.wait(until.elementLocated(By.xpath(`//div[@class='singlebutton']/form/button[@type='submit' and @class='btn btn-secondary']`)), 10000);
            //       await editMode.click();
            // }

            let addActivity = await driver.wait(until.elementLocated(By.xpath(`//button[@class='btn btn-link text-decoration-none section-modchooser section-modchooser-link activity-add bulk-hidden d-flex align-items-center p-3 mb-5' and @data-action='open-chooser' and @data-sectionid='0']`)));
            await addActivity.click();

            let addNewAssignment = await driver.wait(until.elementLocated(By.xpath(`//a[@title='Add a new Assignment' and @class='d-flex flex-column justify-content-between flex-fill']`)));
            await addNewAssignment.click();

            let assignmentName = await driver.wait(until.elementLocated(By.id('id_name')), 10000);
            await assignmentName.sendKeys('TEST ASSIGNMENT - SUBMISSION TEST');

            let selectMenu = await driver.wait(until.elementLocated(By.id('id_assignsubmission_file_maxfiles')), 10000);
            let select = new Select(selectMenu);
            await select.selectByIndex(1);

            let createAssignment = await driver.wait(until.elementLocated(By.id('id_submitbutton2')), 10000);
            await createAssignment.click();

            // Thoát ra và đăng nhập với tư cách là student
            // try
            // {
            let toggler = await driver.wait(until.elementLocated(By.id(`user-menu-toggle`)), 10000);
            await toggler.click();
            // }
            // catch (err)
            // {
            //       let toggler = await driver.wait(until.elementLocated(By.css(`[id^='action-menu-toggle']`)), 10000);
            //       await toggler.click();
            // }

            // try
            // {
            let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item' and @role='menuitem' and contains(text(),'Log out')]`)), 10000);
            await logout.click();
            // }
            // catch (err)
            // {
            //       let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item menu-action' and @role='menuitem' and contains(text(),'Log out')]`)), 10000);
            //       await logout.click();
            // }

            await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

            username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("student");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang nộp assignment
            firstCourse = await driver.wait(until.elementLocated(By.xpath(`//a[@class='aalink' and contains(text(),'My first course')]`)), 10000);
            await firstCourse.click();

            let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
            test = await test.findElement(By.xpath('..'));
            await test.click();
      });

      afterAll(async () =>
      {
            // Thoát ra và đăng nhập với tư cách là admin
            // try
            // {
            let toggler = await driver.wait(until.elementLocated(By.id(`user-menu-toggle`)), 10000);
            await toggler.click();
            // }
            // catch (err)
            // {
            //       let toggler = await driver.wait(until.elementLocated(By.css(`[id^='action-menu-toggle']`)), 10000);
            //       await toggler.click();
            // }

            // try
            // {
            let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item' and @role='menuitem' and contains(text(),'Log out')]`)), 10000);
            await logout.click();
            // }
            // catch (err)
            // {
            //       let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item menu-action' and @role='menuitem']/span[contains(text(),'Log out')]`)), 10000);
            //       await logout.click();
            // }

            await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            let firstCourse = await driver.wait(until.elementLocated(By.xpath(`//a[@class='aalink' and contains(text(),'My first course')]`)), 10000);
            await firstCourse.click();

            // Xóa assignment
            // try
            // {
            let setMode = await driver.wait(until.elementLocated(By.name('setmode')), 10000);
            await setMode.click();
            // }
            // catch (err)
            // {
            //       let editMode = await driver.wait(until.elementLocated(By.xpath(`//div[@class='singlebutton']/form/button[@type='submit' and @class='btn btn-secondary']`)), 10000);
            //       await editMode.click();
            // }

            let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']`)), 10000);
            await navigator.click();

            let deleteButton = await driver.findElement(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete text-danger menu-action cm-edit-action' and @data-action='cmDelete']`));
            await deleteButton.click();

            // try
            // {
            // deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='button' and @data-action='delete']`)), 10000);
            // await deleteButton.click();
            // }
            // catch (err)
            // {
            deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Yes')]`)), 10000);
            await deleteButton.click();
            // }

            //await driver.quit();
      });

      describe(`Equivalence class partitioning technique (6 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)));
                  await button.click();

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();  
                        reset = true;
                  }
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
            {
                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  await addFile.click();

                  let fileInput;
                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  // addFile = await pageElem.findElement(By.xpath(`//a[@role='button' and @title='Add...']`));
                  await addFile.click();

                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(valid2);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  await driver.wait(until.elementLocated(By.id(`page`)));
                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)));
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 2000));

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  await addFile.click();

                  let fileInput;
                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  await addFile.click();

                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(valid2);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  await driver.wait(until.elementLocated(By.id(`page`)));
                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`File nộp rỗng`, async () =>
            {
                  reset = false;

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  await addFile.click();

                  let fileInput;
                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(emptyFile);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file '.+\..+' is either empty or a folder\. To upload folders zip them first\.$/)
            });

            it(`File nộp quá lớn`, async () =>
            {
                  reset = false;

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  await addFile.click();

                  let fileInput;
                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  await fileInput.sendKeys(bigFile);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file .+\..+ is too large\. The maximum size you can upload is \d+ [MK]B\.$/)
            });

            it(`Không nộp file nào`, async () =>
            {
                  reset = false;

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  await addFile.click();

                  let fileInput;
                  try
                  {
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  catch (err)
                  {
                        let temp = await driver.wait(until.elementLocated(By.xpath(`//span[@class='fp-repo-name' and contains(text(),'Upload a file')]`)), 10000);
                        await temp.click();
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        fileInput = await driver.wait(until.elementLocated(By.name('repo_upload_file')), 10000);
                  }
                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.id('fp-msg-labelledby')), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            // it(`Số lượng file quá nhiều`, async () =>
            // {
            // });
      });

      // describe(`Decision table technique (10 testcases)`, () =>
      // {

      // });

      // describe(`Use-case testing technique (5 testcases)`, () =>
      // {

      // });
});