import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "@/util/axios";
import { Button } from "@/components/ui/button";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    code: yup.string().required("Code block is required"),
    link: yup.string().url("Invalid URL format").required("Link is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postExample = async (data) => {
    return axiosClient.post("/block/", data);
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data) => {
      postExample(data);
    },
    onSuccess: (data) => {
      navigate("/");
      toast.success("Data Added Successfully!");
    },
    onError: (error) => {
      setShowError(error.response.data.error);
      setIsLoading(false);
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    mutateAsync(data);
  };

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-900 dark:text-white">
              Create Block
            </h1>
          </div>
          <div className="mt-5">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("name")}
                    />
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                    {errors.name?.message}
                  </p>
                </div>
                {/* End Form Group */}

                {/* Code Block Group */}
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Code Block
                  </label>
                  <div className="relative">
                    <textarea
                      id="code"
                      name="code"
                      rows="4" // Adjust the number of rows as needed
                      className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("code")}
                    />
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                    {errors.code?.message}
                  </p>
                </div>
                {/* End Code Block Group */}

                {/* Link Input Group */}
                <div>
                  <label
                    htmlFor="link"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Link
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="link"
                      name="link"
                      className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("link")}
                    />
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                    {errors.link?.message}
                  </p>
                </div>
                {/* End Link Input Group */}

                <Button
                  type="submit"
                  value={isLoading ? "Loading.." : "Submit"}
                  disabled={isLoading}
                >
                  Create Block
                </Button>
                {showError && (
                  <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                    {showError}
                  </p>
                )}
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;
