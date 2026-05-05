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
    <main className="grid min-h-screen bg-[#f5f7fb] p-4 lg:grid-cols-[1fr_0.95fr]">
      <section className="flex items-center justify-center rounded-lg bg-white px-5 py-10">
        <div className="w-full max-w-md">
          <BrandBlock />
          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#246bfe]">
              {mode === "login" ? "Welcome back" : "Create account"}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-[#111827]">
              {mode === "login" ? "Login to your workspace" : "Start managing tasks"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Connect to the Express backend with your email and password.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <Field label="Full Name">
                <input
                  className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
                  value={form.name}
                  onChange={event => updateField("name", event.target.value)}
                  placeholder="Alex Morgan"
                  required
                />
              </Field>
            )}

            <Field label="Email">
              <input
                className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
                type="email"
                value={form.email}
                onChange={event => updateField("email", event.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>

            <Field label="Password">
              <input
                className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
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
                  className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
                  value={form.adminInviteToken}
                  onChange={event => updateField("adminInviteToken", event.target.value)}
                  placeholder="Optional"
                />
              </Field>
            )}

            {authError && (
              <p className="rounded-lg bg-[#fff7e8] px-3 py-2 text-sm font-semibold text-[#b77900]">
                {authError}
              </p>
            )}

            <button
              className="h-11 w-full rounded-lg bg-[#246bfe] text-sm font-bold text-white disabled:opacity-60"
              disabled={isAuthLoading}
              type="submit"
            >
              {isAuthLoading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <button
            className="mt-5 text-sm font-bold text-[#246bfe]"
            type="button"
            onClick={() => setMode(current => (current === "login" ? "register" : "login"))}
          >
            {mode === "login"
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </section>

      <section className="hidden items-center justify-center rounded-lg bg-[#246bfe] p-10 text-white lg:flex">
        <div className="max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            Task Manager
          </p>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight">
            Your dashboard now talks to the real backend.
          </h2>
          <div className="mt-10 grid gap-4">
            {["JWT auth", "MongoDB tasks", "Admin team data"].map(item => (
              <div key={item} className="rounded-lg bg-white/12 p-4 text-lg font-bold">
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
      <span className="mb-2 block text-sm font-bold text-[#344054]">{label}</span>
      {children}
    </label>
  );
}

export default AuthPage;
