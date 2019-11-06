const assert = require('chai').assert;
const txt = require('../page/validCredLogin.js')
const txt1 = require('../page/invalidCredLogin.js')


describe('App', function() {
    it('authorised dealer with valid cred', async function() {
        let result = await txt();   
        assert.equal(result, 'Welcome To Authorised Dealer Admin'); 
    });

    it('authorised dealer with invalid cred', async function() {
        let result = await txt1();   
        assert.equal(result, 'Username and Password did not match.'); 
    });

});