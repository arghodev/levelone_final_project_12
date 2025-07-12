import { MdDelete } from "react-icons/md";
import useCart from "../../hooks/useCart";
import type { CartItem } from "../../types/propsTypes";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import { Link } from "react-router";
import { toast } from "react-toastify";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data = [] } = useCart();
  const { user } = useAuth();
  // console.log(data[0]._id);

  if (!user || !data) {
    return <SkeletenLoader />;
  }

  const totalPrice = data?.reduce(
    (sum: number, item: CartItem): number => Number(sum) + Number(item.price),
    0
  );

  const handleDelete = (id: string | undefined) => {
    console.log(id);
    axiosSecure.delete(`/carts/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Deleted Successfully");
        refetch();
        console.log(res.data);
      }
    });
  };

  return (
    <section className="container mx-auto">
      <div className="flex justify-between border-t-2 border-b-2 border-black/20 py-5 items-center">
        <h1 className="text-xl ">
          Total Order: <span className="font-black "> {data.length || 0} </span>
        </h1>
        <h1 className="text-xl ">
          Total Price: <span className="font-black"> ${totalPrice} </span>
        </h1>
        {data.length > 0 && (
          <Link to="/dashboard/payment">
            <button className="btn hover:bg-white hover:text-black transition-all duration-300 bg-black text-white font-black border-0">
              PAY
            </button>
          </Link>
        )}
      </div>
      <div className="drop-shadow-lg">
        <div className="overflow-x-auto ">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Email </th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: CartItem) => (
                <>
                  {/* row 1 */}
                  <tr key={item._id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge  badge-md">{item.email}</span>
                    </td>
                    <td className="text-lg">
                      $ <span className="font-black   ">{item.price}</span>
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-soft btn-error font-black"
                      >
                        <MdDelete className="text-3xl" />
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
