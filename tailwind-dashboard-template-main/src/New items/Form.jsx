import React, { useState, useEffect } from "react";
import axios from "axios";

const GroceryForm = () => {
  const cloud_name = "dy23i7wvr"; // your Cloudinary cloud name
  const preset_key = "sinanniyasss"; // your unsigned preset

  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]); // for storing categories
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    mrp: "",
    discount: "",
    description: "",
    status: "active",
  });

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories") // adjust this route to your backend
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.error("Image upload error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please wait for the image to finish uploading.");
      return;
    }

    axios
      .post("http://localhost:5000/api/products", { ...formData, image })
      .then((res) => {
        alert("✅ Grocery item created successfully!");
        console.log(res.data);
        setFormData({
          name: "",
          category: "",
          quantity: "",
          price: "",
          mrp: "",
          discount: "",
          description: "",
          status: "active",
        });
        setImage("");
      })
      .catch((err) => {
        console.error("Error creating product:", err);
        alert("❌ Error creating product");
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🛒 Add Grocery Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="w-full border rounded-md p-2"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2"
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
          required
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Selling Price"
          required
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          name="mrp"
          value={formData.mrp}
          onChange={handleChange}
          placeholder="MRP"
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="w-full border rounded-md p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-md p-2"
        ></textarea>

        <input type="file" onChange={handleImageUpload} className="w-full border rounded-md p-2" />

        {image && <img src={image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-md border" />}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default GroceryForm;
