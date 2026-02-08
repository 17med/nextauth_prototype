import { auth } from "@/lib/auth";
import LoginButton from "@/components/loginbutton";
import LogoutButton from "@/components/logoutbutton";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
        {!session ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500">
              Please sign in to access your account.
            </p>
            <LoginButton />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <span className="text-xl font-bold">
                {session.user?.name?.[0]}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {session.user?.name}!
            </h1>
            <p className="text-gray-500 italic">{session.user?.email}</p>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
