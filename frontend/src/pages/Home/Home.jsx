import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosClient from "@/util/axios";
import toast from "react-hot-toast";
import Shimmer from "@/components/Shimmer/Shimmer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const queryClient = useQueryClient();

  const fetchBlocks = async () => {
    const response = await axiosClient.get("/block");
    setfilteredBlocks(response.data.data);
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlocks, setfilteredBlocks] = useState([]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (blocks) {
        setfilteredBlocks(
          blocks.filter((block) =>
            block.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 1000);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen px-24 py-12">
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
      <div className="flex flex-col align-center justify-center w-full">
        <div className="container mx-auto p-4 max-w-4xl">
          <center className="self-center text-5xl my-8 font-bold text-black dark:text-gray-100">
            <b>Search Flutter Blocks</b>
          </center>
          <center>
            <input
              type="text"
              placeholder={"Search Blocks"}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="mb-4 p-5 flex w-full focus:outline-none bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 "
            />
          </center>
        </div>

        {filteredBlocks.length != 0 ? (
          filteredBlocks.map((block) => (
            <div
              key={block._id}
              className="p-8 border border-gray-200 shadow-lg rounded-lg dark:border-gray-700 m-8"
            >
              <div className="flex justify-between">
                <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
                  {block.name}
                </h1>
                <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
                  <Link to={`/block/${block._id}`}>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      variant="solid"
                    >
                      Edit Live With Zapp
                    </Button>
                  </Link>

                  <br />
                </h1>
              </div>
              <div className="grid md:grid-cols-3 items-center justify-center gap-4 md:gap-8 ">
                <div className="flex items-center justify-center p-6 md:col-span-2">
                  <div className="block m-5 h-[600px]">
                    <div className="relative max-w-2xl h-[600px] overflow-scroll mx-auto">
                      <div className="bg-gray-900 text-white p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400"></span>
                          <button
                            className="code bg-gray-700 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
                            onClick={() => handleCopy(block.code)}
                          >
                            Copy
                          </button>
                        </div>
        <div className="w-full h-full overflow-hidden">
          <pre id="code" className="text-gray-300  w-full h-full overflow-y-scroll pr-17 box-content">
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
                  <div className="my-5 relative mx-auto border-gray-700 dark:border-gray-700 bg-gray-700 border-[14px] rounded-[2.5rem] h-[600px] w-[340px] shadow-xl">
                    <div className="w-[148px] h-[18px] bg-gray-700 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
                    <div className="h-[46px] w-[3px] bg-gray-700 absolute -start-[17px] top-[124px] rounded-s-lg" />
                    <div className="h-[46px] w-[3px] bg-gray-700 absolute -start-[17px] top-[178px] rounded-s-lg" />
                    <div className="h-[64px] w-[3px] bg-gray-700 absolute -end-[17px] top-[142px] rounded-e-lg" />
                    <div className="rounded-[2rem] overflow-hidden w-[312px] h-[572px] bg-white dark:bg-gray-700">
                      <iframe
                        src={block.link}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: 0,
                          overflow: "hidden",
                        }}
                      />
                    </div>
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
