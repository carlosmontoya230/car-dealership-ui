import { useEffect, useState } from "react";
import Table from "../../components/molecules/table/Table";
import Modal from "../../components/molecules/modal/Modal";
import Select from "../../components/atoms/selects/Select";
import httpClient from "../../api/httpClient";
import "./BookingPage.css";

export default function BookingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchVehicles();
  }, []);

  function fetchBookings() {
    httpClient
      .get("/booking/get-all")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }

  function fetchVehicles() {
    httpClient
      .get("/cars")
      .then((res) => setVehicles(res.data))
      .catch(() => setVehicles([]));
  }

  const columns = [
    {
      key: "vehicleDetails",
      label: "Vehículo",
      render: (row: any) =>
        row.vehicleDetails
          ? `${row.vehicleDetails.brand} ${row.vehicleDetails.model} (${row.vehicleDetails.carPlate})`
          : "",
    },
    {
      key: "startDate",
      label: "Inicio",
      render: (row: any) =>
        row.startDate
          ? new Date(Number(row.startDate)).toLocaleDateString()
          : "",
    },
    {
      key: "endDate",
      label: "Fin",
      render: (row: any) =>
        row.endDate ? new Date(Number(row.endDate)).toLocaleDateString() : "",
    },
    { key: "status", label: "Estado" },
  ];

  function handleAdd() {
    setModalOpen(true);
    setEditId(null);
    setVehicleId("");
    setStartDate("");
    setEndDate("");
  }

  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vehicleId || !startDate || !endDate) return;
    setLoading(true);

    const body = {
      vehicleId,
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
    };

    try {
      await httpClient.post("/booking/create", body);
      setSuccessMessage("¡Reserva creada exitosamente!");
      setModalOpen(false);
      setEditId(null);
      fetchBookings();
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  }

  async function handleCancel(id: string) {
    await httpClient.put(`/booking/${id}/cancel`);
    setSuccessMessage("¡Reserva cancelada correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchBookings();
  }

  async function handleFinish(id: string) {
    await httpClient.put(`/booking/${id}/finish`);
    setSuccessMessage("¡Reserva finalizada correctamente!");
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchBookings();
  }

  return (
    <div className="booking-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="booking-header">
        <span className="booking-title">Reservas</span>
        <button
          className="add-booking-btn"
          onClick={handleAdd}
          title="Agregar reserva"
        >
          <span role="img" aria-label="add">
            ⏰
          </span>
        </button>
      </div>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        <Table
          columns={columns}
          data={bookings}
          actions={(row) => (
            <>
              <button title="Cancelar" onClick={() => handleCancel(row.id)}>
                🗑️
              </button>
              <button title="Finalizar" onClick={() => handleFinish(row.id)}>
                ✅
              </button>
            </>
          )}
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "2rem 0",
            color: "#23326b",
            fontWeight: 600,
          }}
        >
          No hay reservas
        </div>
      )}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditId(null);
        }}
        title="Agregar reserva"
      >
        <form onSubmit={handleModalSubmit} className="booking-form">
          <label>
            Vehículo:
            <Select
              options={vehicles.map((v: any) => ({
                label: `${v.brand} ${v.model} (${v.carPlate})`,
                value: v.id,
              }))}
              value={vehicleId}
              onChange={(selected) => setVehicleId(String(selected))}
              placeholder="Selecciona vehículo"
            />
          </label>
          <label>
            Fecha inicio:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha fin:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
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
