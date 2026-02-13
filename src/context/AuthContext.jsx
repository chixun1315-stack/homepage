import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9ALe72mrOmcK1GsURrDAzHyQAAhOlCVs",
    authDomain: "homelogin-4fbc4.firebaseapp.com",
    projectId: "homelogin-4fbc4",
    storageBucket: "homelogin-4fbc4.firebasestorage.app",
    messagingSenderId: "90780522936",
    appId: "1:90780522936:web:8f06fb535f0abe71b1574d",
    measurementId: "G-67YPRYTEPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email, password) => {
        try {
            setError(null);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName
            });
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName
            });
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const loginWithGoogle = () => {
        // Mock Google Login result
        const mockUser = {
            name: '홍길동',
            email: 'hong@example.com',
            picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            isAdmin: true
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
    };

    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('user');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            loginWithGoogle, 
            login,
            signup,
            logout, 
            loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};
