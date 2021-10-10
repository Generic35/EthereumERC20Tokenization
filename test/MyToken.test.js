const Token = artifacts.require('MyToken');

var chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Token test', async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;
  console.log('>>> THE RECIPIENT: ', recipient);
  it('all tokens should be in my account', async () => {
    let instance = await Token.deployed();
    let totalSupply = await instance.totalSupply();
    // let balance = await instance.balanceOf(accounts[0]);
    // assert.equal(
    //   balance.valueOf(),
    //   initialSupply.valueOf(),
    //   'The balance was not the same'
    // );
    // expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(
    //   totalSupply
    // );
    expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it('is possible to send tokens between accounts', async () => {
    const sendTokens = 1;
    let instance = await Token.deployed();
    let totalSupply = await instance.totalSupply();
    expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(
      totalSupply
    );
    // await instance.transfer(recipient, sendTokens)
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    // expect(await instance.balanceOf(recipient)).to.be.a.bignumber.equal(
    //   new BN(sendTokens)
    // );
  });
});
