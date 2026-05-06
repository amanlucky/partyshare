import { createInstance } from './sdkLoader';

const sdk = createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

export default sdk;