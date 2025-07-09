import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import { useAuth } from "./useAuth";

const useAllUser = () => {
  const axiosSecure = useAxiosSecure();
  //   const { user } = useAuth();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:3000/users");
      return res.data;
    },
  });

  return {
    data,
    isPending,
    error,
    refetch,
  };
};

export default useAllUser;
