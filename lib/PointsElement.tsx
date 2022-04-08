export default function Points({Class}:{Class:string}){
    return(
        <input
            name={`points${Class}`}
            type="number"
            className="formElement"
            placeholder={`Class ${Class} points`}
        />
    );    
}