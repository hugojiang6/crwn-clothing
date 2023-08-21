import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // 清空輸入資料
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  // ======================== 帳號密碼登入 ========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      const { user } = response;
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log('user creation enconutered an error:' + error);
    }
  };

  // ======================== 監聽input ========================
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(event)
    setFormFields({
      ...formFields,
      // 中括號無法理解
      [name]: value,
    });
  };

  // ======================== html ========================
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          htmlFor='displayName'
          inputOptions={{
            type: 'text',
            id: 'displayName',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName,
          }}
        />

        <FormInput
          label='Email'
          htmlFor='email'
          inputOptions={{
            type: 'email',
            id: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />

        <FormInput
          label='Password'
          htmlFor='password'
          inputOptions={{
            type: 'password',
            id: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
            autoComplete: 'on',
          }}
        />

        <FormInput
          label='Confirm Password'
          htmlFor='confirmPassword'
          inputOptions={{
            type: 'password',
            id: 'confirmPassword',
            required: true,
            onChange: handleChange,
            name: 'confirmPassword',
            value: confirmPassword,
            autoComplete: 'on',
          }}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
