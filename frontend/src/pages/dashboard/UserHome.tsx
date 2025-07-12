import { useAuth } from "../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <section>
      <h2 className="text-2xl display">
        Hi, Welcome Back{" "}
        <span> {user?.displayName ? user.displayName : "Again"} </span>
      </h2>
    </section>
  );
};

export default UserHome;
