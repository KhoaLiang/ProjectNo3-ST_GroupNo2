const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Test trên chrome (tổng 17 testcases)", function () 
{
    jest.setTimeout(60000);

    let driver;

    beforeAll(async function () {
        driver = await new Builder().forBrowser("chrome").build();

        // Trước tiên người dùng cần phải đăng nhập
        await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

        let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
        let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
        let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

        await username.sendKeys("student");
        await password.sendKeys("sandbox");
        await submit.click();
    });

    describe('Weak equivalence class testing technique (5 testcases)', () => {
        beforeEach(async function () {
            await driver.get("https://sandbox.moodledemo.net/user/edit.php");
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết, bỏ qua các trường nâng cao, hệ thống chỉnh sửa thành công`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const currentUrl = await driver.getCurrentUrl();

            assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/preferences\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyle = await firstnameError.getCssValue('display');
            const text = await firstnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing given name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ last, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyle = await lastnameError.getCssValue('display');
            const text = await lastnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing last name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết nhưng email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });
    });

    describe('Decision table technique (12 testcases)', () => {
        beforeEach(async function () {
            await driver.get("https://sandbox.moodledemo.net/user/edit.php");
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết, bỏ qua các trường nâng cao, hệ thống chỉnh sửa thành công`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const currentUrl = await driver.getCurrentUrl();

            assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/preferences\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyle = await firstnameError.getCssValue('display');
            const text = await firstnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing given name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ last, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyle = await lastnameError.getCssValue('display');
            const text = await lastnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing last name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết nhưng email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập chỉ nhập email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập chỉ nhập lastname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            // const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            // const displayStyleLastname = await lastnameError.getCssValue('display');
            // const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            // assert.equal(displayStyleLastname, "block");
            // assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập lastname và email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            // const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            // const displayStyleLastname = await lastnameError.getCssValue('display');
            // const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            // assert.equal(displayStyleLastname, "block");
            // assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            // const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            // const displayStyleFirstname = await firstnameError.getCssValue('display');
            // const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            // assert.equal(displayStyleFirstname, "block");
            // assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập firstname và email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            // const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            // const displayStyleFirstname = await firstnameError.getCssValue('display');
            // const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            // assert.equal(displayStyleFirstname, "block");
            // assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống không nhập các thông tin cần thiết, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });
    });

    afterAll(async () => await driver.quit());

});

describe("Test trên edge (tổng 17 testcases)", function () 
{
    jest.setTimeout(60000);

    let driver;

    beforeAll(async function () {
        driver = await new Builder().forBrowser("MicrosoftEdge").build();

        // Trước tiên người dùng cần phải đăng nhập
        await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");

        let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
        let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
        let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);

        await username.sendKeys("student");
        await password.sendKeys("sandbox");
        await submit.click();
    });

    describe('Weak equivalence class testing technique (5 testcases)', () => {
        beforeEach(async function () {
            await driver.get("https://sandbox.moodledemo.net/user/edit.php");
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết, bỏ qua các trường nâng cao, hệ thống chỉnh sửa thành công`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const currentUrl = await driver.getCurrentUrl();

            assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/preferences\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyle = await firstnameError.getCssValue('display');
            const text = await firstnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing given name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ last, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyle = await lastnameError.getCssValue('display');
            const text = await lastnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing last name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết nhưng email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });
    });

    describe('Decision table technique (12 testcases)', () => {
        beforeEach(async function () {
            await driver.get("https://sandbox.moodledemo.net/user/edit.php");
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết, bỏ qua các trường nâng cao, hệ thống chỉnh sửa thành công`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const currentUrl = await driver.getCurrentUrl();

            assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/preferences\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyle = await firstnameError.getCssValue('display');
            const text = await firstnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing given name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ last, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyle = await lastnameError.getCssValue('display');
            const text = await lastnameError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Missing last name"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết trừ email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập đầy đủ các trường cần thiết nhưng email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyle = await emailError.getCssValue('display');
            const text = await emailError.getText();

            assert.equal(displayStyle, "block");
            assert(text.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập chỉ nhập email, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống nhập chỉ nhập lastname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            // const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            // const displayStyleLastname = await lastnameError.getCssValue('display');
            // const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            // assert.equal(displayStyleLastname, "block");
            // assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập lastname và email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            // const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            // const displayStyleLastname = await lastnameError.getCssValue('display');
            // const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            // assert.equal(displayStyleLastname, "block");
            // assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập firstname, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student@moodle.a");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            // const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            // const displayStyleFirstname = await firstnameError.getCssValue('display');
            // const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            // assert.equal(displayStyleFirstname, "block");
            // assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập firstname và email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            // const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            // const displayStyleFirstname = await firstnameError.getCssValue('display');
            // const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            // assert.equal(displayStyleFirstname, "block");
            // assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống không nhập các thông tin cần thiết, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            // await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Required"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });

        it(`Hệ thống chỉ nhập email không hợp lệ, bỏ qua các trường nâng cao, hệ thống báo lỗi`, async function () {
            //   courseId = "";
            //   courseFullName = "Software Testing UCT";

            let firstname = await driver.wait(until.elementLocated(By.id('id_firstname')), 10000);
            firstname.clear();
            // await firstname.sendKeys("ABC");

            let lastname = await driver.wait(until.elementLocated(By.id('id_lastname')), 10000);
            lastname.clear();
            // await lastname.sendKeys("XYZ");

            let email = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
            email.clear();
            await email.sendKeys("student");

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton')), 10000);
            await submit.click();

            const firstnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_firstname']`)), 10000);
            const displayStyleFirstname = await firstnameError.getCssValue('display');
            const textFirstname = await firstnameError.getText();

            const lastnameError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_lastname']`)), 10000);
            const displayStyleLastname = await lastnameError.getCssValue('display');
            const textLastname = await lastnameError.getText();

            const emailError = await driver.wait(until.elementLocated(By.xpath(`//div[contains(normalize-space(text()), ' ') and @id='id_error_email']`)), 10000);
            const displayStyleEmail = await emailError.getCssValue('display');
            const textEmail = await emailError.getText();

            assert.equal(displayStyleFirstname, "block");
            assert(textFirstname.includes("Missing given name"));

            assert.equal(displayStyleLastname, "block");
            assert(textLastname.includes("Missing last name"));

            assert.equal(displayStyleEmail, "block");
            assert(textEmail.includes("Invalid email address"));

            // const currentUrl = await driver.getCurrentUrl();

            // assert.match(currentUrl, /^https:\/\/sandbox\.moodledemo\.net\/user\/edit\.php\?userid=[1-9]*$/);
        });
    });

    afterAll(async () => await driver.quit());

});
