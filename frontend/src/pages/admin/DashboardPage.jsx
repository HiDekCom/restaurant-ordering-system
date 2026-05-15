export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-2">
            120
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-2">
            15,000 ฿
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Active Tables
          </h2>

          <p className="text-4xl font-bold mt-2">
            8
          </p>
        </div>
      </div>
    </div>
  );
}