import React, { useEffect, useState } from 'react'
import { getAxiosWithToken } from '../../service/axios_service';
import { groupListEndPoint } from '../../service/api_endpoints';
import { ScaleLoader } from 'react-spinners';
import { primaryLoadingColor } from '../../app/theme_constant';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import WhatsappLoginButton from '../../components/WhatsappLoginButton';
import { setGroupList } from '../../redux/groups_slice';

export default function Groups() {

  const { isWhatsappLoggedIn } = useSelector((state) => state.layoutSlice);

  const dispatch = useDispatch();

  const [tableDataList, setTableDataList] = useState([]);
  const [filteredTableDataList, setFilteredTableDataList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchGroups, setSearchGrops] = useState("Whatsapp test");
  const [itemCount, setItemCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGroupsList();
  }, [])

  const getGroupsList = async () => {
    let response = await getAxiosWithToken({
      url: groupListEndPoint
    })

    if (response != null) {
      setTableDataList(response?.data?.list)
      dispatch(setGroupList(response?.data?.list))
      setIsLoading(false)
    }
  }

  const changeItemCount = (value) => {
    setItemCount(value)
  }

  // useEffect(() => {
  //   setFilteredTableDataList(tableDataList)
  // },[tableDataList])

  useEffect(() => {
    if (searchGroups.length == 0) {
      setFilteredTableDataList(tableDataList)
    } else {
      var tempList = [];
      tableDataList.filter((item) => {
        if (item.name.toLowerCase().includes(searchGroups.toLowerCase())) {
          tempList.push(item)
        }
      })
      setFilteredTableDataList(tempList)
    }
  },[searchGroups, tableDataList])

  return (
    <div>
      <p className='text-primary font-bold text-xl mb-10'>Group List</p>
      <div className='w-[300px]'>
      <input type='search' name='search_groups' id='searchgroups' placeholder='Search Groups' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={(e) => setSearchGrops(e.target.value)} value={searchGroups} />
      </div>
       <div className='w-full mt-[10px]'>
        <table className='w-full'>
          <thead className='border-b'>
            <tr>
              <th className="p-[10px] text-left">S.No</th>
              <th className="p-[10px] text-left">Group Name</th>
              <th className="p-[10px] text-center">Unread</th>
              <th className="p-[10px] text-center ">Members</th>
              <th className="p-[10px] text-center">Created By</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? <tr>
                <td colSpan={5} className="p-[10px] text-center">
                  <p><ScaleLoader color={primaryLoadingColor} /></p>
                </td>
              </tr> :
              tableDataList.length == 0 ? <tr  className='border-b hover:bg-header-bg'>
              <td colSpan={5} className="p-[10px] text-center">No groups</td>
            </tr> :
              currentItems.map((item, index) => (
                <tr className='border-b hover:bg-header-bg'>
                  <td className="p-[10px]">{index + 1}</td>
                  <td className="p-[10px]">
                    <div>
                      <p>{item.name}</p>
                      <p className='text-blue-500 text-xs'>ID: {item.id}</p>
                    </div>
                  </td>
                  <td className="p-[10px] text-center">
                    {item.unread > 0 ? <div className='bg-primary px-[10px] py-[2px] mx-auto w-fit h-fit rounded-full text-white flex items-center justify-center'>{item.unread}</div> : <div>{item.unread}</div>}
                  </td>
                  <td className="p-[10px] text-center">{item.total_participants}</td>
                  <td className="p-[10px] text-center">{item.created_by}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      { tableDataList.length > 0 && <div>
        <Pagination items={filteredTableDataList} itemsPerPage={itemCount} setItemsPerPage={setItemCount} setCurrentItems={setCurrentItems} entriesHandler={changeItemCount} />
      </div> }
    </div> 
  )
}
