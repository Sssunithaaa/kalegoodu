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

  const settings = {
    dots: workshop?.images?.length > 1,      // Show dots only if more than 1 image
    arrows: workshop?.images?.length > 1,    // Show arrows only if more than 1 image
    infinite: workshop?.images?.length > 1,  // Disable infinite scrolling for a single image
    speed: 500,
    slidesToShow: 1,                         // Always show one slide at a time
    slidesToScroll: 1,                       // Always scroll one slide at a time
  };

  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className='md:flex-row gap-x-4 flex flex-col mx-auto'>
        {/* Image Carousel */}
        <div className="mb-4 md:max-w-[70%] md:p-3 md:w-[70%] w-full max-w-[100%]"> {/* Image occupies 50% width */}
          <div>
            <Slider {...settings}>
            {workshop?.images?.map((image, index) => (
              <div key={index} className='object-cover'>
                <img
                  src={url + image.image}
                  alt={workshop?.name}
                  className="w-full h-full md:w-[500px] object-cover rounded-lg"
                  // style={{ minWidth: "500px" }} // Set min dimensions
                />
              </div>
            ))}
          </Slider>
          </div>
        </div>

        {/* Description Section */}
        <div className='w-full md:max-w-[30%] md:w-[30%] mx-auto mb-4 md:py-3 '> {/* Description occupies 50% width */}
          <div className='flex flex-col md:border-2 md:border-slate-200 md:p-4 p-21 rounded-md'>
            <h1 className="text-4xl uppercase font-bold mb-3">{workshop?.name}</h1>
          <p className="text-gray-900 gap-x-2 flex flex-row">
            <CiCalendarDate/> {new Date(workshop?.date).toLocaleDateString('en-US', options)}
          </p>
          <p className="text-gray-900 flex flex-row gap-x-2">
            <MdPlace/> {workshop?.place}
          </p>
          <p className="text-gray-900 flex flex-row gap-x-2">
            <IoIosPricetag/>: 200
          </p>
          </div>
          
        </div>
      </div>

      {/* Video Player if available */}
      <div className='mt-2 md:p-5'>
        <div className='flex flex-col my-2  rounded-md'>
            <h3 className='text-3xl font-semibold border-b-2 mb-2'>About</h3>
        <p className='md:text-lg'>{workshop?.description}</p>
          </div> 

        {workshop?.videos?.[0]?.video_url && (
          <div className="flex w-full mt-6 h-full"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer url={workshop?.videos?.[0].video_url} controls width="100%" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetailsPage;

