import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import { menu } from '../links';

interface HoverButtonProperties {
    title : string;
    texts : menu[];
}

export default function HoverButton({texts, title} : HoverButtonProperties) {
    const containerRef = useRef(null);
    const [menuOption, setMenuOption] = useState("none");

    useEffect(() => {
        const cotainer = containerRef.current;
        if (cotainer){
            cotainer.addEventListener('mouseenter', () => {setMenuOption("block") })
            cotainer.addEventListener('mouseleave', () => {setMenuOption('none')})
        }
    },[])

    return (
        <>
            <div ref={containerRef} className="title">
                <h5>{title}</h5>
            
                <div className='Options' style={{display: menuOption, position: 'absolute', marginTop: 0}}>
                    {texts.map((e, index) => {
                        return(
                            <div key={index}>
                                <a href={e.links}>{e.text}</a> 
                            </div> 
                        )
                    })}
                </div>
            </div>
        </>        
    )
};