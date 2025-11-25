import { create } from "zustand";

const API_KEY = "wMDDAL2Ap1GGTBcQopb9vwBBsX4MGneXL9BV4sLt85oMGhkE0BV8Uppd";

const BASE_URL = "https://api.pexels.com/v1/";
const PER_PAGE = 10;

const getImageFromPexelsApi = (query = "cartoon", pageNumber = 1) => {

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
            console.log("responsessss ",response);
            console.log("responsessss ok ",response.ok);
            if(!response.ok){
                throw new Error("status is not ok "+response.statusText);
            }
            return response.json()
        })
        .then(data => {
            console.log("dataaaa",data);

            return data;


            // if(data.total_results >= 1){
            //     return data;
            // }
            // else{
            //     throw new Error("Data is not fount through Rest API");
            // }
        })
        ;
}

export const SearchScreenStore = create((set, get) => ({
    searchResults: [],
    data: [],
    searchQuery: "",
    pageNumber: 1,
    totalResults: 0,
    isEndReached: false,
    loading: false,
    loadMoreLoader: false,
    error: null,
    setSearchQuery: (query) => set({searchQuery:  query}),
    setAllStatesToDefault: () => {
        set({searchResults: [], data: [], pageNumber: 1, totalResults: 0
            , isEndReached: false, loading: false, loadMoreLoader: false, error: null
        });
    },
    getImages: async (query) => {
        console.log("getImages fired");
        try {
            set({ loading: true, searchQuery: query });
            let data = await getImageFromPexelsApi(query);
            set({ data: data.photos, totalResults: data.total_results, loading: false, isEndReached: PER_PAGE >= data.total_results ? true : false });
        } catch (error) {
            set({ error, loading: false });
            console.error(error);
        }
    },
    getMoreImages: async () => {
        console.log("getMoreImages fired");

        const {pageNumber, searchQuery, isEndReached, loadMoreLoader} = get();

        if (loadMoreLoader) {
            console.log("getMoreImages  already in progress");
            return;
        }

        if(isEndReached) {
            console.log("isEndREach is true",isEndReached);
            return;
        } 
        
        set({ loadMoreLoader: true });

        
        try {
            let incrementedPageNumber = pageNumber + 1;
            console.log('getMoreImages incrementedPageNumber',incrementedPageNumber);
            console.log('getMoreImages searchQuery',searchQuery);
            
            let data = await getImageFromPexelsApi(searchQuery, incrementedPageNumber);
            set((state) => ({ data: [...state.data, ...data.photos], loadMoreLoader: false, pageNumber: incrementedPageNumber,  isEndReached: (pageNumber * PER_PAGE) <= data.total_results ?  false : true }));
            // set({ data: [...get().data, ...data], loadMoreLoader: false });
        } catch (error) {
            set({ error, loadMoreLoader: false, });
            console.error(error);
        }

    }
}));