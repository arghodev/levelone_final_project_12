import { useForm, type SubmitHandler } from "react-hook-form";
import img from "../../../src/assets/message.svg";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
// import toast from "react-hot-toast";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 5 characters" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    message: z
      .string()
      .nonempty({ message: "Message is required" })
      .min(10, { message: "Message must be at least 10 characters" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialValues,
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        message: data.message,
        time: new Date().toLocaleString(),
      };

      const serviceId = import.meta.env.VITE_Service_ID;
      const templateId = import.meta.env.VITE_Template_ID;
      const userID = import.meta.env.VITE_Public_Key;

      //   console.log(serviceId, templateId, userID);

      await emailjs.send(serviceId, templateId, payload, {
        publicKey: userID,
      });
    } catch (error) {
      console.log("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      // alert("Message sent successfully");
      toast.success(`Message sent successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      reset();
    }
  };

  return (
    <section className=" px-10 flex justify-center gap-5 ">
      <div className="hero flex-1  my-10 ">
        <div className="hero-content flex-col lg:flex-col w-full max-w-2xl bg-white rounded-lg shadow-xl p-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Contact Us
            </h1>
          </div>
          <div className="divider p-0 m-0"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            {/* Name Field */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name:</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Emai:</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Your Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Message:</span>
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters long",
                  },
                })}
                className={`textarea textarea-bordered w-full h-24 ${
                  errors.message ? "textarea-error" : ""
                }`}
                placeholder="Your Message"
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button type="submit" className="btn btn-neutral w-full">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 justify-center items-center flex">
        <img src={img} alt="" className="w-96 h-96 object-cover" />
      </div>
    </section>
  );
};

export default ContactForm;
