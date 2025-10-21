import { Outlet } from "react-router-dom";
import BasicExample from "../components/Navbar";
import FloneFooter from '../components/Footer'

export default function Layout() {
  return (
    <>
      <BasicExample />
      <main>
        <Outlet /> {/* All page content goes here */}
      </main>
      <FloneFooter />
    </>
  );
}
