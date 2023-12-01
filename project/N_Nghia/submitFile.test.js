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

      let driver;

      beforeAll(async function ()
      {
            driver = await new Builder().forBrowser("chrome").build();

            // Trước tiên người dùng cần phải đăng nhập với tư cách là admin
            await driver.get("https://sandbox.moodledemo.net/login/index.php");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox.moodledemo.net/?redirect=0");

            let firstCourse = await driver.wait(until.elementLocated(By.xpath(`//a[@class='aalink' and contains(text(),'My first course')]`)), 10000);
            await firstCourse.click();

            // Tạo assignment
            let setMode = await driver.wait(until.elementLocated(By.name('setmode')), 10000);
            await setMode.click();

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
            let toggler = await driver.wait(until.elementLocated(By.id('user-menu-toggle')), 10000);
            await toggler.click();

            let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item' and @role='menuitem' and contains(text(),'Log out')]`)), 10000);
            await logout.click();

            await driver.get("https://sandbox.moodledemo.net/login/index.php");

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
            let toggler = await driver.wait(until.elementLocated(By.id('user-menu-toggle')), 10000);
            await toggler.click();

            let logout = await driver.wait(until.elementLocated(By.xpath(`//a[@class='dropdown-item' and @role='menuitem' and contains(text(),'Log out')]`)), 10000);
            await logout.click();

            await driver.get("https://sandbox.moodledemo.net/login/index.php");

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
            let setMode = await driver.wait(until.elementLocated(By.name('setmode')), 10000);
            await setMode.click();

            let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']`)), 10000);
            await navigator.click();

            let deleteButton = await driver.findElement(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete text-danger menu-action cm-edit-action' and @data-action='cmDelete']`));
            await deleteButton.click();

            try
            {
                  deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='button' and @data-action='delete']`)), 10000);
                  await deleteButton.click();
            }
            catch (err)
            {
                  if (err.name === 'TimeoutError')
                  {
                        deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Yes')]`)), 10000);
                        await deleteButton.click();
                  }
            }

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
                  let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                  await removeSubmission.click();

                  let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                  await continueButton.click();
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
                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await fileInput.sendKeys(valid1);
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
                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await fileInput.sendKeys(valid2);
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

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)),10000);
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
                  await fileInput.sendKeys(valid1);
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
                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await fileInput.sendKeys(valid2);
                  await uploadButton.click();

                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  await driver.wait(until.elementLocated(By.id(`page`)));
                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            // it(`File nộp rỗng`, async () =>
            // {
            // });

            // it(`File nộp quá lớn`, async () =>
            // {
            // });

            // it(`Không nộp file nào`, async () =>
            // {
            // });

            // it(`Số lượng file quá nhiều`, async () =>
            // {
            // });
      });

      describe(`Decision table technique (10 testcases)`, () =>
      {

      });

      describe(`Use-case testing technique (5 testcases)`, () =>
      {

      });
});