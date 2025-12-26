"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "./product.module.css";

export default function Page() {
  const params = useParams();
  const slug = params.slug;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      const res = await axios.get("https://dummyjson.com/products");
      const product = res.data.products.find(
        (item: any) => item.id === Number(slug)
      );
      setData(product);
    }

    fetchData();
  }, [slug]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.title}</h1>

      <img
        src={data.thumbnail}
        alt={data.title}
        className={styles.image}
      />

      <p className={styles.description}>{data.description}</p>

      <p className={styles.price}>₹ {data.price}</p>
    </div>
  );
}
