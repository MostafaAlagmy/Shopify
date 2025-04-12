import ShowFilter from '@/components/shop-view/filter'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from '@/config';
import { ArrowUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails,deleteProductDetails } from '@/store/shop/productSlice';
import ShoppingProductTile from '@/components/shop-view/product-tile';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shop-view/product-details';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

const Listing = ({setdisplayCheck,displayCheck}) => {
  const { toast } = useToast();

  let dispatch=useDispatch()
  let {user}=JSON.parse(localStorage.getItem('auth'))
  const {pathname}=useLocation()


  let {productsList,productDetails}=useSelector((state)=>state.shopProducts)
  const { cartItems } = useSelector((state) => state.cartSlice);


  let[filters,setFilters]=useState({})
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);





 
  



 
  

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filter:filters,sort:sort})).then(()=>{
      
    })
  },[dispatch,filters,sort])

  useEffect(()=>{
    if(filters && Object.keys(filters).length>0){
    
      setSearchParams(new URLSearchParams({...filters}))
    }

  },[filters])

  

 




  function handleGetProductDetails(getCurrentProductId){
    
    dispatch(fetchProductDetails(getCurrentProductId));    

  }


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



  function handleFilter (section,option){
   
    
    let cpyFilter={...filters}
    let currentSectionId=Object.keys(cpyFilter).indexOf(section)
    if(currentSectionId==-1){
      cpyFilter={
        ...filters,
        [section]:[option]
      }
    }else{
      let currentOPtionId=cpyFilter[section].indexOf(option)
      if(currentOPtionId==-1){
        cpyFilter[section].push(option)

      }else{
        cpyFilter[section].splice(currentOPtionId,1)
      }
    }

    setFilters(cpyFilter)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));



  }
  function handleSort(value) {
    setSort(value);
  
    
  }
 
  useEffect(()=>{
    const filterFromUrl = {};
    setSort("price-lowtohigh");

    if(searchParams.get('category')==null && searchParams.get('brand')==null){
    
     
      setFilters(JSON.parse( sessionStorage.getItem('filters')))

    }else{
    
    

    // استخدام forEach للمرور على كل الفلاتر في الـ URL
    searchParams.forEach((value, key) => {
      // إذا كانت القيمة تحتوي على فواصل، نحولها إلى مصفوفة
      if (value.includes(',')) {
        filterFromUrl[key] = value.split(','); // تحويل القيمة إلى مصفوفة
      } else {
        filterFromUrl[key] = [value]; // إذا كانت القيمة ليست مفصولة بفواصل، نتركها كما هي
      }
    });

      setFilters(filterFromUrl)
      
  }

  filters &&  sessionStorage.setItem("filters", JSON.stringify(filters));

  
  },[searchParams.get('category'),searchParams.get('filters')])

 



  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);

    console.log('it is true ');
    
  }, [productDetails]);

  useEffect(() => {
    console.log("Location changed:", pathname);
    return () => {
      console.log("Cleaning up...");
      dispatch(deleteProductDetails());
      setOpenDetailsDialog(false);
    };
  }, [pathname]);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (openDetailsDialog) {
        event.preventDefault(); // منع السلوك الافتراضي
        dispatch(deleteProductDetails())

        setOpenDetailsDialog(false); // إغلاق الـ Dialog
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
    <div className=" grid grid-cols-1 bg-aqua flex-1 md:grid-cols-[200px_1fr] h-auto gap-6 p-4 md:p-6">
      <ShowFilter handleFilter={handleFilter} displayCheck={displayCheck} setdisplayCheck={setdisplayCheck} filters={filters} />
    <div className="bg-background  w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold">All Products</h2>
        <div  className="flex items-center gap-3">
        <span className="text-muted-foreground">
              {productsList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          

        </div>

      </div>
      <div  className="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  p-4">
      {productsList && productsList.length > 0
            ? productsList.map((productItem) => (
                <ShoppingProductTile

                key={productItem.id}
                  
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                 
                />
              ))
            : null}


      </div>


    </div>
    <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddtoCart={handleAddtoCart}

      />
     



    </div>
  )
}

export default Listing