import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import { FaTasks, FaUsers } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  console.log(data);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data3 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  if (isLoading) {
    return <SkeletenLoader />;
  }

  return (
    <div>
      <h2 className="text-3xl display font-bold">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div>
        <div className="stats shadow-2xl mt-5 border-5 border-warning bg-black ">
          <div className="stat">
            <div className="stat-title text-lg bg-warning text-white px-2 rounded-xl ">
              Total Users
            </div>
            <div className="stat-value  flex items-center justify-around  text-white ">
              {data.users}
              <FaUsers className=" text-warning text-4xl" />
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-lg bg-warning text-white px-2 rounded-xl   ">
              Total Menu Items
            </div>
            <div className="stat-value  flex items-center justify-around  text-white ">
              {" "}
              {data.menuItems}{" "}
              <MdOutlineRestaurantMenu className=" text-warning text-4xl" />
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-lg bg-warning text-white px-2 rounded-xl   ">
              Total Order
            </div>
            <div className="stat-value  flex items-center justify-around text-white  ">
              {" "}
              {data.orders} <FaTasks className=" text-warning text-4xl" />
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure  flex items-center justify-around ">
              <div className="avatar avatar-online">
                <div className="w-16 rounded-full ">
                  <img src={user?.photoURL || ""} />
                </div>
              </div>
            </div>
            <div className="stat-value text-warning">95%</div>
            <div className="stat-title italic text-white">
              Customers <br /> Satisfaction
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-5">
        <div>
          <BarChart
            width={500}
            height={300}
            data={data2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data3}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data3.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
