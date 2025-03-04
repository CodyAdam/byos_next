import React from 'react';

interface PreSatoriProps {
    children: (transform: (child: React.ReactNode) => React.ReactNode, props: any) => React.ReactNode;
}

// Dither pattern mapping
const ditherPatterns: Record<string, { 
    backgroundImage?: string; 
    background?: string; 
    backgroundSize?: string;
    backgroundColor?: string;
    backgroundRepeat?: string;
    imageRendering?: 'auto' | 'pixelated' | 'crisp-edges';
    color?: string;
}> = {
    'dither-0': { background: 'white' },
    'dither-15': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAB1JREFUKFNj/P///38GPIBxsCpgZGRkgLmdckcCAA+VIumpUMkGAAAAAElFTkSuQmCC)',
        backgroundSize: '8px 8px'
    },
    'dither-25': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACVJREFUKFNj/P///38GPIARpICRkZEBlzqwAoImUF8BspsodwMApr8l6f1RibAAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px'
    },
    'dither-50': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNj/P///38GPIARpICRkZEBWR0yH6yAoAmUK6CtGwAZEyvpL4ld4AAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px'
    },
    'dither-100': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACxJREFUKFNj/P///38GPICRgYEBRQ0jIyNIAK6FkaAJMAUYOqEmETaB9m4AABNDMekwLxh9AAAAAElFTkSuQmCC)',
        backgroundSize: '8px 8px'
    },
    'dither-150': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADJJREFUKFNj/P///38GPICRgYEBRQ0jIyNIgAFOEzQBpgCmA2Yb8SbA3IBuN9wkit0AAG2IN+kEJ1tPAAAAAElFTkSuQmCC)',
        backgroundSize: '8px 8px'
    },
    'dither-250': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAB9JREFUKFNj/P///38GPICRgYEBrIaRkRHEwKSHhQkAfhtD6Ucw9IAAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px'
    },
    'dither-300': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACpJREFUKFNj/P///38GPICRgYEBrIaRkRHEwKRBsjBJmEHIfOJMGGA3AADWlk/pFjm3rAAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px'
    },
    'dither-400': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAC9JREFUKFNj/P///39GRkaG////M8AAMp+RgQEk958BJohBg2WhAJtJxJkwwG4AAJ1sVe/92Y1jAAAAAElFTkSuQmCC)',
        backgroundSize: '8px 8px'
    },
    'dither-450': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAC1JREFUKFNj/P///39GRkaG////M8AAMp+RgQEk958BJohBI5uATRFpJgyQGwD152Hv3xKg5QAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px'
    },
    'dither-500': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACNJREFUKFNjZGBg+P///38GRkZGEAOTBsnilGRkZGAcFiYAADCuZ/UGINVQAAAAAElFTkSuQmCC)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-550': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAC1JREFUKFNjZGBg+P///38GRkZGBhhA5jOCZEGSMEF0GqQNbgJWRSSZMEBuAAD0L1v7ZeLPqQAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-600': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADBJREFUKFNjZGBg+P///38GRkZGBhhA5jOCZEGSMEF0GqTtPzadIDGwYqJMGGA3AABsFE/7ZTZQPQAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-700': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAC5JREFUKFNjZGBg+M+ABzD+////PyMjI8P///8ZsNGMIBNgkjCDkPnEmTDAbgAALhhEAQn0O+sAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-750': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACJJREFUKFPdzDERAAAIgEDoHxoLeAaQ5TcE4sgqlYpNXxwGpe44ASPfdroAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-850': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADdJREFUKFOljjEKADAMAvX/j77S4Tp0CIVmCSF62iRkmAK0PRIg+3bvz0xQoEPUO8EOd7ak/w4LB80mAaT38REAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-900': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADBJREFUKFNjZGBg+M+ABzD+////PyMjI1zJ////GZD5IBn8JsAUoOuE8QmbQHs3AACVqSAB6oX+JwAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-950': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAChJREFUKFNjZGBg+M+ABzCCFPz//5+BkRHEhABkPlgBQRMoV0BbNwAAmZ0UAR0pHrAAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-975': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAChJREFUKFNjZGBg+M+ABzCCFPz//5+BkRHExARgBQRNoL4CZDdR7gYAD4gOAY4oCDAAAAAASUVORK5CYII=)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-985': { 
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACFJREFUKFNjZGBg+M+ABzAOVgX///9nYGQEOY+BgXJHAgBsZwsBMq9u9gAAAABJRU5ErkJggg==)',
        backgroundSize: '8px 8px',
        color: 'white'
    },
    'dither-1000': { background: 'black', color: 'white' },
    'dither': { 
        backgroundColor: '#000',
        backgroundRepeat: 'repeat',
        imageRendering: 'pixelated'
    }
};

export const PreSatori: React.FC<PreSatoriProps> = ({ children, ...props }) => {
    // Define a helper to recursively transform children.
    const transform = (child: React.ReactNode): React.ReactNode => {
        if (React.isValidElement(child)) {
            const newProps: { [key: string]: any } = {};
            const { className, style, children, ...restProps } = child.props as { 
                className?: string; 
                style?: React.CSSProperties; 
                children?: React.ReactNode;
                [key: string]: any 
            };

            // Handle style props
            let newStyle: React.CSSProperties = { ...(style || {}) };
            
            // Add flex style if the element is a div
            if (child.type === 'div') {
                newStyle.display = 'flex';
            }
            
            // Process className for dither patterns
            if (className) {
                let remainingClassName = [];
                // Extract dither classes
                const classes = className.split(' ');
                // Check for dither classes and apply their styles
                for (const cls of classes) {
                    if (cls === 'dither' || cls.startsWith('dither-')) {
                        if (ditherPatterns[cls]) {
                            // Apply dither pattern styles
                            newStyle = {
                                ...newStyle,
                                ...ditherPatterns[cls]
                            };
                        }
                    } else {
                        // Keep the remaining className for non-Satori rendering
                        remainingClassName.push(cls);
                    }
                }
                // Keep the remaining className for non-Satori rendering
                newProps.tw = remainingClassName.join(' ');
            }
            
            // Apply the combined styles
            if (Object.keys(newStyle).length > 0) {
                newProps.style = newStyle;
            }

            // If the element has children, transform them recursively.
            if (children) {
                newProps.children = React.Children.map(children, transform);
            }

            return React.cloneElement(child, { ...restProps, ...newProps });
        }
        return child;
    };

    // The render prop provides the transformation helper to the parent.
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        fontFamily: 'BlockKie',
    }}>{children(transform, props)}</div>;
};