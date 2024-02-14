import axiosClient from "@/util/axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {loading ? <p>Loading...</p> : <ul>{data.message}</ul>}
    </div>
  );
}

export default Home;
