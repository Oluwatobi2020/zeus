import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan",
    "Total Pending Tickets": 120,
    "Total Resolved Tickets": 85,
    "Total Closed Tickets": 45,
  },
  {
    name: "Feb",
    "Total Pending Tickets": 90,
    "Total Resolved Tickets": 110,
    "Total Closed Tickets": 60,
  },
  {
    name: "Mar",
    "Total Pending Tickets": 75,
    "Total Resolved Tickets": 130,
    "Total Closed Tickets": 70,
  },
  {
    name: "Apr",
    "Total Pending Tickets": 60,
    "Total Resolved Tickets": 95,
    "Total Closed Tickets": 80,
  },
  {
    name: "May",
    "Total Pending Tickets": 85,
    "Total Resolved Tickets": 120,
    "Total Closed Tickets": 100,
  },
  {
    name: "Jun",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Jul",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Aug",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Sep",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Oct",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Nov",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
  {
    name: "Dec",
    "Total Pending Tickets": 0,
    "Total Resolved Tickets": 0,
    "Total Closed Tickets": 0,
  },
];

function Chart() {
  return (
    <ResponsiveContainer
      height={500}
      width="100%"
      className="md:mx-auto w-full"
    >
      <ComposedChart width={10000} height={300} data={data}>
        <Legend verticalAlign="top" height={36} />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis domain={[0, 140]} />
        <Tooltip />

        <Line type="monotone" dataKey="Total Closed Tickets" stroke="#0000FF" />
        <Line
          type="monotone"
          dataKey="Total Resolved Tickets"
          stroke="#FFFF00"
        />
        <Line
          type="monotone"
          dataKey="Total Pending Tickets"
          stroke="#FF0000"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Chart;
