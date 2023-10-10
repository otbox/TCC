import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import { menu } from '../links';
import { useNavigate } from 'react-router-dom';

interface HoverButtonProperties {
    title : string;
    texts : menu[];
    params? : string;
}

export default function HoverButton({texts, title, params} : HoverButtonProperties) {
    const containerRef = useRef(null);
    const [menuOption, setMenuOption] = useState("none");
    const nav = useNavigate()

    const navigateTo = (linksMap : string) => {
        if(typeof(params) != 'undefined'){
            nav(linksMap, {state : {params}})
        }
    } 

    useEffect(() => {
        console.log(params)
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
                <hr />
                <div className='Options' style={{display: menuOption, position: 'absolute', marginTop: 0}}>
                    {texts.map((e, index) => {
                        return(
                            <div key={index}>
                                <a onClick= {() => {navigateTo(e.links)}}
                                //href={e.links}
                                >{e.text}</a> 
                            </div> 
                        )
                    })}
                </div>
            </div>
        </>        
    )
};
