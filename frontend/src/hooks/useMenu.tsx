// import { useEffect, useState } from "react";
// import type { MenuItem } from "../types/propsTypes";

// type UseMenuReturn = {
//   menu: MenuItem[];
//   loading: boolean;
// };
// const useMenu = (): UseMenuReturn => {
//   const [menu, setMenu] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:3000/menu")
//       .then((res) => res.json())
//       .then((data) => {
//         setMenu(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading menu:", err);
//         setLoading(false);
//       });
//   }, []);

//   return { menu, loading };
// };

// export default useMenu;

import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "../types/propsTypes";
import useAxiosPublic from "./useAxiosPublic";
// import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: menu = [],
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<MenuItem[], Error>({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("http://localhost:3000/menu");
      return res.data;
    },
  });

  if (isError) {
    console.error("Error loading menu:", error.message);
  }

  return { menu, loading, refetch };
};

export default useMenu;
