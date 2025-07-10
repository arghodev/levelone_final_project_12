import { MdDelete } from "react-icons/md";
import TitleSection from "../../components/shared/TitleSection";
import useAllUser from "../../hooks/useAllUser";
import type { IUser } from "../../types/propsTypes";
import { FaUserAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { data = [], refetch } = useAllUser();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id: string | undefined) => {
    console.log(id);
    axiosPublic
      .delete(`/users/admin/${id}`)
      .then((res: { data: { deletedCount: number } }) => {
        if (res.data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
          console.log(res.data);
        }
      });
  };

  const handleMakeAdmin = (user: IUser) => {
    // console.log(user);
    axiosPublic
      .patch(`/users/admin/${user._id}`)
      .then((res: { data: { modifiedCount: number } }) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`${user.name} is an Admin Now!`);
          refetch();
          // console.log(res.data);
        }
      });
  };

  return (
    <section className="">
      <div>
        <TitleSection heading="Manager All Users" subheading="How many" />
      </div>
      <div>
        <div className="flex justify-between border-t-2 border-b-2 border-black/20 py-5 items-center bg-amber-500 px-5 rounded-t-2xl">
          <h1 className="text-3xl ">
            Total Users:{" "}
            <span className="font-black text-white"> {data.length || 0} </span>
          </h1>
        </div>
        <div className="drop-shadow-lg">
          <div className="overflow-x-auto ">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email </th>
                  <th>Role</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user: IUser) => (
                  <>
                    {/* row 1 */}
                    <tr key={user._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={user.photoURL}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge  badge-md">{user.email}</span>
                      </td>
                      <td className="text-lg">
                        <span className="font-black">
                          {user.role == "admin" ? (
                            "Admin"
                          ) : (
                            <button
                              onClick={() => handleMakeAdmin(user)}
                              className="btn btn-soft  font-black hover:text-amber-500 hover:bg-white text-white bg-amber-500 border-0"
                            >
                              {user.role}
                              <FaUserAlt className="text-xl" />
                            </button>
                          )}
                        </span>
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-soft font-black hover:text-white hover:bg-red-500 text-red-500 bg-white border-0"
                        >
                          <MdDelete className="text-2xl" />
                        </button>
                      </th>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="bg-amber-500  rounded-b-2xl w-full h-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
