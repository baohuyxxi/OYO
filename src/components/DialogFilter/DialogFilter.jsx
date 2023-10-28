import { Button, DialogTitle } from "@mui/material";
import { t } from "i18next";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DialogFilter = () => {
  return (
    <div className="dialog-filter">
      <Button variant="outlined" onClick={handleClickOpen} className="btn-show">
        Bộ lọc
      </Button>
      <Dialog>
        <div>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              width: "600px",
              marginBottom: "20px",
            }}
          >
            {t("common.filter")}
          </DialogTitle>
          <DialogContent sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Chọn tỉnh thành bạn muốn đến
            <div style={{ marginTop: "30px" }}>
              <SelectedLocate
                setValueStepOne={handleChangeProvince}
                dataFilterDefauld={dataFilterDefauld}
              />
            </div>
            <br /> <hr />
          </DialogContent>
          <DialogContent sx={{ fontSize: "16px", fontWeight: "bold" }}>
            {t("label.priceRange")}
            <div style={{ marginTop: "30px" }}>
              <RangePriceFilter
                handleChangePriceRange={handleChangePriceRange}
                dataFilterDefauld={dataFilterDefauld}
              />
            </div>
            <br /> <hr />
          </DialogContent>
          <DialogContent sx={{ fontSize: "16px", fontWeight: "bold" }}>
            {t("label.convenient")}
            <div style={{ marginTop: "30px" }}>
              <CheckBox setFilterAmenities={handleChangeFilterAmenities} />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};
export default DialogFilter;
