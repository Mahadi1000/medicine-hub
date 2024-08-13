"use client"
import { IconBadge } from '@/components/icon-badge';
import { ICategory } from '@/model/category.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CategorySidebar = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("/api/categories");
          setCategories(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch categories", error);
        }
      };

      fetchCategories();
    }, []);
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="">
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeCategory === category._id
                ? " bg-slate-200 text-gray-900"
                : "text-slate-500"
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <IconBadge icon={category.icon} />
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar