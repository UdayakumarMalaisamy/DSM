import { AlarmCheck, BookOpen, Calendar, CheckCircle, LayoutDashboard, PersonStanding, Table, Users, Users2 } from "lucide-react";

const navData =[
    {
        title:"Dashboard",
        link:"/dashboard",
        icon:LayoutDashboard,
        role:["admin", "teachers","parents","students"]
    },
    {
        title:"Parentlist",
        link:"/parents",
        icon:Users2,
        role:["admin","teachers"]

    },
     {
        title:"studentslist",
        link:"/students",
        icon:  PersonStanding,
        role:["admin","parents","teachers"],


    },{
        title:"Timetable",
        link:"/timetable",
        icon:  Table,
        role:["admin","parents","teachers","students"],

    },
    {
        title:"Calendar",
        link:"/calendar",
        icon:Calendar,
        role:["admin","parents","teachers","students"]
    },
     {
        title:"Result",
        link:"/result",
        icon:BookOpen,
        role:["admin","parents","teachers","students"]
    },
      {
        title:"task",
        link:"/task",
        icon:AlarmCheck,
        role:["admin","parents","teachers","students"]
    },
 {
        title:"Attendance",
        link:"/attendance",
        icon:CheckCircle,
        role:["admin","parents","teachers","students"]
    },
 {
        title:"teachers",
        link:"/teachers",
        icon: Users,
        role:["admin","parents","students"]
    },]
    export default navData