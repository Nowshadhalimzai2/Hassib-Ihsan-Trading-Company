const { expect } = require('chai');

describe('Hello World Test', () => {
    it('should return hello world', () => {
        expect('hello world').to.equal('hello world');
    });
});