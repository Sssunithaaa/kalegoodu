import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';
import Button from '../../../components/Button';
import { updatePageContent } from '../../../services/index/pageContent';

const PolicyForm = ({ title, data, id }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setText(data?.content || '');
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('page_name', data?.page_name);
    formData.append('content', text);
  
    try {
      await updatePageContent(id, formData);
      toast.success(`${title} updated successfully!`,{autoClose:2000});
    } catch (error) {
      toast.error(`Failed to update ${title}`,{autoClose:2000});  
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4 mx-4">{title}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-2 m-4 rounded-lg shadow-md">
        <ToastContainer />
        <div className="mb-4">
          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            className="w-full h-full"
            placeholder="Add your content here..."
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }, { 'color': [] }],
                ['link'],
              ],
            }}
          />
        </div>
        <Button className='' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : `Update ${title}`}
        </Button>
      </form>
    </div>
  );
};

export default PolicyForm;
