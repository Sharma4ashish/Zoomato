import React, { useEffect, useState } from 'react'
import type { IRestaurant } from '../types';
import axios from 'axios';
import { restaurantService } from '../main';
import AddRestaurant from '../components/AddRestaurant';


function Restaurant() {
 const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true);


    const fetchMyRestaurant = async () => {
    try {
      const { data } = await axios.get(
        `${restaurantService}/api/restaurant/my`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      

      setRestaurant(data.restaurant || null);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchMyRestaurant();
  },[])

    if (!restaurant) {
    return <AddRestaurant fetchMyRestaurant={fetchMyRestaurant} />;
  }

  return (
    <div>Restaurant. sc{restaurant?.name}</div>
  )
}

export default Restaurant