import React from 'react';
import './style.css'

interface HoverButtonProperties {
    title : string;
    texts : string[];
}

export default function HoverButton({onHover, texts, title} : HoverButtonProperties) {
    const a = document.getElementById('1');
    a?.addEventListener('mouseover', (e) => {e.target === a ? console.log("AA") : console.log('')})
    return (
        <>
            <button id='1' className="title">
                
            </button>
        </>        
    )
};
