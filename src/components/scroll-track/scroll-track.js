import React from "react";
import styles from './scroll-track.module.css'

function ScrollTrack({scroll}) {

    return (
        <div className={styles.track} style={{top:`${scroll}px`}}></div>
    )
}

export default ScrollTrack;