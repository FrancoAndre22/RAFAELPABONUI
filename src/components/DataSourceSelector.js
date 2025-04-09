import { useState, useEffect } from "react";

const DataSourceSelector = () => {
  const [dataSource, setDataSource] = useState(
    localStorage.getItem("data-source") || "SqlServer"
  );

  const opciones = ["sql", "mysql", "mongo"];

  const handleChange = (e) => {
    const value = e.target.value;
    setDataSource(value);
    localStorage.setItem("data-source", value);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="font-semibold text-gray-700">Base de Datos:</label>
      <select
        value={dataSource}
        onChange={handleChange}
        className="border rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataSourceSelector;
