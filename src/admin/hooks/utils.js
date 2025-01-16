import axios from "axios";
import { toast } from "react-toastify";

/**
 * Deletes a resource from the given endpoint.
 * @param {string} url - The API endpoint to delete the resource.
 * @param {function} refetch - Function to refresh the data after deletion.
 */
export const deleteItem = async (url, refetch) => {
  try {
    await axios.delete(url);
    toast.success("Item deleted successfully.");
    if (typeof refetch === "function") refetch();
  } catch (error) {
    toast.error("Failed to delete the item. Please try again.");
  }
};
