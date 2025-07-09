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
import {
  Home,
  Users,
  CalendarClock,
  UserCheck,
  ClipboardList,
  FileText,
  File,
  Calendar,
  BookOpen,
  UserPlus,
} from "lucide-react";

const navData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: Home,
    role: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Teachers",
    link: "/teachers",
    icon: Users,
    role: ["admin"],
  },
  {
    title: "Timetable",
    link: "/timetable",
    icon: CalendarClock,
    role: ["admin", "teacher"],
  },
  {
    title: "Students",
    link: "/students",
    icon: UserCheck,
    role: ["teacher", "admin"],
  },
  {
    title: "Attendance",
    link: "/attendance",
    icon: ClipboardList,
    role: ["teacher"],
  },
  {
    title: "Tasks",
    link: "/task",
    icon: FileText,
    role: ["teacher"],
  },
  {
    title: "Results",
    link: "/result",
    icon: BookOpen,
    role: ["teacher"],
  },
  {
    title: "Calendar",
    link: "/calendar",
    icon: Calendar,
    role: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Parents",
    link: "/parents",
    icon: UserPlus,
    role: ["admin", "teacher"],
  },
  {
    title: "Register",
    link: "/register",
    icon: File,
    role: ["admin"],
  },
];

export default navData;
