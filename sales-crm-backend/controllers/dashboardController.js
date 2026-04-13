import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ================= KPI CARDS =================

    const totalLeadsPromise = Lead.countDocuments();
    const unassignedPromise = Lead.countDocuments({ assignedTo: null });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const assignedThisWeekPromise = Lead.countDocuments({
      createdAt: { $gte: weekAgo },
      assignedTo: { $ne: null }
    });

    const activeSalespeoplePromise = Employee.countDocuments({
      status: "Active"
    });

    const closedLeadsPromise = Lead.countDocuments({ status: "Closed" });
    const assignedLeadsPromise = Lead.countDocuments({
      assignedTo: { $ne: null }
    });

    // Run KPI queries in parallel 🚀
    const [
      totalLeads,
      unassigned,
      assignedThisWeek,
      activeSalespeople,
      closedLeads,
      assignedLeads
    ] = await Promise.all([
      totalLeadsPromise,
      unassignedPromise,
      assignedThisWeekPromise,
      activeSalespeoplePromise,
      closedLeadsPromise,
      assignedLeadsPromise
    ]);

    const conversionRate = assignedLeads
      ? ((closedLeads / assignedLeads) * 100).toFixed(1)
      : 0;

    // ================= SALES GRAPH (AGGREGATION 🚀) =================

    const last14Days = new Date();
    last14Days.setDate(last14Days.getDate() - 14);

    const graphData = await Lead.aggregate([
      {
        $match: { createdAt: { $gte: last14Days } }
      },
      {
        $group: {
          _id: {
            day: { $dayOfWeek: "$createdAt" }
          },
          assigned: {
            $sum: {
              $cond: [{ $ne: ["$assignedTo", null] }, 1, 0]
            }
          },
          closed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Closed"] }, 1, 0]
            }
          }
        }
      }
    ]);

    const daysMap = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const salesGraph = graphData.map(d => ({
      day: daysMap[d._id.day - 1],
      conversion: d.assigned ? Number(((d.closed / d.assigned) * 100).toFixed(1)) : 0
    }));

    // ================= RECENT ACTIVITY =================

    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select("name createdAt");

    const recentEmployees = await Employee.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name createdAt");

    const recentActivity = [
      ...recentLeads.map(l => ({
        text: `Lead ${l.name} created`,
        date: l.createdAt
      })),
      ...recentEmployees.map(e => ({
        text: `Employee ${e.name} added`,
        date: e.createdAt
      }))
    ]
      .sort((a,b)=> new Date(b.date)-new Date(a.date))
      .slice(0,7);

    // ================= TOP EMPLOYEES =================

    const topEmployees = await Employee.find({ status: "Active" })
      .limit(5)
      .select("name email employeeId assignedLeads closedLeads status");

    // ================= FINAL RESPONSE =================

    res.json({
      totalLeads,
      unassigned,
      assignedThisWeek,
      activeSalespeople,
      conversionRate,
      salesGraph,
      recentActivity,
      topEmployees
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};