var expect = require('chai').expect;

describe('Main', function() {
  let arr;

  //roda toda as vezes, antes de cada bloco
  beforeEach(function() {
    arr = [1, 2, 3];
  });

  //smoke test = test mais básico - serve para verificar se temos a função (se função existe - se variavel é do tipo que a gente deseja)
  it('should be an array', function() {
    expect(arr).to.be.an('array')
  });

  it('should have size of 4 when push another value to the array', function() {
    arr.push(4);
    expect(arr).to.have.lengthOf(4);
  });

  it('should have a size of 2 when pop a value from the array', function() {
    arr.pop();
    expect(arr).to.have.lengthOf(2);
  });

  it('should remove the value 3 when use pop in the array', function() {
    arr.pop()
    expect(arr).not.include(3)
  });

  it('should return true when pop 3 from the array', function() {
    expect(arr.pop() === 3).to.be.true;
  });

});
