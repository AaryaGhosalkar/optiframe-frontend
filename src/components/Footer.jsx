function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-0 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">OptiFrame</h3>
          <p className="text-xs text-slate-500">
            An AR-first eyewear destination. Explore frames, try them virtually,
            and checkout with confidence—anytime, anywhere.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 text-xs text-slate-600 sm:grid-cols-3">
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold tracking-wide text-slate-900">
              SHOP
            </h4>
            <ul className="space-y-1">
              <li>Eyeglasses</li>
              <li>Sunglasses</li>
              <li>Computer Glasses</li>
              <li>AR Try-On</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold tracking-wide text-slate-900">
              SUPPORT
            </h4>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Order Tracking</li>
              <li>Returns &amp; Refunds</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold tracking-wide text-slate-900">
              CONNECT
            </h4>
            <ul className="space-y-1">
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Twitter / X</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-[11px] text-slate-500 sm:px-6 lg:px-0 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OptiFrame. All rights reserved.</p>
          <p className="text-slate-400">
            Built for demo purposes · No real transactions.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

