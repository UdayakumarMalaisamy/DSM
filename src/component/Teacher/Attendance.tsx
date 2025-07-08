// src/components/Attendance.tsx
import { useState } from "react";

export interface AttendanceData {
  title: string;
  class: string;
  reg_number: string;
  date: string;
  status: "Present" | "Absent";
}

interface AttendanceProps {
  data: AttendanceData[];
  userRole: "admin" | "teacher" | "student" | "parent";
  onChange?: (newData: AttendanceData[]) => void;
}

const Attendance = ({ data, userRole, onChange }: AttendanceProps) => {
  const [records, setRecords] = useState<AttendanceData[]>(data);
  const [formData, setFormData] = useState<Partial<AttendanceData>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const isEditable = userRole === "admin" || userRole === "teacher";

  const handleInput = (key: keyof AttendanceData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddOrUpdate = () => {
    const updated = [...records];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as AttendanceData;
    } else {
      updated.push(formData as AttendanceData);
    }
    setRecords(updated);
    onChange?.(updated);
    setShowForm(false);
    setEditingIndex(null);
    setFormData({});
    showToast(editingIndex !== null ? "Attendance updated" : "Attendance added");
  };

  const handleEdit = (index: number) => {
    setFormData(records[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (!isEditable) return;
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
    onChange?.(updated);
    showToast("Deleted successfully");
  };

  const handleStatusChange = (index: number, value: "Present" | "Absent") => {
    const updated = [...records];
    updated[index].status = value;
    setRecords(updated);
    onChange?.(updated);
    showToast("Status updated");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      <h2 className="text-2xl font-bold">Attendance Records ({userRole})</h2>

      {isEditable && (
        <button
          onClick={() => {
            setFormData({});
            setEditingIndex(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Attendance
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdate();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Student Name"
                value={formData.title || ""}
                onChange={(e) => handleInput("title", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Class"
                value={formData.class || ""}
                onChange={(e) => handleInput("class", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Reg. Number"
                value={formData.reg_number || ""}
                onChange={(e) => handleInput("reg_number", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="date"
                value={formData.date || ""}
                onChange={(e) => handleInput("date", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <select
                value={formData.status || ""}
                onChange={(e) => handleInput("status", e.target.value as "Present" | "Absent")}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Reg. No</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              {isEditable && <th className="px-4 py-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No records.
                </td>
              </tr>
            ) : (
              records.map((att, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{att.title}</td>
                  <td className="px-4 py-2">{att.class}</td>
                  <td className="px-4 py-2">{att.reg_number}</td>
                  <td className="px-4 py-2">{att.date}</td>
                  <td className="px-4 py-2">
                    {isEditable ? (
                      <select
                        value={att.status}
                        onChange={(e) => handleStatusChange(index, e.target.value as "Present" | "Absent")}
                        className={`px-2 py-1 rounded text-sm font-medium border border-gray-300 ${
                          att.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    ) : (
                      <span
                        className={`font-semibold ${
                          att.status === "Present" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {att.status}
                      </span>
                    )}
                  </td>
                  {isEditable && (
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
