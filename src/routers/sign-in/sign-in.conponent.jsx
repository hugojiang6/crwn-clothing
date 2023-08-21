import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../component/sign-up-form/sign-up-form.component';
import Button from '../../component/button/button.component';

const SignIn = () => {
  // ======================== google登入 ========================
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // ======================== html ========================
  return (
    <div>
      <h1>Sign In</h1>

      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
