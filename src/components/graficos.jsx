import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as TooltipPie,
  Legend as LegendPie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipBar,
  Legend as LegendBar,
  LineChart,
  Line,
  XAxis as XAxisLine,
  YAxis as YAxisLine,
  CartesianGrid as CartesianGridLine,
  Tooltip as TooltipLine,
  Legend as LegendLine,
} from "recharts";

import { useEffect, useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const WIDTH = 400;
// const HEIGHT = 300;
// const PIE_OUTER_RADIUS = 100;

// --- Gráficos circulares ---

export function GraficoCircular1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://e60710d6-b720-49ae-8edf-d2aa5f6802cc.mock.pstmn.io/circular1"
    )
      // cambia por tu endpoint real
      .then((response) => response.json())
      .then((data) => {
        // Verifica si es un array
        if (Array.isArray(data)) {
          console.log("circular", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

export function GraficoCircular2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://e276901f-cc2d-4b09-895d-96a133ae1497.mock.pstmn.io/circular2")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("circular 2", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

export function GraficoCircular3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://8951956a-1375-462c-b4b8-614c1a8758b4.mock.pstmn.io/circular3")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("circular 3", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        startAngle={180}
        endAngle={0}
        outerRadius={80}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[(index + 1) % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

// --- Gráficos de barras ---
// Ahora reciben la data como prop

export function GraficoBarras1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://5fb19935-ec93-4efd-a647-7f2f2a469d20.mock.pstmn.io/barras1")
      // cambia por tu endpoint real
      .then((response) => response.json())
      .then((data) => {
        // Verifica si es un array
        if (Array.isArray(data)) {
          console.log("barras", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;
  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#8884d8" />
    </BarChart>
  );
}

export function GraficoBarras2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://e26c12e4-f99e-4bdd-a6eb-59d060cf7447.mock.pstmn.io/barras2")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("barras 2", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 10, right: 20, left: 15, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#00C49F" />
    </BarChart>
  );
}

export function GraficoBarras3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://429b740c-1210-44dc-8ae9-5113fa509fc5.mock.pstmn.io/barras4")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("barras 3", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#FF8042" />
    </BarChart>
  );
}

// --- Gráficos de series temporales ---

export function GraficoSeries1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://0d6651f3-9918-4054-850a-b429c71a8734.mock.pstmn.io/barras3")
      // cambia por tu endpoint real
      .then((response) => response.json())
      .then((data) => {
        // Verifica si es un array
        if (Array.isArray(data)) {
          console.log("Series", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;
  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" />
    </LineChart>
  );
}

export function GraficoSeries2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://c49ea535-f49a-463a-8e01-1c42c4db08d9.mock.pstmn.io/series2")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("series 2", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 10, right: 30, left: 15, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="monotone" dataKey="valor" stroke="#FF8042" />
    </LineChart>
  );
}

export function GraficoSeries3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://69f1a0e4-9e78-4247-8789-d693e5dd3c9f.mock.pstmn.io/series3")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("series 3", data);
          setData(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="4 1" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="step" dataKey="valor" stroke="#00C49F" />
    </LineChart>
  );
}