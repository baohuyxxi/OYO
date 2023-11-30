import axios from '~/services/axios';

const statisticApi = {
    getStatisticOfHost: (year) =>{
        const url = `api/v1/cms/statistic/owner${year}`;
        return axios.get(url);
    },
    getStatisticOfAdmin:  (year) =>{
        const url = `api/v1/cms/statistic/admin?year=${year}`;
        return axios.get(url);
    },
    getStatisticOfAdminForChart: (type, year)=> {
        const url = `api/v1/cms/statistic/admin/chart?year=${year}&type=${type}`;
        return axios.get(url);
    },
    getStatisticOfAdminForGuest: (date)=> {
        const url = `api/v1/cms/statistic/admin/guests?dateStart=${date[0]}&dateEnd=${date[1]}&number=0&size=20`;
        return axios.get(url);
    },
    getStatisticOfAdminForOwner: (date)=> {
        const url = `api/v1/cms/statistic/admin/owners?dateStart=${date[0]}&dateEnd=${date[1]}`;
        return axios.get(url);
    },
    getStatisticOfAdminForHome: (date)=> {
        const url = `api/v1/cms/statistic/admin/home?dateStart=${date[0]}&dateEnd=${date[1]}`;
        return axios.get(url);
    },
    getStatisticOfAdminForOwnerByMonth: (date)=> {
        const url = `api/v1/cms/statistic/owner/month?year=${date.year}&month=${date.month}&number=0&size=100`;
        return axios.get(url);
    },
    getStatisticOfTransaction: (date)=> {
        const url = `api/v1/cms/statistic/admin/revenue?dateStart=${date[0]}&dateEnd=${date[1]}`;
        return axios.get(url);
    },
};

export default statisticApi;
