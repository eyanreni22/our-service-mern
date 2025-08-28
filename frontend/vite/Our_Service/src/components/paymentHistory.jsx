import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerPayments } from "../redux/Slices/paymentSlice";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { payments = [], loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchCustomerPayments());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {loading && <p>Loading payments...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {payments.length === 0 && !loading ? (
        <p>No payments found.</p>
      ) : (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id} className="p-2 border-b">
              Service: {payment.booking?.service || "Unknown"} | Amount: ${payment.amount} | Status: {payment.paymentStatus}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
