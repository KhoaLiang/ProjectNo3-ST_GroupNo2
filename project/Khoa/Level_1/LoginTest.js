const { Builder, By, Key } = require('selenium-webdriver');

//describe block
describe("login sandbox tests", function(){

    Login_info = [
        {Username: "admin", Password:"sandbox"},
        {Username: "", Password:"sandbox"},
        {Username: "adminfromMars", Password:"sandbox"},
        {Username: "admin", Password:""},
        {Username: "admin", Password:"sandboxforbros"}
    ];
    Login_info.forEach(({Username, Password})=> {
        //it block
    it("Login test (5 testcase)", async function(){
        //lanch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    //Navigate to the login page
    await driver.get("https://sandbox.moodledemo.net/login/index.php?lang=en")

    //Locate the username, password and submit element
    let username = await driver.wait(until.elementLocated(By.name('username')), 10000);
    let password = await driver.wait(until.elementLocated(By.name('password')), 10000);
    let submit = await driver.wait(until.elementLocated(By.id('loginbtn')), 10000);
    //adding info to the corresponding fields
    await username.sendKeys(Username);
    await password.sendKeys(Password);
    await submit.click();
    //close the browser
    await driver.quit();

        



        });    
    }); 
    


    





});



    


