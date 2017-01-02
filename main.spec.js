describe('my awesome website', function () {
  it('should do some chai assertions', function () {
    browser.url('http://localhost:3000');
    browser.getTitle().should.be.equal('SF Movies explorer');
  });
});
