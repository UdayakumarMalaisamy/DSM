// src/pages/StudentAttendanceView.tsx

// Reuse from your models
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

// Join logic
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Attendance</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Reg No</th>
              <th className="px-6 py-3 text-left">Class</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {joinedData.map((student, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{student.title}</td>
                <td className="px-6 py-4">{student.reg_number}</td>
                <td className="px-6 py-4">{student.class}</td>
                <td className="px-6 py-4">{student.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendanceView;
