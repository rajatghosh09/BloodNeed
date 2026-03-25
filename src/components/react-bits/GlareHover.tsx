// import React, { useRef } from 'react';

// interface GlareHoverProps {
//   width?: string;
//   height?: string;
//   background?: string;
//   borderRadius?: string;
//   borderColor?: string;
//   children?: React.ReactNode;
//   glareColor?: string;
//   glareOpacity?: number;
//   glareAngle?: number;
//   glareSize?: number;
//   transitionDuration?: number;
//   className?: string;
//   style?: React.CSSProperties;
// }

// const GlareHover: React.FC<GlareHoverProps> = ({
//   width = '240px',
//   height = '60px',
//   background = 'linear-gradient(to right, #dc2626, #ef4444)',
//   borderRadius = '12px',
//   borderColor = 'transparent',
//   children,
//   glareColor = '#ffffff',
//   glareOpacity = 0.6,
//   glareAngle = 45,
//   glareSize = 100,
//   transitionDuration = 800,
//   className = '',
//   style = {}
// }) => {
//   const overlayRef = useRef<HTMLDivElement | null>(null);

//   // Convert Hex to RGBA
//   const hex = glareColor.replace('#', '');
//   let rgba = glareColor;
//   if (/^[\dA-Fa-f]{6}$/.test(hex)) {
//     const r = parseInt(hex.slice(0, 2), 16);
//     const g = parseInt(hex.slice(2, 4), 16);
//     const b = parseInt(hex.slice(4, 6), 16);
//     rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
//   }

//   const animateIn = () => {
//     const el = overlayRef.current;
//     if (!el) return;

//     // 1. Hide it and snap to start immediately
//     el.style.transition = 'none';
//     el.style.opacity = '0';
//     el.style.backgroundPosition = '-100% -100%';

//     // 2. Force reflow
//     void el.offsetWidth;

//     // 3. Show it and sweep
//     el.style.transition = `background-position ${transitionDuration}ms ease-out, opacity 200ms ease`;
//     el.style.opacity = '1';
//     el.style.backgroundPosition = '150% 150%';
//   };

//   const animateOut = () => {
//     const el = overlayRef.current;
//     if (!el) return;

//     // 4. Fade it out instantly when leaving so you don't see it move back
//     el.style.transition = `opacity 200ms ease`;
//     el.style.opacity = '0';
//   };

//   const overlayStyle: React.CSSProperties = {
//     position: 'absolute',
//     inset: 0,
//     background: `linear-gradient(${glareAngle}deg,
//         rgba(255,255,255,0) 45%,
//         ${rgba} 50%,
//         rgba(255,255,255,0) 55%)`,
//     backgroundSize: `${glareSize * 2}% ${glareSize * 2}%`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: '-100% -100%',
//     pointerEvents: 'none',
//     zIndex: 20,
//     opacity: 0,
//   };

//   return (
//     <div
//       className={`relative grid place-items-center overflow-hidden border cursor-pointer group ${className}`}
//       style={{
//         width,
//         height,
//         background,
//         borderRadius,
//         borderColor,
//         ...style
//       }}
//       onMouseEnter={animateIn}
//       onMouseLeave={animateOut}
//     >
//       <div ref={overlayRef} style={overlayStyle} />
//       <div className="relative z-10 w-full h-full flex items-center justify-center">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default GlareHover;



import React, { useRef } from 'react';

interface GlareHoverProps {
    width?: string;
    height?: string;
    background?: string;
    borderRadius?: string;
    borderColor?: string;
    children?: React.ReactNode;
    glareColor?: string;
    glareOpacity?: number;
    glareAngle?: number;
    glareSize?: number;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
    width = '240px',
    height = '60px',
    background = 'linear-gradient(to right, #dc2626, #ef4444)',
    borderRadius = '12px',
    borderColor = 'transparent',
    children,
    glareColor = '#ffffff',
    glareOpacity = 0.6,
    glareAngle = 45,
    glareSize = 100,
    transitionDuration = 900,
    className = '',
    style = {}
}) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const hex = glareColor.replace('#', '');
    let rgba = glareColor;
    if (/^[\dA-Fa-f]{6}$/.test(hex)) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }

    const animateIn = () => {
        const el = overlayRef.current;
        if (!el) return;

        // Transition for sweeping forward
        el.style.transition = `background-position ${transitionDuration}ms ease-out, opacity 900ms ease`;
        el.style.opacity = '1';
        el.style.backgroundPosition = '150% 150%'; // Moves Left to Right
    };

    const animateOut = () => {
        const el = overlayRef.current;
        if (!el) return;

        // Sweep back Right to Left before fading out
        el.style.transition = `background-position ${transitionDuration}ms ease-in-out, opacity 900ms ease 900ms`;
        el.style.backgroundPosition = '-150% -150%';
        el.style.opacity = '0'; // Fades out slowly as it moves back
    };

    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(${glareAngle}deg,
        rgba(255,255,255,0) 45%,
        ${rgba} 50%,
        rgba(255,255,255,0) 55%)`,
        backgroundSize: `${glareSize * 2.5}% ${glareSize * 2.5}%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-150% -150%',
        pointerEvents: 'none',
        zIndex: 20,
        opacity: 0,
    };

    return (
        <div
            className={`relative grid place-items-center overflow-hidden border cursor-pointer group ${className}`}
            style={{
                width,
                height,
                background,
                borderRadius,
                borderColor,
                ...style
            }}
            onMouseEnter={animateIn}
            onMouseLeave={animateOut}
        >
            <div ref={overlayRef} style={overlayStyle} />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default GlareHover;