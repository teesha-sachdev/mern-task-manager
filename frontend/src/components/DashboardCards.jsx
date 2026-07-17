import "./DashboardCards.css";

function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total || 0,
      color: "#4f46e5",
    },
    {
      title: "Pending",
      value: stats.pending || 0,
      color: "#f59e0b",
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      color: "#10b981",
    },
    {
      title: "High Priority",
      value: stats.highPriority || 0,
      color: "#ef4444",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <div
          key={card.title}
          className="dashboard-card"
          style={{ borderTop: `5px solid ${card.color}` }}
        >
          <h3>{card.title}</h3>
          <h1>{card.value}</h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;