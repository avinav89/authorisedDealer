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
        await page.type(loginSelector.USR_Selector, cred.USERNAME);
        await page.type(loginSelector.PWD_Selector, cred.PASSWORD);
        await page.click(loginSelector.SUBMIT_Selector);
        page.waitFor(2000);

        
        // await page.screenshot({ path:'buddy-screenshotPTM.png'});

        await page.waitForXPath(loginSelector.ASSERTION_Selector);
        console.log('output1')
        var [element_new] = await page.$x(loginSelector.ASSERTION_Selector);
        var text = await (await element_new.getProperty('textContent')).jsonValue();
        // console.log('sasa', text)


        return (text);
    } catch (e) {
        console.log('ERROR', e);
    }
    finally {
        // await page.screenshot({ path:'buddy-screenshotPTM.png'});
        await browser.close();
    }
};