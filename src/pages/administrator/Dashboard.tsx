import { DashboardOutlined } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

//Harcoded just for example purposes

const mockTechnicians = [
  { id: 1, name: "Carlos Pérez", jobsCompleted: 34 },
  { id: 2, name: "Ana Gómez", jobsCompleted: 27 },
  { id: 3, name: "Luis Fernández", jobsCompleted: 41 },
  { id: 4, name: "María Rodríguez", jobsCompleted: 22 },
];

const mockClients = [
  { id: 1, name: "Empresa X" },
  { id: 2, name: "Tienda Y" },
  { id: 3, name: "Negocio Z" },
  { id: 4, name: "Corporación W" },
];

const workDaysData = [
  { day: "Lunes", trabajos: 10 },
  { day: "Martes", trabajos: 15 },
  { day: "Miércoles", trabajos: 18 },
  { day: "Jueves", trabajos: 12 },
  { day: "Viernes", trabajos: 20 },
];

export const Dashboard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
        <DashboardOutlined className="h-12 w-12 mr-2" /> Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Técnicos</h2>
          <ul>
            {mockTechnicians.map((tech) => (
              <li key={tech.id} className="text-gray-600">
                {tech.name} - {tech.jobsCompleted} trabajos
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Clientes</h2>
          <ul>
            {mockClients.map((client) => (
              <li key={client.id} className="text-gray-600">
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Trabajos por Día
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workDaysData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trabajos" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
