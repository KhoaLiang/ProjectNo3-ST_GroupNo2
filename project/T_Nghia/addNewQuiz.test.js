const {By, Builder, until, Select} = require('selenium-webdriver');
const assert = require("assert");



describe("Tạo mới một bài kiểm tra trên Chrome Browser (20 testcases)", function () {
    let driver;

    before(async function () {
    driver =  new Builder().forBrowser('chrome').build();

        await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");
        let username = await driver.wait(until.elementLocated(By.id("username")));
        let password = await driver.wait(until.elementLocated(By.id("password")));
        let submit = await driver.wait(until.elementLocated(By.id("loginbtn")));
        await username.sendKeys("teacher");
        await password.sendKeys("sandbox");
        await submit.click();
        await driver.get("https://sandbox.moodledemo.net/my/courses.php");
        let course = await driver.wait(until.elementLocated(By.css('.coursename')), 15000);
        await course.click();
        let editMode = await driver.wait(until.elementLocated(By.name('setmode')), 15000);
        await editMode.click();
        try {
            let skipButton = await driver.wait(until.elementLocated(By.css('[data-role="end"]')), 10000);
            if (skipButton) {
                await skipButton.click();
            }
        }
        catch {

            await driver.sleep(1000);
        }
    });
    describe("Equivalance class partioning technique ",  function () {
        
        //ANQ-001-001
        it("Tạo mới một bài kiểm tra thành công với tất cả các trường valid", async function() {
          
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
       
            await driver.sleep(1000);
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz1");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("60");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

        })
        
        //ANQ-001-002
        it("Tạo mới một bài kiểm tra thất bại và hiển thị ra lỗi với tất cả các trường valid, trường Time limit giá trị Invalid", async function() {
          
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
       
            await driver.sleep(1000);
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz2");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("-1");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(1000);
            let currentURL = await driver.getCurrentUrl();

            // check error
            assert.strictEqual(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ , "Submit failed due to invalid time limit field.");

        })
        
          //ANQ-001-003
        it('Tạo mới bài kiểm tra thất bại và hiển thị ra thông báo lỗi "Could not update the quiz. You have specified a close date before the open date." với tất cả các trường valid ngoại trừ "Close the quiz" với giá trị invalid', async function() {

            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
       
            await driver.sleep(1000);

            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz2");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("19");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("23");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("59");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("35");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

            let timeError =  await driver.wait(until.elementLocated(By.id("id_error_timeclose"))).getText();

            assert.equal(timeError, "Could not update the quiz. You have specified a close date before the open date.");
        
        
        // - You must supply a value here. 
        //Could not update the quiz. You have specified a close date before the open date. //id_error_timeclose
        })

        //ANQ-001-004
        it('Tạo mới một bài kiểm tra thất bại và hiển thông báo lỗi "Maximum of 255 characters" với tất cả các trường valid, trường Title invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "asrgyujtgoparmxdswkgxkazwichcjfraxvlacidrdbohvaruokhistxegwcvqaxlsrcpduycczmsjqmhbjnxteyyetoucoigdwnxyolzuziljtwbcjeneepymquyevqwxivkcgffgzjpqwyowhmrkcxaozygwANQapknypapnhvouetupqpnmkvcmqyrbiwjwgjqoubnfqljijargqkarslwhbmolcmubdwoyadkxrvlcxxksdzclzbgsimufcbc";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("25");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            assert.equal(nameError, "- Maximum of 255 characters")
        })

       // ANQ-001-005
        it('Tạo mới một bài kiểm tra thất bại và hiển thông báo lỗi "You must supply a value here." với tất cả các trường valid, trường Title invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("10");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            assert.equal(nameError, "- You must supply a value here.")
    })
        //ANQ-001-006
        it("Tạo mới một bài kiểm tra thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Week1");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("22");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("5");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

        })
        
        //ANQ-001-007
        it("Tạo mới một bài kiểm tra thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            try {
                let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
                await course.click();
            } catch {
            await driver.sleep(1000);
                
            }
        
        
          
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Week1");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("22");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("60");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

    })

        //ANQ-001-008
        it("Tạo mới một bài kiểm tra thành công với tất cả các trường valid", async function() {
          
        await driver.get("https://sandbox.moodledemo.net/my/courses.php");
        let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
        await course.click();
    
        await driver.sleep(1000);
                let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
                if (addActions.length > 1) {
                    await addActions[1].click();
                    await driver.sleep(2000);


                } else {
                    console.error("Error: Can't click add button");
                }
                let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
                await addQuiz.click();
                await driver.sleep(1000);
                let name = await driver.wait(until.elementLocated(By.id("id_name")));
                await name.sendKeys("Quiz1");
                let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
                await timeToggle.click();
                await driver.sleep(500);
                let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
                await enableOpenTime.click();   

                let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
                let daySelect = new Select(daySelectElement);
                await daySelect.selectByValue("21");
                let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
                let monthSelect = new Select(monthSelectElement);
                await monthSelect.selectByValue("11");
                let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
                let yearSelect = new Select(yearSelectElement);
                await yearSelect.selectByValue("2023");
                let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
                let hourSelect = new Select(hourSelectElement);
                await hourSelect.selectByValue("8");
                let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
                let minuteSelect = new Select(minuteSelectElement);
                await minuteSelect.selectByValue("30");
                let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
                await enableCloseTime.click();   
                let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
                let dayCloseSelect = new Select(dayCloseSelectElement);
                await dayCloseSelect.selectByValue("22");
                let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
                let monthCloseSelect = new Select(monthCloseSelectElement);
                await monthCloseSelect.selectByValue("11");
                let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
                let yearCloseSelect = new Select(yearCloseSelectElement);
                await yearCloseSelect.selectByValue("2023");
                let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
                let hourCloseSelect = new Select(hourCloseSelectElement);
                await hourCloseSelect.selectByValue("8");
                let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
                let minuteCloseSelect = new Select(minuteCloseSelectElement);
                await minuteCloseSelect.selectByValue("30");
                let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
                await enableTimeLimit.click();
                let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
                await numberTimeLimit.sendKeys("60");

                let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
                let  overDueSelect = new Select(overDueSelectElement);
                await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

                let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
                await submit.click();
                await driver.sleep(2000);
                let currentURL = await driver.getCurrentUrl();

                assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

        })
        
    })


    describe("[Boundary value analysis technique",  function () {
        

        
        // ANQ-001-009
        it('Tạo mới một bài kiểm tra thất bại và hiển thông báo lỗi "You must supply a value here." với tất cả các trường valid, trường Title invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            // let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            // await enableCloseTime.click();   
            // let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            // let dayCloseSelect = new Select(dayCloseSelectElement);
            // await dayCloseSelect.selectByValue("22");
            // let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            // let monthCloseSelect = new Select(monthCloseSelectElement);
            // await monthCloseSelect.selectByValue("11");
            // let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            // let yearCloseSelect = new Select(yearCloseSelectElement);
            // await yearCloseSelect.selectByValue("2023");
            // let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            // let hourCloseSelect = new Select(hourCloseSelectElement);
            // await hourCloseSelect.selectByValue("8");
            // let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            // let minuteCloseSelect = new Select(minuteCloseSelectElement);
            // await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("45");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            assert.equal(nameError, "- You must supply a value here.")
    })
        //  ANQ-001-010
        it('Tạo mới một bài kiểm tra thành công với tất cả các trường valid, trường Title 1 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "q";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");

            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("55");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);

            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

    })

        //  ANQ-001-011
        it('Tạo mới một bài kiểm tra thành công với tất cả các trường valid, trường Title có độ dài 255 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "srgyujtgoparmxdswkgxkazwichcjfraxvlacidrdbohvaruokhistxegwcvqaxlsrcpduycczmsjqmhbjnxteyyetoucoigdwnxyolzuziljtwbcjeneepymquyevqwxivkcgffgzjpqwyowhmrkcxaozygwANQapknypapnhvouetupqpnmkvcmqyrbiwjwgjqoubnfqljijargqkarslwhbmolcmubdwoyadkxrvlcxxksdzclzbgsimufcbc";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("0");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("1");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("100");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );
    })

        //  ANQ-001-012
        it('Tạo mới một bài kiểm tra thất bại với tất cả các trường valid, trường Title có độ dài 256 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "srgyujtgoparmxdswkgxkazwichcjfraxvlacidrdbohvaruokhistxegwcvqaxlsrcpduycczmsjqmhbjnxteyyetoucoigdwnxyolzuziljtwbcjeneepymquyevqwxivkcgffgzjpqwyowhmrkcxaozygwANQapknypapnhvouetupqpnmkvcmqyrbiwjwgjqoubnfqljijargqkarslwhbmolcmubdwoyadkxrvlcxxksdzclzbgsimufcbca";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("0");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("1");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("100");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autosubmit"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );
    })

        //  ANQ-001-013
        it('Tạo mới một bài kiểm tra thành công với tất cả các trường valid, trường Title có độ dài 128 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "lbqexastqyrmxhsipmvooruitkechsqijnqkomuajtmszhavcdvylvdwezywngiwsmhnnoofnuwqfdndjsUCTqqneqfbyfhlykkytokswwarbgcqaicjhvuuqsrljvhqr";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("0");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("1");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("100");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );
    })

            //ANQ-001-014
        it("Tạo mới một bài kiểm tra thất bại và hiển thị ra lỗi với tất cả các trường valid, trường Time limit giá trị Invalid", async function() {
          

            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz2");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("0");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("1");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("-1");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(1000);
            let currentURL = await driver.getCurrentUrl();

            // check error
            assert.strictEqual(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ , "Submit failed due to invalid time limit field.");

 
            // - You must supply a value here.
            //Could not update the quiz. You have specified a close date before the open date.
        })
        //  ANQ-001-015
        it('Tạo mới một bài kiểm tra thành công với tất cả các trường valid, trường Time limit bằng 0', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();

            await driver.sleep(1000);
            const nameDefault = "Quiz2";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("0");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("1");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("0");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );
        })
          //ANQ-001-016
        it('Tạo mới bài kiểm tra thất bại và hiển thị ra thông báo lỗi "Could not update the quiz. You have specified a close date before the open date." với tất cả các trường valid ngoại trừ "Close the quiz" với giá trị invalid', async function() {
        
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz2");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("19");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("23");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("59");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("35");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();
            assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

            let timeError =  await driver.wait(until.elementLocated(By.id("id_error_timeclose"))).getText();

            assert.equal(timeError, "Could not update the quiz. You have specified a close date before the open date.");

        })
    })

    describe("[Use-case testing technique",  function () {
        //ANQ-001-017
        it("Tạo mới một bài kiểm tra thành công với tất cả các trường valid", async function() {
          
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
       
            await driver.sleep(1000);
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz1");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("1");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();

            assert.doesNotMatch(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

        })
        // ANQ-001-018
        it('Tạo mới một bài kiểm tra thất bại và hiển thông báo lỗi "You must supply a value here." với tất cả các trường valid, trường Title invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("45");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autosubmit"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            assert.equal(nameError, "- You must supply a value here.")
    })
            //ANQ-001-019
        it('Tạo mới một bài kiểm tra thất bại và hiển thông báo lỗi "Maximum of 255 characters" với tất cả các trường valid, trường Title có độ dài 300 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            const nameDefault = "qyvlzhwpgbgocrbkwzneuqeqbizywzxhahwpyfduapgsvxuuhnbskuxnvrupptwchueojeafertjwniyzgskozccufiqihnwpmsgebyqgspvgmccfgnqklorxjiokqcgjchiqjfjlgmeyvhyjymkwztfvforrvcqgezwdoqbyxwhiercybudegtgiaugwkhepllicqogcsucbsfegdcmswoucfrignijjjrfejorosjamvxdodcfwcwaghlxercbhynmccmusbdwisdkkxylekxvlbvmkbpyiauwxqzrpdmr";
            
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')));
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys(nameDefault);

            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);

            await timeToggle.click();
            await timeToggle.click();
            await driver.sleep(2000);

            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("22");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("100");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autosubmit"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            assert.equal(nameError, "- Maximum of 255 characters")
        })
          //ANQ-001-020
          it('Tạo mới bài kiểm tra thất bại và hiển thị ra thông báo lỗi "Could not update the quiz. You have specified a close date before the open date." với tất cả các trường valid ngoại trừ "Close the quiz" với giá trị invalid', async function() {
        
            await driver.get("https://sandbox.moodledemo.net/my/courses.php");
            let course = await driver.wait(until.elementLocated(By.css('.coursename')), 30000);
            await course.click();
        
            await driver.sleep(1000);
            let addActions = await driver.wait(until.elementsLocated(By.css('.activity-add-text')), 10000);
            if (addActions.length > 1) {
                await addActions[1].click();
                await driver.sleep(2000);


            } else {
                console.error("Error: Can't click add button");
            }
            let addQuiz = await driver.wait(until.elementLocated(By.css('[title="Add a new Quiz"]')), 10000);
            await addQuiz.click();
            await driver.sleep(1000);
            let name = await driver.wait(until.elementLocated(By.id("id_name")));
            await name.sendKeys("Quiz2");
            let timeToggle = await driver.wait(until.elementLocated(By.id('collapseElement-1')), 10000);
            await timeToggle.click();
            await driver.sleep(500);
            let enableOpenTime = await driver.wait(until.elementLocated(By.id('id_timeopen_enabled')), 10000);
            await enableOpenTime.click();   

            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timeopen_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            let enableCloseTime = await driver.wait(until.elementLocated(By.id('id_timeclose_enabled')), 10000);
            await enableCloseTime.click();   
            let dayCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_day")));
            let dayCloseSelect = new Select(dayCloseSelectElement);
            await dayCloseSelect.selectByValue("20");
            let monthCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_month")));
            let monthCloseSelect = new Select(monthCloseSelectElement);
            await monthCloseSelect.selectByValue("11");
            let yearCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_year")));
            let yearCloseSelect = new Select(yearCloseSelectElement);
            await yearCloseSelect.selectByValue("2023");
            let hourCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_hour")));
            let hourCloseSelect = new Select(hourCloseSelectElement);
            await hourCloseSelect.selectByValue("8");
            let minuteCloseSelectElement = await driver.wait(until.elementLocated(By.id("id_timeclose_minute")));
            let minuteCloseSelect = new Select(minuteCloseSelectElement);
            await minuteCloseSelect.selectByValue("30");
            let enableTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_enabled')), 10000);
            await enableTimeLimit.click();
            let numberTimeLimit = await driver.wait(until.elementLocated(By.id('id_timelimit_number')), 10000);
            await numberTimeLimit.sendKeys("35");

            let overDueSelectElement = await driver.wait(until.elementLocated(By.id('id_overduehandling')), 10000);
            let  overDueSelect = new Select(overDueSelectElement);
            await overDueSelect.selectByValue("autoabandon"); //graceperiod autosubmit

            let submit = await driver.wait(until.elementLocated(By.name('submitbutton2')), 10000);
            await submit.click();
            await driver.sleep(2000);
            let currentURL = await driver.getCurrentUrl();
            assert.match(currentURL, /^https:\/\/sandbox\.moodledemo\.net\/course\/modedit\.php.*/ );

            let timeError =  await driver.wait(until.elementLocated(By.id("id_error_timeclose"))).getText();

            assert.equal(timeError, "Could not update the quiz. You have specified a close date before the open date.");

        })
    })
    
    after(async () => await driver.quit());
})