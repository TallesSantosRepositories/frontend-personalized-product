import { BASE_URL } from "./api-config";

export async function getAllImages(param: string) {
    let res;
    try {
        res = await fetch(BASE_URL + `/images${param}`);
    } catch (err) {
        console.log("fechError: ", err);
    }
    const data = await res?.json();
    return data;
}