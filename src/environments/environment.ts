// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true, //for testing the final product we've set this to true, but for full production you should use the environment.prod.ts
  firebase: {
    apiKey: "AIzaSyCPBxyKkl-p76NT7_pMaBSUVk8ztyKfpDk",
    authDomain: "ngpanel-4a878.firebaseapp.com",
    databaseURL: "https://ngpanel-4a878.firebaseio.com",
    projectId: "ngpanel-4a878",
    storageBucket: "ngpanel-4a878.appspot.com",
    messagingSenderId: "1023244676904"
  }
};
