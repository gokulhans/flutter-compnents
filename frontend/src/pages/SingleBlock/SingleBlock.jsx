import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/util/axios";
import { useParams } from "react-router-dom";
import Shimmer from "@/components/Shimmer/Shimmer";

const SingleBlock = () => {
  const { id } = useParams();

  const fetchExample = async () => {
    const response = await axiosClient.get(`/block/${id}`);
    return response.data.data;
  };

  const {
    data: block,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["block", id],
    queryFn: fetchExample,
  });

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen px-12  mt-2">
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="px-12 h-screen w-full">
        <div className="h-screen w-full  mt-2 rounded-xl overflow-hidden">
          <iframe
            src={`https://zapp.run/edit/flutter-${block.link
              .split("https://")[1]
              .split(".zapp")[0]
              .replace("#", "")}?theme=dark&lazy=false&split=50`}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              overflow: "hidden",
            }}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default SingleBlock;
