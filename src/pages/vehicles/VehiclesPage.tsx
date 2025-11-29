import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import httpClient from "../../api/httpClient";
import Select from "../../components/atoms/selects/Select";
import Modal from "../../components/molecules/modal/Modal";
import Table from "../../components/molecules/table/Table";
import "./VehiclesPage.css";

export default function VehiclesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [type, setType] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [color, setColor] = useState("");
  const [currentKm, setCurrentKm] = useState<number | "">("");
  const [status, setStatus] = useState("available");
  const [country, setCountry] = useState("");
  const [countryOpts, setCountryOpts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
    fetchCountries();
  }, []);

  function fetchVehicles() {
    httpClient
      .get("/cars")
      .then((res) => setVehicles(res.data))
      .catch(() => setVehicles([]));
  }

  function fetchCountries() {
    httpClient
      .get("/countries/getAll")
      .then((res) => setCountryOpts(res.data))
      .catch(() => setCountryOpts([]));
  }

  const columns = [
    { key: "brand", label: "Marca" },
    { key: "model", label: "Modelo" },
    { key: "year", label: "Año" },
    { key: "type", label: "Tipo" },
    { key: "carPlate", label: "Placa" },
    { key: "color", label: "Color" },
    { key: "currentKm", label: "Km actual" },
    { key: "status", label: "Estado" },
    { key: "country", label: "País" },
  ];

  function handleAdd() {
    setModalOpen(true);
    setEditId(null);
    setBrand("");
    setModel("");
    setYear("");
    setType("");
    setCarPlate("");
    setColor("");
    setCurrentKm("");
    setStatus("available");
    setCountry("");
  }

  function handleEdit(row: any) {
    setEditId(row.id);
    setBrand(row.brand || "");
    setModel(row.model || "");
    setYear(row.year || "");
    setType(row.type || "");
    setCarPlate(row.carPlate || "");
    setColor(row.color || "");
    setCurrentKm(row.currentKm || "");
    setStatus(row.status || "available");
    setCountry(row.country || "");
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !brand ||
      !model ||
      !year ||
      !type ||
      !carPlate ||
      !color ||
      !currentKm ||
      !status ||
      !country
    )
      return;

    setLoading(true);

    const body = {
      brand,
      model,
      year: Number(year),
      type,
      carPlate,
      color,
      currentKm: Number(currentKm),
      status,
      country,
    };

    try {
      if (editId) {
        await httpClient.put(`/cars/${editId}`, body);
        setSuccessMessage("¡Vehículo actualizado exitosamente!");
      } else {
        await httpClient.post("/cars", body);
        setSuccessMessage("¡Vehículo creado exitosamente!");
      }
      setModalOpen(false);
      setEditId(null);
      fetchVehicles();
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  }

  async function handleDelete(id: string) {
    await httpClient.delete(`/cars/${id}`);
    setSuccessMessage("¡Vehículo eliminado correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchVehicles();
  }

  return (
    <div className="vehicles-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="vehicles-header">
        <span className="vehicles-title">Vehículos</span>
        <button
          className="add-vehicle-btn"
          onClick={handleAdd}
          title="Agregar vehículo"
        >
          <AddIcon />
        </button>
      </div>
      <Table
        columns={columns}
        data={vehicles}
        actions={(row) => (
          <>
            <button title="Editar" onClick={() => handleEdit(row)}>
              ✏️
            </button>
            <button title="Eliminar" onClick={() => handleDelete(row.id)}>
              🗑️
            </button>
          </>
        )}
      />
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditId(null);
        }}
        title={editId ? "Editar vehículo" : "Agregar vehículo"}
      >
        <form onSubmit={handleModalSubmit} className="vehicle-form">
          <label>
            Marca:
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(e.target.value ? Number(e.target.value) : "")
              }
              required
              min={1900}
              max={2100}
            />
          </label>
          <label>
            Tipo:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </label>
          <label>
            Placa:
            <input
              type="text"
              value={carPlate}
              onChange={(e) => setCarPlate(e.target.value)}
              required
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </label>
          <label>
            Km actual:
            <input
              type="number"
              value={currentKm}
              onChange={(e) =>
                setCurrentKm(e.target.value ? Number(e.target.value) : "")
              }
              required
              min={0}
            />
          </label>
          <label>
            Estado:
            <Select
              options={[
                { label: "Disponible", value: "available" },
                { label: "En mantenimiento", value: "maintenance" },
                { label: "Rentado", value: "rented" },
                { label: "Inactivo", value: "inactive" },
              ]}
              value={status}
              onChange={(selected) => setStatus(String(selected))}
              placeholder="Selecciona estado"
            />
          </label>
          <label>
            País:
            <Select
              options={countryOpts.map((c: any) => ({
                label: c.name,
                value: c.name,
              }))}
              value={country}
              onChange={(selected) => setCountry(String(selected))}
              placeholder="Selecciona país"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
