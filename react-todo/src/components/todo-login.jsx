/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link,useNavigate } from "react-router-dom";


export function ToDoLogin(){
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user)=> {
            axios.get('http://127.0.0.1:4040/users')
            .then(response=> {
                var userdetail = response.data.find(u => u.UserId===user.UserId);
                if(userdetail){
                    if(userdetail.Password===user.Password) {
                        setCookie('userid', user.UserId);
                        navigate('/user-dash');
                    } else {
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid User Id');
                }
            })
        }
    })
                 
    return(
        <div className="m-4 p-2 bg-light w-25">
             <form onSubmit={formik.handleSubmit}>
             <h3>User Login</h3>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control"/></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control"/></dd>
            </dl>
            <button type="submit" className="btn btn-dark w-100">Login</button>
             </form>
             <Link to='/user-register'>New User? Register</Link>
        </div>
    )
}