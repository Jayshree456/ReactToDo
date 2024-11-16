import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function ToDoRegister(){
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile:''
        },
        onSubmit: (user) => {
            axios.post('http://127.0.0.1:4040/register-user',user)
            .then(()=>{
                 alert('Registered Successfully..');
                 navigate('/user-login');
                  
            })
        }
}) 
    return(
        <div className="m-4 p-4 bg-light w-25">
         <form onSubmit={formik.handleSubmit}>
             <h3>User Register</h3>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control"/></dd>
                <dt>User Name</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserName" className="form-control"/></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control"/></dd>
                <dt>Email</dt>
                <dd><input type="email" onChange={formik.handleChange} name="Email" className="form-control"/></dd>
                <dt>Mobile</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Mobile" className="form-control"/></dd>
            </dl>
            <button className="btn btn-dark w-100">Register</button>
         </form>
            <Link to='/user-login'>Existing User?</Link>
        </div>
    )
}