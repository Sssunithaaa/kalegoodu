import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 
import { BsFillCalendar2EventFill, BsFillGeoAltFill } from 'react-icons/bs';
import { getAllWorkshops } from '../../services/index/workshops';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const WorkshopCarousel = () => {
  const url = import.meta.env.VITE_APP_URL;
  const [completedWorkshops,setCompletedWorkshops] = useState([]);
  const { data,isLoading } = useQuery({
    queryKey: ['workshops'],
    queryFn: getAllWorkshops,
  });
  useEffect(()=> {
    setCompletedWorkshops(data?.filter((row)=>row?.completed))
  },[data])
  console.log(completedWorkshops)
  const navigate = useNavigate();

const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  font-size: 30px;
  // color: black !important;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: grey;
  }`
;

const SampleNextArrow = (props) => {
  const {  onClick } = props;
  return (
    <Arrow
      className="text-[#000000]"
      onClick={onClick}
      style={{color:"black" , right: '-50px' }}
    >
      &#8250;
    </Arrow>
  );
};

const SamplePrevArrow = (props) => {
  const {  onClick } = props;
  return (
    <Arrow
      
      className="text-[#000000]"
      onClick={onClick}
      style={{color:"black",  left: '-10px' }}
    >
      &#8249;
    </Arrow>
  );
};

  // Slider settings with arrows
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    nextArrow: data?.length > 3 && <SampleNextArrow />,
    prevArrow: data?.length > 3 && <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="workshop-carousel-container mx-auto max-w-7xl mb-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-3">Upcoming Workshops</h2>
      
      <Slider {...settings}>
        {isLoading
          ? Array.from({ length: data?.length }).map((_, index) => (
              <div key={index} className="workshop-card px-2">
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="50%" />
              </div>
            ))
          : data?.map((workshop) =>
              !workshop.completed && (
                <div
                  key={workshop.workshop_id}
                  onClick={() => navigate(`${workshop.workshop_id}/${workshop.name.replaceAll(" ", "-")}`)}
                  className="workshop-card px-2"
                >
                  <div className="shadow-lg bg-green-50 rounded-lg overflow-hidden h-full">
                    <img
                      src={`https://res.cloudinary.com/dgkgxokru/${workshop.images?.[0]?.image}`}
                      alt={workshop.name}
                      className="w-full md:h-52 h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="workshop-title text-xl font-semibold text-gray-900 mb-2">
                        {workshop.name}
                      </h3>
                      <p className="workshop-date text-gray-900 flex items-center">
                        <BsFillCalendar2EventFill className="mr-2" />
                        Date: {new Date(workshop.date).toLocaleDateString()}
                      </p>
                      <p className="workshop-place text-gray-900 flex items-center mt-1">
                        <BsFillGeoAltFill className="mr-2" />
                        Place: {workshop.place}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
      </Slider>

      <h2 className="text-center text-2xl font-bold mt-4 mb-3">Completed Workshops</h2>

      <Slider {...settings}>
        {isLoading ? Array.from({ length: completedWorkshops?.length }).map((_, index) => (
              <div key={index} className="workshop-card px-2">
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="50%" />
              </div>
            )) : completedWorkshops?.map((workshop) => (
          <div
            key={workshop.workshop_id}
            onClick={() => navigate(`${workshop.workshop_id}/${workshop.name.replaceAll(" ", "-")}`)}
            className="workshop-card px-2"
          >
            <div className="shadow-lg bg-green-50 rounded-lg overflow-hidden h-full">
              <img
                src={`https://res.cloudinary.com/dgkgxokru/${workshop.images?.[0]?.image}`}
                alt={workshop.name}
                className="w-full md:h-52 h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="workshop-title text-xl font-semibold text-gray-900 mb-2">
                  {workshop.name}
                </h3>
                <p className="workshop-date text-gray-900 flex items-center">
                  <BsFillCalendar2EventFill className="mr-2" />
                  Date: {new Date(workshop.date).toLocaleDateString()}
                </p>
                <p className="workshop-place text-gray-900 flex items-center mt-1">
                  <BsFillGeoAltFill className="mr-2" />
                  Place: {workshop.place}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WorkshopCarousel;
