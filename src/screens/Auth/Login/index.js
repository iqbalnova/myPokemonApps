import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import {login, google, facebook, twitter} from '../../../assets/images';

// Kebutuhan firebase
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {myDb} from '../../../helpers/DB';

import {Formik} from 'formik';
import * as Yup from 'yup';

// Redux
// import {useDispatch} from 'react-redux';
// import {setUser} from './redux/action';

const auth = authProvider();
const messaging = messagingProvider();

export default function Login({navigation}) {
  const [eyes, setEyes] = useState('eye-closed');
  const [hiddenPass, setHiddenPass] = useState(true);

  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();

  // For validation inputan kosong
  const validationSignUp = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required(`Email field can't be empty`),
    password: Yup.string()
      .required(`Password field can't be empty`)
      .min(8, 'Password should be at least 8 character'),
  });

  // useEffect(() => {
  //   regisValidation();
  // }, [regisValidation]);

  // Login Function
  const signInnWithEmail = async values => {
    try {
      setLoading(true);
      const res = await auth.signInWithEmailAndPassword(
        values.email,
        values.password,
      );

      const token = await messaging.getToken();

      if (token) {
        let isUpdate = false;
        await myDb.ref(`users/${res.user.uid}`).update({
          notifToken: token,
        });
        isUpdate = true;

        if (isUpdate) {
          const results = await myDb.ref(`users/${res.user.uid}`).once('value');
          if (results.val()) {
            // dispatch(setUser(results.val()));
            navigation.navigate('Main');
          }
        }
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Oops', 'Email or Password is wrong, please try again');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Oops', 'Email is not valid');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Oops', 'Email or Password is wrong, please try again');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      validationSchema={validationSignUp}
      initialValues={{email: '', password: ''}}
      onSubmit={signInnWithEmail}>
      {({handleChange, handleSubmit, values, handleBlur, errors, touched}) => {
        return (
          <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 25}}>
              <View style={{alignItems: 'center'}}>
                <Image style={{height: 300, width: 300}} source={login} />
              </View>

              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 28,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 30,
                }}>
                Login
              </Text>

              <CustomInput
                label={'Email'}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                keyboardType="email-address"
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={{color: 'red', marginTop: -20, marginBottom: 20}}>
                  {errors.email}
                </Text>
              )}

              <CustomInput
                label={'Password'}
                securePass={hiddenPass}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                inputType="password"
                iconPass={
                  <Octicons
                    name={eyes}
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                fieldButtonFunction={() => {
                  if (eyes === 'eye') {
                    setEyes('eye-closed');
                    setHiddenPass(true);
                  } else {
                    setEyes('eye');
                    setHiddenPass(false);
                  }
                }}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={{color: 'red', marginTop: -20, marginBottom: 20}}>
                  {errors.password}
                </Text>
              )}

              {/* Button Login */}
              {loading ? (
                <ActivityIndicator />
              ) : (
                <CustomButton label={'Login'} onPress={handleSubmit} />
              )}
              <Text
                style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
                Or, login with ...
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}>
                  <Image style={{height: 24, width: 24}} source={google} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}>
                  <Image style={{height: 24, width: 24}} source={facebook} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}>
                  <Image style={{height: 24, width: 24}} source={twitter} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
                }}>
                <Text>New to the app?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#03dfc0', fontWeight: '700'}}>
                    {' '}
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}
