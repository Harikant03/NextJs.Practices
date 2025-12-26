"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./client.module.css";
import SearchBox from "@/app/components/SearchBox"; // ✅ IMPORT

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>

      {/* 🔍 SEARCH BOX */}
      <div style={{ marginBottom: "20px" }}>
        <SearchBox />
      </div>

      {/* 📦 PRODUCT LIST */}
      {products.map((item) => (
        <div key={item.id} className={styles.product}>
          <span>{item.title}</span>

          <Link
            href={`/client/${item.id}`}
            className={styles.button}
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}
