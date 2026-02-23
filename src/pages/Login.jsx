import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const credentials = {
  admin: { email: 'admin@optiframe.com', password: '1234' },
  staff: { email: 'staff@optiframe.com', password: '1234' },
  customer: { email: 'user@optiframe.com', password: '1234' },
};

const roleTitles = {
  admin: 'Admin',
  staff: 'Staff',
  customer: 'Customer',
};

function Login({ onLogin }) {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(credentials[role]?.email ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!role || !credentials[role]) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200 shadow-xl shadow-black/70">
        <p>Unknown role. Please choose a login type again.</p>
        <Link
          to="/login"
          className="mt-3 inline-flex text-xs text-emerald-400 hover:text-emerald-300"
        >
          Back to Login Selection
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const expected = credentials[role];

    if (email === expected.email && password === expected.password) {
      onLogin?.(role, email);
      if (role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else if (role === 'staff') {
        navigate('/dashboard/staff', { replace: true });
      } else if (role === 'customer') {
        navigate('/dashboard/customer', { replace: true });
      }
    } else {
      setError('Invalid email or password for this role.');
    }
  };

  return (
    <div className="max-w-md">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {roleTitles[role]} Login
        </h2>
        <p className="text-sm text-slate-300">
          Sign in with demo credentials to explore the{' '}
          {roleTitles[role].toLowerCase()} workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/70"
      >
        <div className="space-y-1.5 text-xs text-slate-300">
          <p className="font-medium text-slate-200">Demo credentials</p>
          <p>
            Email:{' '}
            <span className="font-mono text-emerald-300">
              {credentials[role].email}
            </span>
          </p>
          <p>
            Password:{' '}
            <span className="font-mono text-emerald-300">
              {credentials[role].password}
            </span>
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-200"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/30 border border-red-900/70 rounded-2xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition-colors"
        >
          Sign in as {roleTitles[role]}
        </button>

        <div className="pt-2 text-[11px] text-slate-400 flex justify-between">
          <span>Single-session demo · No real data</span>
          <Link
            to="/login"
            className="text-emerald-300 hover:text-emerald-200"
          >
            Switch role
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

