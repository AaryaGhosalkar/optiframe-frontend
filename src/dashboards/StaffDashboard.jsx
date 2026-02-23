function StaffDashboard({ orders, onUpdateOrderStatus }) {
  const updateStatus = (id, status) => {
    onUpdateOrderStatus?.(id, status);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Staff Dashboard
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Prioritise fulfilment, update order statuses, and keep customers
          informed—all from one streamlined console.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr] items-start">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70 space-y-3 max-h-[360px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Orders queue</h3>
            <span className="text-[11px] text-slate-400">
              {orders.length} orders
            </span>
          </div>
          {orders.length === 0 && (
            <p className="text-xs text-slate-400">
              No orders yet. Once customers checkout, they&apos;ll appear here
              for processing.
            </p>
          )}
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-xs space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-100">
                    Order #{order.id.slice(0, 6).toUpperCase()}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {order.items.length} items · ₹
                    {order.total.toLocaleString('en-IN')}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option>Processing</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Out for delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] text-slate-400">
                  Customer:{' '}
                  <span className="font-mono text-slate-200">
                    {order.customerEmail}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500">
                  Placed at {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
            <h3 className="text-sm font-semibold text-white mb-2">
              Customer Support
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              Log call notes, track escalations, and resolve delivery issues
              quickly. This panel mirrors how support teams work alongside fulfilment.
            </p>
            <textarea
              rows={4}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
              placeholder="Type a quick note about a customer interaction..."
            />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-700"
              >
                Save note
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
            <h3 className="text-sm font-semibold text-white mb-2">
              Service metrics
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">Avg. handle time</p>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  4.2 min
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">SLA compliance</p>
                <p className="mt-1 text-lg font-semibold text-emerald-400">
                  98%
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">CSAT</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  4.8 / 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaffDashboard;

