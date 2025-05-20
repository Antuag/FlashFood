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
      "https://e1b99f61-6468-41a0-a670-70bad113a978.mock.pstmn.io/circular/1"
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
    fetch("https://d3c0915b-e134-4828-bacc-ed6e0e5cc2e2.mock.pstmn.io/circular2")
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
    fetch("https://3e05fdf4-e29c-47b0-89ca-c0e5c066f530.mock.pstmn.io/circular/3")
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
    fetch("https://77b29ac3-5a40-4645-9bbc-9b6dcea9ff11.mock.pstmn.io/barras/1")
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
    fetch("https://24f5c596-6ea7-4cf8-be33-2f7babc9890e.mock.pstmn.io/barras/2")
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
    fetch("https://aee59127-a9b0-42ff-8b7d-77ab19c94a46.mock.pstmn.io/barras/3")
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
    fetch("https://65d64d4f-2998-457a-838e-4b31da1e0259.mock.pstmn.io/series/1")
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
    fetch("https://3788c9ef-693a-4db8-a65c-e85acae032ac.mock.pstmn.io/series/2")
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
    fetch("https://54698b30-49d0-41bd-be6b-a96fd67ff92a.mock.pstmn.io/series/3")
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