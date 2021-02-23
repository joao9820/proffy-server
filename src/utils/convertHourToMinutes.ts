export default function convertHourToMinutes(time: string){


//Dividimos a partir do :

//Como ainda sim as partes seriam string, usamos o map para retornar cada parte como inteiro
//Desestruturação novamente, pois sabemos que sempre terá duas posições

    const [hour, minutes] =  time.split(':').map(Number); 
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}