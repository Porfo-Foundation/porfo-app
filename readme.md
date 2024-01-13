# Setup Instructions:

## 1. Node Modules Changes :

- Go to `node_modules\react-native-crypto\node_modules\pbkdf2\browser.js` and replace the code with the following:

  ```
    var defaultEncoding = 'utf-8'
    // console.log('process.browser', process)
    // if (process.browser) {
    //   defaultEncoding = 'utf-8'
    // } else {
    //   var pVersionMajor = parseInt(process.version.split('.')[0].slice(1), 10)

    //   defaultEncoding = pVersionMajor >= 6 ? 'utf-8' : 'binary'
    // }
  ```

- Go to `node_modules\@biconomy\common\dist\src\ERC4337Utils.js` and add on line 101
  ```
  global.Buffer = global.Buffer || require('buffer').Buffer;
  ```
- Go to `node_modules/native-base/src/core/NativeBaseProvider.tsx` and remove the `<SSRProvider></SSRProvider>` from line 97 which wraps the children. Make sure not to delete {children}. Then remove the line
  ```
  import { SSRProvider } from '@react-native-aria/utils';
  ```
# porfo-app
