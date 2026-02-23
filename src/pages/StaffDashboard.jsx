function StaffDashboard() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 pt-4 md:grid-cols-[0.9fr,2.1fr]">
      <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Staff</h2>
        <nav className="space-y-1">
          <button className="block w-full rounded-lg bg-slate-900 px-3 py-2 text-left text-xs font-medium text-white">
            Dashboard
          </button>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50">
            View Orders
          </button>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50">
            Update Status
          </button>
          <button className="block w-full rounded-lg px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50">
            Customer Support
          </button>
        </nav>
      </aside>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm">
        <h1 className="text-sm font-semibold text-slate-900">
          Staff dashboard
        </h1>
        <p>
          The staff view focuses on operational efficiency, showing order
          queues, status controls, and a lightweight customer support panel for
          quick interventions.
        </p>
      </section>
    </div>
  );
}

export default StaffDashboard;

