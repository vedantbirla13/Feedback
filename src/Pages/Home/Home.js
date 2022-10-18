import React , { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Home.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md"


// Getting values from localStorage

const Home = () => {
    
    const navigate = useNavigate();  
    const [value, setValue] = useState();

    const getDataFromLS = () => {
        const data = localStorage.getItem('formData');
        if(data){
            return JSON.parse(data)
        }
        else{
            return []
        }
        
    }
    
    // let dummy = {
    //     username: "dummy", 
    //     email: "dummy@gmail.com" , 
    //     phone: "=91111111111",
    //     rating1: "good",
    //     rating2: "good",
    //     rating3: "bad",
    //     rating4: "bad",
    // }

    const initialValues = {
         username: "", 
         email: "" , 
         phone: "",
         rating1: "",
         rating2: "",
         rating3: "",
         rating4: "",
        };

    const [searchEle, setSearchEle] = useState('')
    const [tableFilter, setTableFilter] = useState([])
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formData , setFormData] = useState(getDataFromLS()); //Adding getDataFromLS function so that
                                                                // data dont clear on refreshing the page

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        
            let name = formValues.username;
            let email = formValues.email;
            let phone = formValues.phone;
            let rating1 = formValues.rating1;
            let rating2 = formValues.rating2;
            let rating3 = formValues.rating3;
            let rating4 = formValues.rating4;
            
            // Creating an object
            let feedback = {
                name , email, phone , rating1, rating2, rating3, rating4
            }   
            
            // setFormValues('');
            setFormData([...formData , feedback]);
            if(Object.keys(formErrors).length === 0 && isSubmit && formData ){
                navigate("/Success");
              }
        
    };

    // Saving data in localstorage
    useEffect(() => {
        localStorage.setItem("formData" , JSON.stringify(formData));
    }, [formData]);

    // Delete function 
    const handleDelete = (name , email) => {
       const filteredData =  formData.filter((element , index) => {
        return element.name !== name || element.email !== email
       })

       setFormData(filteredData);
    }


    // Search function
     const handleSearch = (e) => {
        const ele = e.target.value
        setSearchEle(ele)
        if(searchEle !== ""){
            const filterTable = formData.filter(obj => Object.keys(obj)
            .some(k=> String(obj[k]).toLowerCase().includes(e.target.value.toLowerCase())
            )); 

            setTableFilter([...filterTable])
        }else{
            setSearchEle(ele);
            setFormData([...formData]);
        }
         
       return formData
     }


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
          errors.username = "Username is required!";
        }

        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }

        if(!values.phone){
            errors.phone = "Phone number is required!"
        }else if(values.phone.length > 16 ){
            errors.phone = "Please enter valid phone number!"
        }

        if(!values.rating1){
            errors.rating1 = "This field is mandatory!"
        }

        if(!values.rating2){
            errors.rating2 = "This field is mandatory!"
        }

        if(!values.rating3){
            errors.rating3 = "This field is mandatory!"
        }

        if(!values.rating4){
            errors.rating4 = "This field is mandatory!"
        }
        
        return errors;
      };

  return (
    <div className='home'>
        <main>
            <div className="feedback">
                <h1>Aromatic Bar</h1>
                <p>We are committed to providing you with the best dining experience possible, 
                   so we welcome <br/>  your comments. Please fill out this questionnaire. Thank you.</p>

               
                
                <form >
                    <div className="form-details1">

                            <div className="input-details1">
                                <h3>Customer Name</h3>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    value={formValues.username}
                                    onChange={handleChange}
                                    placeholder='E.g. John Snow' 
                                />
                                <p className='errorText'>{formErrors.username}</p>
                            </div>
                            <div className="input-details1">
                                <h3>Email</h3>
                                <input 
                                type="text" 
                                name="email"
                                autoComplete="off"
                                value={formValues.email}
                                 onChange={handleChange}
                                placeholder='E.g. abc@gmail.com'
                                />
                              <p className='errorText'>{formErrors.email}</p>
                            </div>
                            
                        </div>

                            <div className="input-details2">
                                <h3>Phone no</h3>
                                <label 
                                    className='phoneLabel'
                                    name="phone"
                                    type="Number"
                                    value={formValues.phone} 
                                    onChange={handleChange}
                                >
                                <PhoneInput
                                    className='phone_input'
                                    placeholder="9999999999"
                                    // defaultCountry='IN'
                                    international
                                    name="phone"
                                    value={value}
                                    autoComplete="off"
                                    onChange={setValue}
                                    />
                                </label>
                                <p className='errorText'>{formErrors.phone}</p>
                            </div>

                            <div className="feedback-options">
                                <div className="feedback-details1">
                                    <p className='feedback-text'>Please rate  quality of service you recieved from your host.</p>
                                    <div className="radioButton">
                                        <input type="radio" name="rating1" value="Excellent"  
                                            onChange={handleChange}
                                        /> <label >Excellent</label>
                                        <input type="radio" name="rating1" value="Good"  
                                            onChange={handleChange}
                                        /> <label >Good</label>
                                        <input type="radio" name="rating1" value="Fair"  
                                            onChange={handleChange}
                                        /> <label >Fair</label>
                                        <input type="radio" name="rating1" value="Bad"  
                                            onChange={handleChange}
                                        /> <label >Bad</label>
                                    </div>
                                        <p className='errorText'>{formErrors.rating1}</p>
                                </div>

                                <div className="feedback-details2">
                                    <p className='feedback-text'>Please rate the quality of Your beverage.</p>
                                    <div className="radioButton">
                                    <input type="radio" name="rating2" value="Excellent"  
                                            onChange={handleChange}
                                        /> <label >Excellent</label>
                                        <input type="radio" name="rating2" value="Good"  
                                            onChange={handleChange}
                                        /> <label >Good</label>
                                        <input type="radio" name="rating2" value="Fair"  
                                            onChange={handleChange}
                                        /> <label >Fair</label>
                                        <input type="radio" name="rating2" value="Bad"  
                                            onChange={handleChange}
                                        /> <label >Bad</label>
                                    </div>
                                    <p className='errorText'>{formErrors.rating2}</p>
                                </div>
                        </div>
                        

                        <div className="feedback-options1">
                            <div className="feedback-dets1">
                                <p className='feedback-text'>Was our restaurant clean ?.</p>
                                <div className="radioButton">
                                <input type="radio" name="rating3" value="Excellent"  
                                            onChange={handleChange}
                                        /> <label >Excellent</label>
                                        <input type="radio" name="rating3" value="Good"  
                                            onChange={handleChange}
                                        /> <label >Good</label>
                                        <input type="radio" name="rating3" value="Fair"  
                                            onChange={handleChange}
                                        /> <label >Fair</label>
                                        <input type="radio" name="rating3" value="Bad"  
                                            onChange={handleChange}
                                        /> <label >Bad</label>
                                </div>
                                <p className='errorText'>{formErrors.rating3}</p>
                            </div>

                            <div className="feedback-dets2">
                                <p className='feedback-text'>Please rate your overall dining experince.</p>
                                <div className="radioButton">
                                <input type="radio" name="rating4" value="Excellent"  
                                            onChange={handleChange}
                                        /> <label >Excellent</label>
                                        <input type="radio" name="rating4" value="Good"  
                                            onChange={handleChange}
                                        /> <label >Good</label>
                                        <input type="radio" name="rating4" value="Fair"  
                                            onChange={handleChange}
                                        /> <label >Fair</label>
                                        <input type="radio" name="rating4" value="Bad"  
                                            onChange={handleChange}
                                        /> <label >Bad</label>
                                </div>
                                <p className='errorText'>{formErrors.rating4}</p>
                            </div>
                        </div>

                        <div className="button">
                            <button onClick={(e) => handleSubmit(e)} type='submit'>Submit Review</button>
                        </div>

                </form>
            
            </div>

        </main>



            {/* Table */}

        {formData.length > 0
         && (
        <div className='table-responsive'>
        <div className="tableElememts">
            <h3 className='tableText'>Aromatci Bar</h3>
            <input className='search' value={searchEle} onChange={handleSearch}  placeholder='Search name '/>

        </div>

        <TableContainer className='table' component={Paper}>
            <Table className='table' >
                <TableHead >
                <TableRow className='table-row' >

                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center" >Email</TableCell>
                    <TableCell align="center" >Phone</TableCell>
                    <TableCell align="center">Rating 1</TableCell>
                    <TableCell align="center">Rating 2</TableCell>
                    <TableCell align="center">Rating 3</TableCell>
                    <TableCell align="center">Rating 4</TableCell>
            
                </TableRow>
                </TableHead>
                <TableBody>
               
                { searchEle !== "" ? tableFilter.map((data) =>  (

               
                    <TableRow
                    key={data.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                 
                    <TableCell align="center"><MdDeleteForever className='delete' color='red' size="1.1rem" 
                    onClick={() =>  handleDelete(data.name , data.email)} /></TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.email}</TableCell>
                    <TableCell align="center">{data.phone}</TableCell>
                    <TableCell align="center">{data.rating1}</TableCell>
                    <TableCell align="center">{data.rating2}</TableCell>
                    <TableCell align="center">{data.rating3}</TableCell>
                    <TableCell align="center">{data.rating4}</TableCell>
                    </TableRow>
                ))
                    :

                    formData.map((data) =>  (

               
                        <TableRow
                        key={data.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                     
                        <TableCell align="center"><MdDeleteForever className='delete' color='red' size="1.1rem" 
                        onClick={() =>  handleDelete(data.name , data.email)} /></TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">{data.email}</TableCell>
                        <TableCell align="center">{data.phone}</TableCell>
                        <TableCell align="center">{data.rating1}</TableCell>
                        <TableCell align="center">{data.rating2}</TableCell>
                        <TableCell align="center">{data.rating3}</TableCell>
                        <TableCell align="center">{data.rating4}</TableCell>
                        </TableRow>
                    ))
            }
                </TableBody>
            </Table>
            </TableContainer>
        </div>
)}

           
    </div>
  )
}

export default Home