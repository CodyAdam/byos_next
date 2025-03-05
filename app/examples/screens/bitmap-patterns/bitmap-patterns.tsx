import { PreSatori } from "@/utils/pre-satori";

export default function BitmapPatterns() {
    // Define an array of dither values and their corresponding percentages
    const ditherValues = [
        { value: 0, percentage: "0%" },
        { value: 15, percentage: "1.5%" },
        { value: 25, percentage: "2.5%" },
        { value: 50, percentage: "5%" },
        { value: 100, percentage: "10%" },
        { value: 150, percentage: "15%" },
        { value: 250, percentage: "25%" },
        { value: 300, percentage: "30%" },
        { value: 400, percentage: "40%" },
        { value: 450, percentage: "45%" },
        { value: 500, percentage: "50%" },
        { value: 550, percentage: "55%" },
        { value: 600, percentage: "60%" },
        { value: 700, percentage: "70%" },
        { value: 750, percentage: "75%" },
        { value: 850, percentage: "85%" },
        { value: 900, percentage: "90%" },
        { value: 950, percentage: "95%" },
        { value: 975, percentage: "97.5%" },
        { value: 985, percentage: "98.5%" },
        { value: 1000, percentage: "100%" }
    ];


    // Calculate row height to evenly distribute across the container
    const rowHeight = 480 / Math.ceil(ditherValues.length / 2);
    return (
        <PreSatori>{(transform) => (<>{transform( // required as parent cannot access children props, so we need to pass the transform function to the children
            <div className="w-[800px] h-[480px] bg-white relative overflow-hidden" >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {ditherValues.map(({ value }, index) => {
                        const realIndex = ditherValues.length - index;
                        // because the smallest get rather last, we need to reverse the index
                        // note it starts from 1 not 0, as total 6 - last index 5 is 1 

                        let size = { w: 0, h: 0 };
                        let location = { x: 0, y: 0 };
                        // use height 480px for the first 6
                        const deltaRadiusForFirst6 = 480 / 6;
                        size = {
                            w: deltaRadiusForFirst6 * (realIndex),
                            h: deltaRadiusForFirst6 * (realIndex)
                        }
                        location = {
                            x: -1 * Math.round(size.w / 2) + 800 / 2,
                            y: (6 - realIndex) * deltaRadiusForFirst6
                        }
                        return (
                            <div key={value}
                                className={`dither dither-${value}`}
                                style={{
                                    width: `${size.w}px`,
                                    height: `${size.h}px`,
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    top: `${location.y}px`, // Center vertically with offset
                                    left: `${location.x}px` // Center horizontally with offset
                                }}>
                            </div>
                        );
                    })}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {ditherValues.reverse().slice(0, 11).map(({ value }) => (
                        <div key={`text-${value}`} style={{ height: `${rowHeight}px`, color: value > 850 ? 'white' : 'black' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>{value} | {1000-value}</div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 right-0 flex flex-col text-2xl p-2 items-end text-black">
                    <div>
                        22 shades of gray
                    </div>
                    <div>
                        0: white, 1000: black
                    </div>
                </div>
            </div>
        )}</>)}</PreSatori>
    );
}
