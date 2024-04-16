// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthUser(){
//     const navigate = useNavigate();

//     const getToken = () =>{
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken;
//     }

//     // const getUser = () =>{
//     //     const userString = sessionStorage.getItem('user');
//     //     const user_detail = JSON.parse(userString);
//     //     return user_detail;
//     // }

//     const getUser = () => {
//         const userString = sessionStorage.getItem('user');
//         if (userString) {
//             return JSON.parse(userString);
//         }
//         return null; // or handle the absence of user data in your application logic
//     }
    

//     const [token,setToken] = useState(getToken());
//     const [user,setUser] = useState(getUser());

//     // const saveToken = (user,token) =>{
//     //     sessionStorage.setItem('token',JSON.stringify(token));
//     //     sessionStorage.setItem('user',JSON.stringify(user));

//     //     setToken(token);
//     //     setUser(user);
//     //     navigate('/admin');
//     // }


//     const saveToken = (user, token) => {
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));
    
//         setToken(token);
//         setUser(user);
    
//         // Redirect based on userRole
//         if (user && user.userRole) {
//             switch (user.userRole) {
//                 case 'HeadAdmin':
//                     navigate('/headadmin');
//                     break;
//                 case 'SchoolAdmin':
//                     navigate('/admin');
//                     break;
//                 default:
//                     navigate('/login'); 
//                     break;
//             }
//         } else {
//             // Handle the case where user or userRole is missing
//             navigate('/home');
//         }
//     };
    

//     // const logout = () => {
//     //     sessionStorage.clear();
//     //     navigate('/login');
//     // }

//     const logout = () => {
//         sessionStorage.removeItem('token'); // Clear token
//         sessionStorage.removeItem('user'); // Clear user data
//         // Update state immediately
//         setToken(null);
//         setUser(null);
//         navigate('/login'); // Navigate to login page
//     }
    

//     const http = axios.create({
//         baseURL:"http://localhost:3005/",
//         headers:{
//             "Content-type" : "application/json",
//             "Authorization" : `Bearer ${token}`
//         }
//     });
//     return {
//         setToken:saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }




// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthUser() {
//     const navigate = useNavigate();

//     const getToken = () => {
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken;
//     }

//     const getUser = () => {
//         const userString = sessionStorage.getItem('user');
//         const user_detail = JSON.parse(userString);
//         return user_detail;
//     }

//     const [token, setToken] = useState(getToken());
//     const [user, setUser] = useState(getUser());

//     const saveToken = (user, token) => {
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));

//         setToken(token);
//         setUser(user);

//         // Redirect based on user role
//         switch (user.UserRoll) {
//             case 'HeadAdmin':
//                 navigate('/headadmin');
//                 break;
//             case 'SchoolAdmin':
//                 navigate('/admin');
//                 break;
//             case 'teacher':
//                 navigate('/teacher');
//                 break;
//             case 'student':
//                 navigate('/student');
//                 break;
//             default:
//                 // Redirect to a default page if the role is unknown or not specified
//                 navigate('/login');
//         }
//     }

//     const logout = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     }

//     const http = axios.create({
//         baseURL: "http://localhost:3005/",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     return {
//         setToken: saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }


// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthUser() {
//     const navigate = useNavigate();

//     const getToken = () => {
//         const tokenString = sessionStorage.getItem('token');
//         try {
//             if (tokenString) {
//                 const userToken = JSON.parse(tokenString);
//                 return userToken;
//             }
//         } catch (error) {
//             console.error("Error parsing token:", error);
//         }
//         return null;
//     }

//     const getUser = () => {
//         const userString = sessionStorage.getItem('user');
//         try {
//             if (userString) {
//                 const user_detail = JSON.parse(userString);
//                 return user_detail;
//             }
//         } catch (error) {
//             console.error("Error parsing user:", error);
//         }
//         return null;
//     }

//     const [token, setToken] = useState(getToken());
//     const [user, setUser] = useState(getUser());

//     const saveToken = (user, token) => {
//         try {
//             sessionStorage.setItem('token', JSON.stringify(token));
//             sessionStorage.setItem('user', JSON.stringify(user));
    
//             setToken(token);
//             setUser(user);
    
//             // Redirect based on user role
//             if (user && user.UserRoll) {
//                 switch (user.UserRoll) {
//                     case 'HeadAdmin':
//                         navigate('/headadmin');
//                         break;
//                     case 'SchoolAdmin':
//                         navigate('/admin');
//                         break;
//                     case 'teacher':
//                         navigate('/teacher');
//                         break;
//                     case 'student':
//                         navigate('/student');
//                         break;
//                     default:
//                         // Redirect to a default page if the role is unknown or not specified
//                         navigate('/login');
//                 }
//             } else {
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error("Error saving token:", error);
//         }
//     }

//     const logout = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     }

//     const http = axios.create({
//         baseURL: "http://localhost:3005/",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     return {
//         setToken: saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }


// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthUser = () => {
//     const navigate = useNavigate();
//     const [token, setToken] = useState(null);
//     const [user, setUser] = useState(null);

//     // Function to get token from session storage
//     const getToken = () => {
//         try {
//             const tokenString = sessionStorage.getItem('token');
//             return tokenString ? JSON.parse(tokenString) : null;
//         } catch (error) {
//             console.error('Error parsing token:', error);
//             return null;
//         }
//     };

//     // Function to get user from session storage
//     const getUser = () => {
//         try {
//             const userString = sessionStorage.getItem('user');
//             return userString ? JSON.parse(userString) : null;
//         } catch (error) {
//             console.error('Error parsing user:', error);
//             return null;
//         }
//     };

//     // Function to save token and user to session storage
//     const saveToken = (user, token) => {
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));
//         setToken(token);
//         setUser(user);
//         navigate('/headadmin');
//     };

//     // Function to clear session storage and logout
//     const logout = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     // Axios instance with dynamic authorization header
//     const http = axios.create({
//         baseURL: "http://localhost:3005/",
//         headers: {
//             "Content-type": "application/json",
//         }
//     });

//     // Axios interceptor to dynamically update authorization header
//     useEffect(() => {
//         const requestInterceptor = http.interceptors.request.use((config) => {
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         });

//         return () => {
//             http.interceptors.request.eject(requestInterceptor);
//         };
//     }, [token, http]);

//     // Initialize token and user on component mount
//     useEffect(() => {
//         const initialToken = getToken();
//         const initialUser = getUser();
//         setToken(initialToken);
//         setUser(initialUser);
//     }, []);

//     return {
//         setToken: saveToken,
//         token,
//         user,
//         http,
//         logout
//     };
// };

// export default AuthUser;



// import axios from 'axios';
// import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// export default function AuthUser(){
//     // const navigate = useNavigate();

//     const getToken = () =>{
//         const tokenString = sessionStorage.getItem('token');
//         if (tokenString) {
//             try {
//                 return JSON.parse(tokenString);
//             } catch (error) {
//                 console.error("Error parsing token:", error);
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     }

//     const getUser = () =>{
//         const userString = sessionStorage.getItem('user');
//         if (userString) {
//             try {
//                 return JSON.parse(userString);
//             } catch (error) {
//                 console.error("Error parsing user:", error);
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     }

//     const [token,setToken] = useState(getToken());
//     const [user,setUser] = useState(getUser());

//     const saveToken = (user, token) =>{
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));

//         setToken(token);
//         setUser(user);
//         // navigate('/headadmin');
//         window.location.href = '/headadmin';
//     }

//     const logout = () => {
//         sessionStorage.clear('token');
//         sessionStorage.clear('user');
//         // navigate('/login');
//         window.location.href = 'login';
//     }



//     const http = axios.create({
//         baseURL: "http://localhost:3005/",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     });
    
//     return {
//         setToken: saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }




// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode'; // Adjusted import statement
// // import { useNavigate } from 'react-router-dom';

// export default function AuthUser(){
//     // const navigate = useNavigate();

//     const getToken = () =>{
//         const tokenString = sessionStorage.getItem('token');
//         if (tokenString) {
//             try {
//                 return JSON.parse(tokenString);
//             } catch (error) {
//                 console.error("Error parsing token:", error);
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     }

//     const getUser = () =>{
//         const userString = sessionStorage.getItem('user');
//         if (userString) {
//             try {
//                 return JSON.parse(userString);
//             } catch (error) {
//                 console.error("Error parsing user:", error);
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     }

//     const [token,setToken] = useState(getToken());
//     const [user,setUser] = useState(getUser());

//     const saveToken = (user, token) =>{
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));

//         setToken(token);
//         setUser(user);
//         // navigate('/headadmin');
//         redirectToUserRole(user, token);
//     }

//     const redirectToUserRole = (user, token) => {
//         if (token) {
//             const decodedToken = jwtDecode(token);
            
//             const userRole = decodedToken.role; // Assuming role is included in the token payload
//             if (userRole === 'admin') {
//                 window.location.href = '/admin';
//             } else if (userRole === 'HeadAdmin') {
//                 window.location.href = '/headadmin';
//             } else {
//                 // Default redirect or error handling
//                 console.error('Invalid user role:', userRole);
//             }
//         } else {
//             console.error('No token found');
//         }
//     }

//     const logout = () => {
//         sessionStorage.clear('token');
//         sessionStorage.clear('user');
//         // navigate('/login');
//         window.location.href = 'login';
//     }

//     const http = axios.create({
//         baseURL: "http://localhost:3005/",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     useEffect(() => {
//         redirectToUserRole(user, token);
//     }, [user, token]);

//     return {
//         setToken: saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }




import axios from 'axios';

const http = axios.create({
  baseURL: 'http://103.239.171.133:5005',
});

class Auth {
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  static getUserRole() {
    return localStorage.getItem('userRole');
  }

  static getUserId() {
    return localStorage.getItem('userId');
  }

  static getSchoolIds() {
    return localStorage.getItem('schoolId');
  }

  static login(token, userRole, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userId', userId);
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
}

export { Auth, http };



// // for multiple schoolIds from backend

// import axios from 'axios';

// const http = axios.create({
//   baseURL: 'http://192.168.1.44:3005',
// });

// class Auth {
//   static isAuthenticated() {
//     const token = localStorage.getItem('token');
//     return token !== null;
//   }

//   static getUserRole() {
//     return localStorage.getItem('userRole');
//   }

//   static getUserId() {
//     return localStorage.getItem('userId');
//   }

//   static getSchoolIds() {
//     // Assuming you store school IDs as a comma-separated string in localStorage
//     const schoolIdsString = localStorage.getItem('schoolIds');
//     if (schoolIdsString) {
//       // Split the string and convert to array
//       return schoolIdsString.split(',');
//     }
//     return [];
//   }

//   static login(token, userRole, userId, schoolIds) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userRole', userRole);
//     localStorage.setItem('userId', userId);
//     localStorage.setItem('schoolIds', schoolIds.join(',')); // Convert array to comma-separated string
//   }

//   static logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('schoolIds');
//   }
// }

// export { Auth, http };

  

// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthUser(){
//     const navigate = useNavigate();

//     const getToken = () =>{
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken;
//     }

//     const getUser = () => {
//         const userString = sessionStorage.getItem('user');
//         if (userString) {
//             return JSON.parse(userString);
//         }
//         return null; // or handle the absence of user data in your application logic
//     }
    

//     const [token,setToken] = useState(getToken());
//     const [user,setUser] = useState(getUser());

//     const saveToken = (user, token) => {
//         sessionStorage.setItem('token', JSON.stringify(token));
//         sessionStorage.setItem('user', JSON.stringify(user));
    
//         setToken(token);
//         setUser(user);

//     };
    

//     const logout = () => {
//         sessionStorage.removeItem('token'); // Clear token
//         sessionStorage.removeItem('user'); // Clear user data
//         // Update state immediately
//         setToken(null);
//         setUser(null);
//         navigate('/login'); // Navigate to login page
//     }
    

//     const http = axios.create({
//         baseURL:"http://192.168.1.42:3005",
//         headers:{
//             "Content-type" : "application/json",
//             "Authorization" : `Bearer ${token}`
//         }
//     });
//     return {
//         setToken:saveToken,
//         token,
//         user,
//         getToken,
//         http,
//         logout
//     }
// }
