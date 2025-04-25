import { useRef, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// Function to handle creating a new user
async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  // Switch between login and signup forms
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  // Handle form submission
  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // On successful login, redirect to the profile page
        router.replace('/profile');
      } else {
        console.error(result.error);
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log('User created!', result);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <section className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-200"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
