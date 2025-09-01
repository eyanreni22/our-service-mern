import { useEffect } from "react";
import { useSelector } from "react-redux";
import App from "./App";
import { connectSocket } from "./sockets/socket";

const RootComponent = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?._id && user?.token) {
      console.log("🔌 Connecting socket with token:", user.token);
      connectSocket(user.token); // ✅ Connect only when token exists
    }
  }, [user?._id, user?.token]);

  return <App />;
};

export default RootComponent;
