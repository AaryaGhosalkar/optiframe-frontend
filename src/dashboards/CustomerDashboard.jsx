import Products from '../pages/Products.jsx';

const tabs = ['products', 'cart', 'orders'];

function CustomerDashboard({
  user,
  products,
  cart,
  orders,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}) {
  const activeOrders = orders.filter(
    (o) => o.customerEmail === user?.email,
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Welcome back, {user?.email?.split('@')[0] || 'Customer'}
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Continue exploring frames, manage your cart, and track your deliveries
          from a unified customer space.
        </p>
      </header>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl shadow-black/70">
        <nav className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-4 text-xs font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                const el = document.getElementById(`customer-${tab}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-slate-200 hover:border-emerald-500 hover:text-emerald-200 transition-colors"
            >
              {tab === 'products'
                ? 'Products'
                : tab === 'cart'
                ? 'Cart'
                : 'Orders'}
            </button>
          ))}
        </nav>

        {/* Products tab */}
        <div id="customer-products" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">
              Products for you
            </h3>
            <p className="text-[11px] text-slate-400">
              Cart items: {cart.length}
            </p>
          </div>
          <Products products={products} onAddToCart={onAddToCart} />
        </div>

        {/* Cart tab */}
        <div id="customer-cart" className="space-y-3 pt-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">Cart</h3>
            <p className="text-[11px] text-slate-400">
              {cart.length === 0
                ? 'Your cart is empty'
                : `${cart.length} unique item(s)`}
            </p>
          </div>
          <div className="space-y-2">
            {cart.length === 0 && (
              <p className="text-xs text-slate-400">
                Add a frame from the products section above to get started.
              </p>
            )}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Qty {item.quantity} · ₹
                      {(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFromCart?.(item.id)}
                  className="rounded-full border border-red-900/70 bg-red-950/30 px-3 py-1 text-[11px] text-red-300 hover:bg-red-900/60"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 mt-2">
              <div className="text-xs text-slate-300">
                <p>
                  Subtotal:{' '}
                  <span className="font-semibold text-emerald-300">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500">
                  Taxes &amp; shipping calculated at checkout in a live system.
                </p>
              </div>
              <button
                type="button"
                onClick={onCheckout}
                className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* Orders tab */}
        <div id="customer-orders" className="space-y-3 pt-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">
              Order history
            </h3>
            <p className="text-[11px] text-slate-400">
              {activeOrders.length} order(s)
            </p>
          </div>
          <div className="space-y-2">
            {activeOrders.length === 0 && (
              <p className="text-xs text-slate-400">
                You haven&apos;t placed any orders yet. Checkout your cart to
                create your first order.
              </p>
            )}
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-100">
                    Order #{order.id.slice(0, 6).toUpperCase()}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[10px] text-emerald-300 border border-slate-700">
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {order.items.length} items · ₹
                  {order.total.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-slate-500">
                  Placed on{' '}
                  {new Date(order.createdAt).toLocaleDateString()}{' '}
                  at {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;

