import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderPayments } from "../redux/Slices/paymentSlice";

const ProviderPayments = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchProviderPayments());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Earnings</h2>

      {loading ? (
        <p>Loading earnings...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : payments.length === 0 ? (
        <p>No earnings yet.</p>
      ) : (
        <ul className="divide-y">
          {payments.map((payment) => (
            <li key={payment._id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Customer:</strong> {payment.customer?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">${payment.amount}</p>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs ${
                      payment.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProviderPayments;
