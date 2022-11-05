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

    const getLogin = async () => {
        const resp = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': email,
                'password': password
            })
        });
        const json_resp = await resp.json();
        console.log(json_resp);
        return json_resp;
    }

    const handleSignIn = async(event) => {
        // write python function for insertion of new user.
        var resp = await getLogin();
        if (resp['status'] === 'success') {
            setLoginStatus(true);
            setUserName(email);
            navigate('/evaluate');
        } else {
            alert("Invalid Credentials");
        }
    }

    return (
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)", height: "90vh" }}>
            <div className="container">
                <div className="row gx-lg-5 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="my-5 display-3 fw-bold ls-tight">
                            Please Sign In <br />
                            <span className="text-primary">to continue your Evaluation</span>
                        </h1>
                        <p style={{ fontSize: "2rem" }}>
                            Please sign in via the email address you registered when you used the platform for first time.

                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card bg-glass" >
                            <div className="card-body py-5 px-md-5">
                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <img src={Logo} alt="LOGO " />
                                    {/* <span className="h1 fw-bold mb-0">Tanaav</span> */}
                                </div>
                                <h3> Sign into your account</h3>
                                <div className="form-outline mb-4 mt-4">
                                    <input type="email" className="form-control"
                                        onChange={(event) => handleEmailChange(event)} />
                                    <label className="form-label" >Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" className="form-control"
                                        onChange={(event) => handlePasswordChange(event)} />
                                    <label className="form-label" >Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4"
                                    onClick={(event) => handleSignIn(event)}>
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? &nbsp;
                                    <a href="/signup" className="link-danger">Register</a>
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