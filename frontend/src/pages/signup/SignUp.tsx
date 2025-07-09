import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

// 1. Define the form input types
interface SignUpFormInputs {
  name: string;
  photoURL: string;
  email: string;
  password: string;
}

// 2. Main SignUp component
const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const axiosPublic = useAxiosPublic();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // 3. Safety check for auth context
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { createUser, updateUserProfile, googleSignIn } = authContext;

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            };

            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  console.log("User created ==>", res.data);
                  toast.success("User created successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  reset();
                  navigate("/");
                }
              })
              .catch((error) => {
                console.error("User creation error:", error);
              });
          })
          .catch((error) => {
            console.error("Update profile error:", error);
          });
      })
      .catch((error) => {
        console.error("Sign up error:", error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedUser = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoURL: result.user?.photoURL,
      };
      // console.log(loggedUser);

      axiosPublic.post("/users", loggedUser).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-col w-full ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
          </div>

          <div className="card flex-col w-full max-w-sm  shadow-2xl bg-base-100 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              noValidate
            >
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered "
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must include uppercase, lowercase, number, and
                    special character.
                  </p>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-center btn btn-primary mt-6">
                <input className="" type="submit" value="Sign Up" />
              </div>
            </form>
            <div className="divider"></div>
            <div className="flex items-center justify-center my-3">
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
            <p className="p-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
