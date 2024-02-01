import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any;
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p>Pages: {payload[0].payload.pv.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

const UsageChart = ({ data }: Props) => {
  const formattedData = data.map((record: any) => ({
    name: new Date(record._created_at).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    }),
    pv: Number(record.totalPages.toFixed(2)),
  }));

  const combinedData = formattedData.reduce((acc: any, record: any) => {
    if (acc[record.name]) {
      acc[record.name].pv += Number(record.pv.toFixed(2));
    } else {
      acc[record.name] = { ...record };
    }
    return acc;
  }, {});

  const finalData = Object.values(combinedData);

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={500} height={300} data={finalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#dfe3eb" }} />
        <Bar dataKey="pv" fill="#04a8b7" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
