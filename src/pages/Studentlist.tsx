import Students from "../component/admin/Student";

const students = [
  {
    title: "Joshna",
    picture: "#",
    class: "1-Cs",
    contact: "9876543210",
    reg_number: "C001",
  },
  {
    title: "Divya",
    picture: "#",
    class: "1-Cs",
    contact: "9876543210",
    reg_number: "C002",
  },
];

const columns = [
  { key: "title", label: "Name" },
  { key: "class", label: "Class" },
  { key: "reg_number", label: "Registration No" },
  { key: "contact", label: "Contact" },
  { key: "picture", label: "Photo", isImage: true },
];

const StudentList = () => {
  const userRole = "admin"; // Or 'teacher' / 'student' based on your auth logic

  return (
    <div>
      <Students
        data={students}
        userRole={userRole}
        columns={columns}
        entityName="Student"
      />
    </div>
  );
};

export default StudentList;