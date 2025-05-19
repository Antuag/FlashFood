import React from "react";
import {
    PieChart, Pie, Cell, Tooltip as TooltipPie, Legend as LegendPie,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as TooltipBar, Legend as LegendBar,
    LineChart, Line, XAxis as XAxisLine, YAxis as YAxisLine, CartesianGrid as CartesianGridLine, Tooltip as TooltipLine, Legend as LegendLine
} from "recharts";

import { circularData, seriesData } from "../mockData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const WIDTH = 400;
const HEIGHT = 300;
const PIE_OUTER_RADIUS = 100;

// --- Gráficos circulares ---

export function GraficoCircular1() {
    return (
        <PieChart width={300} height={300}>
            <Pie data={circularData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {circularData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <TooltipPie />
            <LegendPie />
        </PieChart>
    );
}

export function GraficoCircular2() {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];
    return (
        <PieChart width={300} height={300}>
            <Pie data={circularData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {circularData.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <TooltipPie />
            <LegendPie />
        </PieChart>
    );
}

export function GraficoCircular3() {
    return (
        <PieChart width={300} height={300}>
            <Pie data={circularData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label />
            <TooltipPie />
            <LegendPie />
        </PieChart>
    );
}

// --- Gráficos de barras ---
// Ahora reciben la data como prop

export function GraficoBarras1({ data }) {
    return (
        <BarChart width={350} height={250} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <TooltipBar />
            <LegendBar />
            <Bar dataKey="ventas" fill="#8884d8" />
        </BarChart>
    );
}

export function GraficoBarras2({ data }) {
    return (
        <BarChart width={350} height={250} data={data} margin={{ top: 10, right: 20, left: 15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <TooltipBar />
            <LegendBar />
            <Bar dataKey="ventas" fill="#82ca9d" />
        </BarChart>
    );
}

export function GraficoBarras3({ data }) {
    return (
        <BarChart width={350} height={250} data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <TooltipBar />
            <LegendBar />
            <Bar dataKey="ventas" fill="#ffc658" />
        </BarChart>
    );
}

// --- Gráficos de series temporales ---

export function GraficoSeries1() {
    return (
        <LineChart width={350} height={220} data={seriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
    return (
        <LineChart width={350} height={220} data={seriesData} margin={{ top: 10, right: 20, left: 15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <TooltipLine />
            <LegendLine />
            <Line type="monotone" dataKey="valor" stroke="#82ca9d" />
        </LineChart>
    );
}

export function GraficoSeries3() {
    return (
        <LineChart width={350} height={220} data={seriesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <TooltipLine />
            <LegendLine />
            <Line type="monotone" dataKey="valor" stroke="#ffc658" />
        </LineChart>
    );
}
