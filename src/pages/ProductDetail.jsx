import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { fetchProductById } from '../api/client.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchProductById(id);
        if (!mounted) return;
        setProduct({ ...data, primaryImage: data.image });
      } catch (err) {
        console.error(err);
        if (mounted) setError('Product not found');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 pt-4 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img) => (
            <div
              key={img}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={img}
                alt={product.name}
                className="h-16 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {product.brand}
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h1>
          <p className="text-xs text-slate-500">
            {product.frameType} • {product.gender} • {product.size}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold text-slate-900">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>

        <p className="text-xs leading-relaxed text-slate-600">
          {product.description}
        </p>

        <dl className="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] text-slate-600">
          <div>
            <dt className="text-slate-500">Frame type</dt>
            <dd className="font-medium text-slate-900">{product.frameType}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Color</dt>
            <dd className="font-medium text-slate-900">{product.color}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Size</dt>
            <dd className="font-medium text-slate-900">{product.size}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Gender</dt>
            <dd className="font-medium text-slate-900">{product.gender}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 sm:flex-none sm:px-5"
          >
            Add to Bag
          </button>
          <button
            type="button"
            onClick={() =>
              navigate('/try-on', { state: { productId: product.id } })
            }
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 sm:flex-none sm:px-5"
          >
            Try-On
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;

