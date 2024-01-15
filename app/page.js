"use client";
import Link from "next/link";
import React, { useState } from "react";
const Page = () => {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/fileupload", {
        method: "POST",
        body: data,
      });
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-content">
      <title>File Upload</title>
      <div className="block justify-between page-header md:flex">
        <div>
          <h3 className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-white text-2xl font-medium">
            Upload a File to Azure Blob Storage
          </h3>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <div className="box">
          <div className="box-body">
            <form onSubmit={handleSubmit}>
              <div className="flex-1">
                <label>Upload File</label>
                <input
                  type="file"
                  name="file"
                  className="form-input mt-1 block w-full"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </div>
              <br />
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Upload
                </button>{" "}
                &nbsp;
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
