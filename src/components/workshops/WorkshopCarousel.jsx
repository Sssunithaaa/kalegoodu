import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsFillCalendar2EventFill, BsFillGeoAltFill } from 'react-icons/bs';
import { getAllWorkshops } from '../../services/index/workshops';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const WorkshopCarousel = () => {
  
  const url = import.meta.env.VITE_APP_URL;
  const { data } = useQuery({
    queryKey: ['workshops'],
    queryFn: getAllWorkshops
  });

  const navigate = useNavigate();

  return (
    <div className="workshop-carousel-container mx-auto max-w-7xl mb-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-2">Upcoming Workshops</h2>
      <div className="flex flex-wrap justify-center gap-y-6 gap-x-5">
        {data?.map((workshop) => (
          <div
            key={workshop.workshop_id}
            onClick={() => navigate(`${workshop?.workshop_id}`)}
            className="workshop-card flex-grow flex-shrink-0 basis-72 md:basis-60 lg:basis-48 max-w-sm"
          >
            <div className="shadow-lg bg-green-50 rounded-lg overflow-hidden h-full">
              <img
                src={url + workshop?.images?.[0]?.image}
                alt={workshop.name}
                className="w-full h-48 object-cover"
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
                {/* <p className="workshop-description text-gray-900 mt-3">
                  {workshop.description}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopCarousel;
