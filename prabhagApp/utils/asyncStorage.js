import { AsyncStorage } from "react-native";

const { setItem, getItem } = AsyncStorage

export async function setLoginDetails(value){
    try {
        await setItem('loginDetail',value)
    } catch (error) {
        console.log('error in setLoginDetails', error)
    }
}

export async function getLoginDetails(){
    let details = null
    try {
        details = await getItem('loginDetail')
    } catch (error) {
        console.log('error in getLoginDetails', error)
    }
    return details
}