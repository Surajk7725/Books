// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // This effect will run when the app loads or refreshes
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           // Fetch user data based on the token stored in localStorage
//           const response = await axios.get('http://localhost:5000/api/auth/me', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data.user);
//           setRole(response.data.role);
//         } catch (error) {
//           console.error('Failed to authenticate token', error);
//           localStorage.removeItem('token'); 
//         }
//       }
//       setLoading(false); 
//     };

//     fetchUserData();
//   }, []);

//   const login = async (formData) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', formData);
//       const { token, role, user } = response.data;

//       localStorage.setItem('token', token);
//       setUser(user);
//       setRole(role);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, role, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isFetched, setIsFetched] = useState(false);  // New state to track data fetching

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setRole(response.data.role);
        } catch (error) {
          console.error('Failed to authenticate token', error);
          localStorage.removeItem('token');  // Remove invalid token if any error
        }
      }
      setIsFetched(true);  // Mark as fetched regardless of token presence
    };

    fetchUserData();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, role, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);
      setRole(role);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isFetched }}>
      {children}
    </AuthContext.Provider>
  );
}

