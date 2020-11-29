import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

require('dotenv').config();

//class Map extends Component {
const App = () => {
  const [logEntries, setlogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    //latitude: 37.7577,
    //longitude: -122.4376,
    latitude: 9.5843,
    longitude: 76.5687,
    zoom: 8
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setlogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    //console.log(event);
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    }); 
  }

  return (
    <ReactMapGL
      //{...this.state.viewport}
      {...viewport}
      mapStyle='mapbox://styles/devalan/ckhdg76k0043k19pudvrvzezo'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker 
              latitude={entry.latitude} 
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  showPopup, [entry._id]: true,
                })}
              >
                <img
                  className="marker"
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                >
                </img>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude} 
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  sortByDepth={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image ? <img src={entry.image} alt={entry.title} /> : null}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
          >
            <div
            >
              <img
                className="marker"
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              >
              </img>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            sortByDepth={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
              <h3>Add New Memory😍😍</h3>
              <LogEntryForm onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }} location={addEntryLocation} />
            </div>
          </Popup>
          </>
        ) : null
      }

    </ReactMapGL>
  );
}

export default App;

//<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>