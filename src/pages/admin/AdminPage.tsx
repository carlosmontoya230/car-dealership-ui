import { useEffect, useState } from "react";
import Table from "../../components/molecules/table/Table";

import httpClient from "../../api/httpClient";
import "./AdminPage.css";
import CheckboxGroup, {
  type CheckboxOption,
} from "../../components/atoms/checkbox/Checkbox";
import Modal from "../../components/molecules/modal/Modal";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [rolesOpts, setRolesOpts] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPassword, setEditPassword] = useState("");
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  function fetchUsers() {
    httpClient
      .get("users/all/Users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }

  function fetchRoles() {
    httpClient
      .get("users/all/roles")
      .then((res) => setRolesOpts(res.data))
      .catch(() => setRolesOpts([]));
  }

  function handleDelete(user: any) {
    setDeleteId(user.id);
  }

  async function confirmDelete() {
    if (deleteId) {
      await httpClient.delete(`users/delete-user/${deleteId}`);
      setSuccessMessage("¡Usuario eliminado correctamente!");
      setDeleteId(null);
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchUsers();
    }
  }

  function handleEdit(user: any) {
    setEditUser(user);
    setEditPassword("");
    setEditRoles(user.rolUsers?.map((r: any) => String(r.rol?.id)) || []);
    setEditModalOpen(true);
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editUser) return;
    const body: any = {
      name: editUser.name,
      email: editUser.email,
      phone: editUser.phone,
      address: editUser.address,
      rolUsers: editRoles,
    };
    if (editPassword) body.password = editPassword;
    await httpClient.post(`users/update/${editUser.email}`, body);
    setSuccessMessage("¡Usuario actualizado correctamente!");
    setEditModalOpen(false);
    setEditUser(null);
    setTimeout(() => setSuccessMessage(""), 4000);
    fetchUsers();
  }

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "address", label: "Dirección" },
    {
      key: "roles",
      label: "Roles",
      render: (row: any) =>
        row.rolUsers?.map((r: any) => r.rol?.name).join(", "),
    },
  ];

  return (
    <div className="admin-container">
      {successMessage && (
        <div className="register-success">{successMessage}</div>
      )}
      <div className="admin-header">
        <span className="admin-title">Usuarios</span>
      </div>
      <Table
        columns={columns}
        data={users}
        actions={(row) => (
          <>
            <button
              title="Editar usuario"
              className="delete-btn"
              style={{ color: "#23326b" }}
              onClick={() => handleEdit(row)}
            >
              ✏️
            </button>
            <button
              title="Eliminar usuario"
              className="delete-btn"
              onClick={() => handleDelete(row)}
            >
              🗑️
            </button>
          </>
        )}
      />
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Editar usuario"
      >
        <form
          onSubmit={handleEditSubmit}
          className="admin-form"
          style={{ maxWidth: 500, margin: "0 auto" }}
        >
          <label>
            Email:
            <input type="text" value={editUser?.email || ""} disabled />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="Dejar vacío para no cambiar"
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              value={editUser?.name || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              value={editUser?.phone || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
              required
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              value={editUser?.address || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, address: e.target.value })
              }
              required
            />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Roles:
            <CheckboxGroup
              options={rolesOpts.map(
                (r: any) =>
                  ({
                    label: r.name,
                    value: String(r.id),
                  } as CheckboxOption)
              )}
              value={editRoles}
              onChange={(selected) => {
                if (selected.length === 0 && rolesOpts.length > 0) {
                  setEditRoles([String(rolesOpts[0].id)]);
                } else {
                  setEditRoles(selected as string[]);
                }
              }}
              single={false}
            />
          </label>
          <button type="submit">Guardar cambios</button>
        </form>
      </Modal>
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="">
        <div className="admin-modal-content">
          <div className="admin-modal-title">
            ¿Está seguro de que desea eliminar este usuario?
          </div>
          <div className="admin-modal-actions">
            <button onClick={confirmDelete} className="admin-modal-btn delete">
              Sí, eliminar
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className="admin-modal-btn cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
