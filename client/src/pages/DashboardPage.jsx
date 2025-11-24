// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { fetchVendorProducts, fetchVendorSales } from "../api"; // adjust path if needed

export default function DashboardPage({ user }) {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        console.log("--- DEBUG: Starting Dashboard Data Fetch ---");

        // Fetch Vendor Products
        const productsData = await fetchVendorProducts();
        setProducts(productsData.data);
        console.log(`--- DEBUG: Products Received: ${productsData.data.length}`);

        // Fetch Vendor Sales
        const salesData = await fetchVendorSales();
        setSales(salesData.data);
        console.log(`--- DEBUG: Sales Received: ${salesData.data.length}`);

        setError(null);
      } catch (err) {
        console.error("!!! FETCH ERROR !!!", err.response || err);
        setError("Failed to load dashboard data. Check Console/Network.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]); // re-run when user changes

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <h2>Sales</h2>
      <ul>
        {sales.map((s) => (
          <li key={s.id}>{s.amount}</li>
        ))}
      </ul>
    </div>
  );
}