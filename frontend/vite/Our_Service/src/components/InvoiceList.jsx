import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerInvoices,
  fetchProviderInvoices,
  fetchAllInvoices,
} from "../redux/Slices/invoiceSlice";

const InvoiceList = () => {
  const dispatch = useDispatch();

  // Get current user
  const user = useSelector((state) => state.user?.user || null);

  // Get invoices state
  const { invoices = [], loading = false, error = null } = useSelector(
    (state) => state.invoices || {}
  );

  // Fetch invoices based on role
  useEffect(() => {
    if (!user?.role) return;

    switch (user.role) {
      case "customer":
        dispatch(fetchCustomerInvoices());
        break;
      case "provider":
        dispatch(fetchProviderInvoices());
        break;
      case "admin":
        dispatch(fetchAllInvoices());
        break;
      default:
        break;
    }
  }, [dispatch, user?.role]);

  // Debug log
  useEffect(() => {
    console.log("User:", user);
    console.log("Invoices:", invoices);
  }, [user, invoices]);

  return (
    <div>
      <h2>Invoices</h2>

      {loading ? (
        <p>Loading invoices...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice._id || invoice.id}>
              <strong>{invoice.service?.name || "Unnamed Service"}</strong> — ${invoice.amount}
              <br />
              Status: {invoice.status || "Pending"} | Date:{" "}
              {invoice.createdAt
                ? new Date(invoice.createdAt).toLocaleDateString()
                : "N/A"}
              <br />
              <a
                href={`http://localhost:5000${invoice.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
