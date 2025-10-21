import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const cloud_name = "dy23i7wvr"; // your Cloudinary cloud name
  const preset_key = "sinanniyasss"; // your unsigned preset

  // Fetch category details
  useEffect(() => {
    axios
      .get(`https://ecommerce-dcx1.onrender.com/api/categories/${id}`)
      .then((res) => setFormData({
        name: res.data.name || "",
        description: res.data.description || "",
        image: res.data.image || "",
      }))
      .catch((err) => console.error("Error fetching category:", err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
      .then((res) => setFormData((prev) => ({ ...prev, image: res.data.secure_url })))
      .catch((err) => console.error("Image upload error:", err));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://ecommerce-dcx1.onrender.com/api/categories/${id}`, formData)
      .then((res) => {
        console.log("Updated category:", res.data);
        navigate("/category"); // go back to category list
      })
      .catch((err) => console.error("Error updating category:", err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">✏️ Edit Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
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
            <img
              src={formData.image}
              alt="preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
