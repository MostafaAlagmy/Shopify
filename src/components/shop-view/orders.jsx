import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  let {user}=JSON.parse(localStorage.getItem('auth'))
  const { orderList, orderDetails } = useSelector((state) => state.shopingOrderSlice);
 let   confirmedOpders=orderList.filter((item)=> item.paymentStatus !=='pending')


  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);
  
  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
      window.history.pushState({ dialogOpen: true }, ""); // إضافة حالة في سجل المتصفح
    }
  }, [orderDetails]);
  
  useEffect(() => {
    const handleBackButton = (event) => {
      if (openDetailsDialog) {
        event.preventDefault(); // منع الرجوع للصفحة السابقة
        setOpenDetailsDialog(false); // إغلاق الـ Dialog
        dispatch(resetOrderDetails());
        window.history.pushState(null, "", window.location.href); // إعادة حالة التاريخ
      }
    };
  
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [openDetailsDialog]);
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
      <Table className="w-full table-auto">
  <TableHeader>
    <TableRow>
      <TableHead>Order ID</TableHead>
      <TableHead className="min-w-max whitespace-nowrap">Order Date</TableHead>
      <TableHead className="whitespace-nowrap">Order Status</TableHead>
      <TableHead className="whitespace-nowrap">Order Price</TableHead>
      <TableHead>
        <span className="sr-only">Details</span>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orderList && orderList.length > 0
      ? confirmedOpders.map((orderItem) => (
          <TableRow key={orderItem?._id}>
            <TableCell className="whitespace-nowrap">{orderItem?._id}</TableCell>
            <TableCell className="min-w-max whitespace-nowrap">
              {orderItem?.orderDate.split("T")[0]}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <Badge
                className={`py-1 px-3 ${
                  orderItem?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderItem?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderItem?.orderStatus}
              </Badge>
            </TableCell>
            <TableCell className="whitespace-nowrap">${orderItem?.totalAmount}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                  View Details
                </Button>
                <ShoppingOrderDetailsView orderDetails={orderDetails} />
              </Dialog>
            </TableCell>
          </TableRow>
        ))
      : null}
  </TableBody>
</Table>

      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
