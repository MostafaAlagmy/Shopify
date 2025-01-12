import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`relative  rounded-full border-0  transition-all duration-200 transform hover:scale-110 
            ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} 
            hover:${star <= rating ? 'text-yellow-400' : 'text-yellow-500'} 
            focus:outline-none focus:ring-2 focus:ring-yellow-500`} 
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          aria-label={`Rate ${star} stars`}
        >
          <StarIcon
            className={`w-8 h-8 transition-all duration-300 ${star <= rating ? 'fill-yellow-500' : 'fill-transparent'}`}
          />
          {/* Tooltip for star rating */}
          <span
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 bg-white p-1 rounded-md shadow-md opacity-0 transition-opacity duration-200"
            style={{ display: star <= rating ? 'none' : 'block' }}
          >
            {star} Stars
          </span>
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
