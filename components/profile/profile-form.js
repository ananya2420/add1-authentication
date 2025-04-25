import { useRef } from "react";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className="max-w-md mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md space-y-6" onSubmit={submitHandler}>
      <div>
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          id="new-password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={newPasswordRef}
        />
      </div>

      <div>
        <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">
          Old Password
        </label>
        <input
          type="password"
          id="old-password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={oldPasswordRef}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Change Password
        </button>
      </div>
    </form>
  );
}

// ✅ Make sure it's exported correctly
export default ProfileForm;
