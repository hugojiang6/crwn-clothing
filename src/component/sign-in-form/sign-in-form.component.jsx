import { useState } from 'react';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // ======================== useState ========================
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // ======================== 監聽input ========================
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // ======================== 清空欄位 ========================
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // ======================== Google登入 ========================
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      alert(error.code);
    }
  };
  // ======================== EMAIL登入 ========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('密碼錯誤!');
          break;
        case 'auth/user-not-found':
          alert('帳號錯誤!');
          break;
        default:
          console.log(error.code);
      }
    }
  };

  // ======================== html ========================
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          htmlFor='sign-in-email'
          inputOptions={{
            type: 'email',
            id: 'sign-in-email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
            autoComplete: 'on',
          }}
        />

        <FormInput
          label='Password'
          htmlFor='sign-in-password'
          inputOptions={{
            type: 'password',
            id: 'sign-in-password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
            autoComplete: 'on',
          }}
        />

        <div className='buttons-container'>
          <Button
            buttonOptions={{
              type: 'submit',
            }}>
            Sign In
          </Button>
          <Button
            buttonType='google'
            buttonOptions={{
              type: 'button',
              onClick: signInWithGoogle,
            }}>
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
