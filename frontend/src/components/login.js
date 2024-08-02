// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './authcontext';

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const navigate = useNavigate();

//   const validateEmail = () => {
//     if (!email) {
//       setEmailError("Email is required");
//       return false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Invalid email format");
//       return false;
//     } else {
//       setEmailError("");
//       return true;
//     }
//   };

//   const validatePassword = () => {
//     if (!password) {
//       setPasswordError("Password is required");
//       return false;
//     } else {
//       setPasswordError("");
//       return true;
//     }
//   };
  
//     const handleLogin = (e) => {
//       e.preventDefault();
//       if (validateEmail() && validatePassword()) {
//       console.log("Login successful");
//       login("dummyToken");
//       navigate("/home");
//     }
//     };

//   return (
//     <div class="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
//   <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
//     <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
//     <form>
//       <div class="mb-4">
//         <label class="block text-gray-700 font-bold mb-2" for="text">User Name
//         <span className="text-red-500">*</span>
//         </label>
//         <input
//           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="username"
//           type="text"
//           placeholder="Enter your username"
//         />
//       </div>
//       <div class="mb-6">
//         <label class="block text-gray-700 font-bold mb-2" for="password">Password
//         <span className="text-red-500">*</span>
//         </label>
//         <input
//           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//           id="password"
//           type="password"
//           placeholder="Enter your password"
//         />
//         <a
//           onClick={() => navigate('/forgot')}
//           class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer float-right"
//         >
//           Forgot Password?
//         </a>
//       </div>
//       <div class="flex items-center justify-center">
//         <button
//           class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="button" onClick={handleLogin}
//         >
//           Login
//         </button>
//       </div>
//       <span class="block mt-2 text-sm text-gray-600 text-center">Not Registered? <a onClick={() => navigate('/signup')} class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">Create an Account</a></span>
//     </form>
//   </div>
// </div>
//   )
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateUsername() && validatePassword()) {
      console.log("Login successful");
      login("dummyToken");
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">User Name
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-red-500 text-xs italic">{usernameError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password
              <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            <a
              onClick={() => navigate('/forgot')}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer float-right"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <span className="block mt-2 text-sm text-gray-600 text-center">Not Registered? <a onClick={() => navigate('/signup')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">Create an Account</a></span>
        </form>
      </div>
    </div>
  );
}

