import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ itemsPerPage, items, setCurrentItems, entriesHandler }) {

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;
        const currentItems = items.slice(itemOffset, endOffset);
        setPageCount(Math.ceil(items.length / itemsPerPage));
        setCurrentItems(currentItems)
    },[items, itemsPerPage, itemOffset])



    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='flex items-center justify-between'>
            <div>
                <select value={itemsPerPage} onChange={(e) => entriesHandler(e.target.value)} className='border rounded-md w-[100px] font-400 text-[15px] p-[15px] outline-primary bg-white'>
                    {[10, 20, 30, 40, 50].map((limit) => (
                        <option key={limit} value={limit}>
                            {limit}
                        </option>
                    ))}
                </select>
            </div>
            <div className='my-[25px]'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className='flex gap-3 '
                    pageLinkClassName='bg-light-gray rounded-full flex items-center justify-center text-black w-10 h-10'
                    activeLinkClassName='!bg-primary rounded-full flex items-center justify-center !text-white w-10 h-10'
                    previousLinkClassName='bg-light-gray rounded-full flex items-center justify-center text-black w-10 h-10'
                    nextLinkClassName='bg-light-gray rounded-full flex items-center justify-center text-black w-10 h-10'
                />
            </div>
        </div>
    )
}
