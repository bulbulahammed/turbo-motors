/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signUpImg from "../assets/img/signup.png";
import { useSignupUserMutation } from "../redux/feature/user/userApiSlice";

const Signup = () => {
  const navigate = useNavigate();
  const [signupUser, { data, isLoading, isSuccess, isError, error }] =
    useSignupUserMutation();

  const SuccessMessage = data?.message;

  console.log(error);

  if (isSuccess) {
    toast.success(SuccessMessage, { toastId: "SignUpSuccess" });
    navigate("/login");
  }

  if (isError) {
    toast.error("Sign Up Failed!", { toastId: "SignUpError" });
  }

  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupUser(formData);
  };

  return (
    <div className="flex container text-gray-600">
      {/* Image */}
      <div className="w-2/5 hidden md:block">
        <img src={signUpImg} />
      </div>
      {/* Sign Up Form */}
      <div className="text-center md:text-left w-full md:w-3/5">
        <div className="p-10">
          {/* Heading */}
          <div className="pb-10">
            <h2 className="text-2xl py-5">Sign Up</h2>
            <p>Register As New User.</p>
          </div>
          <form onSubmit={handleSubmit}>
            {/*----------- Name------------*/}
            <div className="flex justify-center md:justify-start">
              {/*----------- Label For First Name ------------*/}
              <div className="py-4 mr-4">
                <div className="text-sm pb-3">
                  <p>
                    First Name <span className="text-red-600">*</span>
                  </p>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs rounded py-4 text-sm"
                  name="firstName"
                  value={formData.user.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
              {/*----------- Label For Last Name ------------*/}
              <div className="py-4 ml-4">
                <div className="text-sm pb-3">
                  <p>
                    Last Name <span className="text-red-600">*</span>
                  </p>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs rounded py-4 text-sm"
                  name="lastName"
                  value={formData.user.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            {/*----------- Label For Email ------------*/}
            <div className="pb-4">
              <div className="text-sm pb-3">
                <p>
                  Email <span className="text-red-600">*</span>
                </p>
              </div>
              <input
                type="email"
                className="input input-bordered w-full max-w-md rounded py-4 text-sm"
                name="email"
                value={formData.user.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>
            {/*----------- Label For Password ------------*/}
            <div className="py-4">
              <div className="text-sm pb-3">
                <p>
                  Password <span className="text-red-600">*</span>
                </p>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-md rounded py-4 text-sm"
                name="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="password"
                required
              />
            </div>
            {isLoading ? (
              <button className="w-full max-w-md text-center rounded btn focus:outline-none my-4 bg-indigo-800 text-white">
                <span className="loading loading-spinner text-white py-6"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full max-w-md text-center py-3 rounded btn focus:outline-none my-4 bg-indigo-800 text-white hover:bg-white hover:text-indigo-800 hover:border-indigo-800"
              >
                Sign Up
              </button>
            )}
          </form>
          <p className="text-xs">
            Already Have An Account?
            <Link to="/login">
              &nbsp; <span className="text-indigo-800">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
