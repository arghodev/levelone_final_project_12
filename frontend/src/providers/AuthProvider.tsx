/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type FC,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import app from "../firebase/Firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const provider = new GoogleAuthProvider();

// 1. Define the context type
interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  googleSignIn: () => Promise<any>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

// 2. Create the context with default value `null`
export const AuthContext = createContext<AuthContextType | null>(null);

// 3. Get Firebase Auth instance
const auth = getAuth(app);

// 4. Props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// 5. The AuthProvider component
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name: string, photo: string) => {
    if (!auth.currentUser) return Promise.reject("No current user");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            const token = res.data.token;
            // console.log(token);
            localStorage.setItem("access-token", token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
