import TimeTable from "../component/admin/TimeTable";

const TimetablePage = () => {
  const userRole = "admin"; // or "teacher", "student", "parent"

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Timetable</h1>
      <TimeTable userRole={userRole} />
    </div>
  );
};

export default TimetablePage;
