import { useState } from "react";

// ✅ Types
export type StudentData = {
  title: string;
  picture: string;
  class: string;
  contact: string;
  reg_number: string;
};

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  isImage?: boolean;
};

interface StudentsProps<T> {
  data: T[];
  userRole: "admin" | "teacher" | "student" | "parent";
  columns: ColumnConfig<T>[];
  entityName?: string;
  onChange?: (updated: T[]) => void;
}

export default function Students<T extends Record<string, any>>({
  data,
  userRole,
  columns,
  entityName = "Item",
  onChange,
}: StudentsProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [formData, setFormData] = useState<Partial<T>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isEditable = userRole === "admin" || userRole === "teacher";

  const handleAddOrUpdate = () => {
    const updated = [...items];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as T;
    } else {
      updated.push(formData as T);
    }
    setItems(updated);
    setFormData({});
    setEditingIndex(null);
    setShowForm(false);
    onChange?.(updated);
  };

  const handleDelete = (index: number) => {
    if (!isEditable) return;
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange?.(updated);
  };

  const handleEdit = (index: number) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleInputChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key: keyof T, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{entityName} List</h2>
        {isEditable && (
          <button
            onClick={() => {
              setFormData({});
              setEditingIndex(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add {entityName}
          </button>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-md">
            <h3 className="text-xl font-bold mb-4">{editingIndex !== null ? "Edit" : "Add"} {entityName}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
              {columns.map((col) => (
                <div key={col.key as string} className="mb-4">
                  <label className="block mb-1 font-medium">{col.label}</label>
                  {col.isImage ? (
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(col.key, e)} />
                  ) : (
                    <input
                      type="text"
                      value={(formData[col.key] as string) || ""}
                      onChange={(e) => handleInputChange(col.key, e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({});
                    setEditingIndex(null);
                  }}
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

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key as string} className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  {col.label}
                </th>
              ))}
              {isEditable && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
                    {col.isImage ? (
                      <img
                        src={(item[col.key] as string) || "https://via.placeholder.com/40"}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                {isEditable && (
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button onClick={() => handleEdit(idx)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(idx)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
