import React, { forwardRef } from 'react';
import Button from '../components/Button';
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
  children,
  
}, ref) => {
  return (
    <div className='mt-4'>
      <h1 className="text-2xl ml-4 font-semibold">{pageTitle}</h1>

      <div className="w-full px-4 mx-auto">
        <div className="pt-4">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">{dataListName}</h2>
            <div className="text-end">
              <form
                onSubmit={searchKeywordOnSubmitHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder={searchInputPlaceHolder}
                    onChange={searchKeywordOnChangeHandler}
                    value={searchKeyword}
                  />
                </div>
                <Button
                  className="flex-shrink-0 px-4 py-2 text-base font-medium "
                  type="submit"
                >
                  Filter
                </Button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4  sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full rounded-lg shadow">
              <table ref={ref} className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
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
