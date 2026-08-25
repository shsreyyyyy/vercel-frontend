import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/orderContext";

const Orders = () => {
  const {
    getOrders,
    orders,
    loading,
    cancelOrder
  } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmCancel) {
      cancelOrder(orderId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="text-sm text-gray-500">
            View all your purchased products
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="rounded-lg bg-white py-12 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              No Orders Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (

          /* Orders Table */
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                {/* Table Header */}
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Name
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {orders.map((order) =>
                    order.items?.map((item, index) => (
                      <tr
                        key={`${order._id}-${item.productId || index}`}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >

                        {/* Product Image */}
                        <td className="px-5 py-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 rounded-md object-cover"
                          />
                        </td>

                        {/* Product Name */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4 text-gray-700">
                          ₹{item.price?.toLocaleString("en-IN")}
                        </td>

                        {/* Quantity */}
                        <td className="px-5 py-4 text-gray-700">
                          {item.quantity}
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                            {item.category || "N/A"}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-5 py-4 font-semibold text-gray-800">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${order.orderStatus === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : order.orderStatus === "shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.orderStatus === "processing"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {order.orderStatus || "placed"}
                          </span>
                        </td>

                        {/* Action */}
                      <td className="px-5 py-4">
  {["placed", "processing"].includes(
    order.orderStatus?.toLowerCase()
  ) ? (
    <button
      type="button"
      onClick={() => handleCancelOrder(order._id)}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
    >
      Cancel
    </button>
  ) : (
    <span className="text-sm text-gray-400">—</span>
  )}
</td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;