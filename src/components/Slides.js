import React, { useState } from 'react';

function Slides({ slides }) {

    const [originalSlides] = useState(() => {
        return [...slides];
    })

    const [slidInfo, setSlides] = useState(() => {
        return { ...originalSlides[0] };
    });

    const [initalBtn, setBtnState] = useState(()=>{
        const oldSlide = { ...slidInfo };
        const orSlides = [...originalSlides];
        const index = orSlides.findIndex(d => d.title === oldSlide.title && d.text === oldSlide.text);
        if(index===0){
            return true;
        }
    })
    
    const [initalNextBtn, setNextBtnState] = useState(()=>{
      return true;
    })


    const restartHandler = (e) => {
        e.preventDefault();
        setSlides({ ...originalSlides[0] });
        setBtnState(true);
        setNextBtnState(true);
    }

    const prevHandler = (e) => {
        e.preventDefault();
        const oldSlide = { ...slidInfo };
        const orSlides = [...originalSlides];
        const index = orSlides.findIndex(d => d.title === oldSlide.title && d.text === oldSlide.text);
        const obj = orSlides.slice(index - 1, index);
        const byIndex = orSlides.findIndex(d => d.title === obj[0].title && d.text === obj[0].text);
        setSlides({ ...obj[0] });
        if(byIndex === 0){
            setBtnState(true);
         }else {
            setBtnState(false);
            setNextBtnState(true);
         }

    }

    const nextHandler = (e) => {
        e.preventDefault();
        const oldSlide = { ...slidInfo };
        const orSlides = [...originalSlides];
        const index = orSlides.findIndex(d => d.title === oldSlide.title && d.text === oldSlide.text);
        const obj = orSlides.slice(index+1, index+2);
        const byIndex = orSlides.findIndex(d => d.title === obj[0].title && d.text === obj[0].text);
        setSlides({ ...obj[0] });
         if(byIndex === orSlides.length-1){
            setNextBtnState(false);
         }else {
            setBtnState(false);
         }
        
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" onClick={restartHandler}
                disabled={initalBtn}>Restart</button>
                <button data-testid="button-prev" className="small" onClick={prevHandler}
                disabled={initalBtn}>Prev</button>
                <button data-testid="button-next" className="small" onClick={nextHandler}
                disabled={!initalNextBtn}>Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slidInfo.title}</h1>
                <p data-testid="text">{slidInfo.text}</p>
            </div>
        </div>
    );

}

export default Slides;
