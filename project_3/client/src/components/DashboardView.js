import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './DashboardView.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// truncate long labels for axis
const truncate = (str, len = 18) => {
  if (!str) return '';
  return str.length > len ? `${str.slice(0, len - 1)}…` : str;
};

// quick check for ISO-like date strings
const isDateString = (str) => {
  if (!str || typeof str !== 'string') return false;
  return !isNaN(Date.parse(str));
};

// try to detect epoch seconds vs milliseconds and format
const formatPossibleEpoch = (val) => {
  const n = Number(val);
  if (Number.isNaN(n)) return null;
  // ms epoch (13+ digits)
  if (Math.abs(n) > 1e12) return new Date(n);
  // seconds (10 digits)
  if (Math.abs(n) > 1e9) return new Date(n * 1000);
  return null;
};

const DashboardView = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasData, setHasData] = useState(false);
  const [hoveredTick, setHoveredTick] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Custom XAxis tick that truncates and expands on hover
  const CustomTick = ({ x, y, payload, data = [], maxTicks = 15 }) => {
    const value = payload?.value;
    if (!value) return null;
    const index = data.findIndex(d => String(d.name) === String(value));
    const len = data.length || 0;
    const step = Math.max(1, Math.ceil(len / maxTicks));
    if (index !== -1) {
      if (index % step !== 0 && index !== len - 1) return null;
    }

    let display = truncate(String(value), 20);
    if (hoveredTick === value) {
      if (isDateString(value)) {
        display = new Date(value).toLocaleDateString();
      } else {
        const epochDate = formatPossibleEpoch(value);
        if (epochDate) display = epochDate.toLocaleDateString();
        else display = String(value);
      }
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          className="x-tick"
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          transform="rotate(-45)"
          onMouseEnter={() => setHoveredTick(value)}
          onMouseLeave={() => setHoveredTick(null)}
        >
          {display}
          <title>{String(value)}</title>
        </text>
      </g>
    );
  };
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/analytics/dashboard');

      if (response.data.hasData) {
        setAnalytics(response.data.analytics);
        setHasData(true);
      } else {
        setHasData(false);
        setError(response.data.message || 'No data available');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load analytics');
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="dashboard-view">
        <div className="no-data">
          <h2>No Data Available</h2>
          <p>{error || 'Please upload a file to view analytics'}</p>
          <p className="hint">Go to "Add File" to upload your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-view">
      <h2 className="view-title">Analytics Dashboard</h2>

      {analytics?.summary && (
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Rows</h3>
            <p className="summary-value">{analytics.summary.totalRows}</p>
          </div>
          <div className="summary-card">
            <h3>Total Columns</h3>
            <p className="summary-value">{analytics.summary.totalColumns}</p>
          </div>
          {Object.keys(analytics.summary).filter(k => k !== 'totalRows' && k !== 'totalColumns').map(key => (
            <div key={key} className="summary-card">
              <h3>{key}</h3>
              <div className="summary-stats">
                <p>Avg: {analytics.summary[key].avg?.toFixed(2)}</p>
                <p>Min: {analytics.summary[key].min}</p>
                <p>Max: {analytics.summary[key].max}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {analytics?.pieCharts && analytics.pieCharts.length > 0 && (
        <div className="charts-section">
          <h3 className="section-title">Distribution Charts</h3>
          <div className="charts-grid">
            {analytics.pieCharts.map((chart, index) => (
              <div key={index} className="chart-card">
                <h4>{chart.title}</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chart.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chart.data.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics?.barCharts && analytics.barCharts.length > 0 && (
        <div className="charts-section">
          <h3 className="section-title">Bar Charts</h3>
          <div className="charts-grid">
            {analytics.barCharts.map((chart, index) => (
              <div key={index} className="chart-card">
                <h4>{chart.title}</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics?.lineCharts && (
        (() => {
          const desired = ['Time-Sales', 'order_id', 'price'];
          const selected = desired.map(d => {
            const exact = analytics.lineCharts.find(c => c.title === `Trend: ${d}`);
            if (exact) return exact;
            const partial = analytics.lineCharts.find(c => c.title.toLowerCase().includes(d.toLowerCase()));
            return partial || null;
          }).filter(Boolean);

          if (selected.length === 0) return null;

          return (
            <div className="charts-section">
              <h3 className="section-title">Trend Charts</h3>
              <div className="charts-grid">
                {selected.map((chart, index) => (
                  <div key={index} className="chart-card trend-card">
                    <h4>{chart.title}</h4>
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={chart.data} margin={{ top: 12, right: 20, left: 8, bottom: 60 }}>
                        <defs>
                          <linearGradient id={`trendGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                          dataKey="name"
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 11, fill: '#6b7280' }}
                          tickFormatter={(value, index) => {
                            const len = chart?.data?.length || 0;
                            if (len === 0) return '';
                            const maxTicks = Math.min(20, len);
                            const step = Math.max(1, Math.ceil(len / maxTicks));
                            if (index % step !== 0 && index !== len - 1) return '';

                            // format dates and epochs
                            if (isDateString(value)) {
                              try { return new Date(value).toLocaleDateString(); } catch (e) { /* ignore */ }
                            }
                            const epochDate = formatPossibleEpoch(value);
                            if (epochDate) return epochDate.toLocaleDateString();

                            return truncate(String(value), 30);
                          }}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => (typeof v === 'number' ? v.toLocaleString() : v)}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.08)'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={COLORS[index % COLORS.length]}
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6 }}
                          fill={`url(#trendGrad-${index})`}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </div>
          );
        })()
      )}

      {analytics?.aiInsights && analytics.aiInsights.length > 0 && (
        <div className="charts-section ai-section">
          <h3 className="section-title">AI Driven Response</h3>
          <div className="ai-insights-grid">
            {analytics.aiInsights.map((insight, index) => (
              <div key={index} className="ai-insight-card">
                <div className="ai-icon">✨</div>
                <div className="ai-text" dangerouslySetInnerHTML={{
                  __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;

