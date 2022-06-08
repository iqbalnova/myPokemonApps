import {firebase} from '@react-native-firebase/database';

export const myDb = firebase
  .app()
  .database(
    'https://mypokemonapps-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
