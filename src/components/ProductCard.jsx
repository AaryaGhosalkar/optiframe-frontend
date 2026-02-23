import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-contain mb-4"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-500 mb-2">{product.brand}</p>
      <p className="font-bold mb-4">₹{product.price}</p>

      <div className="flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-black text-white py-2 rounded"
        >
          Add to Cart
        </button>

        <Link
          to={`/try-on/${product._id}`}
          className="flex-1 text-center border py-2 rounded"
        >
          Try-On
        </Link>
      </div>
    </div>
  );
}
