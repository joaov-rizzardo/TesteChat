export function convertDatetimeStringToTimeString(date: string){
    const dateObject = new Date(date)
    const hour = String(dateObject.getHours()).padStart(2, '0')
    const minute = String(dateObject.getMinutes()).padStart(2, '0')
    const formattedTime = `${hour}:${minute}`
    return formattedTime
}