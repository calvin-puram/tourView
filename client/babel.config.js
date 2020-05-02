module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@mixins': './src/components/mixins',
          '@views': './src/views',
          '@layouts': './src/components/layouts',
          '@tourUtils': './src/components/tourUtils',
          '@store': './src/store'
        }
      }
    ]
  ]
};
