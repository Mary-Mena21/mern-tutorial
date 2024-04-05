import { useState, useEffect, React } from "react";
import { FaSignInAlt } from "react-icons/fa";
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { name, email, password, password2 } = formData;
    const onChange = (e) =>
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    return (
        <>
            <section className="heading">
                <FaSignInAlt /> Login
                <p>Login and start setting goals</p>
            </section>
            <section className="form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            email="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            password="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
