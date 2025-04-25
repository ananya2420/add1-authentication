//import ProfileForm from './profile-form';
import { getSession } from 'next-auth/react';
import ProfileForm from './profile-form';

function UserProfile() {
  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your User Profile
      </h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default UserProfile;