import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  interface User {
    email: string | null;
    password: string | null;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const from = location.state?.from?.pathname || "/";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (typeof email === "string" && typeof password === "string") {
      const user: User = {
        email,
        password,
      };
      console.log("Submitted user:", user);
    } else {
      console.error("Invalid input data");
    }

    if (email && password) {
      signIn(email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className=" min-h-screen">
      <div className=" bg-base-200 min-h-screen w-full flex items-center justify-center  ">
        <div className="card bg-base-100 w-1/3 mx-auto  shadow-2xl ">
          <form onSubmit={handleSubmit} className="card-body pb-0 ">
            <fieldset className="fieldset">
              <label className="label">Email:</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Email"
              />
              <label className="label">Password:</label>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
              <div></div>
            </fieldset>
            <div className="divider ">OR</div>
          </form>
          <div className="flex items-center justify-center my-3">
            <button className="btn  border-white/50 ">
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
          <div className="flex items-center justify-center gap-2 pb-2 text-xs">
            <p>Create an account! </p>
            <Link to="/signup" className="text-blue-500">
              {" "}
              Signup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
