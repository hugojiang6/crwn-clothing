// react library
import { useState } from 'react';
// utils
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
// component
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// style
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // useState
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // 監聽input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // 清空欄位
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // 註冊帳號密碼
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      // 建立帳號密碼
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // 寫入firestore
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log('user creation enconutered an error:' + error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          htmlFor='sign-up-displayName'
          type='text'
          id='sign-up-displayName'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          htmlFor='sign-up-email'
          type='email'
          id='sign-up-email'
          required
          onChange={handleChange}
          name='email'
          value={email}
          autoComplete='on'
        />

        <FormInput
          label='Password'
          htmlFor='sign-up-password'
          type='password'
          id='sign-up-password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          autoComplete='on'
        />

        <FormInput
          label='Confirm Password'
          htmlFor='sign-up-confirmPassword'
          type='password'
          id='sign-up-confirmPassword'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
          autoComplete='on'
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
