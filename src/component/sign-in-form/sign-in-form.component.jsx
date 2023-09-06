// react library
import { useState } from 'react';
// component
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// utils
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
// style
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

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

  // Google登入
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      alert(error.code);
    }
  };
  // EMAIL登入
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

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          htmlFor='sign-in-email'
          type='email'
          id='sign-in-email'
          required
          onChange={handleChange}
          name='email'
          value={email}
          autoComplete='on'
        />

        <FormInput
          label='Password'
          htmlFor='sign-in-password'
          type='password'
          id='sign-in-password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          autoComplete='on'
        />

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>
            Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
