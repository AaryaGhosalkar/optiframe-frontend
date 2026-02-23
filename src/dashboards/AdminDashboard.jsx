function AdminDashboard({
  products,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  orders,
}) {
  const handleStockChange = (id, value) => {
    const stock = Number.isNaN(Number(value)) ? 0 : Number(value);
    onUpdateStock?.(id, stock);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Orchestrate catalogue, inventory, and orders from a single unified
          console. This view mirrors how a production AR eyewear platform would
          be managed.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-[1.1fr,0.9fr] lg:grid-cols-[1.1fr,0.9fr] items-start">
        {/* Manage products */}
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">Manage Products</h3>
            <button
              type="button"
              onClick={() =>
                onCreateProduct?.({
                  name: 'New OptiFrame',
                  price: 2499,
                  description: 'Custom frame created from admin console.',
                  image:
                    'https://images.pexels.com/photos/159837/glasses-specs-vision-eye-glasses-159837.jpeg?auto=compress&cs=tinysrgb&w=800',
                  tag: 'New',
                  stock: 10,
                })
              }
              className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              + Quick add
            </button>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-slate-100 line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <span className="text-emerald-300 font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <label className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                      Stock
                      <input
                        type="number"
                        min="0"
                        className="w-14 rounded-lg border border-slate-700 bg-slate-950 px-1.5 py-1 text-[11px] text-slate-100 focus:border-emerald-500 focus:outline-none"
                        value={product.stock}
                        onChange={(e) =>
                          handleStockChange(product.id, e.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateProduct?.(product.id, {
                        name: product.name + ' • Updated',
                      })
                    }
                    className="rounded-full border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct?.(product.id)}
                    className="rounded-full border border-red-900/70 bg-red-950/30 px-2 py-1 text-[11px] text-red-300 hover:bg-red-900/60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D models & inventory summary */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
            <h3 className="text-sm font-semibold text-white mb-2">
              Upload 3D Models
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              In a production pipeline, 3D assets would be uploaded and mapped
              to individual SKUs. This demo simulates the UX without requiring
              backend services.
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-dashed border-slate-700 bg-slate-950/60 px-4 py-2 text-slate-200 hover:border-emerald-500 hover:text-emerald-200"
              >
                Select &quot;.glb&quot; or &quot;.usd&quot; model
              </button>
              <p className="text-[11px] text-slate-500">
                Drag &amp; drop is supported in the full implementation.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
            <h3 className="text-sm font-semibold text-white mb-3">Orders</h3>
            <p className="text-xs text-slate-300 mb-3">
              High-level view of how OptiFrame is performing across all
              channels.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">Total orders</p>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  {orders.length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">Open</p>
                <p className="mt-1 text-lg font-semibold text-amber-300">
                  {orders.filter((o) => o.status !== 'Delivered').length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                <p className="text-[11px] text-slate-400">Delivered</p>
                <p className="mt-1 text-lg font-semibold text-emerald-400">
                  {orders.filter((o) => o.status === 'Delivered').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

