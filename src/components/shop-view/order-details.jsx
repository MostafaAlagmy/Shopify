import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {


  
    let {user}=JSON.parse(localStorage.getItem('auth'))

  return (
    <DialogContent className="sm:max-w-[600px] h-[100vh] overflow-auto custom-scroll lg:h-auto">
  <div className="grid gap-6 px-4 sm:px-0">
    {/* Order Information Section */}
    <div className="grid gap-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
        <p className="font-medium">Order ID</p>
        <Label className="sm:text-right">{orderDetails?._id}</Label>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <p className="font-medium">Order Date</p>
        <Label className="sm:text-right">{orderDetails?.orderDate.split("T")[0]}</Label>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <p className="font-medium">Order Price</p>
        <Label className="sm:text-right">${orderDetails?.totalAmount}</Label>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <p className="font-medium">Payment Method</p>
        <Label className="sm:text-right">{orderDetails?.paymentMethod}</Label>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <p className="font-medium">Payment Status</p>
        <Label className="sm:text-right">{orderDetails?.paymentStatus}</Label>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <p className="font-medium">Order Status</p>
        <Label className="sm:text-right">
          <Badge
            className={`py-1 px-3 rounded ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-600"
                : "bg-black"
            }`}
          >
            {orderDetails?.orderStatus}
          </Badge>
        </Label>
      </div>
    </div>
    <Separator />

    {/* Order Details Section */}
    <div className="grid gap-4 mt-6">
      <div className="font-medium">Order Details</div>
      <ul className="grid gap-3">
        {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
          ? orderDetails?.cartItems.map((item, index) => (
              <li key={index} className="flex flex-col w-full overflow-auto  sm:flex-row items-start sm:items-center justify-between gap-2">
                <span  className="text-sm font-semibold  whitespace-nowrap">Title: {item.title}</span>
                <span className="text-sm font-semibold ">Quantity: {item.quantity}</span>
                <span className="text-sm font-semibold ">Price: ${item.price}</span>
              </li>
            ))
          : null}
      </ul>
    </div>

    <Separator />

    {/* Shipping Info Section */}
    <div className="grid gap-4 mt-6">
      <div className="font-medium">Shipping Info</div>
      <div className="grid gap-0.5 text-muted-foreground">
        <span className="text-sm">{user.userName}</span>
        <span className="text-sm">{orderDetails?.addressInfo?.address}</span>
        <span className="text-sm">{orderDetails?.addressInfo?.city}</span>
        <span className="text-sm">{orderDetails?.addressInfo?.pincode}</span>
        <span className="text-sm">{orderDetails?.addressInfo?.phone}</span>
        <span className="text-sm">{orderDetails?.addressInfo?.notes}</span>
      </div>
    </div>
  </div>
</DialogContent>

  );
}

export default ShoppingOrderDetailsView;
