import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.svg';

const SignInPage = (props) => {

    const { setLoginStatus, setUserName } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        // write python function for insertion of new user.

        // remove alert after implementation.
        setLoginStatus(true);
        setUserName("Mehak Noor");
        navigate('/evaluate');
    }


    return (
        <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)", height: "90vh" }}>
            <div class="container">
                <div class="row gx-lg-5 align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <h1 class="my-5 display-3 fw-bold ls-tight">
                            Please Sign In <br />
                            <span class="text-primary">to continue your Evaluation</span>
                        </h1>
                        <p style={{ fontSize: "2rem" }}>
                            Please sign in via the email address you registered when you used the platform for first time.

                        </p>
                    </div>

                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <div class="card bg-glass" >
                            <div class="card-body py-5 px-md-5">
                                <div class="d-flex align-items-center mb-3 pb-1">
                                    <img src={Logo} alt="LOGO " />
                                    {/* <span class="h1 fw-bold mb-0">Tanaav</span> */}
                                </div>
                                <h3> Sign into your account</h3>
                                <div class="form-outline mb-4 mt-4">
                                    <input type="email" class="form-control"
                                        onChange={() => handleEmailChange()} />
                                    <label class="form-label" >Email address</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" class="form-control"
                                        onChange={() => handlePasswordChange()} />
                                    <label class="form-label" >Password</label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4"
                                    onClick={() => handleSignIn()}>
                                    Login
                                </button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? &nbsp;
                                    <a href="/signup" class="link-danger">Register</a>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;