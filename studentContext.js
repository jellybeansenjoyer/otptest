import  {createContext,useState} from 'react';
const StudentType = createContext();

const StudentContext = ({children})=>{
    const [studId,setStudId] = useState('');
    return (
        <StudentType.Provider value={{studId,setStudId}}> 
            {children}
        </StudentType.Provider>
    )
}

export {StudentType,StudentContext}; 