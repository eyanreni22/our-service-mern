import { Provider } from "react-redux";
import store from "./redux/Store";
import AppRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </Provider>
  );
};

export default App;
