import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.svg';

const SignUpPage = (props) => {

    const { setLoginStatus, setUserName } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [un,setUn] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUserNameChange = (e)=>{
        setUn(e.target.value);
    }

    const handleSignUp = () => {
        // write python function for insertion of new user.

        
        setLoginStatus(true);
        setUserName(un);
        navigate("/evaluate");
    }
    return (
        <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)", height: "90vh" }}>
            <div class="container">
                <div class="row gx-lg-5 align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <div class="card bg-glass" >
                            <div class="card-body py-5 px-md-5">
                                <div class="d-flex align-items-center mb-3 pb-1">
                                    <img src={Logo} alt="LOGO " />
                                    {/* <span class="h1 fw-bold mb-0">Tanaav</span> */}
                                </div>
                                <h3> Sign up for your account</h3>
                                <div class="form-outline mb-4 mt-4">
                                    <input type='text' class="form-control" onChange={(event) => handleUserNameChange(event)} />
                                    <label class="form-label" >User Name</label>
                                </div>

                                <div class="form-outline mb-4 mt-4">
                                    <input type="email" class="form-control" onChange={(event) => handleEmailChange(event)} />
                                    <label class="form-label" >Email address</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" class="form-control" onChange={(event) => handlePasswordChange(event)} />
                                    <label class="form-label" >Password</label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4"
                                    onClick={() => handleSignUp()} >
                                    Sign up
                                </button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? &nbsp;
                                    <a href="/signin" class="link-danger">Sign In</a>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' className="img-fluid" />
                        <h1 class="ml-4 display-3 text-center ls-tight">
                            <span class="text-primary">Sign Up Today!!!</span>
                        </h1>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUpPage;