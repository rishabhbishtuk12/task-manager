import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import BrandBlock from "../components/brand/BrandBlock";

const initialForm = {
  name: "",
  email: "",
  password: "",
  adminInviteToken: "",
};

function AuthPage() {
  const { authError, isAuthLoading, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (mode === "login") {
      await login({
        email: form.email,
        password: form.password,
      });
      return;
    }

    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      adminInviteToken: form.adminInviteToken,
    });
  };

  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-[1fr_0.95fr]">
      <section className="flex items-center justify-center bg-white px-5 py-10">
        <div className="w-full max-w-md">
          <BrandBlock />
          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              {mode === "login" ? "Welcome back" : "Create account"}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {mode === "login"
                ? "Login to your workspace"
                : "Start managing tasks"}
            </h1>
          </div>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <Field label="Full Name">
                <input
                  className="h-11 w-full rounded-lg border border-slate-100 px-3 text-sm outline-none focus:border-blue-600"
                  value={form.name}
                  onChange={event => updateField("name", event.target.value)}
                  placeholder="John Doe"
                  required
                />
              </Field>
            )}

            <Field label="Email">
              <input
                className="h-11 w-full rounded-lg border border-slate-100 px-3 text-sm outline-none focus:border-blue-600"
                type="email"
                value={form.email}
                onChange={event => updateField("email", event.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>

            <Field label="Password">
              <input
                className="h-11 w-full rounded-lg border border-slate-100 px-3 text-sm outline-none focus:border-blue-600"
                type="password"
                value={form.password}
                onChange={event => updateField("password", event.target.value)}
                placeholder="Minimum 8 characters"
                required
              />
            </Field>

            {mode === "register" && (
              <Field label="Admin Invite Token">
                <input
                  className="h-11 w-full rounded-lg border border-slate-100 px-3 text-sm outline-none focus:border-blue-600"
                  value={form.adminInviteToken}
                  onChange={event =>
                    updateField("adminInviteToken", event.target.value)
                  }
                  placeholder="Optional"
                />
              </Field>
            )}

            {authError && (
              <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-red-600">
                {authError}
              </p>
            )}

            <button
              className="h-11 w-full rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm font-bold text-white disabled:opacity-60"
              disabled={isAuthLoading}
              type="submit"
            >
              {isAuthLoading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>

          <button
            className="mt-5 text-sm font-medium text-slate-600 cursor-pointer"
            type="button"
            onClick={() =>
              setMode(current => (current === "login" ? "register" : "login"))
            }
          >
            {mode === "login" ? (
              <p>
                Need an account?{" "}
                <span className="cursor-pointer hover:text-blue-600 hover:underline">
                  Register
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span className="cursor-pointer hover:text-blue-600 hover:underline">
                  Login
                </span>
              </p>
            )}
          </button>
        </div>
      </section>

      <section className="hidden items-center justify-center bg-blue-600 p-10 text-white lg:flex">
        <div className="max-w-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">
            Task Manager
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight">
            Take Control of Your Time and Productivity.
          </h2>
          <div className="mt-10 grid gap-4">
            {[
              "Prioritization & Time Management",
              "Real-time Tracking & Progress Updates",
              "Seamless Collaboration & Team Alignment",
            ].map(item => (
              <div
                key={item}
                className="rounded-lg bg-white/12 p-4 text-lg font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export default AuthPage;
