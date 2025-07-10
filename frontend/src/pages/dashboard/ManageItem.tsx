import { FaEdit } from "react-icons/fa";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import TitleSection from "../../components/shared/TitleSection";
import useMenu from "../../hooks/useMenu";
import type { MenuItem } from "../../types/propsTypes";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageItem = () => {
  const axiosSecure = useAxiosSecure();
  const { menu, loading, refetch } = useMenu();

  console.log(menu.length);

  const handleDelete = (item: MenuItem) => {
    if (!window.confirm(`Delete ${item.name}?`)) return;

    axiosSecure
      .delete(`/menu/${item._id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
        } else {
          toast.error("Failed to delete. Not found.");
        }
      })
      .catch((err) => {
        toast.error("Server error during delete");
        console.error(err);
      });
  };

  if (loading) {
    return <SkeletenLoader />;
  }

  return (
    <section>
      <div>
        <TitleSection heading="Manage all Item" subheading="hurry up" />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {menu.map((item: MenuItem) => (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <th>
                    <p className="text-balance font-black text-warning">
                      $ {item.price}{" "}
                    </p>
                  </th>
                  <th>
                    <button className="btn bg-black text-white hover:bg-white hover:text-black btn-md transition duration-300 border-0 drop-shadow-xl">
                      <FaEdit className="text-xl" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn bg-red-500 text-white hover:bg-white hover:text-red-500 btn-md transition duration-300 border-0 drop-shadow-2xl"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageItem;
