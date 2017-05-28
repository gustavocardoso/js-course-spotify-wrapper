import { expect } from 'chai';
import users from '../src/users';

describe('Users', () => {
  it('should return an array of users', function() {
    expect(users()).to.be.an('array');
  });

  it('should have size of 3', () => {
    let usersList = users();
    expect(usersList).to.have.lengthOf(3);
  });
});
