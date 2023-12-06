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
  let Subject, Message;

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

    await username.sendKeys("teacher");
    await password.sendKeys("sandbox");
    await submit.click();
    await driver.get(
      "https://sandbox402.moodledemo.net/course/modedit.php?add=forum&type&course=2&section=0&return=0&sr=0&beforemod=0"
    );
    let inputForum = await driver.wait(
      until.elementLocated(By.id("id_name")),
      10000
    );
    await driver.wait(until.elementIsVisible(inputForum), 10000);
    await inputForum.sendKeys("Trang 's Forum");

    let save = await driver.wait(
      until.elementLocated(By.id("id_submitbutton")),
      10000
    );
    await driver.wait(until.elementIsVisible(save), 10000);
    await save.click();
  });
  afterAll(async function () {
    try {
      await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2");
      let mode = await driver.wait(
        until.elementLocated(
          By.xpath("//div[@id='usernavigation']/form/div/div/input")
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(mode), 10000);
      await mode.click();

      let setting = await driver.wait(
        until.elementLocated(
          By.xpath(
            `//div[@data-activityname="Trang 's Forum"]//a[@role="button"]`
          )
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(setting), 10000);
      await setting.click();

      let remove = await driver.wait(
        until.elementLocated(By.linkText(`Delete`)),
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
    } catch (error) {}
    driver.close();
  });
  describe("Equivalence class partitioning technique (6 testcases)", () => {
    beforeEach(async function () {
      let openForm = await driver.wait(
        until.elementLocated(By.css("div.row div.navitem a.btn.btn-primary")),
        10000
      );
      await openForm.click();
    });

    /****PQTTF1*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường Chủ đề, Tin nhắn, Tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });

    /****PQTTF2*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ trường Chủ đề`, async function () {
      Subject = "";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/post\.php$/
      );
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF3*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ trường tin nhắn`, async function () {
      Subject = "Câu hỏi 1";
      Message = "";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/post\.php$/
      );
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF4*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ đính kèm tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      // let advancedButton = await driver.wait(
      //   until.elementLocated(By.id("id_advancedadddiscussion")),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(advancedButton), 10000);
      // await advancedButton.click();

      // let fileButton = await driver.wait(
      //   until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(fileButton), 10000);
      // await fileButton.click();
      // let uploadInput = await driver.wait(
      //   until.elementLocated(
      //     By.css(
      //       "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
      //     )
      //   ),
      //   10000
      // );
      // await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      // let upLoadButton = await driver.findElement(
      //   By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      // );
      // await upLoadButton.click();
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF5*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 501 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/501KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF6*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 10 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

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
    const file4 = new File(['File content 4'], 'file4.txt', { type: 'text/plain' });
    const file5 = new File(['File content 5'], 'file5.txt', { type: 'text/plain' });
    const file6 = new File(['File content 6'], 'file6.txt', { type: 'text/plain' });
    const file7 = new File(['File content 7'], 'file7.txt', { type: 'text/plain' });
    const file8 = new File(['File content 8'], 'file8.txt', { type: 'text/plain' });
    const file9 = new File(['File content 9'], 'file9.txt', { type: 'text/plain' });
    const file10 = new File(['File content 10'], 'file10.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10]);`;

      await driver.executeScript(dragAndDropSimulationScript);

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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
  });
  describe(" Boundary value analysis technique (10 testcases)", () => {
    beforeEach(async function () {
      let openForm = await driver.wait(
        until.elementLocated(By.css("div.row div.navitem a.btn.btn-primary")),
        10000
      );
      await openForm.click();
    });
    /****PQTTF7*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/500KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF8*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 256 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/256KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF9*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và không nộp tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      // let advancedButton = await driver.wait(
      //   until.elementLocated(By.id("id_advancedadddiscussion")),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(advancedButton), 10000);
      // await advancedButton.click();

      // let fileButton = await driver.wait(
      //   until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(fileButton), 10000);
      // await fileButton.click();
      // let uploadInput = await driver.wait(
      //   until.elementLocated(
      //     By.css(
      //       "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
      //     )
      //   ),
      //   10000
      // );
      // await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      // let upLoadButton = await driver.findElement(
      //   By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      // );
      // await upLoadButton.click();
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF10*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 499 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/499KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF11*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 501 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/501KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF12*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 8 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      for (let i = 1; i <= 8; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF13*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 9 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      for (let i = 1; i <= 9; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF14*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 10 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

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
    const file4 = new File(['File content 4'], 'file4.txt', { type: 'text/plain' });
    const file5 = new File(['File content 5'], 'file5.txt', { type: 'text/plain' });
    const file6 = new File(['File content 6'], 'file6.txt', { type: 'text/plain' });
    const file7 = new File(['File content 7'], 'file7.txt', { type: 'text/plain' });
    const file8 = new File(['File content 8'], 'file8.txt', { type: 'text/plain' });
    const file9 = new File(['File content 9'], 'file9.txt', { type: 'text/plain' });
    const file10 = new File(['File content 10'], 'file10.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10]);`;

      await driver.executeScript(dragAndDropSimulationScript);

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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF15*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 4 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();
      for (let i = 1; i <= 8; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF16*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 1 tập tin có dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();
      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-1.bin`));

      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
  });
});
describe("Test trên Edge", function () {
  jest.setTimeout(200000);

  let driver;
  let Subject, Message;

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

    await username.sendKeys("teacher");
    await password.sendKeys("sandbox");
    await submit.click();
    await driver.get(
      "https://sandbox402.moodledemo.net/course/modedit.php?add=forum&type&course=2&section=0&return=0&sr=0&beforemod=0"
    );
    let inputForum = await driver.wait(
      until.elementLocated(By.id("id_name")),
      10000
    );
    await driver.wait(until.elementIsVisible(inputForum), 10000);
    await inputForum.sendKeys("Trang 's Forum");

    let save = await driver.wait(
      until.elementLocated(By.id("id_submitbutton")),
      10000
    );
    await driver.wait(until.elementIsVisible(save), 10000);
    await save.click();
  });
  afterAll(async function () {
    try {
      await driver.get("https://sandbox402.moodledemo.net/course/view.php?id=2");
      let mode = await driver.wait(
        until.elementLocated(
          By.xpath("//div[@id='usernavigation']/form/div/div/input")
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(mode), 10000);
      await mode.click();

      let setting = await driver.wait(
        until.elementLocated(
          By.xpath(
            `//div[@data-activityname="Trang 's Forum"]//a[@role="button"]`
          )
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(setting), 10000);
      await setting.click();

      let remove = await driver.wait(
        until.elementLocated(By.linkText(`Delete`)),
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
    } catch (error) {}
    driver.close();
  });
  describe("Equivalence class partitioning technique (6 testcases)", () => {
    beforeEach(async function () {
      let openForm = await driver.wait(
        until.elementLocated(By.css("div.row div.navitem a.btn.btn-primary")),
        10000
      );
      await openForm.click();
    });

    /****PQTTF1*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường Chủ đề, Tin nhắn, Tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });

    /****PQTTF2*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ trường Chủ đề`, async function () {
      Subject = "";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/post\.php$/
      );
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF3*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ trường tin nhắn`, async function () {
      Subject = "Câu hỏi 1";
      Message = "";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/post\.php$/
      );
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF4*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường ngoại trừ đính kèm tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      // let advancedButton = await driver.wait(
      //   until.elementLocated(By.id("id_advancedadddiscussion")),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(advancedButton), 10000);
      // await advancedButton.click();

      // let fileButton = await driver.wait(
      //   until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(fileButton), 10000);
      // await fileButton.click();
      // let uploadInput = await driver.wait(
      //   until.elementLocated(
      //     By.css(
      //       "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
      //     )
      //   ),
      //   10000
      // );
      // await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      // let upLoadButton = await driver.findElement(
      //   By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      // );
      // await upLoadButton.click();
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF5*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 501 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/501KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF6*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 10 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

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
    const file4 = new File(['File content 4'], 'file4.txt', { type: 'text/plain' });
    const file5 = new File(['File content 5'], 'file5.txt', { type: 'text/plain' });
    const file6 = new File(['File content 6'], 'file6.txt', { type: 'text/plain' });
    const file7 = new File(['File content 7'], 'file7.txt', { type: 'text/plain' });
    const file8 = new File(['File content 8'], 'file8.txt', { type: 'text/plain' });
    const file9 = new File(['File content 9'], 'file9.txt', { type: 'text/plain' });
    const file10 = new File(['File content 10'], 'file10.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10]);`;

      await driver.executeScript(dragAndDropSimulationScript);

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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
  });
  describe(" Boundary value analysis technique (10 testcases)", () => {
    beforeEach(async function () {
      let openForm = await driver.wait(
        until.elementLocated(By.css("div.row div.navitem a.btn.btn-primary")),
        10000
      );
      await openForm.click();
    });
    /****PQTTF7*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/500KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF8*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 256 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/256KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF9*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và không nộp tập tin`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      // let advancedButton = await driver.wait(
      //   until.elementLocated(By.id("id_advancedadddiscussion")),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(advancedButton), 10000);
      // await advancedButton.click();

      // let fileButton = await driver.wait(
      //   until.elementLocated(By.xpath(`//a[@role='button' and @title='Add...']`)),
      //   10000
      // );
      // await driver.wait(until.elementIsVisible(fileButton), 10000);
      // await fileButton.click();
      // let uploadInput = await driver.wait(
      //   until.elementLocated(
      //     By.css(
      //       "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
      //     )
      //   ),
      //   10000
      // );
      // await uploadInput.sendKeys(path.resolve("./Trang/Files/400KB.bin"));
      // let upLoadButton = await driver.findElement(
      //   By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      // );
      // await upLoadButton.click();
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF10*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 499 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";

      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/499KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF11*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp tập tin có dung lượng 501 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve("./Trang/Files/501KB.bin"));
      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
      let cancel = await driver.wait(
        until.elementLocated(By.id("id_cancel")),
        10000
      );
      await driver.wait(until.elementIsVisible(cancel), 10000);
      await cancel.click();
    });
    /****PQTTF12*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 8 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      for (let i = 1; i <= 8; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF13*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 9 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

      for (let i = 1; i <= 9; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF14*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 10 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();

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
    const file4 = new File(['File content 4'], 'file4.txt', { type: 'text/plain' });
    const file5 = new File(['File content 5'], 'file5.txt', { type: 'text/plain' });
    const file6 = new File(['File content 6'], 'file6.txt', { type: 'text/plain' });
    const file7 = new File(['File content 7'], 'file7.txt', { type: 'text/plain' });
    const file8 = new File(['File content 8'], 'file8.txt', { type: 'text/plain' });
    const file9 = new File(['File content 9'], 'file9.txt', { type: 'text/plain' });
    const file10 = new File(['File content 10'], 'file10.txt', { type: 'text/plain' });

    // Simulate file drag and drop with the created files
    simulateFileDragAndDrop(dropZone, [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10]);`;

      await driver.executeScript(dragAndDropSimulationScript);

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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF15*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 4 tập tin có tổng dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();
      for (let i = 1; i <= 8; i++) {
        let fileButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//a[@role='button' and @title='Add...']`)
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(fileButton), 10000);
        await fileButton.click();
        let uploadInput = await driver.wait(
          until.elementLocated(
            By.css(
              "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
            )
          ),
          10000
        );
        await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-${i}.bin`));
        let upLoadButton = await driver.findElement(
          By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
        );
        await upLoadButton.click();
      }
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
    /****PQTTF16*****/
    it(`Người dùng tạo câu hỏi với đầy đủ các trường, và nộp 1 tập tin có dung lượng nhỏ hơn 500 kb`, async function () {
      Subject = "Câu hỏi 1";
      Message = "Example";
      let subjectInput = await driver.wait(
        until.elementLocated(By.id("id_subject")),
        10000
      );
      await driver.wait(until.elementIsVisible(subjectInput), 10000);
      await subjectInput.sendKeys(Subject);

      await driver.switchTo().frame("id_message_ifr");

      const messageInput = await driver.wait(
        until.elementLocated(By.id("tinymce")),
        10000
      );
      await driver.wait(until.elementIsVisible(messageInput), 10000);
      await messageInput.sendKeys(Message);
      await driver.switchTo().parentFrame();

      let advancedButton = await driver.wait(
        until.elementLocated(By.id("id_advancedadddiscussion")),
        10000
      );
      await driver.wait(until.elementIsVisible(advancedButton), 10000);
      await advancedButton.click();
      let fileButton = await driver.wait(
        until.elementLocated(
          By.xpath(`//a[@role='button' and @title='Add...']`)
        ),
        10000
      );
      await driver.wait(until.elementIsVisible(fileButton), 10000);
      await fileButton.click();
      let uploadInput = await driver.wait(
        until.elementLocated(
          By.css(
            "form.form div.fp-formset div.fp-file.form-group div.px-3 input"
          )
        ),
        10000
      );
      await uploadInput.sendKeys(path.resolve(`./Trang/Files/10KB-1.bin`));

      let upLoadButton = await driver.findElement(
        By.css("div.mdl-align button.fp-upload-btn.btn-primary.btn")
      );
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
        /^https:\/\/sandbox402\.moodledemo\.net\/mod\/forum\/view\.php\?f=[1-9][0-9]*$/
      );
    });
  });
});
