import Students, {
  type StudentData,
  type ColumnConfig,
} from "../component/Teacher/Student";
import { useState } from "react";

const initialStudents: StudentData[] = [];

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

export default function StudentListPage() {
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [newClass, setNewClass] = useState<string>("");
  const [customClasses, setCustomClasses] = useState<string[]>([]);
  const [profileStudent, setProfileStudent] = useState<StudentData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedStudent, setEditedStudent] = useState<StudentData | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const dynamicClasses = Array.from(new Set(students.map((s) => s.class)));
  const allClasses = Array.from(new Set([
    ...predefinedClasses,
    ...customClasses,
    ...dynamicClasses,
  ]));

  const handleAddClass = () => {
    if (newClass.trim() && !allClasses.includes(newClass.trim())) {
      setCustomClasses((prev) => [...prev, newClass.trim()]);
      setSelectedClass(newClass.trim());
      setNewClass("");
    }
  };

  const handleDeleteClass = (cls: string) => {
    setCustomClasses((prev) => prev.filter((c) => c !== cls));
    if (selectedClass === cls) setSelectedClass("");
  };

  const filteredStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : students;

  const columns: ColumnConfig<StudentData>[] = [
    {
      key: "picture",
      label: "Photo",
      isImage: true,
      render: (item: StudentData) => (
        <img
          src={item.picture || "https://via.placeholder.com/40"}
          alt="student"
          onClick={() => setProfileStudent(item)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition"
        />
      ),
    },
    {
      key: "title",
      label: "Name",
      render: (item: StudentData) => <span>{item.title}</span>,
    },
    { key: "class", label: "Class" },
    { key: "reg_number", label: "Reg No" },
    { key: "contact", label: "Contact" },
  ];

  const handleProfileEdit = () => {
    setEditedStudent(profileStudent);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    if (editedStudent) {
      const updated = students.map((s) =>
        s.reg_number === editedStudent.reg_number ? editedStudent : s
      );
      setStudents(updated);
      setProfileStudent(editedStudent);
    }
    setEditMode(false);
    setEditedStudent(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-lg font-semibold">Select Class</label>
        <div className="relative w-full max-w-sm">
          <select
            className="border border-gray-300 px-4 py-2 rounded w-full appearance-none bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- All Classes --</option>
            {allClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="Add new class (e.g., IV-CS)"
            className="border px-3 py-2 rounded w-full max-w-sm"
          />
          <button
            onClick={handleAddClass}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
          {newClass && customClasses.includes(newClass.trim()) && (
            <button
              onClick={() => handleDeleteClass(newClass.trim())}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <Students
        data={filteredStudents}
        userRole="admin"
        columns={columns}
        entityName={selectedClass ? `Students of ${selectedClass}` : "All Students"}
        onChange={(updated) => {
          const merged = students
            .filter((s) => !filteredStudents.includes(s))
            .concat(updated);
          setStudents(merged);
        }}
      />

      {profileStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => {
                setProfileStudent(null);
                setEditMode(false);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={
                  (editMode ? editedStudent?.picture : profileStudent.picture) ||
                  "https://via.placeholder.com/150"
                }
                alt="Student"
                onClick={() =>
                  setEnlargedImage(
                    (editMode ? editedStudent?.picture : profileStudent.picture) || ""
                  )
                }
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md cursor-pointer hover:scale-105 transition"
              />
              {editMode ? (
                <input
                  value={editedStudent?.title || ""}
                  onChange={(e) =>
                    setEditedStudent({ ...editedStudent!, title: e.target.value })
                  }
                  className="text-xl font-semibold mt-4 text-center"
                />
              ) : (
                <h3 className="text-2xl font-semibold mt-4">{profileStudent.title}</h3>
              )}
              <p className="text-gray-600">{profileStudent.class}</p>
              <div className="mt-4 w-full text-left space-y-2">
                <div>
                  <span className="font-semibold">Reg No:</span> {profileStudent.reg_number}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span> {editMode ? (
                    <input
                      value={editedStudent?.contact || ""}
                      onChange={(e) =>
                        setEditedStudent({ ...editedStudent!, contact: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profileStudent.contact
                  )}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {editMode ? (
                    <input
                      value={editedStudent?.email || ""}
                      onChange={(e) =>
                        setEditedStudent({ ...editedStudent!, email: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profileStudent.email || "student@example.com"
                  )}
                </div>
                <div>
                  <span className="font-semibold">DOB:</span> {editMode ? (
                    <input
                      type="date"
                      value={editedStudent?.dob || ""}
                      onChange={(e) =>
                        setEditedStudent({ ...editedStudent!, dob: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profileStudent.dob || "01-01-2000"
                  )}
                </div>
                <div>
                  <span className="font-semibold">Blood Group:</span> {editMode ? (
                    <input
                      value={editedStudent?.blood || ""}
                      onChange={(e) =>
                        setEditedStudent({ ...editedStudent!, blood: e.target.value.toUpperCase() })
                      }
                      className="border rounded px-2 py-1 w-full uppercase"
                    />
                  ) : (
                    profileStudent.blood || "Not specified"
                  )}
                </div>
                <div>
                  <span className="font-semibold">Address:</span> {editMode ? (
                    <textarea
                      value={editedStudent?.address || ""}
                      onChange={(e) =>
                        setEditedStudent({ ...editedStudent!, address: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profileStudent.address || "123, Example Street, City"
                  )}
                </div>
              </div>
              <div className="mt-4">
                {editMode ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedStudent(null);
                      }}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleProfileEdit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged Student"
            className="max-w-full max-h-full rounded shadow-xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
