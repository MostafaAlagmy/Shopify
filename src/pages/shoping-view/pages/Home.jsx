import { Button } from "@/components/ui/button";

import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shop-view/product-tile";
import ProductDetailsDialog from "@/components/shop-view/product-details";
import { deleteProductDetails, fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/productSlice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function Home() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const { toast } = useToast();
    let {user}=JSON.parse(localStorage.getItem('auth'))

    


  
    const { featureImageList } = useSelector((state) => state.commonFeature);

    
    const[currentSlide,setcurrentSlide]=useState(
  0
  )
    let {productsList,productDetails}=useSelector((state)=>state.shopProducts)
      const { cartItems } = useSelector((state) => state.cartSlice);
    
    const dispatch=useDispatch()
    let navigate=useNavigate()


    useEffect(() => {
      dispatch(getFeatureImages());
    }, [dispatch]);
  
  
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  function handleGetProductDetails(getCurrentProductId){
     dispatch(fetchProductDetails(getCurrentProductId));    
    
 
   }
 
    useEffect(() => {
       if (productDetails !== null) setOpenDetailsDialog(true);
     }, [productDetails]);
 
   function handleAddtoCart (productId,getTotalStock){
     let getCardItems=cartItems.items || []
     
     if(getCardItems.length){
       const indexOfCurrentItem = getCardItems.findIndex(
         (item) => item.productId === productId
       );
       if(indexOfCurrentItem>-1){
         let quantityCurrentItem=getCardItems[indexOfCurrentItem].quantity
 
         if(quantityCurrentItem + 1 > getTotalStock){
           toast({
             title: `Only ${quantityCurrentItem} quantity can be added for this item`,
             variant: "destructive",
           });
   
           return;
         }
 
       }
     
     }
     dispatch(addToCart(
       {
         userId: user?.id,
         productId: productId,
         quantity: 1,
       }
     )).then(data=>{
       
       if (data.payload.success) {
        
         
         
         dispatch(fetchCartItems(user?.id));
         toast({
           title: "Product is added to cart",
         });
       
       }
 
 
       
       
     })
     
 
 
   }

   useEffect(()=>{
    return ()=>{
      dispatch(deleteProductDetails())
    }
   },[])
    useEffect(()=>{
       dispatch(fetchAllFilteredProducts({filter:{},sort:'price-lowtohigh'})).then(()=>{
         
       })
     },[dispatch])


  function handleNavigateToListingPage(brandItem,type){
    sessionStorage.removeItem('filters')
    let query= {
      [type]:[brandItem.id]
    }
  query=  new URLSearchParams(query)
    navigate(`/shop/listing?${type}=${brandItem.id}`)
   
    


  }

  useEffect(()=>{
    window.scrollTo(500,500)
  },[])

  return (
    <div  className="flex flex-col flex-1 min-h-screen">
      <div className="relative w-full  h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
      
                src={slide?.image}
                key={index}
                className={ ` ${index==currentSlide ?'opacity-1':'opacity-0'} absolute top-0 left-0 w-full h-full  object-cover  transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setcurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setcurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>{
                  sessionStorage.setItem('hide','category')
                  handleNavigateToListingPage(categoryItem, "category")


                }
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() =>{  sessionStorage.setItem('hide','brand')

                                handleNavigateToListingPage(brandItem, "brand")
                }
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsList && productsList.length > 0
              ? productsList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}

                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddtoCart={handleAddtoCart}

      />

    
    
     
     
    </div>
    
  );
}

export default Home;
