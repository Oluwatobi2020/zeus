import Card from "react-bootstrap/Card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { agent: "Tolu", value: 3000 },
  { agent: "Jeremiah", value: 6000 },
  { agent: "Israel", value: 3000 },
];

const COLORS = [
  {
    color: "#FF0000",
    text: "Failed",
  },
  {
    color: "#008000",
    text: "Pending",
  },
  {
    color: "#0000FF",
    text: "Successful",
  },
];

const baseColor = "#64154A";

function PieChartSection() {
  return (
    <Card
      className="shadow-sm border-0"
      style={{ backgroundColor: "#F9F5F7", color: baseColor }}
    >
      <Card.Body>
        <Card.Title
          className="mb-3"
          style={{ fontSize: "15px", fontWeight: "600", color: baseColor }}
        >
          Resolve Tickets Per Agent
        </Card.Title>
        <Card.Text
          className="fw-bold mb-0 d-flex justify-content-center"
          style={{ height: "300px", overflowY: "auto", fontSize: "13px" }}
        >
          <ResponsiveContainer height={280} width="100%" className="mx-auto">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                // labelLine={false}
                label={({ agent }) => agent}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length].color}
                  />
                ))}
                {/* <LabelList dataKey="agent" position="inside" fill="#fff" /> */}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PieChartSection;
