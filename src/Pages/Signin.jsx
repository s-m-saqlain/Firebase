import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signUpSchema } from "./Schemas";
import { Link } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const createUser = () => {
  //     createUserWithEmailAndPassword(auth, email, password);
  //   };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((value) => alert("Success"))
        .catch((error) => {
          setFieldError("email", "Error message");
        });
    },
  });

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        {/* <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              name="fname"
                              className="form-control"
                              value={values.fname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.fname && touched.fname ? (
                              <p
                                className="form-error"
                                style={{ color: "red" }}
                              >
                                {errors.fname}
                              </p>
                            ) : null}
                          </div>
                        </div> */}
                        {/* <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="lname"
                              value={values.lname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.lname && touched.lname ? (
                              <p
                                className="form-error"
                                style={{ color: "red" }}
                              >
                                {errors.lname}
                              </p>
                            ) : null}
                          </div>
                        </div> */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                              <p
                                className="form-error"
                                style={{ color: "red" }}
                              >
                                {errors.email}
                              </p>
                            ) : null}
                            {errorMessage && (
                              <p style={{ color: "red" }}>{errorMessage}</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                              <p
                                className="form-error"
                                style={{ color: "red" }}
                              >
                                {errors.password}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <Link to={"/"}>
                          <p>Already Have Registered Please Login Here</p>
                        </Link>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <div>
                          <h1 className="text-center text-3xl font-bold py-8">
                            OR
                          </h1>
                          <div className="max-w-[240px] m-auto py-4">
                            <GoogleButton onClick={handleGoogleSignIn} />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://thumbs.dreamstime.com/z/content-marketing-blogging-smm-concept-flat-design-blog-page-fill-out-articles-media-materials-uploading-process-115293520.jpg?w=768"
                        className="img-fluid"
                        alt="Sampleimage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
