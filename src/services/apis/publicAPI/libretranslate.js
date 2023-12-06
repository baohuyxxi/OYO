import axios from '~/services/axios';

const libretranslate = {
    viToEn : async (data) => {
        const body= ({
            q: data,
            source: "vi",
            target: "en",
            format: "text",
        })
        const res = await axios.post('https://libretranslate.com/translate',{body:body},{headers: { "Content-Type": "application/json" }} );
        return res.data;
    },
};

export default libretranslate;
