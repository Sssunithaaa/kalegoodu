import React, { forwardRef } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import SortDropdown from './SortDropDown';
const DataTable = forwardRef(({
  pageTitle,
  dataListName,
  searchInputPlaceHolder,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  url,
  children,
  search,
  sortOptions,
  sortOption,
  setSortOption,
  keyword,
  setKeyword,
  refetch,
  setCurrentPage={setCurrentPage},
  saleType = false, // New prop
  handleOpenDialog, // New prop
  handleCloseDialog, // New prop
  

  
}, ref) => {
  const navigate = useNavigate()
  const pathSegments = url ? url.split('/').filter(Boolean) : null; // Remove empty segments
  const name =  pathSegments?.[1] || null;
   const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
    refetch();
  };

  const searchKeywordOnChangeHandler = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
    refetch();
  };
  
  
  return (
    <div className='mt-4'>
      <h1 className="text-2xl ml-4 font-semibold">{pageTitle}</h1>

      <div className="w-full mx-auto">
        <div className="pt-4">
          <div>
              <h2 className="text-2xl font-bold leading-tight text-center my-3">Manage {dataListName}</h2>
            </div>
       <div className="flex flex-wrap items-center justify-between max-w-screen w-screen md:w-full md:max-w-full gap-3 mb-1 sm:mb-0">
  {search !== "not-visible" && (
    <div className="flex items-center">
      <form className="flex gap-3">
        <input
          type="text"
          
          className=" md:max-w-60 rounded-lg border border-gray-300 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder={searchInputPlaceHolder}
          onChange={searchKeywordOnChangeHandler}
          value={keyword}
        />
        <Button className="px-4" type="submit">Filter</Button>
      </form>
    </div>
  )}
  
  {url && (
    <Button className="px-4" onClick={() => navigate(url)}>
      Add {name === "comments" ? "Testimonials" : name}
    </Button>
  )}
 {
  saleType && (
    <Button className="px-4" onClick={handleOpenDialog}>
      Add New Sale Type
    </Button>
  )
 }
  {sortOptions && (
    <div className="flex items-center">
      <span className="mx-3 text-lg font-semibold">Sort: </span>
      <SortDropdown 
        options={sortOptions}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
      />
    </div>
  )}
</div>



          <div className="px-2 py-4  sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full rounded-lg shadow">
              <table ref={ref} className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-3 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>
              {/* {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={5}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
   );
});

export default DataTable;
