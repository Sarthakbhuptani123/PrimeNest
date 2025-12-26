import { useState } from "react";
import "./analytics.scss";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { FaEye, FaHeart, FaCalendarCheck, FaChartLine } from "react-icons/fa";

// Mock Data for the chart
const data = [
    { name: 'Mon', views: 40, saves: 24, visits: 2 },
    { name: 'Tue', views: 30, saves: 13, visits: 1 },
    { name: 'Wed', views: 20, saves: 58, visits: 4 },
    { name: 'Thu', views: 27, saves: 39, visits: 3 },
    { name: 'Fri', views: 18, saves: 48, visits: 2 },
    { name: 'Sat', views: 23, saves: 38, visits: 5 },
    { name: 'Sun', views: 34, saves: 43, visits: 6 },
];

function Analytics() {
    const [timeRange, setTimeRange] = useState("Weekly");

    return (
        <div className="analytics-dashboard glass-panel">
            <div className="header">
                <div className="title">
                    <FaChartLine className="icon" />
                    <h2>Agent Analytics</h2>
                </div>
                <div className="tabs">
                    {["Weekly", "Monthly", "Yearly"].map((t) => (
                        <button
                            key={t}
                            className={timeRange === t ? "active" : ""}
                            onClick={() => setTimeRange(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="icon-box v"><FaEye /></div>
                    <div className="info">
                        <span>Total Views</span>
                        <h3>1,245</h3>
                        <p className="u">+12% this week</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-box s"><FaHeart /></div>
                    <div className="info">
                        <span>Interest (Saves)</span>
                        <h3>86</h3>
                        <p className="u">+5% this week</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-box i"><FaCalendarCheck /></div>
                    <div className="info">
                        <span>Visits Scheduled</span>
                        <h3>12</h3>
                        <p className="d">-2% this week</p>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <h3>Engagement Over Time</h3>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSaves" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="views" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                            <Area type="monotone" dataKey="saves" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorSaves)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
