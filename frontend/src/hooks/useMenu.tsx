import { useEffect, useState } from "react";
import type { MenuItem } from "../types/propsTypes";

const useMenu = (): [MenuItem[], boolean] => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading menu:", err);
        setLoading(false);
      });
  }, []);

  return [menu, loading];
};

export default useMenu;
