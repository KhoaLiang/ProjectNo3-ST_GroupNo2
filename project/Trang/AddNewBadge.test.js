const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Select,
} = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

describe("Test trên chrome", function () {
  jest.setTimeout(200000);

  let driver;

  beforeAll(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    // Trước tiên người dùng cần phải đăng nhập
    await driver.get(
      "https://sandbox402.moodledemo.net/login/index.php?lang=en"
    );

    let username = await driver.wait(
      until.elementLocated(By.name("username")),
      10000
    );
    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      10000
    );
    let submit = await driver.wait(
      until.elementLocated(By.id("loginbtn")),
      10000
    );

    await username.sendKeys("manager");
    await password.sendKeys("sandbox");
    await submit.click();
    await driver.get(
      "https://sandbox402.moodledemo.net/badges/index.php?type=1"
    );
    try {
      while (true) {
        let remove = await driver.wait(
          until.elementLocated(By.xpath("//a[3]/i")),
          10000
        );
        await driver.wait(until.elementIsVisible(remove), 10000);
        await remove.click();
        let confirm = await driver.wait(
          until.elementLocated(
            By.xpath("//section[@id='region-main']/div/div[2]/div/form/button")
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(confirm), 10000);
        await confirm.click();
      }
    } catch (error) {}
  });
  afterAll(async function () {
    // driver.close();
  });
  describe("Use case testing technique", () => {
    beforeEach(async function () {
      await driver.get(
        "https://sandbox402.moodledemo.net/badges/newbadge.php?type=1"
      );
      try {
        await driver.switchTo().alert().accept();
      } catch (error) {}
    });
    /****ANB1*****/
    it(`Quản lý tạo mới một Badge với nhập đầy đủ các trường hợp lệ`, async function () {
      let name = "Good";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );

      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);
      await driver.sleep(3000);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/criteria.php\?id=[1-9][0-9]*$/
      );
    });
    /****ANB2*****/
    it(`Quản lý tạo mới một Badge nhưng không nhập name`, async function () {
      let name = "";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB3*****/
    it(`Quản lý tạo mới một Badge nhưng không nhập Description`, async function () {
      let name = "Good 1";
      let desc = "";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB4*****/
    it(`Quản lý tạo mới một Badge với đầy đủ các trường thoả mãn nhưng không tải lên một hình ảnh`, async function () {
      let name = "Good 1";
      let desc = "Good student";
      //   let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB5*****/
    it(`Quản lý tạo mới một Badge nhưng tải lên một file không đúng định dạng hoặc quá 256 KB`, async function () {
      let name = "Good 1";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/10KB-1.bin");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);
      let error = await driver.wait(
        until.elementLocated(By.xpath("//div[3]/div/div/span/button")),
        10000
      );
      await driver.wait(until.elementIsVisible(error), 10000);

      await error.click();
      let close = await driver.wait(
        until.elementLocated(By.xpath("//div[3]/div/div/span/button")),
        10000
      );
      await driver.wait(until.elementIsVisible(close), 10000);
      await close.click();
    });
    /****ANB6*****/
    it(`Quản lý tạo mới một Badge nhập đầy đủ các trường thoả mãn nhưng nhập name trùng với một badge đã có`, async function () {
      let name = "Good";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
  });
  describe("Decision table technique", () => {
    beforeEach(async function () {
      await driver.get(
        "https://sandbox402.moodledemo.net/badges/newbadge.php?type=1"
      );
      try {
        await driver.switchTo().alert().accept();
      } catch (error) {}
    });
    /****ANB7*****/
    it(`Quản lý tạo mới một Badge, nhập tên, description, đã tải lên một hình ảnh và hợp lệ và tên riêng biệt`, async function () {
      let name = "Good 2";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/criteria.php\?id=[1-9][0-9]*$/
      );
    });
    /****ANB8*****/
    it(`Quản lý tạo mới một Badge, nhập tên, description, đã tải lên một hình ảnh hợp lệ và tên bị trùng`, async function () {
      let name = "Good 2";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php*$/
      );
    });
    /****ANB9*****/
    it(`Quản lý tạo mới một Badge, nhập tên, description, không tải lên một hình ảnh và tên riêng biệt`, async function () {
      let name = "Good 3";
      let desc = "Good student";
      //   let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      //   let fileButton = await driver.wait(
      //     until.elementLocated(
      //       By.xpath(`//input[@type='button' and @value='Choose a file...']`)
      //     ),
      //     10000
      //   );
      //   await driver.wait(until.elementIsVisible(fileButton), 10000);
      //   await fileButton.click();

      //   let uploadInput = await driver.wait(
      //     until.elementLocated(
      //       By.css(
      //         "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
      //       )
      //     ),
      //     10000
      //   );
      //   await uploadInput.sendKeys(file);

      //   let upLoadButton = await driver.findElement(
      //     By.xpath("//div[2]/div/div[2]/div/div/div/button")
      //   );
      //   await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB10*****/
    it(`Quản lý tạo mới một Badge nhập đúng tất cả ngoại trừ description không nhập`, async function () {
      let name = "Good 3";
      let desc = "";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB11*****/
    it(`Quản lý tạo mới một Badge chỉ nhập tên`, async function () {
      let name = "Good 3";
      let desc = "";
      //   let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB12*****/
    it(`Quản lý tạo mới một Badge nhưng không nhập name, nhập description và tải lên một hình ảnh hợp lệ`, async function () {
      let name = "";
      let desc = "Good student";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB13*****/
    it(`Quản lý tạo mới một Badge nhưng không nhập name, không nhập description và tải lên một hình ảnh hợp lệ`, async function () {
      let name = "";
      let desc = "";
      let file = path.resolve("./Trang/Files/100KB.png");

      let nameInput = await driver.wait(
        until.elementLocated(By.id("id_name")),
        10000
      );
      await driver.wait(until.elementIsVisible(nameInput), 10000);
      await nameInput.sendKeys(name);

      const descInput = await driver.wait(
        until.elementLocated(By.id("id_description")),
        10000
      );
      await driver.wait(until.elementIsVisible(descInput), 10000);
      await descInput.sendKeys(desc);

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//input[@type='button' and @value='Choose a file...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();

      let uploadInput = await driver.wait(
        until.elementLocated(By.xpath("//form/div/div/div/input")),
        10000
      );
      await driver.wait(until.elementIsVisible(uploadInput), 10000);
      await uploadInput.sendKeys(file);

      let upLoadButton = await driver.wait(
        until.elementLocated(
          By.xpath("//div[2]/div/div[2]/div/div/div/button"),
          10000
        )
      );
      await driver.wait(until.elementIsVisible(upLoadButton), 10000);
      await upLoadButton.click();
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
    /****ANB14*****/
    it(`Quản lý tạo mới một Badge nhưng không nhập name, không nhập description và không tải lên một hình ảnh hợp lệ`, async function () {
      let name = "";
      let desc = "";
      let file = path.resolve("./Trang/Files/100KB.png");
      await driver.sleep(3000);

      let save = await driver.wait(
        until.elementLocated(
          By.xpath('//input[@name="submitbutton" and @type="submit"]')
        ),
        10000
      );
      await save.click();
      const currentUrl = await driver.getCurrentUrl();
      assert.match(
        currentUrl,
        /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
      );
    });
  });
});

describe("Test trên edge", function () {
    jest.setTimeout(200000);
  
    let driver;
  
    beforeAll(async function () {
      driver = await new Builder().forBrowser(Browser.EDGE).build();
      // Trước tiên người dùng cần phải đăng nhập
      await driver.get(
        "https://sandbox402.moodledemo.net/login/index.php?lang=en"
      );
  
      let username = await driver.wait(
        until.elementLocated(By.name("username")),
        10000
      );
      let password = await driver.wait(
        until.elementLocated(By.name("password")),
        10000
      );
      let submit = await driver.wait(
        until.elementLocated(By.id("loginbtn")),
        10000
      );
  
      await username.sendKeys("manager");
      await password.sendKeys("sandbox");
      await submit.click();
      await driver.get(
        "https://sandbox402.moodledemo.net/badges/index.php?type=1"
      );
      try {
        while (true) {
          let remove = await driver.wait(
            until.elementLocated(By.xpath("//a[3]/i")),
            10000
          );
          await driver.wait(until.elementIsVisible(remove), 10000);
          await remove.click();
          let confirm = await driver.wait(
            until.elementLocated(
              By.xpath("//section[@id='region-main']/div/div[2]/div/form/button")
            ),
            10000
          );
          await driver.wait(until.elementIsVisible(confirm), 10000);
          await confirm.click();
        }
      } catch (error) {}
    });
    afterAll(async function () {
      // driver.close();
    });
    describe("Use case testing technique", () => {
      beforeEach(async function () {
        await driver.get(
          "https://sandbox402.moodledemo.net/badges/newbadge.php?type=1"
        );
        try {
          await driver.switchTo().alert().accept();
        } catch (error) {}
      });
      /****ANB1*****/
      it(`Quản lý tạo mới một Badge với nhập đầy đủ các trường hợp lệ`, async function () {
        let name = "Good";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
  
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
        await driver.sleep(3000);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/criteria.php\?id=[1-9][0-9]*$/
        );
      });
      /****ANB2*****/
      it(`Quản lý tạo mới một Badge nhưng không nhập name`, async function () {
        let name = "";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB3*****/
      it(`Quản lý tạo mới một Badge nhưng không nhập Description`, async function () {
        let name = "Good 1";
        let desc = "";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB4*****/
      it(`Quản lý tạo mới một Badge với đầy đủ các trường thoả mãn nhưng không tải lên một hình ảnh`, async function () {
        let name = "Good 1";
        let desc = "Good student";
        //   let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB5*****/
      it(`Quản lý tạo mới một Badge nhưng tải lên một file không đúng định dạng hoặc quá 256 KB`, async function () {
        let name = "Good 1";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/10KB-1.bin");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
        let error = await driver.wait(
          until.elementLocated(By.xpath("//div[3]/div/div/span/button")),
          10000
        );
        await driver.wait(until.elementIsVisible(error), 10000);
  
        await error.click();
        let close = await driver.wait(
          until.elementLocated(By.xpath("//div[3]/div/div/span/button")),
          10000
        );
        await driver.wait(until.elementIsVisible(close), 10000);
        await close.click();
      });
      /****ANB6*****/
      it(`Quản lý tạo mới một Badge nhập đầy đủ các trường thoả mãn nhưng nhập name trùng với một badge đã có`, async function () {
        let name = "Good";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
    });
    describe("Decision table technique", () => {
      beforeEach(async function () {
        await driver.get(
          "https://sandbox402.moodledemo.net/badges/newbadge.php?type=1"
        );
        try {
          await driver.switchTo().alert().accept();
        } catch (error) {}
      });
      /****ANB7*****/
      it(`Quản lý tạo mới một Badge, nhập tên, description, đã tải lên một hình ảnh và hợp lệ và tên riêng biệt`, async function () {
        let name = "Good 2";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/criteria.php\?id=[1-9][0-9]*$/
        );
      });
      /****ANB8*****/
      it(`Quản lý tạo mới một Badge, nhập tên, description, đã tải lên một hình ảnh hợp lệ và tên bị trùng`, async function () {
        let name = "Good 2";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php*$/
        );
      });
      /****ANB9*****/
      it(`Quản lý tạo mới một Badge, nhập tên, description, không tải lên một hình ảnh và tên riêng biệt`, async function () {
        let name = "Good 3";
        let desc = "Good student";
        //   let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB10*****/
      it(`Quản lý tạo mới một Badge nhập đúng tất cả ngoại trừ description không nhập`, async function () {
        let name = "Good 3";
        let desc = "";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB11*****/
      it(`Quản lý tạo mới một Badge chỉ nhập tên`, async function () {
        let name = "Good 3";
        let desc = "";
        //   let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB12*****/
      it(`Quản lý tạo mới một Badge nhưng không nhập name, nhập description và tải lên một hình ảnh hợp lệ`, async function () {
        let name = "";
        let desc = "Good student";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB13*****/
      it(`Quản lý tạo mới một Badge nhưng không nhập name, không nhập description và tải lên một hình ảnh hợp lệ`, async function () {
        let name = "";
        let desc = "";
        let file = path.resolve("./Trang/Files/100KB.png");
  
        let nameInput = await driver.wait(
          until.elementLocated(By.id("id_name")),
          10000
        );
        await driver.wait(until.elementIsVisible(nameInput), 10000);
        await nameInput.sendKeys(name);
  
        const descInput = await driver.wait(
          until.elementLocated(By.id("id_description")),
          10000
        );
        await driver.wait(until.elementIsVisible(descInput), 10000);
        await descInput.sendKeys(desc);
  
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//input[@type='button' and @value='Choose a file...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
  
        let uploadInput = await driver.wait(
          until.elementLocated(By.xpath("//form/div/div/div/input")),
          10000
        );
        await driver.wait(until.elementIsVisible(uploadInput), 10000);
        await uploadInput.sendKeys(file);
  
        let upLoadButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[2]/div/div[2]/div/div/div/button"),
            10000
          )
        );
        await driver.wait(until.elementIsVisible(upLoadButton), 10000);
        await upLoadButton.click();
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
      /****ANB14*****/
      it(`Quản lý tạo mới một Badge nhưng không nhập name, không nhập description và không tải lên một hình ảnh hợp lệ`, async function () {
        let name = "";
        let desc = "";
        let file = path.resolve("./Trang/Files/100KB.png");
        await driver.sleep(3000);
  
        let save = await driver.wait(
          until.elementLocated(
            By.xpath('//input[@name="submitbutton" and @type="submit"]')
          ),
          10000
        );
        await save.click();
        const currentUrl = await driver.getCurrentUrl();
        assert.match(
          currentUrl,
          /^https:\/\/sandbox402\.moodledemo\.net\/badges\/newbadge.php$/
        );
      });
    });
  });