import Todo from "./components/Todos/Todo"
import Courses from "./components/Courses/Courses"
import StudentEnroll from "./components/StudentEnroll/StudentEnroll"
import MyCourses from "./components/MyCourses/MyCourses"

export const NavigationAdmin = [
    "Todos",
    "Courses",
    "Students"
]

export const Navigations = [
    "Todos",
    "My Courses",
    "Course",
    "Time Table"
]

export const NavigationComponent = [
    <Todo />,
    <MyCourses />,
    <Courses />
]

export const NavigationComponentAdmin = [
    <Todo />,
    <Courses />,
    <StudentEnroll />
]
