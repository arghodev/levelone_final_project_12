import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router";

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

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // 3. Safety check for auth context
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { createUser, updateUserProfile } = authContext;

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            reset();
            navigate("/");
          })
          .catch((error) => {
            console.error("Update profile error:", error);
          });
      })
      .catch((error) => {
        console.error("Sign up error:", error);
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
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>

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
