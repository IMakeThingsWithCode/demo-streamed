import { config } from "./config.mjs";

export interface keyframe {
    /** The value of the keyframe */
    value: number,
    /** The time (in ms) between the start of the recording and the keyframe occuring */
    ms: number
}

export interface multiKeyframe {
    /** The value of the keyframe */
    values: number[],
    /** The time (in ms) between the start of the recording and the keyframe occuring */
    ms: number
}

export interface campathKeyframe extends multiKeyframe {
    /** X Y Z Pitch Yaw */
    values: [number, number, number, number, number]
}

export class Extra {
    /** Determines the value at a point between two keyframes */
    static tweenSingle(
        /** The keyframe currently in action (immidiate left of imaginary playhead) */
        currentKeyframe: keyframe,
        /** The keyframe next to be in action (immidiate right of imaginary playhead) */
        nextKeyframe: keyframe,
        /** The current time elapsed (in ms) */
        currentTime: number
    ): number {
        return currentKeyframe.value + (nextKeyframe.value - currentKeyframe.value) * ((currentTime - currentKeyframe.ms) / (nextKeyframe.ms - currentKeyframe.ms));
    }

    /** Determines the values at a point between two multi keyframes */
    static tweenMulti(
        /** The keyframe currently in action (immidiate left of imaginary playhead) */
        currentKeyframe: multiKeyframe,
        /** The keyframe next to be in action (immidiate right of imaginary playhead) */
        nextKeyframe: multiKeyframe,
        /** The current time elapsed (in ms) */
        currentTime: number
    ): number[] {
        let values: number[] = [];

        return values
    }

    /** Takes a list of single keyframes and the time and gives the current value */
    static tweenAllSingle(
        /** The keyframes to tween */
        keyframes: keyframe[],
        /** The current time (in ms) */
        time: number
    ): number {
        for (let i = 0; i < keyframes.length; i++) {
            if (keyframes[i].ms >= time) {
                // If first keyframe occurs after current timestamp, return its value
                if (keyframes[i - 1] == undefined) {
                    return keyframes[i].value
                }
                // Otherwise, tween
                return this.tweenSingle(keyframes[i - 1], keyframes[i], time);
            }
        }
        // Return last keyframe
        return keyframes.slice(-1)[0].value;
    }

    /** Takes a list of multi keyframes and the time and gives the current values */
    static tweenAllMulti(
        /** The keyframes to tween */
        keyframes: multiKeyframe[],
        /** The current time (in ms) */
        time: number,
        /** Wraps the yaw coordinate for campaths */
        wrapYaw: boolean = false
    ): number[] {
        let reformattedValues: keyframe[][] = [];

        for (let i = 0; i < keyframes[0].values.length; i++) {
            reformattedValues.push([]);
            keyframes.forEach((keyframe) => {
                reformattedValues[i].push({
                    value: keyframe.values[i],
                    ms: keyframe.ms
                });
            })
        }

        let values: number[] = [];

        reformattedValues.forEach((value, i) => {
            if(wrapYaw && i == 4) {
                
            }
            values.push(this.tweenAllSingle(value, time))
        })

        return values
    }

    /** Takes a campath and normalizes them based on velocity along a given time period */
    static campathConstantSpeed(
        /** The keyframes to "normalize" */
        multiKeyframes: campathKeyframe[],
        /** The time (in ms) period to "normalize" them upon */
        totalTime: number
    ): campathKeyframe[] {
        /** The differences in values between each keyframe pair */
        let deltas: number[][] = [];
        multiKeyframes.forEach((mk, i) => {
            if (i == multiKeyframes.length - 1) {
                return;
            }
            let deltasBetweenCurrentPair: number[] = [];
            mk.values.forEach((value, j) => {
                deltasBetweenCurrentPair.push(Math.abs(multiKeyframes[i + 1].values[j] - value));
            })
            deltas.push(deltasBetweenCurrentPair);
        })

        /** The distances traveled between each keyframe pair */
        let distances: number[] = [];

        deltas.forEach((delta) => {
            distances.push(Math.sqrt(delta[0] ** 2 + delta[1] ** 2 + delta[2] ** 2));
        })

        let totalDistance: number = 0;
        distances.forEach((distance) => {
            totalDistance += distance;
        })

        let normalizedKeyframes: campathKeyframe[] = [];
        multiKeyframes.forEach((keyframe, index) => {
            let newKeyframe: campathKeyframe = {
                ms: 0,
                values: keyframe.values
            }
            if (index == 0) {
                normalizedKeyframes.push(newKeyframe);
                return;
            }

            newKeyframe.ms = normalizedKeyframes[index-1].ms + Math.round((totalTime * distances[index - 1]) / totalDistance);
            
            normalizedKeyframes.push(newKeyframe);
        })

        return normalizedKeyframes
    }
    static parseCampath(
        /** The array of spec_pos commands */
        pathString: string[],
    ): campathKeyframe[] {
        let campath: campathKeyframe[] = [];
        pathString.forEach((path) => {
            let pathSplit = path.split(' ');
            console.log(pathSplit);
            let values: number[] = [];
            for (let i = 1; i < pathSplit.length; i++) {
                values.push(parseFloat(pathSplit[i]));
            }
            campath.push({
                ms: 0,
                values: [
                    values[0],
                    values[1],
                    values[2],
                    values[3],
                    values[4]
                ]
            })
        })
        return campath;
    }
}

// Example campath

export const myCampath: campathKeyframe[] = Extra.campathConstantSpeed(
    Extra.parseCampath(
`spec_goto 144.0 -1611.4 -83.9 -0.2 -168.4
spec_goto -36.9 -1698.5 -82.3 -0.5 173.5
spec_goto -493.9 -1886.2 -75.3 -0.1 126.8
spec_goto -732.4 -1744.4 -74.5 1.8 87.7
spec_goto -741.0 -1498.3 -95.0 15.9 75.5
spec_goto -663.6 -1135.3 -154.9 5.9 93.8
spec_goto -632.4 -888.4 -178.2 5.9 107.6`
    .split('\n')),
    config.seconds * 1000
)
