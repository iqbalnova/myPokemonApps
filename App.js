import {View, Text} from 'react-native';
import React from 'react';
import Root from './src/routes/Root';
import CodePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};

export default CodePush(codePushOptions)(App);
