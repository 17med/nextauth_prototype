import Button from "@/components/logoutbutton";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* --- Navigation Bar --- */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <div className="text-xl font-bold tracking-tight text-blue-600">
            Brand.io
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden space-x-6 md:flex">
              <a
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                Dashboard
              </a>
              <a
                href="/profile"
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                Settings
              </a>
            </div>
            <Button />
          </div>
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-500">
            Here is what's happening with your account today.
          </p>
        </div>

        {/* --- Stats/Cards Grid --- */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Activity
            </h3>
            <p className="mt-2 text-2xl font-bold text-green-600">Active</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Storage
            </h3>
            <p className="mt-2 text-2xl font-bold">1.2 GB / 5 GB</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Security
            </h3>
            <p className="mt-2 text-2xl font-bold text-blue-600">Protected</p>
          </div>
        </div>

        {/* --- Overview Section --- */}
        <section className="mt-10 rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Dashboard Overview</h2>
          <p className="leading-relaxed text-gray-600">
            This is your central hub. From here, you can manage your settings,
            view recent login activity, and adjust your notification
            preferences. Use the navigation links above to dive deeper into
            specific modules.
          </p>
        </section>
      </main>
    </div>
  );
}
