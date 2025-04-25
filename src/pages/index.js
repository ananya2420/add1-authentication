import ForgotPasswordForm from "../../components/auth/forget-password";
import RegistrationForm from "../../components/auth/registration-form";

export default function Home() {
  return (
   
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
     <RegistrationForm />
     <ForgotPasswordForm />
      
    
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Next Auth</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome On Board
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Start exploring your Next.js + Tailwind CSS app with clean layout and responsive design.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Your Project. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
