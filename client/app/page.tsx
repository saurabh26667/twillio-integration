'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/recordings');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="max-w-[800px] mx-auto mt-10 pb-20">
      <h1 className="text-center text-2xl font-bold mb-5">Call Recordings</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border text-blue-500" role="status">
          <div className="lds-dual-ring"></div>
          </div>
        </div>
      ) : (
        <>
        <div>
            {currentItems.map((item: any, index) => (
              <div className="mt-5 flex items-center justify-center" key={item?.callSid}>
                <span className="mr-20">{index + 1}</span>
                <audio controls className="w-[65%]">
                  <source src={item?.mediaUrl} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={handlePreviousPage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
