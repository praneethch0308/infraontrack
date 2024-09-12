import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
    <div>
    <img src="assets.jpg" className="h-36 w-36 rounded-full animate-pulse"/>
    {/* <CircularProgress size={60} /> */}
    </div>
  </div>
);

export default LoadingSpinner;

