import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get("https://ecommerce-dcx1.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`https://ecommerce-dcx1.onrender.com/api/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Category Name</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((c, index) => (
            <tr key={index} className="text-center">
              <td className="border px-2 py-1">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-12 h-12 object-cover mx-auto rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border px-2 py-1">{c.name}</td>
              <td className="border px-2 py-1">{c.description}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/editcategory/${c._id}`)}
                >
                  <MdModeEditOutline />
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(c._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;
