const {By, Builder, until, Select} = require('selenium-webdriver');
const assert = require("assert");


describe("Tạo mới một sự kiện trên Chrome Browser (15 testcases)", function () {
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
      });
    describe("Equivalance class partioning technique ",  function () {

        //ANE-001-001
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();


            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 


            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();



            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

             

        })
        //ANE-001-002
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

           

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            // await title.sendKeys("");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

        // ANE3-001-003
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Select a course" với tất cả các trường valid ngoại trừ Type với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz2");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(1000);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("course");
            await driver.sleep(1000);

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            assert.equal(nameError, false);

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            assert.equal(durationError, false);

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).getText();

            assert.equal(eventtypeError, "Select a course");

         
//*
        })

        //  ANE3-001-004
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz2");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("20");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);

        })

         // ANE3-001-005
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz2");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));

            await durantionInMinutes.click();


            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));


         
            await duration.sendKeys("-1");

            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);
            assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
            
         

        })
        //ANE-001-006
        it('Tạo mới sự kiện thành công với tất cả các trường valid ngoại trừ Duration với lựa chọn "Without duration"', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz2");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let withoutDuration = await driver.wait(until.elementLocated(By.id("id_duration_0")));

            await withoutDuration.click();



         
            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);
            assert.equal(durationError, false);
            
         

        })
    })
    describe("Boundary value analysis technique",  function () {

          //ANE-001-007
          it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            // await title.sendKeys("");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 


            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

          //ANE-001-008
          it('Tạo mới sự kiện thành công với tất cả các trường valid, Title có độ dài 1 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("q");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();


            // check error

            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

        //  ANE-001-009
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz1");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("19");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("23");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("59");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H1-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);

        })

       

        
        //ANE-001-011
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();


            //Select duration
        
            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));

            await durantionInMinutes.click();



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));


         
            await duration.sendKeys("1");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();



            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

             

        })

        
        // ANE-001-010
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị 0', async function() {
        await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
        await driver.sleep(500); 


        let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
        await driver.sleep(500); 

        await newEventButton.click();
        await driver.sleep(500); 

        let title = await driver.wait(until.elementLocated(By.id("id_name")));
        await driver.sleep(500); 

        await title.sendKeys("Assignment2");
        await driver.sleep(500); 

        //Select date start
        let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
        await driver.sleep(500); 

        let daySelect = new Select(daySelectElement);
        await daySelect.selectByValue("20");
        await driver.sleep(500); 

        let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
        await driver.sleep(500); 

        let monthSelect = new Select(monthSelectElement);
        await monthSelect.selectByValue("11");
        await driver.sleep(500); 

        let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
        await driver.sleep(500); 

        let yearSelect = new Select(yearSelectElement);
        await yearSelect.selectByValue("2023");
        await driver.sleep(500); 

        let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
        await driver.sleep(500); 

        let hourSelect = new Select(hourSelectElement);
        await hourSelect.selectByValue("0");
        await driver.sleep(500); 

        let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
        await driver.sleep(500); 

        let minuteSelect = new Select(minuteSelectElement);
        await minuteSelect.selectByValue("0");
        await driver.sleep(500); 


        //Select event type
        let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
        await driver.sleep(500);
        await driver.sleep(500); 

        let eventTypeSelect = new Select(eventTypeSelectElement);
        await eventTypeSelect.selectByValue("user");
        await driver.sleep(500); 

        //
        let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
        await driver.sleep(500); 

        await morelessToggler.click()
        await driver.sleep(500); 


        let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
        await driver.sleep(500); 

        await durantionInMinutes.click();
        await driver.sleep(500); 



        let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
        await driver.sleep(500); 


        
        await duration.sendKeys("0");
        await driver.sleep(500); 

        //Select date until
        

        let location = await driver.wait(until.elementLocated(By.id("id_location")));
        await driver.sleep(500); 

        await location.sendKeys("H6-CS6");
        await driver.sleep(500); 


        let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
        await driver.sleep(500); 

        await saveButton.click();
        await driver.sleep(2000); 

        // check error

        let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
        await driver.sleep(500); 

        assert.equal(nameError, false);
        let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();
        await driver.sleep(500); 

        let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
        await driver.sleep(500); 

        assert.equal(eventtypeError, false);
        assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
        
        

        })
        
    })
    describe("Use-case testing technique", function() {
        //ANE-001-012
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();


            //Select duration

            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));

            await durantionInMinutes.click();



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));


        
            await duration.sendKeys("1");


            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();



            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

            

        })


        //ANE-001-013
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            // await title.sendKeys("");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

         // ANE-001-014
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị 0', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Assignment2");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));

            await durantionInMinutes.click();



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));


         
            await duration.sendKeys("0");

            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H6-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);
            assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
            
         

        })

           //  ANE-001-015
           it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();

            let title = await driver.wait(until.elementLocated(By.id("id_name")));

            await title.sendKeys("Quiz1");

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));

            await morelessToggler.click()


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));

            await untilDuration.click();

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("19");

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("23");

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("59");

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));

            await location.sendKeys("H1-CS6");


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();

            assert.equal(eventtypeError, false);

        })


    })    
               

    after(async () => await driver.quit());

})




describe("Tạo mới một sự kiện trên Edge Browser (15 testcases)", function () {
    let driver;

    before(async function () {
      
        driver = await new Builder().forBrowser("MicrosoftEdge").build();

        await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en");
        let username = await driver.wait(until.elementLocated(By.id("username")));
        let password = await driver.wait(until.elementLocated(By.id("password")));
        let submit = await driver.wait(until.elementLocated(By.id("loginbtn")));
        await username.sendKeys("teacher");
        await password.sendKeys("sandbox");
        await submit.click();
      });
    describe("Equivalance class partioning technique ",  function () {

        //ANE-001-001
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
            await newEventButton.click();
            await driver.sleep(200); 

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");
            await driver.sleep(200); 

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            await driver.sleep(200); 


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
            await driver.sleep(200); 


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
            await driver.sleep(200); 


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
            await driver.sleep(200); 


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
            await driver.sleep(200); 


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
            await driver.sleep(200); 


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()
            await driver.sleep(200); 



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();
            await driver.sleep(200); 


            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
            await driver.sleep(200); 

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
            await driver.sleep(200); 

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
            await driver.sleep(200); 

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
            await driver.sleep(200); 

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
            await driver.sleep(200); 

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
            await driver.sleep(200); 

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
            await driver.sleep(200); 

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
            await driver.sleep(200); 

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
            await driver.sleep(200); 

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
            await driver.sleep(200); 

            await location.sendKeys("H6-CS6");
            await driver.sleep(200); 


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
            await driver.sleep(200); 

            await saveButton.click();
            await driver.sleep(2000); 


            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
            await driver.sleep(200); 

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
            await driver.sleep(200); 

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
            await driver.sleep(200); 
            


            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

             

        })
        //ANE-001-002
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

           

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            // await title.sendKeys("");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

        // ANE3-001-003
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Select a course" với tất cả các trường valid ngoại trừ Type với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 
            await newEventButton.click();
            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Quiz2");
            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue('course')
             await driver.sleep(1000);
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            assert.equal(nameError, false);

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            assert.equal(durationError, false);

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).getText();
             

            assert.equal(eventtypeError, "Select a course");

         
//*
        })

        //  ANE3-001-004
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 


            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Quiz2");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("20");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();
             

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);

        })

         // ANE3-001-005
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 


            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Quiz2");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
             

            await durantionInMinutes.click();
             


            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
             


         
            await duration.sendKeys("-1");
             

            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);
            assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
            
         

        })
        //ANE-001-006
        it('Tạo mới sự kiện thành công với tất cả các trường valid ngoại trừ Duration với lựa chọn "Without duration"', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);  

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Quiz2");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let withoutDuration = await driver.wait(until.elementLocated(By.id("id_duration_0")));
             

            await withoutDuration.click();
             



         
            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);
            assert.equal(durationError, false);
            
         

        })
    })
    describe("Boundary value analysis technique",  function () {

          //ANE-001-007
          it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);  

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            // await title.sendKeys("");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 


            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

          //ANE-001-008
          it('Tạo mới sự kiện thành công với tất cả các trường valid, Title có độ dài 1 ký tự', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("q");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             


            // check error

            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

        //  ANE-001-009
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Quiz1");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("19");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("23");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("59");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H1-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();
             

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);

        })

       

        
        //ANE-001-011
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);
            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
             


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
             


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
             


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()
             



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();
             


            //Select duration
        
            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
             

            await durantionInMinutes.click();
             



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
             


         
            await duration.sendKeys("1");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             



            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

             

        })

        
        // ANE-001-010
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị 0', async function() {
        await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
         


        let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
        await driver.sleep(5000);

        await newEventButton.click();
         

        let title = await driver.wait(until.elementLocated(By.id("id_name")));
         

        await title.sendKeys("Assignment2");
         

        //Select date start
        let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
         

        let daySelect = new Select(daySelectElement);
        await daySelect.selectByValue("20");
         

        let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
         

        let monthSelect = new Select(monthSelectElement);
        await monthSelect.selectByValue("11");
         

        let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
         

        let yearSelect = new Select(yearSelectElement);
        await yearSelect.selectByValue("2023");
         

        let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
         

        let hourSelect = new Select(hourSelectElement);
        await hourSelect.selectByValue("0");
         

        let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
         

        let minuteSelect = new Select(minuteSelectElement);
        await minuteSelect.selectByValue("0");
         


        //Select event type
        let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
        await driver.sleep(500);
         

        let eventTypeSelect = new Select(eventTypeSelectElement);
        await eventTypeSelect.selectByValue("user");
         

        //
        let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
         

        await morelessToggler.click()
         


        let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
         

        await durantionInMinutes.click();
         



        let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
         


        
        await duration.sendKeys("0");
         

        //Select date until
        

        let location = await driver.wait(until.elementLocated(By.id("id_location")));
         

        await location.sendKeys("H6-CS6");
         


        let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
         

        await saveButton.click();
        await driver.sleep(2000); 

        // check error

        let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
         

        assert.equal(nameError, false);
        let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();
         

        let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
         

        assert.equal(eventtypeError, false);
        assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
        
        

        })
        
    })
    describe("Use-case testing technique", function() {
        //ANE-001-012
        it("Tạo mới sự kiện thành công với tất cả các trường valid", async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");

            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);
            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
            await title.sendKeys("Assigment1");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
             


            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             


            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             


            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
             


            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
             


            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             


            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
            await morelessToggler.click()
             



            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
            await untilDuration.click();
             


            //Select duration

            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
             

            await durantionInMinutes.click();
             



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
             


        
            await duration.sendKeys("1");
             


            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             



            // check error
            assert.equal(nameError, false);
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);

            

        })


        //ANE-001-013
        it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "Required" với tất cả các trường valid ngoại trừ Title với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            // await title.sendKeys("");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("21");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("8");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("30");
             

            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("22");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("8");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("30");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")));
             

            await saveButton.click();
            await driver.sleep(2000); 

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).getText();
             

            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).isDisplayed();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             


            // check error

            assert.equal(nameError, "- Required");
            assert.equal(durationError, false);
            assert.equal(eventtypeError, false);
        })

         // ANE-001-014
         it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration." với tất cả các trường valid ngoại trừ Duration với giá trị 0', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000);

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Assignment2");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let durantionInMinutes = await driver.wait(until.elementLocated(By.id("id_duration_2")));
             

            await durantionInMinutes.click();
             



            let duration = await driver.wait(until.elementLocated(By.id("id_timedurationminutes")));
             


         
            await duration.sendKeys("0");
             

            //Select date until
         
    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H6-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name"))).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup"))).getText();
             

            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);
            assert.equal(durationError, "The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.");
            
         

        })

           //  ANE-001-015
           it('Tạo mới sự kiện thất bại và hiển thị thông báo lỗi "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding" với tất cả các trường valid ngoại trừ Duration với giá trị invalid', async function() {
            await driver.get("https://sandbox.moodledemo.net/calendar/view.php");
             

    
            let newEventButton = await driver.wait(until.elementLocated(By.css('[data-action="new-event-button"]')), 10000);
            await driver.sleep(5000); 

            await newEventButton.click();
             

            let title = await driver.wait(until.elementLocated(By.id("id_name")));
             

            await title.sendKeys("Quiz1");
             

            //Select date start
            let daySelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_day")));
             

            let daySelect = new Select(daySelectElement);
            await daySelect.selectByValue("20");
             

            let monthSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_month")));
             

            let monthSelect = new Select(monthSelectElement);
            await monthSelect.selectByValue("11");
             

            let yearSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_year")));
             

            let yearSelect = new Select(yearSelectElement);
            await yearSelect.selectByValue("2023");
             

            let hourSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_hour")));
             

            let hourSelect = new Select(hourSelectElement);
            await hourSelect.selectByValue("0");
             

            let minuteSelectElement = await driver.wait(until.elementLocated(By.id("id_timestart_minute")));
             

            let minuteSelect = new Select(minuteSelectElement);
            await minuteSelect.selectByValue("0");
             


            //Select event type
            let eventTypeSelectElement = await driver.wait(until.elementLocated(By.id("id_eventtype")),10000);
            await driver.sleep(500);
             

            let eventTypeSelect = new Select(eventTypeSelectElement);
            await eventTypeSelect.selectByValue("user");
             

            //
            let morelessToggler = await driver.wait(until.elementLocated(By.className('moreless-toggler')));
             

            await morelessToggler.click()
             


            let untilDuration = await driver.wait(until.elementLocated(By.id("id_duration_1")));
             

            await untilDuration.click();
             

            //Select date until
            let dayUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_day")));
             

            let dayUntilSelect = new Select(dayUntilSelectElement);
            await dayUntilSelect.selectByValue("19");
             

            let monthUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_month")));
             

            let monthUntilSelect = new Select(monthUntilSelectElement);
            await monthUntilSelect.selectByValue("11");
             

            let yearUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_year")));
             

            let yearUntilSelect = new Select(yearUntilSelectElement);
            await yearUntilSelect.selectByValue("2023");
             

            let hourUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_hour")));
             

            let hourUntilSelect = new Select(hourUntilSelectElement);
            await hourUntilSelect.selectByValue("23");
             

            let minuteUntilSelectElement = await driver.wait(until.elementLocated(By.id("id_timedurationuntil_minute")));
             

            let minuteUntilSelect = new Select(minuteUntilSelectElement);
            await minuteUntilSelect.selectByValue("59");
             

    
            let location = await driver.wait(until.elementLocated(By.id("id_location")));
             

            await location.sendKeys("H1-CS6");
             


            let saveButton = await driver.wait(until.elementLocated(By.css("[data-action='save']")) ,10000);
             

            await saveButton.click();
            await driver.sleep(2000); 


            // check error

            let nameError =  await driver.wait(until.elementLocated(By.id("id_error_name")),10000).isDisplayed();
             

            assert.equal(nameError, false);
            let durationError =  await driver.wait(until.elementLocated(By.id("fgroup_id_error_durationgroup")),10000).getText();
             

            assert.equal(durationError, "The date and time you selected for duration until is before the start time of the event. Please correct this before proceeding.");
            
            let eventtypeError =  await driver.wait(until.elementLocated(By.id("id_error_courseid"))).isDisplayed();
             

            assert.equal(eventtypeError, false);

        })


    })    
               

    after(async () => await driver.quit());

})


   
    
