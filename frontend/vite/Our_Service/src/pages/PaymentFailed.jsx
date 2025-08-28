const PaymentFailed = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600">❌ Payment Failed</h2>
          <p className="text-gray-600">Something went wrong. Please try again.</p>
          <a href="/dashboard" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  };
  
  export default PaymentFailed;
  