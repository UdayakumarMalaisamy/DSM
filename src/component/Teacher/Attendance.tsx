"use client";
import { useState } from "react";

// ✅ Define AttendanceData type inline
export interface AttendanceData {
  title: string;
  class: string;
  reg_number: string;
  date: string;
  status: "Present" | "Absent";
}

interface AttendanceProps {
  data: AttendanceData[];
  students: {
    title: string;
    class: string;
    reg_number: string;
  }[];
  userRole: "admin" | "teacher" | "student" | "parent";
  onChange?: (newData: AttendanceData[]) => void;
}

const Attendance = ({ data, students, userRole, onChange }: AttendanceProps) => {
  const [records, setRecords] = useState<AttendanceData[]>(data);
  const [toast, setToast] = useState("");
  const [showDailyForm, setShowDailyForm] = useState(false);
  const [dailyStatus, setDailyStatus] = useState<Record<string, "Present" | "Absent">>({});

  const isEditable = userRole === "admin" || userRole === "teacher";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleDailySubmit = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecords = students.map((stu) => ({
      ...stu,
      date: today,
      status: dailyStatus[stu.reg_number] || "Absent",
    }));

    const updated = [...records, ...newRecords];
    setRecords(updated);
    onChange?.(updated);
    setShowDailyForm(false);
    showToast("Daily attendance saved");
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
            setDailyStatus({});
            setShowDailyForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          📅 Mark Daily Attendance
        </button>
      )}

      {/* 🟡 Daily Attendance Modal */}
      {showDailyForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg space-y-4">
            <h3 className="text-xl font-semibold">Mark Today's Attendance</h3>
            <div className="max-h-[400px] overflow-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Class</th>
                    <th className="p-2">Reg No</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((stu, index) => (
                    <tr key={index}>
                      <td className="p-2">{stu.title}</td>
                      <td className="p-2">{stu.class}</td>
                      <td className="p-2">{stu.reg_number}</td>
                      <td className="p-2">
                        <select
                          value={dailyStatus[stu.reg_number] || ""}
                          onChange={(e) =>
                            setDailyStatus((prev) => ({
                              ...prev,
                              [stu.reg_number]: e.target.value as "Present" | "Absent",
                            }))
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="">Select</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDailyForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDailySubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 Existing Attendance Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Reg. No</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
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
                    <span
                      className={`font-semibold ${
                        att.status === "Present" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {att.status}
                    </span>
                  </td>
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
