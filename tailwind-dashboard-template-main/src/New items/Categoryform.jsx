import React, { useState } from "react";
import axios from "axios";

const Categoryform = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const cloud_name = "dy23i7wvr"; // your Cloudinary cloud name
  const preset_key = "sinanniyasss"; // your unsigned preset

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formDataCloud)
      .then((res) => setFormData((prev) => ({ ...prev, image: res.data.secure_url })))
      .catch((err) => console.error(err));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://ecommerce-dcx1.onrender.com/api/categories", formData)
      .then((res) => {
        alert("Category created successfully!");
        setFormData({ name: "", description: "", image: "" }); // reset form
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">📂 Create Category</h2>
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
          Create Category
        </button>
      </form>
    </div>
  );
};

export default Categoryform;
