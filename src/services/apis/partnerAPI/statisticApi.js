import axios from '~/services/axios';

const statisticApi = {
    getStatisticOfHost: async (year) =>{
        // const url = `api/v1/cms/statistic/owner${year}`;
        // return axios.get(url);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res ={
            statusCode: 200,
            data : {
                totalNumberOfBooking: 150,
                totalNumberOfBookingFinish: 120,
                homeStatistic: [
                    { homeName: 'Home 1', numberOfBooking: 50 },
                    { homeName: 'Home 2', numberOfBooking: 70 },
                    { homeName: 'Home 3', numberOfBooking: 30 },
                ],
                revenueStatistics: [
                    { month: 'Jan', revenue: 2000, amount: 500 },
                    { month: 'Feb', revenue: 2500, amount: 600 },
                    { month: 'March', revenue: 1800, amount: 450 },
                    { month: 'April', revenue: 1800, amount: 700 },
                    { month: 'May', revenue: 1800, amount: 800 },
                    { month: 'June', revenue: 1800, amount: 340 },
                    { month: 'July', revenue: 1800, amount: 300 },
                    { month: 'August', revenue: 1800, amount: 1000 },
                    { month: 'September', revenue: 1800, amount: 900 },
                    { month: 'Oct', revenue: 1800, amount: 700 },
                    { month: 'Nov', revenue: 1800, amount: 1000 },
                    { month: 'Dec', revenue: 1800, amount: 1300 },

                ],
            }
        }
        
        return res
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
