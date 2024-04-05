import { useState, useEffect, React } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { useNigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, res } from "../features/aauthSlice";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const { name, email, password, password2 } = formData;
    const onChange = (e) =>
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     if (password !== password2) {
    //         console.log("Passwords do not match");
    //     }
    // }
    return (
        <>
            <section className="heading">
                <FaUser /> Register
                <p>please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            email="email"
                            value={email}
                            placeholder="Enter your email"
                            /*                             onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            } */
                            onChange={onChange}
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
                            /*                             onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            } */
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="confirm your password"
                            value={password2}
                            /*                             onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password2: e.target.value,
                                })
                            } */
                            onChange={onChange}
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

export default Register;
