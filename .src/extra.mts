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
}