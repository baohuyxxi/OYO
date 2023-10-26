import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor"
import { updateAvatarRequest } from "~/services/API/authAPI";
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

const boxStyle = {
    width: "10em",
    height: "10em",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
};
const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default function CropperModal({ imageFile , modalOpen, setModalOpen, setPreview, mail }) {
    const { userCurrent, setUserCurrent, setAccessToken, setRefreshToken , accessToken} = useContext(AuthContext);
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);
    // const [imageFile, setImageFile] = useState(null);

    //handle save
    const handleSave = async () => {
        if (imageFile) {
            setPreview(URL.createObjectURL(imageFile));
            setModalOpen(false);
            const res = await updateAvatarRequest(imageFile, mail, accessToken)
            console.log(res)
            setUserCurrent(res.data)
        }
    };
    
    return (
        <Modal sx={modalStyle} open={modalOpen}>
            <Box sx={boxStyle}>
                <AvatarEditor
                    ref={cropRef}
                    image={imageFile}
                    style={{ width: "100%", height: "100%" }}
                    border={50}
                    borderRadius={150}
                    // color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={0}
                />

                {/* MUI Slider */}
                <Slider
                    min={10}
                    max={50}
                    sx={{
                        margin: "0 auto",
                        width: "80%",
                        //   color: "cyan"
                    }}
                    size="medium"
                    defaultValue={slideValue}
                    value={slideValue}
                    onChange={(e) => setSlideValue(e.target.value)}
                />
                <Box
                    sx={{
                        display: "flex",
                        padding: "10px",
                        border: "3px solid white",
                        background: "black"
                    }}
                >
                    <Button
                        size="small"
                        sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
                        variant="outlined"
                        onClick={(e) => setModalOpen(false)}
                    >
                        cancel
                    </Button>
                    <Button
                        //   sx={{ background: "#5596e6" }}
                        size="small"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};


