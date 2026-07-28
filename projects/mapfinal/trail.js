const map = L.map("map").setView([35.40883023280333, -82.74644091577696], 10);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri',
  maxZoom: 20
}).addTo(map);

function createMarker(lat, lng, emoji, popupContent, bgColor = "orange") {
  const icon = L.divIcon({
    html: `<div style="
      width: 45px; 
      height: 45px; 
      background-color: ${bgColor}; 
      border-radius: 50%; 
      display: flex; 
      justify-content: center; 
      align-items: center;
      font-size: 25px;
      border: 2px solid #464158ff;
      ">
      ${emoji}
    </div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 50]
  });

  const marker = L.marker([lat, lng], { icon: icon }).addTo(map);

  marker.bindPopup(popupContent, {
    maxWidth: 400,
    autoPan: true,
    autoPanPadding: [30, 30]
  });

  marker.on('popupopen', () => {
    map.panTo(marker.getLatLng(), { animate: true, duration: 0.5 });
  });

  return marker;
}

const parkwayLinePoints4 = [
  [35.50533458897466, -83.29846917441887],
  [35.46021932780436, -83.14045614371052], //Watterock 

];

const parkwayLine4 = L.polyline(parkwayLinePoints4, {
  color: "green",
  weight: 2.5,
  opacity: 0.5,
}).addTo(map);

// THIRD LINE
const parkwayLinePoints3 = [
  [35.67005164386752, -82.47100678778071], //Snake
  [35.617309561358425, -82.5664102092666] //School / end
];

const parkwayLine3 = L.polyline(parkwayLinePoints3, {
  color: "green",
  weight: 2.5,
  opacity: 0.5,
}).addTo(map);


// SECOND LINE
const parkwayLinePoints2 = [
  [35.50533458897466, -83.29846917441887],
  [35.511148596706676, -83.16022684148992],
  [35.433026431142906, -83.0751601639897],
  [35.29773648192604, -82.9151565899325],
  [35.44467239468815, -82.72591655676094],
  [35.54192108978115, -82.49896215616677],
  [35.6474669345506, -82.4900985678014],
  [35.74750332045125, -82.33427470462979],
  [35.702272704277775, -82.25346322038455],
  [35.85115490651174, -82.09808828618021],
  [35.98082175537145, -81.91474761732057],
  [36.12072681482476, -81.78064026746249],
  [36.24319236980697, -81.53327348515873],
  [36.42418610548629, -81.14541578384268],
  [36.55956661848538, -80.9134961134877],
];

const parkwayLine2 = L.polyline(parkwayLinePoints2, {
  color: "#004c98ff",
  weight: 3.5,
  opacity: 0.7,
}).addTo(map);

//POLYLINE
const parkwayLinePoints = [
  [35.46021932780436, -83.14045614371052], //Watterock 
  [35.32062885652188, -82.87623146252224], //Art
  [35.29144584062427, -82.77679773450018], //Looking
  [35.4189673468547, -82.74798548729923], //Pisgah
  [35.262153239072994, -82.28343336442072], //Bradley
  [35.460995494995295, -82.36794778143425], //Bear
  [35.61360117110935, -82.23094320931968], //Catabwa
  [35.699863567280765, -82.3798248055686], //Craggy
  [35.67005164386752, -82.47100678778071], //Snake
];


const parkwayLine = L.polyline(parkwayLinePoints, {
  color: "red",
  weight: 1.5,
  opacity: 1,
}).addTo(map);


// MARKERS WITH  POPUPS
const location1 = createMarker(
  35.50533458897466, -83.29846917441887,
  "🏞",
  `<b>Beginning of Blue Ridge Parkway</b>
  <div>Elevation: 2,438 ft</div>
  <b>About This Project:</b> When I moved to Asheville, the hikes blew me away — and so did learning the impact we have on them.
  <b>Why The Parkway?</b> Home to countless people, animals & plants — a living example of why conservation matters.
  <img src="pictures/Start.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#91b7b9ff"
);

const location11 = createMarker(
  36.55956661848538, -80.9134961134877,
  "🌄",
  `<b>End of Blue Ridge Parkway in NC</b>
  <div>Elevation: 2,000 ft</div>
  <b>Project Credits:</b> By Joel Honorate · 12/8/2025 · NM 231
  <b>Thanks To:</b> National Park Service, NC Wildlife Resources Commission, Blue Ridge Parkway Association, Blue Ridge Country Magazine & UNCA NEMAC.
  <img src="pictures/End.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#cdb8a6ff"
);

const location2 = createMarker(
  35.4189673468547, -82.74798548729923,
  "🏔️",
  `<b>Mt. Pisgah – WHAT A VIEW</b>
  <div>Elevation: 5,721 ft</div>
  <b>Environmental Note:</b> High-elevation forests have warmed 0.3–0.5°C/decade; winter precip shifting to rain, stressing snowpack-dependent species.
  <b>Human Impact:</b> Off-trail hiking causes erosion; emissions accelerate warming trends.
  <b>Hike Info:</b> ~3 mi round trip · Moderate/Strenuous
  <img src="pictures/pisgah.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#9fc4a1ff"
);

const location3 = createMarker(
  35.61360117110935, -82.23094320931968,
  "🌊",
  `<b>Catawba Falls – TAKE A DIP</b>
  <div>Elevation: 2,400 ft</div>
  <b>Environmental Note:</b> Waterfalls host microhabitats for mosses, ferns & invertebrates; seasonal flow affects downstream ecosystems.
  <b>Human Impact:</b> Trampling erodes banks; litter introduces microplastics into streams.
  <b>Hike Info:</b> ~3.5 mi loop · Easy to Lower Falls · Moderate/Strenuous to Upper
  <img src="pictures/catawba.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#c6a4a4ff"
);

const location4 = createMarker(
  35.460995494995295, -82.36794778143425,
  "🐄",
  `<b>Bearwallow Trail – MOOOOOOVE ALONG</b>
  <div>Elevation: 4,232 ft</div>
  <b>Environmental Note:</b> Grazing compacts soil, spikes nutrient runoff & reduces native plant diversity in Appalachian pastures.
  <b>Human Impact:</b> Overgrazing & fertilizer runoff damage adjacent streams and aquatic ecosystems.
  <b>Hike Info:</b> ~2 mi round trip · Moderate
  <img src="pictures/bearwallow.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#bac399ff"
);

const location5 = createMarker(
  35.262153239072994, -82.28343336442072,
  "🐟",
  `<b>Little Bradley – GONE FISHIN'</b>
  <div>Elevation: 1,650 ft</div>
  <b>Environmental Note:</b> Home to brook trout & diverse invertebrates; warming water reduces oxygen, stressing cold-water species.
  <b>Human Impact:</b> Ag runoff increases sedimentation; recreation disturbs spawning areas.
  <b>Hike Info:</b> ~2 mi round trip · Moderate/Difficult (esp. post-Helene)
  <img src="pictures/bradley.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#b9d0dcff"
);

const location6 = createMarker(
  35.46021932780436, -83.14045614371052,
  "🐻",
  `<b>Waterrock Knob – WE BARE BEARS</b>
  <div>Elevation: 6,292 ft</div>
  <b>Environmental Note:</b> Black bear populations rebounded from under 5,000 to ~15,000–20,000 in NC today.
  <b>Human Impact:</b> Never feed bears — habituation leads to mortality; roads fragment habitat & cause collisions.
  <b>Hike Info:</b> ~1.2 mi round trip · Moderate
  <img src="pictures/waterrock.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#d1bfa8ff"
);

const location7 = createMarker(
  35.29144584062427, -82.77679773450018,
  "🦎",
  `<b>Looking Glass – HELLBENT ON CHANGE</b>
  <div>Elevation: 3,969 ft</div>
  <b>Environmental Note:</b> Home to hellbender salamanders & native frogs; sedimentation & warming streams reduce breeding success.
  <b>Human Impact:</b> Ag runoff, dams & habitat disturbance threaten local populations.
  <b>Hike Info:</b> Mountain: ~6.5 mi rt · Moderate/Hard · Falls: Easy (94 steps, slippery!)
  <img src="pictures/looking.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#b1d2caff"
);

const location8 = createMarker(
  35.699863567280765, -82.3798248055686,
  "🌸",
  `<b>Craggy Gardens – SMELL THE FLOWERS</b>
  <div>Elevation: 6,105 ft</div>
  <b>Environmental Note:</b> Flowering times have advanced 10–20 days due to warming; extreme weather damages reproductive cycles.
  <b>Human Impact:</b> Off-trail walking crushes rare plants; invasives colonize disturbed soil.
  <b>Hike Info:</b> ~2.1 mi round trip · Moderate
  <img src="pictures/craggy.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#d7b5d2ff"
);

const location9 = createMarker(
  35.67005164386752, -82.47100678778071,
  "🏕️",
  `<b>Rattlesnake Lodge – IS ANYBODY HOME</b>
  <div>Elevation: 3,700 ft</div>
  <b>Environmental Note:</b> Shaped by Cherokee land mgmt & controlled burns; European settlers introduced grazing & timber, altering forest composition.
  <b>Human Impact:</b> Always camp responsibly — logging caused fragmented habitats & these are now archaeological sites.
  <b>Hike Info:</b> ~3 mi round trip · Moderate (ruins along the way!)
  <img src="pictures/snake.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#d6d5bbff"
);

const location10 = createMarker(
  35.32062885652188, -82.87623146252224,
  "🧭",
  `<b>Art Loeb Trail – THE ART OF HIKING</b>
  <div>Elevation: 6,214 ft</div>
  <b>Environmental Note:</b> Traverses oak-hickory, cove hardwood & spruce-fir forests; invasives displacing native understory plants.
  <b>Human Impact:</b> Trampling compacts soil; fire suppression alters natural regeneration cycles.
  <b>Hike Info:</b> ~30 mi total · Very Strenuous · Avg 3–4 days
  <img src="pictures/art.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#cabad7ff"
);

const unca = createMarker(
  35.617309561358425, -82.5664102092666,
  "🏫",
  `<b>UNC Asheville</b>
  <div>Elevation: 2,367 ft</div>
  <b>What Can We Do?</b> Every time we're out there, we can't take it for granted. It's up to us as a community of outdoor lovers to make a real difference.
  <b>New Media For Environmentalism?</b> We can visualize data, turn research into stories & be the bridge between science and the public. The possibilities at UNCA are endless!
  <img src="pictures/UNCA.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`,
  "#acbbd6ff"
);

const keyBindings = {
  "w": location6,       // Waterrock
  "a": location10,      // Art Loeb
  "s": location7,       // Looking Glass
  "d": location2,       // Mt. Pisgah
  "ArrowUp": location5,     // Little Bradley
  "ArrowLeft": location4,   // Bearwallow
  "ArrowDown": location3,   // Catawba Falls
  "ArrowRight": location8,  // Craggy Gardens
  " ": location9         // Rattlesnake Lodge
};

 document.addEventListener("keydown", e => {
  const marker = keyBindings[e.key];
  if (!marker) return;

  map.off('moveend');  // here i had some AI help, due to my program crshing a lot, however, all it does is remove any previous listener

  map.flyTo(marker.getLatLng(), 12, { duration: 1.5 });

  map.once('moveend', () => {
    marker.openPopup();  // & here, with that help, the idividual popups will open automatically
  });
});