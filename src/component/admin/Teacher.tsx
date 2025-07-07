// components/Teachers.tsx
import { useState, type ChangeEvent } from "react";

export interface ColumnConfig<T> {
  label: string;
  key: keyof T | string;
  editable?: boolean;
  isImage?: boolean;
}

interface TeachersProps<T extends Record<string, any>> {
  data: T[];
  role: "admin" | "student" | "parent";
  columns: ColumnConfig<T>[];
  onChange?: (newData: T[]) => void;
  entityName?: string; // optional title
}

const Teachers = <T extends Record<string, any>>({
  data,
  role,
  columns,
  onChange,
  entityName = "Item",
}: TeachersProps<T>) => {
  const [items, setItems] = useState<T[]>(data);
  const [formData, setFormData] = useState<Partial<T>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    const updated = [...items];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as T;
    } else {
      updated.push(formData as T);
    }
    setItems(updated);
    onChange?.(updated);
    setShowForm(false);
    setEditingIndex(null);
    setFormData({});
  };

  const handleEdit = (index: number) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
      onChange?.(updated);
    }
  };

  const handleInputChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key: keyof T, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [key]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{entityName} List ({role})</h2>

        {/* Add Button */}
        {role === "admin" && (
          <button
            onClick={() => {
              setFormData({});
              setEditingIndex(null);
              setShowForm(true);
            }}
            className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Add {entityName}
          </button>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4">
                {editingIndex !== null ? "Edit" : "Add"} {entityName}
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
                {columns.map((col) => (
                  <div key={col.key as string} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {col.label}
                    </label>
                    {col.isImage ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(col.key, e)}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={`Enter ${col.label}`}
                        value={formData[col.key] ?? ""}
                        onChange={(e) => handleInputChange(col.key, e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingIndex(null);
                    }}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
                  >
                    {editingIndex !== null ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key as string}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                {role === "admin" && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                    No {entityName.toLowerCase()}s found.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    {columns.map((col) => (
                      <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
                        {col.isImage ? (
                          <img
                            src={item[col.key] || "https://via.placeholder.com/50 "}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    {role === "admin" && (
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-900 font-medium"
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
    </div>
  );
};

export default Teachers;