import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Editform = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    mrp: "",
    discount: "",
    description: "",
    image: "",
    status: "active",
  });

  const [categories, setCategories] = useState([]); // store categories

  const cloud_name = "dy23i7wvr"; 
  const preset_key = "sinanniyasss"; 

  // Fetch existing product
  useEffect(() => {
    axios
      .get(`https://ecommerce-dcx1.onrender.com/api/products/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          category: res.data.category || "",
          quantity: res.data.quantity || "",
          price: res.data.price || "",
          mrp: res.data.mrp || "",
          discount: res.data.discount || "",
          description: res.data.description || "",
          image: res.data.image || "",
          status: res.data.status || "active",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get("https://ecommerce-dcx1.onrender.com/api/categories") // adjust to your category route
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formDataCloud)
      .then((res) => setFormData((prev) => ({ ...prev, image: res.data.secure_url })))
      .catch((err) => console.error(err));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://ecommerce-dcx1.onrender.com/api/products/${id}`, formData)
      .then((res) => {
        console.log("Updated product:", res.data);
        navigate("/grocery");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">✏️ Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            placeholder="MRP"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount"
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          {formData.image && (
            <img src={formData.image} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-md border" />
          )}
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Editform;
