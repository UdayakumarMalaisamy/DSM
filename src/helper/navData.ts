// import { AlarmCheck, BookOpen, Calendar, CheckCircle, LayoutDashboard, PersonStanding, Table, Users, Users2 } from "lucide-react";

// const navData =[
//     {
//         title:"Dashboard",
//         link:"/dashboard",
//         icon:LayoutDashboard,
//         role:["admin", "teachers","parents","students"]
//     },
//     {
//         title:"Parentlist",
//         link:"/parents",
//         icon:Users2,
//         role:["admin","teachers"]

//     },
//      {
//         title:"Studentslist",
//         link:"/students",
//         icon:  PersonStanding,
//         role:["admin","parents","teachers"],


//     },{
//         title:"Timetable",
//         link:"/timetable",
//         icon:  Table,
//         role:["admin","parents","teachers","students"],

//     },
//     {
//         title:"Calendar",
//         link:"/calendar",
//         icon:Calendar,
//         role:["admin","parents","teachers","students"]
//     },
//      {
//         title:"Result",
//         link:"/result",
//         icon:BookOpen,
//         role:["admin","parents","teachers","students"]
//     },
//       {
//         title:"Task",
//         link:"/task",
//         icon:AlarmCheck,
//         role:["admin","parents","teachers","students"]
//     },
//  {
//         title:"Attendance",
//         link:"/attendance",
//         icon:CheckCircle,
//         role:["admin","parents","teachers","students"]
//     },
//  {
//         title:"Teachers",
//         link:"/teachers",
//         icon: Users,
//         role:["admin","parents","students"]
//     },]
//     export default navData
// src/helper/navData.ts
import { FiHome, FiUsers, FiUserCheck, FiClipboard, FiFileText, FiCalendar, FiBookOpen, FiUserPlus } from "react-icons/fi";

const navData = [
  { title: "Dashboard", link: "/dashboard", icon: FiHome, role: ["admin", "teacher", "student", "parent"] },
  { title: "Teachers", link: "/teachers", icon: FiUsers, role: ["admin"] },
    { title: "Timetable", link: "/timetable", icon: FiUsers, role: ["admin"] },
  { title: "Students", link: "/students", icon: FiUserCheck, role: [, "teacher","admin"] },
  { title: "Attendance", link: "/attendance", icon: FiClipboard, role: ["teacher"] },
  { title: "Tasks", link: "/task", icon: FiFileText, role: ["teacher"] },
  { title: "Results", link: "/result", icon: FiBookOpen, role: ["teacher"] },
  { title: "Calendar", link: "/calendar", icon: FiCalendar, role: ["admin", "teacher", "student", "parent"] },
      { title: "Parents", link: "/parents", icon: FiUserPlus, role: ["admin", "teacher"] },
  { title: "Register", link: "/register", icon: FiUserPlus, role: ["admin"] },

];

export default navData;
