import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";

/* =====================================================
   CREATE LEAD + AUTO ASSIGN EMPLOYEE
   ===================================================== */
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, language, source } = req.body;

    // 1️⃣ find employees matching language
    const matchingEmployees = await Employee.find({
      language: language,
      status: "Active"
    });

    let assignedEmployee = null;

    // 2️⃣ if employees found → pick one with least leads
    if (matchingEmployees.length > 0) {
      const employeesWithLeadCount = await Promise.all(
        matchingEmployees.map(async (emp) => {
          const leadCount = await Lead.countDocuments({
            assignedTo: emp._id
          });

          return { emp, leadCount };
        })
      );

      employeesWithLeadCount.sort((a, b) => a.leadCount - b.leadCount);
      assignedEmployee = employeesWithLeadCount[0].emp._id;
    }

    // 3️⃣ create lead
    const newLead = await Lead.create({
      name,
      email,
     
      language,
      source,
      assignedTo: assignedEmployee
    });

    res.status(201).json(newLead);

  } catch (err) {
    console.error("CREATE LEAD ERROR:", err);
    res.status(500).json({ message: "Server error while creating lead" });
  }
};

/* =====================================================
   GET ALL LEADS (with employee name)
   ===================================================== */
export const getLeads = async (req, res) => {
  try {
    // page from query ?page=1
    const page = Number(req.query.page) || 1;
    const limit = 5; // leads per page
    const skip = (page - 1) * limit;

    // total count
    const total = await Lead.countDocuments();

    // get paginated leads + employee name
    const leads = await Lead.find()
      .populate("assignedTo", "name") // 🔥 show employee name
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      leads,
      page,
      pages: Math.ceil(total / limit),
      total
    });

  } catch (err) {
    console.log("GET LEADS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   DELETE LEAD
   ===================================================== */
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};