import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

//AWS Amplify
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHRqVVhjVFpGaV5KQmFJfFBmRGldf1RzcUU3HVdTRHRcQlxiQH5SckNiWntYdX0=;Mgo+DSMBPh8sVXJ0S0J+XE9HflRAQmJBYVF2R2BJflR0dF9FZUwgOX1dQl9gSX9Sf0ViXXlfc3BST2k=;ORg4AjUWIQA/Gnt2VVhkQlFadVdJX3xIdkx0RWFab196cFVMY1lBNQtUQF1hSn5Sd0xjWHtYcXdQQGlV;OTY3MDc0QDMyMzAyZTM0MmUzME5VcUhDcFp3Y3lLSzhIdkdqb21Dc29PVnV0RStTSCtjUEl4ZUFac0VCM1U9;OTY3MDc1QDMyMzAyZTM0MmUzMERWclNtUEV1L1MxSVBBOExNYzVtREw2OGJock1yUVBKYnFHMGwzakFES1U9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmFWf1tpR2NbfE5xflFGal9UVAciSV9jS31Td0RqWX5adnVWQGJaWA==;OTY3MDc3QDMyMzAyZTM0MmUzMFlHRjhOUUIrYWtmZzNlV1lXUjBwNGxCT1l6VVFvZUVLdVQxUTNtWjUxUDQ9;OTY3MDc4QDMyMzAyZTM0MmUzMEx0Y1hFSjAvVDcwV2QycDJRaTZRb1pmUWNqdFVCdUtabTJGajl1MldEZWs9;Mgo+DSMBMAY9C3t2VVhkQlFadVdJX3xIdkx0RWFab196cFVMY1lBNQtUQF1hSn5Sd0xjWHtYcXdTQWdV;OTY3MDgwQDMyMzAyZTM0MmUzMFBoMCtKU2VwR2FLTCsrc0pEWlhyNVlWVElybmhhWmVXSkhqT1B0akJ4T1U9;OTY3MDgxQDMyMzAyZTM0MmUzMGgrM0dyc0Y5bm9VWWNkZHVKMHNGQVJDenp1YjNVckZIV1Zodmk4MVhWclk9;OTY3MDgyQDMyMzAyZTM0MmUzMFlHRjhOUUIrYWtmZzNlV1lXUjBwNGxCT1l6VVFvZUVLdVQxUTNtWjUxUDQ9');

// ReactDOM.render(
//   <React.StrictMode>
// <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
