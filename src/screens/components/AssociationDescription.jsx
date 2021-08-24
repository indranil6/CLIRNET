import React ,{ useState, useEffect } from 'react'

export default function AssociationDescription({data, onReadMoreClick }) {
    const [currentCount, setCurrentCount] = useState(100);
    const [tempDescription, setTempDescription] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        
        if(data && data.length>0){
            setDescription(data);
            setTempDescription(data.substring(0, currentCount)); 
        }
    }, [])

    let readMoreClick = ()=>{
        let coun = description.length;//parseInt(currentCount) + 10
        setCurrentCount(coun); 
        setTempDescription(description);
        onReadMoreClick() 
    }

      return (
        <>  
          {tempDescription}
          {currentCount >= description.length?null: 
          <a
            className="font_14px font600"
            href="javascript:void(0);"
            onClick={() => {
              readMoreClick(); 
            }}
          > 
            &nbsp; Read More
          </a>}
        </>
      );
}
