import sql from "../config/db.js";

export const testPostgres = async (req, res) => {
  try {
    const result = await sql`SELECT now()`;

    res.json({
      success: true,
      message: "Postgres connected successfully",
      time: result[0].now
    });
  } catch (error) {
    console.error("Postgres error:", error);
    res.status(500).json({
      success: false,
      message: "Postgres connection failed",
      error: error.message
    });
  }
};
