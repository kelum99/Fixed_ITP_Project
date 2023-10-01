import React, {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import useRequest from "../../services/RequestContext";
import './styleStore.css'

function ViewItems()  {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { request } = useRequest();
    const { id } = useParams();

    const fetchProductDetails = async value => {
        setLoading(true);
        try {
          const result = await request.get(`store/product/${value}`);
    
          if (result.status === 200) {
              const tempItem ={...result.data};
            setData(tempItem);
            console.log("test ", tempItem);
          }
    
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        if (id) {
          fetchProductDetails(id);
        }
      }, [id]) 
    return (
            <>
            {/* <h1> Store </h1>


                {data.map(item => {
                    <div>
                    <h2> {item.productName} </h2>
                    <h4> {item.category}</h4>
                    <h4>{item.price}$</h4>
                    <h4>{item.details}s</h4>
                    </div>

                })}
                   */}



            </>
          );
}


export default ViewItems;