// import React, { useState, useEffect } from 'react';

// const Spinner = () => {
//   const [loading, setLoading] = useState(true);

//   // Simulate product fetching with an async function
//   const fetchProducts = async () => {
//     try {
//       // Simulate a fetch call with a delay (replace this with an actual API call)
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       // Once the products are fetched, stop the loading spinner
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false); // Stop loading even on error
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); // Trigger the fetch operation on component mount
//   }, []);

//   if (!loading) {
//     return null; // Replace with your actual content once loading is done
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-white bg-opacity-80 backdrop-blur-xl">
//       <div className="relative w-16 h-16">
//         {/* Outer ring */}
//         <div className="absolute inset-0 border-4 border-dashed border-transparent border-t-[#041435] border-r-[#041435] rounded-full animate-spin-fast"></div>
//         {/* Middle ring */}
//         <div className="absolute inset-0 w-12 h-12 m-2 border-4 border-dashed border-transparent border-b-[#041435] border-l-[#041435] rounded-full animate-spin-slow"></div>
//         {/* Inner ring */}
//         <div className="absolute inset-0 w-8 h-8 m-4 border-4 border border-transparent border-t-[#041435] rounded-full animate-spin-reverse"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;
import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  // Simulate product fetching with an async function
  const fetchProducts = async () => {
    try {
      // Simulate a fetch call with a delay (replace this with an actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Once the products are fetched, stop the loading spinner
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Stop loading even on error
    }
  };

  useEffect(() => {
    fetchProducts(); // Trigger the fetch operation on component mount
  }, []);

  if (!loading) {
    return null; // Replace with your actual content once loading is done
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white bg-opacity-80 backdrop-blur-xl">
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-dashed border-transparent border-t-[#041435] border-r-[#041435] rounded-full animate-spin-fast"></div>
          {/* Middle ring */}
          <div className="absolute inset-0 w-12 h-12 m-2 border-4 border-dashed border-transparent border-b-[#041435] border-l-[#041435] rounded-full animate-spin-slow"></div>
          {/* Inner ring */}
          <div className="absolute inset-0 w-8 h-8 m-4 border-4 border border-transparent border-t-[#041435] rounded-full animate-spin-reverse"></div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-fast {
          animation: spin 1s linear infinite;
        }

        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Spinner;
