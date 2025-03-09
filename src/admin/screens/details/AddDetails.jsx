import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Button from '../../../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import { updatePageContent } from '../../../services/index/pageContent';

const PolicyForm = ({ title, data, id }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(data?.visible || true); // Track visibility
  const quillRef = useRef(null);
  console.log(data);
  useEffect(() => {
    if (data) {
      setText(data.content || '');
      setIsVisible(data.visible); // Initialize visibility state
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('page_name', data?.page_name);
    formData.append('content', text);

    try {
      await updatePageContent(id, formData);
      toast.success(`${title} updated successfully!`, { autoClose: 2000 });
    } catch (error) {
      toast.error(`Failed to update ${title}`, { autoClose: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleVisibility = async () => {
    const newVisibility = !isVisible;
    const formData = new FormData();
    formData.append('visible', newVisibility);

    try {
      await updatePageContent(id, formData);
      setIsVisible(newVisibility);
      toast.success(`Visibility set to ${newVisibility ? 'Visible' : 'Hidden'}`, { autoClose: 2000 });
    } catch (error) {
      toast.error('Failed to update visibility', { autoClose: 2000 });
    }
  };

  useEffect(() => {
    return () => {
      toast.dismiss();
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4 mx-4">{title}</h2>
     
      <form onSubmit={handleSubmit} className="bg-white p-2 m-4 rounded-lg shadow-md">
        <div className="mb-4">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={text}
            onChange={setText}
            className="w-full h-full"
            placeholder="Add your content here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }, { size: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            }}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {`Update ${title}`}
          </Button>

          {(id === 9 || id === 10) && (
            <button
              type="button"
              onClick={handleToggleVisibility}
              className={`bg-${isVisible ? 'red' : 'green'}-500 text-black w-auto mx-auto px-4 py-1 rounded`}
            >
              {isVisible ? 'Hide Content' : 'Show Content'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PolicyForm;
