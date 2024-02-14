import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosClient from "@/util/axios";
import toast from "react-hot-toast";

const Home = () => {
  const queryClient = useQueryClient();

  const fetchBlocks = async () => {
    const response = await axiosClient.get("/block");
    return response.data.data;
  };

  const {
    data: blocks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: fetchBlocks,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (id) => {
      return axiosClient.delete(`/block/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch queries related to the updated data
      toast.success("Deleted Successfully!");
      queryClient.invalidateQueries("blocks");
    },
  });

  const handleCopy = async (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied Successfully!");
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete ?");
    if (isConfirmed) {
      mutateAsync(id);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full max-w-3xl sm:pt-8 p-4 pt-6 sm:px-0 flex justify-center">
          Loading
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col align-center justify-center w-full">
        {blocks.length != 0 ? (
          blocks.map((block) => (
            <div className="grid md:grid-cols-3 items-center justify-center gap-4 p-4 md:gap-8 border border-gray-200 shadow-lg rounded-lg dark:border-gray-800 m-8">
              <div className="flex items-center justify-center p-6 md:col-span-2">
                <div key={block._id} className="block m-5 h-[600px]">
                  <h1 className="font-bold text-3xl text-gray-900">
                    {block.name} <br />
                  </h1>
                  <div className="relative max-w-2xl h-[500px] overflow-scroll mx-auto mt-8">
                    <div className="bg-gray-900 text-white p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400"></span>
                        <button
                          className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
                          onClick={() => handleCopy(block.code)}
                        >
                          Copy
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <pre id="code" className="text-gray-300">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    className="text-red-700"
                    onClick={() => handleDelete(block._id)}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
              <div className="flex items-center justify-center p-6 md:col-span-1">
                <div className="my-5 relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[340px] shadow-xl">
                  <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
                  <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
                  <div className="rounded-[2rem] overflow-hidden w-[312px] h-[572px] bg-white dark:bg-gray-800">
                    <iframe
                      src="https://za34060pa350.zapp.page/#/"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        overflow: "hidden",
                      }}
                      c
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full max-w-3xl sm:pt-8 p-4 pt-6 sm:px-0 flex justify-center">
            No Blocks Found
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
