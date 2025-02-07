import Login from '../views/Login'
import HomePage from "../views/HomePage";
import Profile from "../views/Profile";
import ReqApproval from "../views/ReqApproval";
import Point from "../views/Point";
import ReqSubmission from "../views/ReqSubmission";
import HumanResources from "../views/HumanResources";
import EmployeeDetail from "../views/EmployeeDetail";
import Reward from "../views/Reward";

const routes = [
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <Login/>},
    {path: '/profile', element: <Profile/>},
    {path: '/req-approval', element: <ReqApproval/>},
    { path: "/req-submission", element: <ReqSubmission /> },
    {path: '/point', element: <Point/>},
    {path: 'human-resources', element: <HumanResources/>},
    {path: 'human-resources/:id', element: <EmployeeDetail/>},
    {path: 'rewards', element: <Reward/>},
]

export {routes};