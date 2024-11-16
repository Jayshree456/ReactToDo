import { Link } from 'react-router-dom';
import './todo-index.css';
export function ToDoIndex(){
    return(
        <div>
            
            <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
                <div>
                    <Link to="/user-register" className='btn btn-warning me-2'>New User Register</Link>
                    <Link to="/user-login" className='btn btn-light'>Existing User Login</Link>
                </div>
            </div>
        </div>
    )
}