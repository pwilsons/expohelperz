import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "suppliers.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GSMexhibition@2027";
const SECOND_ADMIN_PASSWORD = process.env.SECOND_ADMIN_PASSWORD || "ICUIvrDJdd@2027_Katsu";

// Helper to read/write JSON
const getData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
      {
        id: uuidv4(),
        type: "interpreter",
        name: "Elena Petrova",
        city: "Moscow",
        shortDescription: "Expert English-Russian interpreter for tech expos.",
        description: "Over 10 years of experience in IT and engineering exhibitions.",
        languages: "English, Russian",
        contactEmail: "elena@example.com",
        website: "https://elena-interprets.ru",
        imageUrl: "https://picsum.photos/seed/interpreter1/400/300",
        approved: true,
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        type: "stand_builder",
        name: "ExpoDesign Pro",
        city: "Moscow",
        shortDescription: "Creative stand design and high-quality construction.",
        description: "Full-cycle stand building services from concept to dismantling.",
        contactEmail: "info@expodesign.ru",
        website: "https://expodesign.ru",
        imageUrl: "https://picsum.photos/seed/stand1/400/300",
        approved: true,
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const saveData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/suppliers", (req, res) => {
    const { type, city, search } = req.query;
    let suppliers = getData().filter((s: any) => s.approved === true);

    if (type && type !== "all") {
      suppliers = suppliers.filter((s: any) => s.type === type);
    }
    if (city) {
      suppliers = suppliers.filter((s: any) => s.city.toLowerCase().includes((city as string).toLowerCase()));
    }
    if (search) {
      const q = (search as string).toLowerCase();
      suppliers = suppliers.filter((s: any) => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }

    res.json(suppliers);
  });

  app.get("/api/suppliers/:id", (req, res) => {
    const suppliers = getData();
    const supplier = suppliers.find((s: any) => s.id === req.params.id);
    if (supplier && (supplier.approved || req.query.admin === "true")) res.json(supplier);
    else res.status(404).json({ error: "Not found" });
  });

  // Public Registration
  app.post("/api/suppliers", (req, res) => {
    const supplier = req.body;
    const suppliers = getData();
    const newSupplier = { 
      ...supplier, 
      id: uuidv4(), 
      approved: false, 
      createdAt: new Date().toISOString() 
    };
    suppliers.push(newSupplier);
    saveData(suppliers);
    res.json({ success: true });
  });

  // Admin Login
  app.post("/api/admin/login", (req, res) => {
    const { p1, p2 } = req.body;
    if (p1 === ADMIN_PASSWORD && p2 === SECOND_ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid passwords" });
    }
  });

  // Admin Actions
  app.get("/api/admin/suppliers", (req, res) => {
    const { p1, p2 } = req.query;
    if (p1 !== ADMIN_PASSWORD || p2 !== SECOND_ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(getData());
  });

  app.post("/api/admin/suppliers", (req, res) => {
    const { p1, p2, supplier } = req.body;
    if (p1 !== ADMIN_PASSWORD || p2 !== SECOND_ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const suppliers = getData();
    const newSupplier = { 
      ...supplier, 
      id: uuidv4(), 
      approved: true, 
      createdAt: new Date().toISOString() 
    };
    suppliers.push(newSupplier);
    saveData(suppliers);
    res.json(newSupplier);
  });

  app.patch("/api/admin/suppliers/:id/approve", (req, res) => {
    const { p1, p2 } = req.body;
    if (p1 !== ADMIN_PASSWORD || p2 !== SECOND_ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const suppliers = getData();
    const index = suppliers.findIndex((s: any) => s.id === req.params.id);
    if (index !== -1) {
      suppliers[index].approved = true;
      saveData(suppliers);
      res.json(suppliers[index]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.delete("/api/admin/suppliers/:id", (req, res) => {
    const { p1, p2 } = req.body;
    if (p1 !== ADMIN_PASSWORD || p2 !== SECOND_ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let suppliers = getData();
    suppliers = suppliers.filter((s: any) => s.id !== req.params.id);
    saveData(suppliers);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
