import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://ecommerce-dcx1.onrender.com/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status and set delivery to true when delivered
  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);

    const orderId = orders[index]._id;

    try {
      await axios.put(`https://ecommerce-dcx1.onrender.com/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-center">Date</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-6 text-left font-medium">
                    {index + 1}
                  </td>

                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center gap-2">
                      <span>
                        {order.customer.firstName} {order.customer.lastName}
                      </span>
                      {order.customer.deliver && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          ✔ Delivered
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-6 text-left">
                    {order.customer.phone || "N/A"}
                  </td>

                  <td className="py-3 px-6 text-left whitespace-pre-line">
                    <div>{order.customer.address1}</div>
                    {order.customer.address2 && (
                      <div>{order.customer.address2}</div>
                    )}
                    <div>
                      {order.customer.city}, {order.customer.state}
                    </div>
                    <div>
                      {order.customer.country} - {order.customer.postcode}
                    </div>
                  </td>

                  <td className="py-3 px-6 text-left font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  {/* Status dropdown with color */}
                  <td className="py-3 px-6 text-left">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className={`border rounded px-2 py-1 text-sm focus:outline-none cursor-pointer transition-all duration-300 ${
                        order.status === "Pending"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      <option value="Pending" className="bg-white text-black">
                        Pending
                      </option>
                      <option value="Delivered" className="bg-white text-black">
                        Delivered
                      </option>
                    </select>
                  </td>

                  <td className="py-3 px-6 text-left">
                    {order.products.map((p) => (
                      <div
                        key={p.productId?._id || p._id}
                        className="mb-1 border-b border-gray-100 pb-1"
                      >
                        {p.name} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-6 text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
