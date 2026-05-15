export default function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow text-center w-[400px]">
        <h1 className="text-3xl font-bold mb-5">
          Order Status
        </h1>

        <div className="text-yellow-500 text-6xl mb-5">
          🍳
        </div>

        <p className="text-xl font-semibold">
          Your food is cooking...
        </p>

        <p className="text-gray-500 mt-3">
          Please wait a moment
        </p>
      </div>
    </div>
  );
}