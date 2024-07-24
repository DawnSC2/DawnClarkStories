// example.test.js

describe('Basic Tests', () => {
  test('simple boolean test', () => {
    expect(true).toBe(true);
  });

  test('simple arithmetic test', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('Array Tests', () => {
  const sampleArray = [1, 2, 3];

  test('array contains specific element', () => {
    expect(sampleArray).toContain(2);
  });

  test('array has correct length', () => {
    expect(sampleArray).toHaveLength(3);
  });
});

describe('String Tests', () => {
  const sampleString = 'Hello, World!';

  test('string matches exactly', () => {
    expect(sampleString).toBe('Hello, World!');
  });

  test('string contains substring', () => {
    expect(sampleString).toContain('World');
  });
});

// This test will fail, demonstrating how failures look
describe('Demonstration of a failing test', () => {
  test('this test will fail', () => {
    expect(1 + 1).toBe(3);
  });
});
