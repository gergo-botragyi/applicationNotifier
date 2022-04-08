export default function Notification({Class}:{Class:string}){
    return(
        <input
            name={`not${Class}`}
            type="text"
            className="formElement"
            placeholder={`Class ${Class} acceptance`}
        />
    );
}