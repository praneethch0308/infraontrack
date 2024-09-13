import { CircularProgress } from "@mui/material";
import './Loading.css'
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 opacity-65 z-50">
    <div>
    {/* <img src="assets.jpg" className="h-36 w-36 rounded-full animate-pulse"/> */}
    {/* <CircularProgress size={60} /> */}
    <div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>
    </div>
  </div>
);

export default LoadingSpinner;

