const Employee = require('../lib/Employee');


test('create the Employee card', () => {
    const e = new Employee();
    expect(typeof(e)).toBe('object');
});

test('set name from the constructor', () => {
    const name ="Dave";
    const e = new Employee(name);
    expect(e.name).toBe(name);
});

test('id from constructor', () => {
    const testValue = 100;
    const e = new Employee('Dave', testValue);
    expect(e.id).toBe(testValue);
});

test('email from constructor', () => {
    const testValue = 'test@email.com';
    const e = new Employee('Dave', 1, testValue);
    expect(e.email).toBe(testValue);
});

test('get name from getName()', () => {
    const getName = 'Dave';
    const e = new Employee('Dave', getName);
    expect(e.getName()).toBe(getName);
});

test('get id from getId()', () => {
    const testValue = 100;
    const e = new Employee('Dave', testValue);
    expect(e.getId()).toBe(testValue);
});

test('get email from getEmail()', () => {
    const testValue = 'test@email.com';
    const e = new Employee('Dave', 1, testValue);
    expect(e.getEmail()).toBe(testValue);
});

test('getRole should return an Employee', () => {
    const testValue = 'Employee';
    const e = new Employee('Dave', 100, 'test@email.com');
    expect(e.getRole()).toBe(testValue);
;})

