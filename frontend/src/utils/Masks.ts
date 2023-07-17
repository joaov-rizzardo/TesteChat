export function phoneMask(value: string){
    value = value.replace(/\D/g,"")
    value = value.replace(/^(\d{2})(\d)/g,"($1) $2")
    value = value.replace(/(\d{4,5})(\d{4})/g, "$1-$2")
    value = value.substr(0, 15)
    return value;
}