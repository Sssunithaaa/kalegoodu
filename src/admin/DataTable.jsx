import React, { forwardRef, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
const DataTable = forwardRef(({
  pageTitle,
  dataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  url,
  children,
  search
  
}, ref) => {
  const navigate = useNavigate()
  const pathSegments = url ? url.split('/').filter(Boolean) : null; // Remove empty segments
  const name =  pathSegments?.[1] || null;
  return (
    <div className='mt-4'>
      <h1 className="text-2xl ml-4 font-semibold">{pageTitle}</h1>

      <div className="w-full mx-auto">
        <div className="pt-4">
          <div className="flex flex-col md:flex-row gap-y-3 justify-between max-w-screen w-screen md:w-full md:max-w-full mb-1 sm:mb-0">
            <div>
              <h2 className="text-2xl font-bold leading-tight">Manage {dataListName}</h2>
            </div>
       {search !== "not-visible" &&      <div className="text-center flex justify-center items-center">
  <form
    onSubmit={searchKeywordOnSubmitHandler}
    className="flex gap-3 mx-auto md:max-w-sm md:flex-row md:w-full md:space-x-3"
  >
    <div className="flex flex-row gap-3 md:flex-row md:gap-x-4 w-full">
      <input
        type="text"
        id="form-subscribe-Filter"
        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder={searchInputPlaceHolder}
        onChange={searchKeywordOnChangeHandler}
        value={searchKeyword}
      />
      <Button
      className='px-4'
        type="submit"
      >
        Filter
      </Button>
    </div>
  </form>
</div> }
            <div>
              {url && <Button className='px-4' onClick={()=>navigate(url)}>Add {name}</Button>
              }
            </div>
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
