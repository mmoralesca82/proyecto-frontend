import DashboardHeader from "../components/dashboard-page/DashboardHeader"
import MenuBar from "../components/dashboard-page/MenuBar"

const Dashboardlayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />

      <MenuBar />

      {children}
    </>
  )
}

export default Dashboardlayout