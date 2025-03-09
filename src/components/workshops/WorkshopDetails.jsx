import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleWorkshop } from '../../services/index/workshops';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ReactPlayer from 'react-player';
import FullPageLoader from '../FullPageLoader'
const WorkshopDetailsPage = () => {
  const { workshopId } = useParams();
  const { data: workshop, error, isLoading } = useQuery({
    queryKey: ['workshops', workshopId],
    queryFn: () => getSingleWorkshop({ slug: workshopId }),
  });

  if (isLoading) return <div><FullPageLoader/></div>
  if (error) return <p>Error: {error.message}</p>;

  const url = import.meta.env.VITE_APP_URL;

  const { name, date, place, description, images } = workshop;

  const galleryImages = images.map((img) => ({
    original: import.meta.env.VITE_CLOUD_URL + img.image,
    thumbnail: import.meta.env.VITE_CLOUD_URL + img.image,
    alt: `${name} Image`,
  }));

  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  console.log(galleryImages)

  return (
    <div className="max-w-full mx-auto p-4 md:py-6 md:px-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col lg:flex-row gap-y-4 gap-x-8">
        {/* Image Gallery */}
        <div className="lg:flex-[0_0_65%] flex-1">
          <ImageGallery items={galleryImages} showThumbnails={true} />
        </div>

        {/* Description Section */}
        <div className="lg:flex-[0_0_35%] flex-1 px-2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">
            <strong className="text-gray-800">Date:</strong> {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Place:</strong> {place}
          </p>
          <div
            className="prose prose-gray"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailsPage;

