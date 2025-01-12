import ProductDetailsDialog from "@/components/shop-view/product-details";
import ShoppingProductTile from "@/components/shop-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { deleteProductDetails, fetchProductDetails } from "@/store/shop/productSlice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";



function Searsh() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);

  let {user}=JSON.parse(localStorage.getItem('auth'))

  const { cartItems } = useSelector((state) => state.cartSlice);
  const { toast } = useToast();
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 0) {
      console.log('ssaxz');
      
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword)).then(data=>{
          console.log(data,'dadadadada');
          
        });
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) console.log(productDetails,'pppppppppprrrrrrrrrr');
    
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  

  useEffect(()=>{
    return ()=>{
      dispatch(deleteProductDetails())
      setOpenDetailsDialog(false)

    }
   },[])

  useEffect(() => {
     const handleBackButton = (event) => {
       if (openDetailsDialog) {
         event.preventDefault(); // منع السلوك الافتراضي
         setOpenDetailsDialog(false); // إغلاق الـ Dialog
         dispatch(deleteProductDetails())
         window.history.pushState(null, "", window.location.href); // إعادة حالة التاريخ
       }
     };
   
     if (openDetailsDialog) {
       window.history.pushState({ dialogOpen: true }, ""); // إضافة حالة للـ Dialog
       window.addEventListener("popstate", handleBackButton);
     }
   
     return () => {
       window.removeEventListener("popstate", handleBackButton);
     };
   }, [openDetailsDialog]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddtoCart={handleAddtoCart}

      />
    </div>
  );
}

export default Searsh;
