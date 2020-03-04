module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@mixins': './src/components/mixins',
          '@views': './src/views'
        }
      }
    ]
  ]
};
