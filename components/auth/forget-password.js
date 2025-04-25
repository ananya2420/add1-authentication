import { useRef, useState } from "react";

function ForgotPasswordForm({ setResetLink }) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const [message, setMessage] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredUsername = usernameRef.current.value;

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        username: enteredUsername,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Password reset link sent! Check your email.");
      if (setResetLink && data.resetLink) {
        setResetLink(data.resetLink);
      }
    } else {
      setMessage(data.message || "⚠️ Something went wrong.");
    }
  }

  return (
    <section className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Forgot Password
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
            ref={emailRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
        {message && (
          <p className="text-sm text-center text-green-600 mt-2">{message}</p>
        )}
      </form>
    </section>
  );
}

export default ForgotPasswordForm;