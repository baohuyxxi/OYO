import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "~/pages/admin/DashboardAdmin/DashboardAdmin";

const RouterAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardAdmin />} />
      {/* <Route path="/customers" element={<LayoutUserAdmin />} />
      <Route path="/house" element={<LayoutHomeAdmin />} />
      <Route path="/roomcategories" element={<LayoutTypeRoomAdmin />} />
      <Route path="/bedcategories" element={<LayoutTypeBedAdmin />} />
      <Route path="/amenity" element={<LayoutAmenityAdmin />} />
      <Route path="/amenitycategories" element={<LayoutTypeAmenityAdmin />} />
      <Route path="/discount" element={<LayoutDiscountAdmin />} />
      <Route path="/surcharge" element={<LayoutSurchargeAdmin />} /> */}
    </Routes>
  );
};
export default RouterAdmin;
