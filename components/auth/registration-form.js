import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function RegistrationForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsSubmitting(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    setIsSubmitting(false);

    if (response.ok) {
      setMessage("✅ Account created successfully! You can now log in.");
      setTimeout(() => {
        router.push("/auth"); // Redirect to login page after successful registration
      }, 2000);
    } else {
      setMessage(data.message || "⚠️ Something went wrong.");
    }
  }

  return (
    <section className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back, Login to Have Access
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
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/auth">
      Login here
    </Link>
        </p>
      </div>
      {message && (
        <p className="text-sm text-center text-green-600 mt-2">{message}</p>
      )}
    </section>
  );
}

export default RegistrationForm;
