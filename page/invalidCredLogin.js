const puppeteer = require('puppeteer');
var cred = require('../testData.js')

var loginSelector = require('../locator/selectorLoginPage.js');
// var assert = require('chai').assert

module.exports = async () => {
    const browser = await puppeteer.launch({
        // headless: false, 
        args: ['--start-maximized']
    });
    try {
        const pages = await browser.pages();
        const page = pages[0];
        await page.goto(cred.URL);
        await page.click(loginSelector.SGNBTN_Selector);
        await page.waitFor(2000);
        await page.type(loginSelector.USR_Selector, cred.INVAL_USERNAME);
        await page.type(loginSelector.PWD_Selector, cred.INVAL_PASSWORD);
        await page.click(loginSelector.SUBMIT_Selector);
        page.waitFor(2000);
        await page.waitForXPath('// div[text()="Username and Password did not match."]');
        var [element_new] = await page.$x('// div[text()="Username and Password did not match."]');
        var text = await (await element_new.getProperty('textContent')).jsonValue();
        // console.log('Error ' + (text))
        await page.screenshot({ path:'ad-screenshot.png'});
        return (text);
    } catch (e) {
        console.log('ERROR', e);
    }
    finally {
        
        await browser.close();
    }
};