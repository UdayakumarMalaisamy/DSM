// src/pages/StudentAttendanceView.tsx

export type AttendanceStatus = "Present" | "Absent";

export interface Student {
  title: string;
  reg_number: string;
  class: string;
}

export interface AttendanceData {
  reg_number: string;
  date: string;
  status: AttendanceStatus;
}

// Sample students
const students: Student[] = [
  { title: "Joshna", reg_number: "C001", class: "1-Cs" },
  { title: "Divya", reg_number: "C002", class: "1-Cs" },
];

// Sample attendance
const attendanceRecords: AttendanceData[] = [
  { reg_number: "C001", date: "2025-07-07", status: "Present" },
  { reg_number: "C002", date: "2025-07-07", status: "Absent" },
];

// Merge data
const joinedData = students.map((student) => {
  const attendance = attendanceRecords.find(
    (a) => a.reg_number === student.reg_number
  );
  return {
    ...student,
    date: attendance?.date || "N/A",
    status: attendance?.status || "Absent",
  };
});

const StudentAttendanceView = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          📋 Student Attendance Report
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left tracking-wider">Name</th>
                <th className="px-6 py-3 text-left tracking-wider">Reg No</th>
                <th className="px-6 py-3 text-left tracking-wider">Class</th>
                <th className="px-6 py-3 text-left tracking-wider">Date</th>
                <th className="px-6 py-3 text-left tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {joinedData.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800">{student.title}</td>
                  <td className="px-6 py-4 text-gray-600">{student.reg_number}</td>
                  <td className="px-6 py-4 text-gray-600">{student.class}</td>
                  <td className="px-6 py-4 text-gray-600">{student.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        student.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
              {joinedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No attendance records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceView;
