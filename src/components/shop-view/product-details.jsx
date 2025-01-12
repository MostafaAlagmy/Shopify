import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview ,getReviews} from "@/store/shop/review-slice";
import { useToast } from '@/hooks/use-toast';
import { deleteProductDetails } from "@/store/shop/productSlice";
import { useNavigate } from "react-router-dom";


function ProductDetailsDialog({ open, setOpen, productDetails, handleAddtoCart }) {

  let navigate=useNavigate()
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  let {user}=JSON.parse(localStorage.getItem('auth'))

  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }
 



  function handleDialogClose() {
    setOpen(false);
   
    setRating(0);
    setReviewMsg("");
    dispatch(deleteProductDetails())
  }

  function handleAddReview() {
    console.log( productDetails?._id,user?.id, user?.userName,reviewMsg,rating);
    
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      console.log(data);
      
      if (data.payload.success) {
        console.log(data);
        
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id)).then(data=>{
  
      
    });
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
    <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-gray-50 shadow-lg rounded-lg overflow-auto h-[90vh] lg:h-auto lg:max-h-[90vh]  lg:custom-scrollbar  border border-gray-200">
      {/* قسم الصور */}
      <div className="p-4 bg-gray-100">
        <div className="relative w-full rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full h-auto rounded-md "
          />
        </div>
        {/* معرض الصور الصغيرة */}
        <div className="flex gap-2 mt-4">
          {productDetails?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded-md border cursor-pointer"
            />
          ))}
        </div>
      </div>
  
      {/* قسم التفاصيل */}
      <div className="p-6 bg-white">
        <h1 className="text-2xl font-semibold text-gray-900">{productDetails?.title}</h1>
        <div className="flex lg:items-center lg:flex-row   flex-col   gap-2 mt-2">
            <div className="flex items-center  gap-2 ">
            <StarRatingComponent rating={averageReview} />

            </div>
         
          <span className="text-gray-600 text-sm">
            ({averageReview.toFixed(2)}) | {reviews?.length} Reviews
          </span>
        </div>
        <p className="mt-4 text-gray-700 text-base leading-relaxed">
          {productDetails?.description}
        </p>
  
        {/* الأسعار */}
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <p
              className={`text-3xl font-bold ${
                productDetails?.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-600">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {productDetails?.totalStock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>
        </div>
  
        {/* أزرار */}
        <div className="mt-6 flex gap-4">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            disabled={productDetails?.totalStock === 0}
            onClick={()=>{ handleAddtoCart(productDetails?._id, productDetails?.totalStock)}}
          >
            Add to Cart
          </Button>
          <Button onClick={ async()=>{
            await handleAddtoCart(productDetails?._id, productDetails?.totalStock)

            navigate('/shop/checkout')
          
          }

            
          


           
            } className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Buy Now
          </Button>
        </div>
  
        {/* المراجعات */}
        <Separator className="mt-6" />
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800">Customer Reviews</h2>
          <div className="mt-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <Avatar className="w-10 h-10 bg-gray-200 text-gray-700">
                    <AvatarFallback>
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {reviewItem?.userName}
                    </h3>
                  
                    <p className="text-gray-600 text-sm mt-0">
                      {reviewItem?.reviewMessage}
                    </p>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No reviews available.</p>
            )}
          </div>
          {/* إضافة مراجعة */}
          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-700">
              Write a Review
            </Label>
            <div className="flex gap-2 mt-2">
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Write a review..."
              className="mt-2 text-sm border-gray-300"
            />
            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ""}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  
  
  );
}

export default ProductDetailsDialog;
