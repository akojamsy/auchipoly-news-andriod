import React, { useEffect, useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useSigninMutation } from '../redux/services/auth/authApi';
import { setToken } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function SigninScreen() {
  const [signin, { isLoading }] = useSigninMutation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [deviceId, setDeviceId] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await signin({ ...values, deviceId:"68jhh-jaia-879h-iuho" }).unwrap();
        if(res.status === "success"){
          // await AsyncStorage.setItem('token', res.token);
          dispatch(setToken(res.data.token));
          navigation.navigate('Home');
        }
        // Navigate to another screen upon successful signin
      } catch (error) {
        setError(error?.data)
        console.error('Signin failed:', error);
      }
    },
  });

  useEffect(()=>{
    setError('')
  },[formik.errors.password, formik.errors.email])

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            placeholder="Email"
            autoCapitalize="none"
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.error}>{formik.errors.email}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            placeholder="Password"
            secureTextEntry
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.error}>{formik.errors.password}</Text>
          )}
          {error && <Text className="text-red-600 mb-2">{error?.message}</Text>}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={formik.handleSubmit}
            disabled={!formik.isValid || isLoading}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row items-center">
            <Text>Don't Have an account? </Text>
            <Button title='Sign up'/> 
          </View>
          <Button title='News' onPress={()=>navigation.navigate('Home')}/>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
