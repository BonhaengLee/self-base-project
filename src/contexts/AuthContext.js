import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, firestore } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function updateDisplayName(name) {
    if (auth.currentUser) {
      return auth.currentUser
        .updateProfile({
          displayName: name,
          // photoURL: url,
        })
        .then(
          function (response) {
            console.log('Updated', response);
          },
          function (error) {
            console.log(error);
          },
        );
    }
  }

  function addUserToDB() {
    const u = auth.currentUser;
    return firestore.collection("users").doc().set({
      email: u.email,
      uid: u.uid,
      name: u.displayName,
      // photoURL: u.photoURL, // 프로필 이미지
    });
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(email, password) {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
    addUserToDB,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
