import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Table(props) {
 
    const [users, setUsers] = useState([]);
    const [childVisibility, setChildVisibility] = useState(Array(0).fill(false));
    const [currentPage, setCurrentPage] = useState(3);
    const itemsPerPage = 3;
    const lastPage = Math.ceil(users.length / itemsPerPage);
    const pages = [...Array(lastPage).keys()].slice(1);
    console.log(pages)
    
  
    const changePage = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const firstIndex = currentPage * itemsPerPage;
    const lastIndex = firstIndex - itemsPerPage;
    const pageData = users.slice(lastIndex, firstIndex);
   
    useEffect(()=>{
    const fetachData = async ()=>{
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            console.log('response', response, response?.data.length)
            setUsers(response?.data)

              setChildVisibility(Array(response?.data.length).fill(false))

          } catch (err) {
            console.error("Error Fetching data from server", err);
          }
    }
       fetachData()
    }, []);

    const toggleChildVisibility = (index) => {
      setChildVisibility(prevVisibility => {
        const newVisibility = [...prevVisibility];
        newVisibility[index] = !newVisibility[index];
        return newVisibility;
      });
    };
  return (
    <div className='back card py-4 mt-3'>   
    { pageData.map((element,index) => {
     return (
      <div className="App card  py-4 mt-3 ps-4" key={element.id}>
           <div className='row'>
             <div className='col-2 mt-3'>
               hello {element.username}
             </div>
             <div className='col-3'>
              <h6>CONTACT</h6>
              <p>{element.name}</p>
             </div>
             <div className='col-3'>
              <h6>CITY</h6>
              <p>{element.address.city}</p>
             </div>
             <div className='col-2'>
             <h6>STATE</h6>
              <p>{element.address.street}</p>
             </div>
             <div className='col-2'>
             <button className='btn btn-success mt-2' onClick={()=>toggleChildVisibility(index)}>View Details</button>
             </div>

             <div>{childVisibility[index] && 
               <div className=" data card  py-4 mt-3 ps-4">
                <div className='col-11'>
                      <h5>Description</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Cumque autem quos magni sit alias doloremque porro aperiam nisi repellat officia!
                        quos magni sit alias doloremque porro aperiam nisi repellat officia</p>
                    </div>
                   <div className='row mt-3'>
                      <div className='col-6'>
                          <h6>Conttact Person</h6>
                          <p>{element.name}</p>
                      </div>
                       <div className='col-6'>
                           <h6>Address</h6>
                           <p>{element.address.street} {element.address.suite} {element.address.city} -{element.address.zipcode}</p>
                       </div>
                    </div>
                   <div className='row'>
                      <div className='col-6'>
                          <h6>Designation</h6>
                          <p>{element.company.name}</p>
                      </div>
                       <div className='col-6'>
                           <h6>City</h6>
                           <p>{element.address.city}</p>
                       </div>
                    </div>
                   <div className='row'>
                      <div className='col-6'>
                          <h6>Emails</h6>
                          <p>{element.email}</p>
                      </div>
                       <div className='col-6'>
                           <h6>State</h6>
                           <p>{element.address.street}</p>
                       </div>
                    </div>
                   <div className='row'>
                      <div className='col-6'>
                          <h6>Phones</h6>
                          <p>{element.phone}</p>
                      </div>
                       <div className='col-6'>
                           <h6>Country</h6>
                           <p>India</p>
                       </div>
                    </div>
               </div>
              }</div>
             </div>
      </div> 
           
         )},
        
         
         )}
        <div className='d-flex m-auto  mt-3'>
        <button className='btn' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>Prev</button>
           <div className='d-flex p-2 '>
            {pages.map(page => <button key={page} onClick={()=>setCurrentPage(page)} className=' btn px-4'>
          
               {`  ${page }`}</button>)}
          </div>   
        <button className='btn' disabled={currentPage === lastPage} onClick={() => changePage(currentPage + 1)}>Next</button> 
        </div>
    </div>
  )
}

export default Table
