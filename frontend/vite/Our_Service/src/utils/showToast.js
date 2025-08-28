import { toast } from "react-toastify";

export const showToastSuccess = (msg) => toast.success(msg);
export const showToastError = (msg) => toast.error(msg);
