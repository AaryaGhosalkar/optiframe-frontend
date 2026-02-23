export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">
        Try Glasses Before You Buy
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        OptiFrame lets you try eyewear virtually using AR technology.
      </p>

      <a
        href="/products"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Shop Now
      </a>
    </div>
  );
}
