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
  `
  <b>Beginning of Blue Ridge Parkway</b>
  <div>Elevation: 2,438 ft</div>
  <b>About This Project:</b> When I first moved to Asheville, the first thing I fell in love with were the stunning hikes. I was also aware of the impact hiking & human activity could have on these areas.
  <b>Why The Parkway?</b> The Blue Ridge Parkway is home to many people, animals, and plants. It exemplifies the importance of wildlife management and conservation.
  <img src="pictures/Start.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#91b7b9ff"
);

const location11 = createMarker(
  36.55956661848538, -80.9134961134877,
  "🌄",
  `
  <b>End of Blue Ridge Parkway in NC</b>
  <div>Elevation: 2,000 ft</div>
  <b>Project Credits:</b> By Joel Honorate, 12/8/2025, NM 231
  <b>Thanks To / Information From:</b> National Park Service, North Carolina Wildlife Resources Commission, Blue Ridge Parkway Association, Blue Ridge Country Magazine, UNC Asheville NEMAC
  <img src="pictures/End.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#cdb8a6ff"
);

const location2 = createMarker(
  35.4189673468547, -82.74798548729923,
  "🏔️",
  `
  <b>Mt. Pisgah – WHAT A VIEW</b>
  <div>Elevation: 5,721 ft</div>
  <b>Environmental Note:</b> High-elevation forests have warmed 0.3–0.5°C per decade; winter precipitation has shifted toward rain, affecting soil moisture, snowpack-dependent species, and forest regeneration.
  <b>Human Impact:</b> Off-trail hiking causes erosion; forest fragmentation accelerates microclimate changes; anthropogenic emissions contribute to observed warming trends.
  <b>Hike Info:</b> Length: ~3 miles round trip (1.5 miles one-way).
Difficulty: Moderate to Strenuous (steep and rocky, especially the second half).
  <img src="pictures/pisgah.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#9fc4a1ff"
);

const location3 = createMarker(
  35.61360117110935, -82.23094320931968,
  "🌊",
  `
  <b>Catawba Falls - TAKE A DIP</b>
  <div>Elevation: 2,400 ft</div>
  <b>Environmental Note:</b> Waterfalls create microhabitats supporting mosses, ferns, and specialized invertebrates. Seasonal flow variability affects downstream ecosystems; sediment transport is critical for stream ecology.
  <b>Human Impact:</b> Trampling increases erosion; swimming or rock manipulation alters substrate composition; litter introduces toxins and microplastics.
  <b>Hike Info:</b> Length: ~3.5 miles (full loop)
Difficulty: Easy to Lower Falls; Moderate/Strenuous to Upper Falls (due to stairs)
  <img src="pictures/catawba.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#c6a4a4ff"
);

const location4 = createMarker(
  35.460995494995295, -82.36794778143425,
  "🐄",
  `
  <b>Bearwallow Trail - MOOOOOOVE ALONG</b>
  <div>Elevation: 4,232 ft</div>
  <b>Environmental Note:</b> Appalachian pastures historically cleared forested land; grazing livestock increases soil compaction, accelerates nutrient runoff, and alters understory plant diversity.
  <b>Human Impact:</b> Overgrazing reduces native flora; livestock trails increase erosion; fertilizer and waste runoff affect adjacent streams, altering aquatic ecosystems.
  <b>Hike Info:</b> Length: ~2 miles round trip (to summit and back).
Difficulty: Moderate (easier via the gravel road, steeper via the trail).
  <img src="pictures/bearwallow.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#bac399ff"
);

const location5 = createMarker(
  35.262153239072994, -82.28343336442072,
  "🐟",
  `
  <b>Little Bradley - GONE FISHIN'</b>
  <div>Elevation: 1,650 ft</div>
  <b>Environmental Note:</b> Mountain streams support brook trout (Salvelinus fontinalis) and diverse invertebrates. Warming waters reduce oxygen solubility, stressing cold-water species.
  <b>Human Impact:</b> Runoff from agriculture and roads increases sedimentation and nutrient loads; stream channel alteration reduces habitat complexity; recreational disturbance can degrade spawning areas.
  <b>Hike Info:</b> Length: ~2 miles round trip (1 mile each way).
Difficulty: Moderate to Difficult, due to creek crossings and obstacles (especially after Hurricane Helene).
  <img src="pictures/bradley.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#b9d0dcff"
);

const location6 = createMarker(
  35.46021932780436, -83.14045614371052,
  "🐻",
  `
  <b>Waterrock Knob - WE BARE BEARS</b>
  <div>Elevation: 6,292 ft</div>
  <b>Environmental Note:</b> Black bears (Ursus americanus) in the southern Blue Ridge occupy large forested tracts; populations have rebounded from mid-20th-century lows of <5,000 in NC to ~15,000–20,000 today.
  <b>Human Impact:</b> Feeding bears increases habituation and mortality risk; roads fragment habitat and cause collisions; forestry and development reduce contiguous canopy cover critical for denning.
  <b>Hike Info:</b> Distance: ~1.2 miles round trip (short one way).
Difficulty: Moderate (mainly due to steepness).
  <img src="pictures/waterrock.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#d1bfa8ff"
);

const location7 = createMarker(
  35.29144584062427, -82.77679773450018,
  "🦎",
  `
  <b>Looking Glass - HELLBENT ON CHANGE</b>
  <div>Elevation: 3,969 ft</div>
  <b>Environmental Note:</b> Streams host many hellbender salamanders (Cryptobranchus alleganiensis) and native frogs; sedimentation and rising stream temperatures reduce breeding success and survival rates.
  <b>Human Impact:</b> Agricultural runoff and urban development elevate nitrates and turbidity; dams and channelization disrupt dispersal; collection and habitat disturbance threaten local populations.
  <b>Hike Info:</b> Length: Hike Up Mountain: ~6.5 miles roundtrip. Looking Glass Waterfall: Short Walk! Steps (around 94) lead down to the waterfall.
  Hike Difficulty: Moderate to Hard. While well-maintained with switchbacks, it's a steady uphill climb with a steep final half-mile. Falls Difficulty: Easy, yet slippery.
  <img src="pictures/looking.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#b1d2caff"
);

const location8 = createMarker(
  35.699863567280765, -82.3798248055686,
  "🌸",
  `
  <b>Craggy Gardens - SMELL THE FLOWERS</b>
  <div>Elevation: 6,105 ft</div>
  <b>Environmental Note:</b> High-altitude meadows host niche-adapted species; flowering times have advanced 10 to 20 days due to warming trends; extreme weather events damage reproductive success for flowers.
  <b>Human Impact:</b> Off-trail walking crushes rare plants; invasive species establishment is aided by soil disturbance; climate-induced shifts mismatch pollinator activity.
  <b>Hike Info:</b> Length: ~2.1 miles round trip (shorter from CG Visitor Center).
Difficulty: Moderate, winding paths, with some steady incline.
  <img src="pictures/craggy.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#d7b5d2ff"
);

const location9 = createMarker(
  35.67005164386752, -82.47100678778071,
  "🏕️",
  `
  <b>Rattlesnake Lodge - IS ANYBODY HOME</b>
  <div>Elevation: 3,700 ft</div>
  <b>Environmental Note:</b> Region historically shaped by Cherokee land management, controlled burns, and agriculture; European settlers introduced grazing and timber harvesting, altering forest composition.
  <b>Human Impact:</b> Always camp responsibly; Logging and settlement caused fragmented habitats; erosion increased in cleared lands; modern recreational use risks disturbing what are now archaeological sites.
  <b>Hike Info:</b> Length: ~3 miles roundtrip (to lodge & back), longer for alternate loops.
Difficulty: Moderate, uphill climb; however, offers various points of old ruin scenery and rest.
  <img src="pictures/snake.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#d6d5bbff"
);

const location10 = createMarker(
  35.32062885652188, -82.87623146252224,
  "🧭",
  `
  <b>Art Loeb Trail - THE ART OF HIKING</b>
  <div>Elevation: 6,214 ft</div>
  <b>Environmental Note:</b> Trail traverses Appalachian oak-hickory, cove hardwood, and spruce-fir forests. Invasive species are displacing native understory plants. Climate warming advances flowering by ~2–3 weeks over 50 years.
  <b>Human Impact:</b> Trampling from off-trail hiking compacts soil, reducing seed germination; forest edge creation promotes invasive colonization; fire suppression alters natural regeneration cycles.
  <b>Hike Info:</b> Often considered the most difficult local hike... Length: ~30s milesa
Difficulty: Strenuous/Very Hard (due to elevation, rocky sections, steepness). Average time: 3-4 days.
  <img src="pictures/art.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
  "#cabad7ff"
);

const unca = createMarker(
  35.617309561358425, -82.5664102092666,
  "🏫",
  `
  <b>UNC Asheville</b>
  <div>Elevation: 2,367 ft</div>
  <b>What Can We Do?:</b> We can be more aware, every time we are out there, we must not take for granted what lies right infront of us. It is up to our collective efforts as a community of outdoor lovers to make a real, impactful difference. It starts with you.
  <b>New Media For Environmentalism?:</b> The New Media world is more ready to help with these issues than we may think! We live in an age where we can now use our technology to reach SO many people & At UNCA, with New Media, the possibilites are endless! We could visualize data, turn research into stories, make experinces to get people to care. We could be the bridge between science and the media consuming public!
  <img src="pictures/UNCA.jpg" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
  `,
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