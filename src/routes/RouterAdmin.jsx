import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from '~/pages/admin/DashboardAdmin/DashboardAdmin';
import LayoutUserAdmin from '~/pages/admin/LayoutUserAdmin/LayoutUserAdmin';
import LayoutAccomAdmin from '~/pages/admin/LayoutAccomAdmin/LayoutAccomAdmin';
import LayoutAccomCategoryAdmin from '~/pages/admin/LayoutAccomCategoryAdmin/LayoutAccomCategoryAdmin';
import LayoutTypeBedAdmin from '~/pages/admin/LayoutTypeBedAdmin/LayoutTypeBedAdmin';
import LayoutFacilityAdmin from '~/pages/admin/LayoutFacilityAdmin/LayoutFacilityAdmin';

const RouterAdmin = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardAdmin />} />
            <Route path="/users" element={<LayoutUserAdmin />} />
            <Route path="/accomplaces" element={<LayoutAccomAdmin />} />
            <Route path="/accomcategories" element={<LayoutAccomCategoryAdmin />} />
            <Route path="/typebeds" element={<LayoutTypeBedAdmin />} />
            <Route path="/facilities" element={<LayoutFacilityAdmin />} />
            {/* <Route path="/facilitycategories" element={<LayoutTypeAmenityAdmin />} />
            <Route path="/surchargecategories" element={<LayoutSurchargeCategoryAdmin />} /> */}
        </Routes>
    );
};
export default RouterAdmin;
