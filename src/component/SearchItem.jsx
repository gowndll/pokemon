import { useState, useEffect } from "react";
import axios from "axios";
import { GetDetailInfo } from "server/GetPokeAPI";

const SearchItem = ({url, value}) => {
  const [searchDetailData, setSearchDetailData] = useState([]);
  
  useEffect(()=> {
    // console.log(value);
    async function fetchSearchDeatilData() {
      try {
        const responseItem = await axios.get(url);
        const responseNames = responseItem.data.names;
        const responseDetail = responseNames.filter((item) => item.name === value);
        console.log(responseDetail);
        responseDetail.length > 0 ?? setSearchDetailData(responseDetail);
      } catch (error) {
        console.error(error)
      } finally {
        console.log('searchDetailData: ' + searchDetailData)
      }
    }



    if(value) {
      fetchSearchDeatilData();
    }
    
    
  }, [value])


  return (
    <div className="">
    </div>
  )
}

export default SearchItem;