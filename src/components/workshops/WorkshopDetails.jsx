import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleWorkshop } from '../../services/index/workshops';
import ReactPlayer from 'react-player'; // For video support
import Slider from 'react-slick'; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiCalendarDate } from "react-icons/ci";
import { MdPlace } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
const WorkshopDetailsPage = () => {
  const { workshopId } = useParams();
  const { data: workshop, error, isLoading } = useQuery({
    queryKey: ['workshops', workshopId],
    queryFn: () => getSingleWorkshop({ slug: workshopId }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const url = import.meta.env.VITE_APP_URL;

  // Slick slider settings
 const settings = {
  dots: true,
  speed: 500,
  slidesToShow: workshop?.images?.length > 1 ? 1 : 1, // Adjust this dynamically
  slidesToScroll: workshop?.images?.length > 1 ? 1 : 0,
  // prevArrow: <button type="button" className="slick-prev">Previous</button>,
  // nextArrow: <button type="button" className="slick-next">Next</button>,
};


  const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};


  return (
    <div className="max-w-7xl mx-auto p-4">
      
      <div className='flex flex-col gap-y-4 md:flex-row space-x-8 min-w-full'>
      {/* Image Carousel */}
      <div className="mb-4 md:w-[70%]">
        <Slider {...settings}>
          {workshop?.images?.map((image, index) => (
            <div key={index}>
              <img
                src={url + image.image}
                alt={workshop?.name}
                className="w-full h-full md:h-96 md:object-cover object-contain rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
        <div className='w-full mx-auto mb-4 md:w-[30%] flex flex-col'>
          <h1 className="text-3xl font-bold mb-3">{workshop?.name}</h1>
      <p className="text-gray-900 gap-x-2 flex flex-row">
        <CiCalendarDate/> {new Date(workshop?.date).toLocaleDateString('en-US', options)}
      </p>
      <p className="text-gray-900 flex flex-row gap-x-2"><MdPlace/> {workshop?.place}</p>
      <p className=" text-gray-900 flex flex-row gap-x-2"><IoIosPricetag/>: 200 </p>
        </div>
        </div>

      {/* Video Player if available */}
     <div>
      <div>
        <h3 className='text-3xl font-semibold'>About</h3>
        <p className='md:text-lg'>{workshop?.description}</p>
      </div>
      <div>
         {workshop?.videos?.[0]?.video_url && (
         
              <div className="flex w-full mt-4 h-full"> {/* 16:9 Aspect Ratio */}
               <ReactPlayer url={workshop?.videos?.[0].video_url}  controls width="100%" />
              </div>
            
      )}
      </div>
     </div>
        
    </div>
  );
};

export default WorkshopDetailsPage;