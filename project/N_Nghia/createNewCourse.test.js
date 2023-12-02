// const { By, Builder, until } = require("selenium-webdriver");
// const assert = require("assert");

// describe("Test trên chrome (tổng 43 testcases)", function ()
// {
//       jest.setTimeout(60000);

//       let driver, deleteCourse = true, courseFullName = "", courseId = "";

//       beforeAll(async function ()
//       {
//             driver = await new Builder().forBrowser("chrome").build();

//             // Trước tiên người dùng cần phải đăng nhập
//             await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

//             let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
//             let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
//             let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

//             await username.sendKeys("admin");
//             await password.sendKeys("sandbox");
//             await submit.click();
//       });

//       describe('Use-case testing technique (6 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Hệ thống tạo khóa học mới thành công với trường "Course ID number" để trống, bỏ qua các trường nâng cao`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing UCT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course full name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_fullname')), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course short name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_shortname')), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Hệ thống báo lỗi do trường "Course short name" bị trùng, trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing UCT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   //const currentUrl = await driver.getCurrentUrl();

//                   //assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_shortname')), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course category", trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 10000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Hệ thống báo lỗi do trường "Course ID number" bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   courseId = "ST-01-UCT";
//                   courseFullName = "Software Testing UCT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-UCT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Equivalence class partitioning technique (7 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-ECP";
//                   courseFullName = "Software Testing ECP";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing ECP";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng để trường "Course full name" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course short name" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing ECP";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course category" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng để trường "Course ID number" bị trùng`, async function ()
//             {
//                   courseId = "ST-01-ECP";
//                   courseFullName = "Software Testing ECP";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-ECP");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Decision table technique (11 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing DT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng để trường "Course full name" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course full name" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course short name" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-02-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course category" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng để trường "Course category" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng nhập "Course ID number" bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-DT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Boundary value analysis technique (19 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Nhập trường "Course full name" sao cho có độ dài bằng 128 ký tự, "Course short name" và "Course ID number" sao cho có độ dài 50 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course full name"`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);


//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             })

//             it(`Trường "Course full name" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "S";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("S");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("S", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "ST";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("ST");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("ST", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 253 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 254 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 255 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILxS");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course short name"`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             })

//             it(`Trường "Course short name" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("S");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("S", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("ST", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 99 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 100 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 101 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa1");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course ID number"`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "S";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("S");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("S", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "ST";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("ST", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 99 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 100 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 101 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW1");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })
//       });

//       //afterAll(async () => await driver.quit());
// });

// describe("Test trên edge (tổng 43 testcases)", function ()
// {
//       jest.setTimeout(60000);

//       let driver, deleteCourse = true, courseFullName = "", courseId = "";

//       beforeAll(async function ()
//       {
//             driver = await new Builder().forBrowser("MicrosoftEdge").build();

//             // Trước tiên người dùng cần phải đăng nhập
//             await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

//             let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
//             let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
//             let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

//             await username.sendKeys("admin");
//             await password.sendKeys("sandbox");
//             await submit.click();
//       });

//       describe('Use-case testing technique (6 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Hệ thống tạo khóa học mới thành công với trường "Course ID number" để trống, bỏ qua các trường nâng cao`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing UCT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course full name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_fullname')), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course short name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_shortname')), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Hệ thống báo lỗi do trường "Course short name" bị trùng, trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing UCT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   //const currentUrl = await driver.getCurrentUrl();

//                   //assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000); //await driver.wait(until.elementLocated(By.id('id_error_shortname')), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Hệ thống báo lỗi do thiếu trường "Course category", trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 10000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Hệ thống báo lỗi do trường "Course ID number" bị trùng, bỏ qua các trường nâng cao khác`, async function ()
//             {
//                   courseId = "ST-01-UCT";
//                   courseFullName = "Software Testing UCT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-UCT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing UCT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-UCT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-UCT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Equivalence class partitioning technique (7 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-ECP";
//                   courseFullName = "Software Testing ECP";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing ECP";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng để trường "Course full name" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course short name" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing ECP";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course category" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng để trường "Course ID number" bị trùng`, async function ()
//             {
//                   courseId = "ST-01-ECP";
//                   courseFullName = "Software Testing ECP";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-ECP");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing ECP");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-ECP");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-ECP");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Decision table technique (11 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing DT";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             });

//             it(`Người dùng để trường "Course full name" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course full name" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             });

//             it(`Người dùng để trường "Course short name" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" trống`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" không bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course short name)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-02-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Short name is already used for another course"));
//             });

//             it(`Người dùng để trường "Course category" trống và "Course ID number" trống`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng để trường "Course category" trống và "Course ID number" không bị trùng`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let helper = await driver.wait(until.elementLocated(By.xpath(`//input[@placeholder='Search' and @data-fieldtype='autocomplete']`)), 10000);

//                   let ulId = await helper.getAttribute('list');
//                   let arrowId = ulId.replace('suggestions', 'downarrow');
//                   let arrow = await driver.wait(until.elementLocated(By.id(arrowId)), 1000);
//                   await arrow.click();

//                   let emptyOption = await driver.wait(until.elementLocated(By.id(`${ ulId }-0`)), 10000);
//                   await emptyOption.click();

//                   await new Promise(resolve => setTimeout(resolve, 1000));

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const categoryError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_category']`)), 10000);
//                   const displayStyle = await categoryError.getCssValue('display');
//                   const text = await categoryError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("You must supply a value here"));
//             });

//             it(`Người dùng nhập "Course ID number" bị trùng`, async function ()
//             {
//                   courseId = "ST-01-DT";
//                   courseFullName = "Software Testing DT";

//                   // Tạo khóa học đầu tiên
//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-01-DT");

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);

//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");

//                   // Tạo khóa học thứ hai (bị trùng Course ID Number)
//                   fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("Software Testing DT");

//                   shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST-02-DT");

//                   idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST-01-DT");

//                   submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const idNumberError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_idnumber']`)), 10000);
//                   const displayStyle = await idNumberError.getCssValue('display');
//                   const text = await idNumberError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("ID number is already used for another course"));
//             });
//       });

//       describe('Boundary value analysis technique (19 testcases)', () =>
//       {
//             beforeEach(async function ()
//             {
//                   await driver.get("https://sandbox.moodledemo.net/course/edit.php?lang=en");
//             });

//             afterEach(async function ()
//             {
//                   // Dùng để xóa khóa học nếu được yêu cầu
//                   if (deleteCourse)
//                   {
//                         await driver.get('https://sandbox.moodledemo.net/course/management.php?lang=en');

//                         let parentElem;
//                         if (courseId !== "" || courseFullName !== "")
//                         {
//                               if (courseId !== "")
//                               {
//                                     const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

//                                     parentElem = await shortNameElem.findElement(By.xpath('..'));
//                               }
//                               else
//                               {
//                                     const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

//                                     const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

//                                     parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
//                               }

//                               const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

//                               await deleteButton.click();

//                               const confirmDeleteElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`)), 10000);

//                               await confirmDeleteElem.click();

//                               const continueElem = await driver.wait(until.elementLocated(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`)), 10000);

//                               await continueElem.click();

//                               courseId = "";
//                               courseFullName = "";
//                         }
//                   }
//                   else deleteCourse = true;
//             });

//             it(`Nhập trường "Course full name" sao cho có độ dài bằng 128 ký tự, "Course short name" và "Course ID number" sao cho có độ dài 50 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course full name"`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);


//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const fullNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_fullname']`)), 10000);
//                   const displayStyle = await fullNameError.getCssValue('display');
//                   const text = await fullNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing full name"));
//             })

//             it(`Trường "Course full name" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "S";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("S");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("S", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "ST";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("ST");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("ST", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 253 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0hoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 254 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course full name" có độ dài 255 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILxS");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0lhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course short name"`, async function ()
//             {
//                   deleteCourse = false;
//                   courseId = "";
//                   courseFullName = "";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const shortNameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_shortname']`)), 10000);
//                   const displayStyle = await shortNameError.getCssValue('display');
//                   const text = await shortNameError.getText();

//                   assert.equal(displayStyle, "block");
//                   assert(text.includes("Missing short name"));
//             })

//             it(`Trường "Course short name" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("S");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("S", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("ST");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("ST", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 99 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 100 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course short name" có độ dài 101 ký tự`, async function ()
//             {
//                   courseId = "BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa1");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0p7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0JeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Để trống trường "Course ID number"`, async function ()
//             {
//                   courseId = "";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 1 ký tự`, async function ()
//             {
//                   courseId = "S";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("S");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("S", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 2 ký tự`, async function ()
//             {
//                   courseId = "ST";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("ST");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("ST", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 99 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 100 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })

//             it(`Trường "Course ID number" có độ dài 101 ký tự`, async function ()
//             {
//                   courseId = "BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
//                   courseFullName = "BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

//                   let fullname = await driver.wait(until.elementLocated(By.id('id_fullname')), 10000);
//                   await fullname.sendKeys("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
//                   let fullNameText = await fullname.getAttribute('value');
//                   assert.equal("BVA0ShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

//                   let shortname = await driver.wait(until.elementLocated(By.id('id_shortname')), 10000);
//                   await shortname.sendKeys("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
//                   let shortNameText = await shortname.getAttribute('value');
//                   assert.equal("BVA0smLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

//                   let idnumber = await driver.wait(until.elementLocated(By.id('id_idnumber')), 10000);
//                   await idnumber.sendKeys("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW1");
//                   let idNumberText = await idnumber.getAttribute('value');
//                   assert.equal("BVA0akSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

//                   let submit = await driver.wait(until.elementLocated(By.id('id_saveanddisplay')), 10000);
//                   await submit.click();

//                   const currentUrl = await driver.getCurrentUrl();

//                   assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
//             })
//       });

//       //afterAll(async () => await driver.quit());
// });
