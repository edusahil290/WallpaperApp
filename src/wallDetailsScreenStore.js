import { create } from "zustand";

const API_KEY = "wMDDAL2Ap1GGTBcQopb9vwBBsX4MGneXL9BV4sLt85oMGhkE0BV8Uppd";

const BASE_URL = "https://api.pexels.com/v1/";
const PER_PAGE = 10;

const getImageFromPexelsApi = (query = "cartoon", pageNumber = 1) => {

    //https://api.pexels.com/v1/search?query=Nature&page=1&per_page=5

    return fetch(`${BASE_URL}search?query=${query}&page=${pageNumber}&per_page=${PER_PAGE}`, {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    })
        .then(response => {
            // for (let pair of response.headers.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            return response.json()
        })
        .then(data => {
            console.log("api response of wallDetailsScreenSotre :::::> ");
            console.log(data);
            data.photos.forEach(element => {
                console.log('ssss element ');
                console.log(element);
                
            });
            // if (data?.photos) return data.photos;

            if(data && data.photos && data.photos.length >= 1){
                return data;
            }else{
                throw new Error("Data is not fount through Rest API");
            }
        })
        ;
}

export const WallDetailsScreenStore = create((set, get) => ({
    data: [],
    query: "",
    pageNumber: 1,
    totalResults: 0,
    loading: false,
    loadMoreLoader: false,
    error: null,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
    resetState: () => set(state => ({ data: [], loading: false, error: null, loadMoreLoader: false, pageNumber: 1, query: ""})),
    getImages: async (query) => {
        console.log("getImages fired")
        try {
            set({ loading: true, query: query });
            let data = await getImageFromPexelsApi(query);
            set({ data: data.photos, totalResults: data.total_results, loading: false });
        } catch (error) {
            set({ error, loading: false });
            console.error(error);
        }
    },
    getMoreImages: async () => {
        console.log("getMoreImages fired");
        if (get().loadMoreLoader) {
            console.log("getMoreImages  already in progress");
            return;
        }
        
        set({ loadMoreLoader: true });
        const {pageNumber, query, } = get();
        
        try {
            let incrementedPageNumber = pageNumber + 1;
            console.log('getMoreImages incrementedPageNumber',incrementedPageNumber);
            console.log('getMoreImages query',query);
            
            let data = await getImageFromPexelsApi(query, incrementedPageNumber);
            set((state) => ({ data: [...state.data, ...data.photos], loadMoreLoader: false, pageNumber: incrementedPageNumber, }));
            // set({ data: [...get().data, ...data], loadMoreLoader: false });
        } catch (error) {
            set({ error, loadMoreLoader: false, });
            console.error(error);
        }

    }

}));