import { GiTempleGate } from "react-icons/gi"; // Import the React Icon for "Warisan Budaya"
import { FaHome, FaChartBar, FaNewspaper, FaInfoCircle } from "react-icons/fa"; // Other icons from react-icons

export const menuItems = [
  { key: "/dashboard", label: "Dashboard", icon: <FaHome size={20} /> },
  {
    key: "/heritage",
    label: "Warisan Budaya",
    icon: <GiTempleGate size={20} />,
  },
  { key: "/news", label: "News", icon: <FaNewspaper size={20} /> },
  { key: "/about", label: "About Us", icon: <FaInfoCircle size={20} /> },
  { key: "/report", label: "Report", icon: <FaChartBar size={20} /> },
];
