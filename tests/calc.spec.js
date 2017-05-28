import { expect } from 'chai';
import { sum, sub, mult, div } from '../src/calc'

describe('Calculator', () => {

  describe('Smoke tests', () => {
    // smoke tests
    it('should exists the method "sum"', () => {
      expect(sum).to.exist;
      expect(sum).to.be.a('function');
    });

    it('should exists the method "sub"', () => {
      expect(sub).to.exist;
      expect(sub).to.be.a('function');
    });

    it('should exists the method "mult"', () => {
      expect(mult).to.exist;
      expect(mult).to.be.a('function');
    });

    it('should exists the method "div"', () => {
      expect(div).to.exist;
      expect(div).to.be.a('function');
    });
  });

  describe('Sum', () => {
    it('should return 4 when "sum(2, 2)"', () => {
      expect(sum(2, 2)).to.be.equal(4);
    });
  });

  describe('Sub', () => {
    it('should return 4 when "sub(6, 2)"', () => {
      expect(sub(6, 2)).to.be.equal(4);
    });

    it('should return -4 when "sub(6, 10)"', () => {
      expect(sub(6, 10)).to.be.equal(-4);
    });
  });

  describe('Mult', () => {
    it('should return 8 when "sub(4, 2)"', () => {
      expect(mult(4, 2)).to.be.equal(8);
    });
  });

  describe('Div', () => {
    it('should return 5 when "div(10, 2)"', () => {
      expect(div(10, 2)).to.be.equal(5);
    });

    it('should return "it\'s not possible to divide by 0" when divide by zero', () => {
      expect(div(4, 0)).to.be.equal('it\'s not possible to divide by 0');
    });
  });
});
