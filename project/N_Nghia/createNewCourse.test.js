const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Test trên chrome (tổng 43 testcases)", function ()
{
      jest.setTimeout(60000);

      let driver, deleteCourse = true, courseFullName = "", courseId = "";

      beforeAll(async function ()
      {
            driver = await new Builder().forBrowser("chrome").build();
      });

      it("Trước tiên người dùng cần phải đăng nhập", async function ()
      {
            await driver.get("https://sandbox.moodledemo.net/login/index.php");

            let pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

            let username = await pageElem.findElement(By.name('username'), 10000);
            let password = await pageElem.findElement(By.name('password'), 10000);
            let submit = await pageElem.findElement(By.id('loginbtn'), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();
      });

      describe('Use-case testing technique (6 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Hệ thống tạo khóa học mới thành công với trường "Course ID number" để trống, bỏ qua các trường nâng cao`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-UCT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course full name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));

                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course short name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Hệ thống báo lỗi do trường "Course short name" bị trùng, trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-UCT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing C-UCT)");
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course category", trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Hệ thống báo lỗi do trường "Course ID number" bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  courseId = "ST-01-C-UCT";
                  courseFullName = "Software Testing C-UCT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-UCT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-02-C-UCT");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-UCT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id("id_error_idnumber"));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing C-UCT)");
            });
      });

      describe('Equivalence class partitioning technique (7 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-C-ECP";
                  courseFullName = "Software Testing C-ECP";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-ECP";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng để trường "Course full name" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course short name" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" bị trùng`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-ECP";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing C-ECP");

                  shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-C-ECP");

                  submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id('id_error_shortname'));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing C-ECP)");
            });

            it(`Người dùng để trường "Course category" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng để trường "Course ID number" bị trùng`, async function ()
            {
                  courseId = "ST-01-C-ECP";
                  courseFullName = "Software Testing C-ECP";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-ECP");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-ECP");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-02-C-ECP");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-ECP");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id("id_error_idnumber"));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing C-ECP)");
            });
      });

      describe('Decision table technique (11 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-C-DT";
                  courseFullName = "Software Testing C-DT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-DT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng để trường "Course full name" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course full name" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course short name" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing C-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing C-DT)");
            });

            it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-C-DT";
                  courseFullName = "Software Testing C-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-02-C-DT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing C-DT)");
            });

            it(`Người dùng để trường "Course category" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng để trường "Course category" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-C-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng nhập "Course ID number" bị trùng`, async function ()
            {
                  courseId = "ST-01-C-DT";
                  courseFullName = "Software Testing C-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing C-DT");

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-C-DT");

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("ST-01-C-DT");

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing C-DT");

                  shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-02-C-DT");

                  idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("ST-01-C-DT");

                  submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id('id_error_idnumber'));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing C-DT)");
            });
      });

      describe('Boundary value analysis technique (19 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Nhập trường "Course full name" sao cho có độ dài bằng 128 ký tự, "Course short name" và "Course ID number" sao cho có độ dài 50 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course full name"`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);


                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id('id_error_fullname'));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            })

            it(`Trường "Course full name" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "C";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("C");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("C", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CS";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CS");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CS", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 253 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 254 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 255 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILxS");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course short name"`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id('id_error_shortname'));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            })

            it(`Trường "Course short name" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("C");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("C", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CS");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CS", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 99 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 100 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 101 ký tự`, async function ()
            {
                  courseId = "CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa1");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course ID number"`, async function ()
            {
                  courseId = "";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "C";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("C");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("C", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "CS";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CS");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CS", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 99 ký tự`, async function ()
            {
                  courseId = "CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 100 ký tự`, async function ()
            {
                  courseId = "CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 101 ký tự`, async function ()
            {
                  courseId = "CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
                  courseFullName = "CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("CBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("CBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW1");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("CBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })
      });

      // afterAll(async () => await driver.quit());
});

describe("Test trên edge (tổng 43 testcases)", function ()
{
      jest.setTimeout(60000);

      let driver, deleteCourse = true, courseFullName = "", courseId = "";

      beforeAll(async function ()
      {
            driver = await new Builder().forBrowser("MicrosoftEdge").build();
      });

      it("Trước tiên người dùng cần phải đăng nhập", async function ()
      {
            await driver.get("https://sandbox.moodledemo.net/login/index.php");

            let pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

            let username = await pageElem.findElement(By.name('username'), 10000);
            let password = await pageElem.findElement(By.name('password'), 10000);
            let submit = await pageElem.findElement(By.id('loginbtn'), 10000);

            await username.sendKeys("admin");
            await password.sendKeys("sandbox");
            await submit.click();
      });

      describe('Use-case testing technique (6 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Hệ thống tạo khóa học mới thành công với trường "Course ID number" để trống, bỏ qua các trường nâng cao`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-UCT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course full name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));

                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course short name", trường "Course ID number" không bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Hệ thống báo lỗi do trường "Course short name" bị trùng, trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-UCT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing E-UCT)");
            });

            it(`Hệ thống báo lỗi do thiếu trường "Course category", trường "Course ID number" trống, bỏ qua các trường nâng cao khác`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Hệ thống báo lỗi do trường "Course ID number" bị trùng, bỏ qua các trường nâng cao khác`, async function ()
            {
                  courseId = "ST-01-E-UCT";
                  courseFullName = "Software Testing E-UCT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-UCT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-UCT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-UCT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-02-E-UCT");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-UCT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id("id_error_idnumber"));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing E-UCT)");
            });
      });

      describe('Equivalence class partitioning technique (7 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-E-ECP";
                  courseFullName = "Software Testing E-ECP";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-ECP";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng để trường "Course full name" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course short name" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" bị trùng`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-ECP";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing E-ECP");

                  shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-E-ECP");

                  submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id('id_error_shortname'));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing E-ECP)");
            });

            it(`Người dùng để trường "Course category" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng để trường "Course ID number" bị trùng`, async function ()
            {
                  courseId = "ST-01-E-ECP";
                  courseFullName = "Software Testing E-ECP";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-ECP");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-ECP");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-ECP");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-02-E-ECP");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-ECP");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id("id_error_idnumber"));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing E-ECP)");
            });
      });

      describe('Decision table technique (11 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-E-DT";
                  courseFullName = "Software Testing E-DT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng tạo khóa học thành công với trường "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-DT";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            });

            it(`Người dùng để trường "Course full name" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course full name" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id("id_error_fullname"));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            });

            it(`Người dùng để trường "Course short name" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            });

            it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" trống`, async function ()
            {
                  courseId = "";
                  courseFullName = "Software Testing E-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing E-DT)");
            });

            it(`Người dùng để trường "Course short name" bị trùng và "Course ID number" không bị trùng`, async function ()
            {
                  courseId = "ST-01-E-DT";
                  courseFullName = "Software Testing E-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course short name)
                  fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-02-E-DT");

                  submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id("id_error_shortname"));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "Short name is already used for another course (Software Testing E-DT)");
            });

            it(`Người dùng để trường "Course category" trống và "Course ID number" trống`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng để trường "Course category" trống và "Course ID number" không bị trùng`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id("id_fullname"));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id("id_shortname"));
                  await shortname.sendKeys("ST-01-E-DT");

                  let idnumber = await pageElem.findElement(By.id("id_idnumber"));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let helper = await pageElem.findElement(By.id('id_category_label'));
                  helper = await helper.findElement(By.xpath('..'));
                  helper = await helper.findElement(By.xpath('..'));

                  let ul = await helper.findElement(By.xpath(`//ul[@class='form-autocomplete-suggestions']`));
                  let ulId = await ul.getAttribute('id');
                  let arrowId = ulId.replace('suggestions', 'downarrow');
                  let arrow = await pageElem.findElement(By.id(arrowId));
                  await arrow.click();

                  await new Promise(resolve => setTimeout(resolve, 500));

                  let emptyOption = await pageElem.findElement(By.id(`${ ulId }-0`));
                  await emptyOption.click();

                  await new Promise(resolve => setTimeout(resolve, 1000));

                  let submit = await pageElem.findElement(By.id("id_saveanddisplay"));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const categoryError = await pageElem.findElement(By.id("id_error_category"));
                  const displayStyle = await categoryError.getCssValue('display');
                  const text = await categoryError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("You must supply a value here"));
            });

            it(`Người dùng nhập "Course ID number" bị trùng`, async function ()
            {
                  courseId = "ST-01-E-DT";
                  courseFullName = "Software Testing E-DT";

                  // Tạo khóa học đầu tiên
                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing E-DT");

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-01-E-DT");

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("ST-01-E-DT");

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  // Tạo khóa học thứ hai (bị trùng Course ID Number)
                  fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("Software Testing E-DT");

                  shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ST-02-E-DT");

                  idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("ST-01-E-DT");

                  submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const idNumberError = await pageElem.findElement(By.id('id_error_idnumber'));
                  const displayStyle = await idNumberError.getCssValue('display');
                  const text = await idNumberError.getText();

                  assert.equal(displayStyle, "block");
                  assert.equal(text, "ID number is already used for another course (Software Testing E-DT)");
            });
      });

      describe('Boundary value analysis technique (19 testcases)', () =>
      {
            let pageElem;

            beforeEach(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterEach(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            beforeAll(async function ()
            {
                  await driver.get("https://sandbox.moodledemo.net/course/edit.php");
                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);
            });

            afterAll(async function ()
            {
                  // Dùng để xóa khóa học nếu được yêu cầu
                  if (deleteCourse)
                  {
                        await driver.get('https://sandbox.moodledemo.net/course/management.php');
                        pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                        let parentElem;
                        if (courseId !== "" || courseFullName !== "")
                        {
                              if (courseId !== "")
                              {
                                    const shortNameElem = await driver.wait(until.elementLocated(By.xpath(`//span[@class='text-muted idnumber' and contains(text(), '${ courseId }')]`)), 10000);

                                    parentElem = await shortNameElem.findElement(By.xpath('..'));
                              }
                              else
                              {
                                    const fullNameElem = await driver.wait(until.elementLocated(By.xpath(`//a[@class='text-break col pl-0 mb-2 coursename aalink' and contains(text(), '${ courseFullName }')]`)), 10000);

                                    const grandParentElem = await fullNameElem.findElement(By.xpath('..'));

                                    parentElem = await grandParentElem.findElement(By.xpath(`//span[@class='course-item-actions item-actions mr-0']`));
                              }

                              const deleteButton = await parentElem.findElement(By.xpath(`//a[@class='action-delete']`));

                              await deleteButton.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const confirmDeleteElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Delete')]`));

                              await confirmDeleteElem.click();

                              pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                              const continueElem = await pageElem.findElement(By.xpath(`//button[@type='submit' and contains(text(), 'Continue')]`));

                              await continueElem.click();

                              courseId = "";
                              courseFullName = "";
                        }
                  }
                  else deleteCourse = true;
            });

            it(`Nhập trường "Course full name" sao cho có độ dài bằng 128 ký tự, "Course short name" và "Course ID number" sao cho có độ dài 50 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course full name"`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);


                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const fullNameError = await pageElem.findElement(By.id('id_error_fullname'));
                  const displayStyle = await fullNameError.getCssValue('display');
                  const text = await fullNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing full name"));
            })

            it(`Trường "Course full name" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "E";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("E");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("E", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "ES";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("ES");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("ES", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 253 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAhoMIzHkY46UY8VutFSkIbqMwnZE3XPMlArYFNL7H6kyaIAehv3DzEnY22ESPPzdAU34XZ30ohUeIHkNsDsgXUy8CPkJALfOy5UX6kNK6h8rZ5bIdXiddlCEyjyETtdRQM5mQTQVIg4NYg4uvSETTS3dH3y6sciQh988IixlNmddCX9YAs0xqYJzFYhcTj7qz995e64OTKMGG4WcGKVS9vSANIptVBZ8CcRII8RnsEltsZhIuzdndIPcOI", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 254 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course full name" có độ dài 255 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILxS");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAlhEygPjM1E0CxqFVCeIdgszdzdHKnMtwDY6JvbPeqKjnJiNoKRPQeH21IdMGWfmY6zCnx5DP80BYNqZclB3r3ZYu2qOQXU31EjS052LM5Ox7jrGcEIcIP10ctdL08zbaGWdIarG5dikMHrsGZV143NuTgtjfarGvBRVFV3yHYP18H5dZjBnqCUjWbtHXYDF0xdmNPtJ5o0G4iXiqvBlBlUrvkpY2fvzS62arAvBLjEN90yGRsnyN5QLILx", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course short name"`, async function ()
            {
                  deleteCourse = false;
                  courseId = "";
                  courseFullName = "";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  pageElem = await driver.wait(until.elementLocated(By.id('page')), 10000);

                  const shortNameError = await pageElem.findElement(By.id('id_error_shortname'));
                  const displayStyle = await shortNameError.getCssValue('display');
                  const text = await shortNameError.getText();

                  assert.equal(displayStyle, "block");
                  assert(text.includes("Missing short name"));
            })

            it(`Trường "Course short name" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("E");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("E", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("ES");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("ES", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 99 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTA", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 100 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course short name" có độ dài 101 ký tự`, async function ()
            {
                  courseId = "EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa1");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAp7yQNjoImALdAtlTdvBp8kTgZqjKHLxreTVUEsY7csc1wye9yUZ7sGQ38ZfxxpVwkmuZE6Zrk8hS7vVNQRaFozOFpv6wKTAa", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAJeA6Bj4AJWlVTlhw6vYgoLjvzTu3kA0Uj9lnxmYExXIJtt", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Để trống trường "Course ID number"`, async function ()
            {
                  courseId = "";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 1 ký tự`, async function ()
            {
                  courseId = "E";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("E");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("E", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 2 ký tự`, async function ()
            {
                  courseId = "ES";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("ES");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("ES", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 99 ký tự`, async function ()
            {
                  courseId = "EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISs", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 100 ký tự`, async function ()
            {
                  courseId = "EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })

            it(`Trường "Course ID number" có độ dài 101 ký tự`, async function ()
            {
                  courseId = "EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW";
                  courseFullName = "EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j";

                  let fullname = await pageElem.findElement(By.id('id_fullname'));
                  await fullname.sendKeys("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j");
                  let fullNameText = await fullname.getAttribute('value');
                  assert.equal("EBVAShwaiP3lG3gF82ZB6OuYl0CyUK4TzcBSz5BS65P2TSb53cr9wHAfYfl7n8wCUZdOusbLzl79wbBLxfscsjzScbUHevJMoVn1UjsbNoDfbW1ZM6GeKx1HvH9UlS2j", fullNameText);

                  let shortname = await pageElem.findElement(By.id('id_shortname'));
                  await shortname.sendKeys("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X");
                  let shortNameText = await shortname.getAttribute('value');
                  assert.equal("EBVAsmLtpMPBFHxgFT1Yi6vqunCqheNcp9e4QiT8nKog0Y8J4X", shortNameText);

                  let idnumber = await pageElem.findElement(By.id('id_idnumber'));
                  await idnumber.sendKeys("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW1");
                  let idNumberText = await idnumber.getAttribute('value');
                  assert.equal("EBVAakSSdKYRhfa3amTag0H2cX0WQHbPJLO3te6tIyVHJq0FkB3h5g0zfSNyxPAvuDPs60rlnKegojiRWrxOhOhzvLi6VGLnISsW", idNumberText);

                  let submit = await pageElem.findElement(By.id('id_saveanddisplay'));
                  await submit.click();

                  const currentUrl = await driver.getCurrentUrl();

                  assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/course\/view\.php\?id=[1-9][0-9]*$/);
            })
      });

      // afterAll(async () => await driver.quit());
});