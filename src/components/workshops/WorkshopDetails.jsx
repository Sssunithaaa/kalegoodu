import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleWorkshop } from '../../services/index/workshops';
import ReactPlayer from 'react-player'; // For video support
import Slider from 'react-slick'; // Import react-slick

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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev">Previous</button>,
    nextArrow: <button type="button" className="slick-next">Next</button>,
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{workshop?.name}</h1>
      <p className="text-gray-700">
        Date: {new Date(workshop?.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">Place: {workshop?.place}</p>

      {/* Image Carousel */}
      <div className="mb-4">
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

      <p className="text-lg text-gray-900">{workshop?.description}</p>

      {/* Video Player if available */}
      {workshop?.videos?.[0]?.video_url && (
         
              <div className="flex w-full mt-4 h-full"> {/* 16:9 Aspect Ratio */}
               <ReactPlayer url={workshop?.videos?.[0].video_url}  controls width="100%" />
              </div>
            
      )}
        
    </div>
  );
};

export default WorkshopDetailsPage;
