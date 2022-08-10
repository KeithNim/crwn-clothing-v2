import { signInWithGooglePopup } from "../../utils/firebase/firebase-auth";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase-firestore";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(res.user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
