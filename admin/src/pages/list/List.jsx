import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list,setList] = useState([]);

  const fetchList =async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {

    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food item removed successfully");
        await fetchList();
      } else {
        toast.error("Failed to remove the food item");
      }
    } catch (error) {
      toast.error("Network or server error while deleting");
      console.error("Error removing the food item:", error);
    }
  };
  
  useEffect(()=>{
    fetchList()
  },[])

  return (
 
    <div className='list add flex-col'>
    <p>All Foods List</p>
    <div className='list-table'>
      <div className='list-table-format title'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`}/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default List