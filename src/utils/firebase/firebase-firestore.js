import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  //if not exists, create user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};
