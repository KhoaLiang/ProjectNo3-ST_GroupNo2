const { By, Builder, until, Capabilities } = require("selenium-webdriver");
const { Select } = require('selenium-webdriver/lib/select');
const assert = require("assert");

const chromeOptions = {
      args: ['--guest'],
};

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.set('goog:chromeOptions', chromeOptions);

const edgeOptions = {
      args: ['--guest'],
};

const edgeCapabilities = Capabilities.edge();
edgeCapabilities.set('ms:edgeOptions', edgeOptions);

describe(`Test trên chrome (tổng 21 testcases)`, () =>
{
      jest.setTimeout(60000);

      const valid1 = `${ __dirname }/files/ValidFile1.txt`;
      const valid2 = `${ __dirname }/files/ValidFile2.txt`;
      const bigFile = `${ __dirname }/files/BigFile.pdf`;
      const emptyFile = `${ __dirname }/files/EmptyFile.txt`;

      const dragAndDropSimulationScript = `function simulateFileDragAndDrop(element, files) {
        // Create a DataTransfer object for simulating file drag and drop
        const dataTransfer = new DataTransfer();

        // Add the simulated files to the DataTransfer object
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            dataTransfer.items.add(file);
        }

        // Create a custom event for the drop with the simulated DataTransfer object
        const dropEvent = new DragEvent('drop', {
            bubbles: true,
            cancelable: true,
            dataTransfer: dataTransfer,
        });

        // Dispatch the drop event on the element
        element.dispatchEvent(dropEvent);
    }

    // Simulate dragging and dropping files onto the specified div element with ID 'myDropZone'
    const dropZone = document.getElementsByClassName('filemanager-container card')[0];

    // Create simulated files (adjust as needed)
    const file1 = new File(['File content 1'], 'file1.txt', { type: 'text/plain' });
    const file2 = new File(['File content 2'], 'file2.txt', { type: 'text/plain' });
    const file3 = new File(['File content 3'], 'file3.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3]);`;

      let reset = true;

      let driver;

      async function isAlertPresent(driver)
      {
            try
            {
                  // Attempt to switch to the alert to check its presence
                  await driver.switchTo().alert();
                  return true;
            } catch (error)
            {
                  // If NoSuchAlertError is thrown, the alert is not present
                  if (error.name === 'NoSuchAlertError')
                  {
                        return false;
                  } else
                  {
                        // Re-throw other errors
                        throw error;
                  }
            }
      }

      beforeAll(async function ()
      {
            driver = await new Builder().withCapabilities(chromeCapabilities).forBrowser("chrome").build();

            // Trước tiên người dùng cần phải đăng nhập với tư cách là admin
            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            let addActivity = await driver.wait(until.elementLocated(By.xpath(`//button[@class='btn btn-link text-decoration-none section-modchooser section-modchooser-link activity-add bulk-hidden d-flex align-items-center p-3 mb-3' and @data-action='open-chooser' and @data-sectionid='0']`)), 10000);
            await addActivity.click();

            let addNewAssignment = await driver.wait(until.elementLocated(By.xpath(`//a[@title='Add a new Assignment' and @class='d-flex flex-column justify-content-between flex-fill']`)), 10000);
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

            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("student");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang nộp assignment
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            //let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']`)), 10000);
            let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-basis d-flex align-items-center']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/a[@class='btn btn-icon d-flex align-items-center justify-content-center  dropdown-toggle icon-no-margin']`)), 10000);
            await navigator.click();

            //let deleteButton = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete text-danger menu-action cm-edit-action' and @data-action='cmDelete']`)), 10000);
            let deleteButton = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-basis d-flex align-items-center']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete menu-action cm-edit-action' and @data-action='cmDelete']`)), 10000);
            await deleteButton.click();

            try
            {
                  deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Yes')]`)), 10000);
                  await deleteButton.click();
            }
            catch (err)
            {
                  deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='button' and @data-action='delete']`)), 10000);
                  await deleteButton.click();
            }

            await driver.quit();
      });

      describe(`Equivalence class partitioning technique (6 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`File nộp rỗng`, async () =>
            {
                  reset = false;

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  if (await addFile.isEnabled())
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
                  if (await addFile.isEnabled())
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
                  if (await addFile.isEnabled())
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file quá nhiều`, async () =>
            {
                  reset = false;

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });

      describe(`Decision table technique (10 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Dung lượng file quá lớn, số lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
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
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(bigFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file .+\..+ is too large\. The maximum size you can upload is \d+ [MK]B\.$/)
            });

            it(`Dung lượng file quá lớn, số lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(bigFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file .+\..+ is too large\. The maximum size you can upload is \d+ [MK]B\.$/)
            });

            it(`File rỗng, số lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
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
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(emptyFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file '.+\..+' is either empty or a folder\. To upload folders zip them first\.$/)
            });

            it(`File rỗng, số lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(emptyFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file '.+\..+' is either empty or a folder\. To upload folders zip them first\.$/)
            });

            it(`Số lượng file bằng 0, không tạo thư mục nào`, async () =>
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file bằng 0, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file nộp vượt quá giới hạn cho phép, dung lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
            {
                  reset = false;

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });

            it(`Số lượng file nộp vượt quá giới hạn cho phép, dung lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });

      describe(`Use-case testing technique (5 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
                        reset = true;
                  }
            });

            it(`Nộp bài thành công`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Hệ thống báo lỗi file quá lớn`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

            it(`Hệ thống báo lỗi file rỗng`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

            it(`Hệ thống báo lỗi không có file nào được chọn để gửi`, async () =>
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Hệ thống báo lỗi số lượng file vượt giới hạn cho phép`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });
});

describe(`Test trên edge (tổng 21 testcases)`, () =>
{
      jest.setTimeout(60000);

      const valid1 = `${ __dirname }/files/ValidFile1.txt`;
      const valid2 = `${ __dirname }/files/ValidFile2.txt`;
      const bigFile = `${ __dirname }/files/BigFile.pdf`;
      const emptyFile = `${ __dirname }/files/EmptyFile.txt`;

      const dragAndDropSimulationScript = `function simulateFileDragAndDrop(element, files) {
        // Create a DataTransfer object for simulating file drag and drop
        const dataTransfer = new DataTransfer();

        // Add the simulated files to the DataTransfer object
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            dataTransfer.items.add(file);
        }

        // Create a custom event for the drop with the simulated DataTransfer object
        const dropEvent = new DragEvent('drop', {
            bubbles: true,
            cancelable: true,
            dataTransfer: dataTransfer,
        });

        // Dispatch the drop event on the element
        element.dispatchEvent(dropEvent);
    }

    // Simulate dragging and dropping files onto the specified div element with ID 'myDropZone'
    const dropZone = document.getElementsByClassName('filemanager-container card')[0];

    // Create simulated files (adjust as needed)
    const file1 = new File(['File content 1'], 'file1.txt', { type: 'text/plain' });
    const file2 = new File(['File content 2'], 'file2.txt', { type: 'text/plain' });
    const file3 = new File(['File content 3'], 'file3.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3]);`;

      let reset = true;

      let driver;

      async function isAlertPresent(driver)
      {
            try
            {
                  // Attempt to switch to the alert to check its presence
                  await driver.switchTo().alert();
                  return true;
            } catch (error)
            {
                  // If NoSuchAlertError is thrown, the alert is not present
                  if (error.name === 'NoSuchAlertError')
                  {
                        return false;
                  } else
                  {
                        // Re-throw other errors
                        throw error;
                  }
            }
      }

      beforeAll(async function ()
      {
            driver = await new Builder().withCapabilities(edgeCapabilities).forBrowser("MicrosoftEdge").build();

            // Trước tiên người dùng cần phải đăng nhập với tư cách là admin
            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            let addActivity = await driver.wait(until.elementLocated(By.xpath(`//button[@class='btn btn-link text-decoration-none section-modchooser section-modchooser-link activity-add bulk-hidden d-flex align-items-center p-3 mb-3' and @data-action='open-chooser' and @data-sectionid='0']`)), 10000);
            await addActivity.click();

            let addNewAssignment = await driver.wait(until.elementLocated(By.xpath(`//a[@title='Add a new Assignment' and @class='d-flex flex-column justify-content-between flex-fill']`)), 10000);
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

            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("student");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang nộp assignment
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            await driver.get("https://sandbox402.moodledemo.net/login/index.php?lang=en");

            let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
            let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

            await username.clear();
            await password.clear();
            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();

            // Vào trang "My first course"
            await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

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

            //let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']`)), 10000);
            let navigator = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-basis d-flex align-items-center']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/a[@class='btn btn-icon d-flex align-items-center justify-content-center  dropdown-toggle icon-no-margin']`)), 10000);
            await navigator.click();

            //let deleteButton = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item focus-control ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-grid ']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete text-danger menu-action cm-edit-action' and @data-action='cmDelete']`)), 10000);
            let deleteButton = await driver.wait(until.elementLocated(By.xpath(`//div[@class='activity-item ' and @data-activityname='TEST ASSIGNMENT - SUBMISSION TEST']/div[@class='activity-basis d-flex align-items-center']/div[@class='activity-actions bulk-hidden align-self-start']/div/div/div/div/div/a[@class='dropdown-item editing_delete menu-action cm-edit-action' and @data-action='cmDelete']`)), 10000);
            await deleteButton.click();

            try
            {
                  deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Yes')]`)), 10000);
                  await deleteButton.click();
            }
            catch (err)
            {
                  deleteButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='button' and @data-action='delete']`)), 10000);
                  await deleteButton.click();
            }

            await driver.quit();
      });

      describe(`Equivalence class partitioning technique (6 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`File nộp rỗng`, async () =>
            {
                  reset = false;

                  let addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
                  if (await addFile.isEnabled())
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
                  if (await addFile.isEnabled())
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
                  if (await addFile.isEnabled())
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file quá nhiều`, async () =>
            {
                  reset = false;

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });

      describe(`Decision table technique (10 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Số lượng file và dung lượng nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Dung lượng file quá lớn, số lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
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
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(bigFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file .+\..+ is too large\. The maximum size you can upload is \d+ [MK]B\.$/)
            });

            it(`Dung lượng file quá lớn, số lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(bigFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file .+\..+ is too large\. The maximum size you can upload is \d+ [MK]B\.$/)
            });

            it(`File rỗng, số lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
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
                  await fileInput.sendKeys(valid1);

                  let uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(emptyFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file '.+\..+' is either empty or a folder\. To upload folders zip them first\.$/)
            });

            it(`File rỗng, số lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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
                  await fileInput.sendKeys(emptyFile);

                  uploadButton = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-upload-btn btn-primary btn' and contains(text(),'Upload this file')]`)), 10000);
                  await uploadButton.click();

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//div[@class='moodle-exception-message']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.match(errorText, /^The file '.+\..+' is either empty or a folder\. To upload folders zip them first\.$/)
            });

            it(`Số lượng file bằng 0, không tạo thư mục nào`, async () =>
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file bằng 0, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Số lượng file nộp vượt quá giới hạn cho phép, dung lượng file nằm trong khoảng cho phép, không tạo thư mục nào`, async () =>
            {
                  reset = false;

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });

            it(`Số lượng file nộp vượt quá giới hạn cho phép, dung lượng file nằm trong khoảng cho phép, tạo 1 thư mục`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });

      describe(`Use-case testing technique (5 testcases)`, () =>
      {
            beforeEach(async () =>
            {
                  await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                  let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                  test = await test.findElement(By.xpath('..'));
                  await test.click();

                  let button = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Add submission')]`)), 10000);
                  await button.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.wait(until.elementLocated(By.xpath(`//div[@class='filemanager w-100 fm-loaded fm-nofiles fm-noitems']`)), 10000);
            });

            afterEach(async () =>
            {
                  if (reset)
                  {
                        await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2&lang=en");

                        let test = await driver.wait(until.elementLocated(By.xpath(`//span[@class='instancename' and contains(text(),'TEST ASSIGNMENT - SUBMISSION TEST')]`)), 10000);
                        test = await test.findElement(By.xpath('..'));
                        await test.click();

                        await new Promise(resolve => setTimeout(resolve, 3000));

                        let removeSubmission = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Remove submission')]`)), 10000);
                        await removeSubmission.click();

                        let continueButton = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(),'Continue')]`)), 10000);
                        await continueButton.click();
                  }
                  else
                  {
                        await driver.navigate().back();
                        const alertPresent = await isAlertPresent(driver);
                        if (alertPresent)
                        {
                              const alert = await driver.switchTo().alert();
                              await alert.accept();
                        }
                        reset = true;
                  }
            });

            it(`Nộp bài thành công`, async () =>
            {
                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addFile = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)), 10000);
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

                  await new Promise(resolve => setTimeout(resolve, 3000));
                  let finishButton = await driver.wait(until.elementLocated(By.xpath(`//input[@id='id_submitbutton' and @type='submit']`)), 10000);
                  await finishButton.click();

                  let currentURL = await driver.getCurrentUrl();
                  assert.match(currentURL, /^https:\/\/sandbox\d*\.moodledemo\.net\/mod\/assign\/view\.php\?id=[1-9][0-9]*(&action=view)?$/);
            });

            it(`Hệ thống báo lỗi file quá lớn`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

            it(`Hệ thống báo lỗi file rỗng`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

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

            it(`Hệ thống báo lỗi không có file nào được chọn để gửi`, async () =>
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

                  let errorModal = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  let errorText = await errorModal.getText();

                  assert.equal(errorText, "No files attached");
            });

            it(`Hệ thống báo lỗi số lượng file vượt giới hạn cho phép`, async () =>
            {
                  reset = false;

                  let createFolder = await driver.wait(until.elementLocated(By.xpath(`//a[@role='button' and @title='Create folder']`)), 10000);
                  createFolder = await createFolder.findElement(By.xpath(`..`));
                  await createFolder.click();

                  createFolder = await driver.wait(until.elementLocated(By.xpath(`//button[@class='fp-dlg-butcreate btn-primary btn' and contains(text(),'Create folder')]`)), 10000);
                  await createFolder.click();

                  await new Promise(resolve => setTimeout(resolve, 3000));

                  await driver.executeScript(dragAndDropSimulationScript);

                  const error = await driver.wait(until.elementLocated(By.xpath(`//p[@id='fp-msg-labelledby']`)), 10000);
                  const text = await error.getText();

                  assert.match(text, /^You are allowed to attach a maximum of \d+ file\(s\) to this item$/);
            });
      });
});