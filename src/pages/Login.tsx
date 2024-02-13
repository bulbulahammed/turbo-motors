import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../assets/img/login.png";
import { setUser } from "../redux/feature/user/authSlice";
import { useSignInUserMutation } from "../redux/feature/user/userApiSlice";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, isError, isSuccess, error }] =
    useSignInUserMutation();

  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          token: data.data.token,
          user: {
            email: data.data.user.email,
            id: data.data.user._id,
          },
        })
      );
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("email", data.data.user.email);
      localStorage.setItem("id", data?.data.user._id);
      navigate("/");
      toast.success("Login Successfully ✌", { toastId: "LoginSuccess" });
    }

    if (isError) {
      toast.error("Login Failed!", { toastId: "LoginError" });
    }
  }, [isSuccess, isError, data, dispatch, navigate]);

  const [formData, setFormData] = useState({
    user: {
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
    signinUser(formData);
  };

  return (
    <div className="flex container text-gray-600">
      {/* Logn Form */}
      <div className="text-center md:text-left w-full md:w-2/5">
        <div className="p-10">
          {/* Heading */}
          <div className="pb-10">
            <h2 className="text-2xl py-5">Login</h2>
            <p>To Manage Your Inventory</p>
          </div>
          <form onSubmit={handleSubmit}>
            {/*----------- Label For Email ------------*/}
            <div className="pb-4">
              <div className="text-sm pb-3">
                <p>
                  Email <span className="text-red-600">*</span>
                </p>
              </div>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs rounded py-4 text-sm"
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
                className="input input-bordered w-full max-w-xs rounded py-4 text-sm"
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
                Login
              </button>
            )}
          </form>
          <p className="text-xs">
            Don't Have An Account?
            <Link to="/signup">
              &nbsp; <span className="text-indigo-800">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
      {/* Image */}
      <div className="w-3/5 hidden md:block">
        <img src={loginImg} />
      </div>
    </div>
  );
};

export default Login;
