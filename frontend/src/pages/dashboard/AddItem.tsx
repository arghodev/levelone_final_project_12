import TitleSection from "../../components/shared/TitleSection";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

type Inputs = {
  recipeName: string;
  category: string;
  price: number;
  image: string;
  recipeDetails: string;
};

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItemPage = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.recipeName,
        recipeDetails: data.recipeDetails,
        image: res.data.data.display_url,
        category: data.category,
        price: data.price,
      };

      axiosSecure.post("/menu", menuItem).then((res) => {
        if (res.data.insertedId) {
          toast.success("Item added successfully", {
            position: "top-right",
            theme: "colored",
          });

          console.log(res.data);
        }
      });
    }
    // Simulate async request
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    reset();
    setLoading(false);
  };

  return (
    <section>
      <div>
        <TitleSection heading="Add an Item" subheading="what's new" />
      </div>
      <div className="bg-base-200 p-10 rounded-2xl drop-shadow-xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset text-xl">
            <legend className="fieldset-legend ">Recipe Name*:</legend>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("recipeName", { required: true })}
              className="input"
            />
            <p className="text-red-500 text-sm italic ">
              {errors.recipeName && <span>This field is required*</span>}
            </p>
          </fieldset>
          <div className="flex justify-between items-center">
            <fieldset className="fieldset text-xl  ">
              <legend className="fieldset-legend">Category*:</legend>
              {/* <label className="input">Category Selection</label> */}
              <select
                defaultValue="default"
                className="select  text-lg w-[200px] max-w-sm"
                {...register("category", { required: "Category is required!" })}
              >
                <option value="default" disabled>
                  Selecte a category
                </option>
                <option value="salad"> Salad </option>
                <option value="pizza"> Pizza </option>
                <option value="soup"> Soup </option>
                <option value="drinks"> Drinks </option>
                <option value="dessert"> Dessert </option>
              </select>
              <p className="text-red-500 text-sm italic ">
                {errors.category && <span>This field is required*</span>}
              </p>
            </fieldset>
            <fieldset className="fieldset text-xl">
              <legend className="fieldset-legend">Price*:</legend>
              <input
                type="text"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input"
              />
              <p className="text-red-500 text-sm italic ">
                {errors.price && <span>This field is required*</span>}
              </p>
            </fieldset>
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Recipe Details:</legend>
            <textarea
              className="textarea  w-full"
              placeholder=" description"
              {...register("recipeDetails", { required: true })}
            ></textarea>
            <p className="text-red-500 text-sm italic ">
              {errors.recipeDetails && <span>This field is required*</span>}
            </p>
          </fieldset>
          <fieldset className="fieldset">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-neutral"
            />
            <p className="text-red-500 text-sm italic ">
              {errors.image && <span>This field is required*</span>}
            </p>
          </fieldset>

          <div className="divider"></div>
          {/* <input className="btn btn-wide" type="submit" />
           */}
          <div>
            <button
              type="submit"
              className="btn btn-wide btn-lg btn-neutral hover:bg-warning hover:text-black border-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm text-warning"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <GiKnifeFork className=" text-2xl font-bold mr-2 animate-bounce " />
                  Add Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddItemPage;
