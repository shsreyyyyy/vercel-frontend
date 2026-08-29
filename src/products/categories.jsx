import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate=useNavigate();
  const categories = [
      { id: "Electronics", name: "Electronics" },
    { id: "Fashion", name: "Fashion" },
    { id: "Home & Kitchen", name: "Home & Kitchen" },
    { id: "Books", name: "Books" },
    { id: "Beauty", name: "Beauty" },
    { id: "Sports", name: "Sports" },
    { id: "Toys" , name: "Toys" },
    { id: "Mobiles", name: "Mobiles" },
  ];

  return (
    <div className="bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div key={category.id} 
          onClick={()=>navigate(`/categories/${category.id}`)}
            className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-center">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;