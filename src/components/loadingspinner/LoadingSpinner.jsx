import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
    <CircularProgress size={60} />
  </div>
);

export default LoadingSpinner;
