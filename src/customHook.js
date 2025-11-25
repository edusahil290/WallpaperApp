import { useEffect, useState } from "react"

const API_KEY = "wMDDAL2Ap1GGTBcQopb9vwBBsX4MGneXL9BV4sLt85oMGhkE0BV8Uppd";

const BASE_URL = "https://api.pexels.com/v1/";
const PER_PAGE = 5;

export const getImageFromPexelsApiLocal = () => {

    return fetch(`${BASE_URL}curated?per_page=${PER_PAGE}`,{
     method: 'GET',
     headers: {
        'Authorization': API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        data.photos.forEach(element => {
            // console.log('fffff element ',element, " ::::",element.src);
        });
        if(data?.photos.length >= 1) {
            // console.log('its true');
            return data.photos
        };
    })
    ;
}

export const useGetDefaultImages = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImageFromPexelsApiLocal()
        .then(data => {
            // console.log("length is ", data.length);
            
            setIsLoaded(true);
            setImages(data);
            
        })
        .catch(
            error => {
                setIsLoaded(true);
                setError(error);
                }
        )
    },[]);
    return [images, setImages, error, isLoaded];
}