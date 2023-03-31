import React from 'react';
import {Restroom} from 'grommet-icons'
const styles: { [key: string]: React.CSSProperties } = {
    header: {
      width: "100%",
      backgroundColor: "lavender",
      fontWeight: "bold",
      padding: "1em",
    },
    gridContainer: {
      display: "grid",
      gridTemplateAreas: `
      'grid-icon grid-toilet'
      'grid-icon grid-timer'
      `,
      alignContent: "center",
      width: "10%",
      marginLeft: "5%",
    },
    gridIcon: {
      gridArea: "grid-icon",
    },
    gridToilet: {
      gridArea: "grid-toilet",
    },
    gridTimer: {
      gridArea: "grid-timer",
    }
  };
const PageHeader = () => {
    return (
      <div 
        style={styles.header} 
        className='pageHeader'
      >
        <div id="grid-container" style={styles.gridContainer}>
          <Restroom 
            color="plain" 
            size='large' 
            style={styles.gridIcon}
          />
          <div style={styles.gridToilet}>Toilet</div>
          <div style={styles.gridTimer}>Timer</div>
        </div>
      </div>
    )
}

export default PageHeader;