export default {
  // Use ts-jest to handle the transformation
  preset: 'ts-jest/presets/default-esm', 
  testEnvironment: 'node',
  // This is the "Magic Map"
  moduleNameMapper: {
    // This tells Jest: "If you see an import ending in .js, 
    // try looking for the same file without the .js"
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};