// src/components/Dashboard.jsx
import React, { useMemo } from "react";
import Layout from "./Layout";
import {
  ShoppingBag,
  BarChart3,
  UserPlus,
  PieChart,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const salesData = useMemo(
    () => [
      { name: "Q1 2023", value: 1500 },
      { name: "Q2 2023", value: 4000 },
      { name: "Q3 2023", value: 9000 },
      { name: "Q4 2023", value: 4800 },
    ],
    []
  );

  const visitorsData = useMemo(
    () => [
      { day: "Mon", visitors: 200 },
      { day: "Tue", visitors: 400 },
      { day: "Wed", visitors: 150 },
      { day: "Thu", visitors: 700 },
      { day: "Fri", visitors: 600 },
      { day: "Sat", visitors: 450 },
      { day: "Sun", visitors: 800 },
    ],
    []
  );

  return (
    <Layout title="Aya Pulseboard">
      {/* Executive summary */}
      <section className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-1">
          EXECUTIVE SUMMARY
        </p>
        <h1 className="text-3xl font-bold">Aya Pulseboard</h1>
        <p className="text-gray-600">
          Track your product funnels, customer health, and revenue in one
          adaptive view.
        </p>
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          color="from-blue-600 to-blue-400"
          title="ORDERS"
          value="122"
          desc="New orders today"
          icon={<ShoppingBag size={32} color="white" />}
        />
        <StatCard
          color="from-green-600 to-green-400"
          title="ENGAGEMENT"
          value="21%"
          desc="Bounce rate"
          icon={<BarChart3 size={32} color="white" />}
        />
        <StatCard
          color="from-orange-500 to-orange-300"
          title="GROWTH"
          value="62"
          desc="New registrations"
          icon={<UserPlus size={32} color="white" />}
        />
        <StatCard
          color="from-pink-500 to-pink-400"
          title="REACH"
          value="122"
          desc="Unique visitors"
          icon={<PieChart size={32} color="white" />}
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-2">Sales performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="30%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-2">Visitors per day</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitorsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#06b6d4">
                {visitorsData.map((_, idx) => (
                  <Cell key={idx} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>
    </Layout>
  );
}

function StatCard({ color, title, value, desc, icon }) {
  return (
    <motion.div
      className={`rounded-2xl p-4 shadow-xl bg-gradient-to-br ${color} text-white`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold">{title}</h3>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-sm opacity-80">{desc}</p>
    </motion.div>
  );
}
