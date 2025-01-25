import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPageContents } from "../services/index/pageContent";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { AnimatePresence } from "framer-motion";

const FoundersImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutUs = () => {
  const { data, isLoading,isError } = useQuery({
    queryKey: ["page-contents"],
    queryFn: getPageContents,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row md:h-[70vh]  border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
       <AnimatePresence>
         <motion.div
          variants={fadeIn("right", "", 0.3, 1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:w-1/2 h-[60vh] md:h-full"
        >
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height="100%"
              width="100%"
              className="rounded-lg"
            />
          ) : (
            <FoundersImage
              src={import.meta.env.VITE_CLOUD_URL + `${data?.[0]?.images[0]?.image}`}
   
              loading="lazy"
            />
          )}
        </motion.div>
       </AnimatePresence>

      {/* Description Section */}
<div className="md:w-1/2 h-1/2 md:h-full bg-gray-100 flex flex-col justify-center items-center px-6">
  {isLoading ? (
    <div className="w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index % 2 === 0 ? "80%" : "90%"}
          height={30}
          className="my-2"
        />
      ))}
    </div>
  ) : isError ? (
    <div className="text-red-500 text-lg text-center md:text-left">
      Failed to load content. Please try again later.
    </div>
  ) : (
    <AnimatePresence>
      <motion.div
        variants={fadeIn("left", "", 0.3, 1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-900 text-lg text-center md:text-left"
      >
        <p className="font-bold text-xl mb-2">HELLO, From the Founders</p>
        <div dangerouslySetInnerHTML={{ __html: data?.[0]?.content }} />
      </motion.div>
    </AnimatePresence>
  )}
</div>

      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "");
