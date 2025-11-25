export interface NASAMissionData {
  id: string;
  name: string;
  agency: string;
  status: "Active" | "Completed" | "Planned";
  planet: string;
  launchDate: string;
  completionDate?: string;
  description: string;
  objectives: string[];
  datasetUrl: string;
  imageUrl?: string;
  color: string;
  icon: string;
}

export interface NASAPlanetData {
  slug: string;
  name: string;
  color: string;
  glow: string;
  short: string;
  description: string;
  facts: { label: string; value: string }[];
  hasRings?: boolean;
  size?: number;
  texture?: string;
  ringTexture?: string;
}

// const SPACE_DATA_API = "https://api.spaceflightnewsapi.net/v4";

export async function fetchNASAMissions(): Promise<NASAMissionData[]> {
  const missions: NASAMissionData[] = [
    // MARS MISSIONS
    {
      id: "mariner4",
      name: "Mariner 4",
      agency: "NASA",
      status: "Completed",
      planet: "Mars",
      launchDate: "November 28, 1964",
      completionDate: "December 21, 1967",
      description:
        "First successful Mars flyby. Returned humanity’s first close-up images of another planet, showing a cratered surface.",
      objectives: ["Perform Mars flyby", "Capture close-up images", "Measure magnetic field"],
      datasetUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1964-077A",
      color: "#ef4444",
      icon: "📡"
    },
  
    {
      id: "mariner6",
      name: "Mariner 6",
      agency: "NASA",
      status: "Completed",
      planet: "Mars",
      launchDate: "February 24, 1969",
      completionDate: "October 1971",
      description:
        "Flyby spacecraft capturing images of the south polar region and equatorial areas.",
      objectives: ["Flyby imaging", "Atmosphere analysis"],
      datasetUrl: "https://nssdc.gsfc.nasa.gov/planetary/mars/mariner6.html",
      color: "#ef4444",
      icon: "🛰️"
    },
  
    {
      id: "mariner7",
      name: "Mariner 7",
      agency: "NASA",
      status: "Completed",
      planet: "Mars",
      launchDate: "March 27, 1969",
      description:
        "Companion to Mariner 6, performed similar observations including detailed atmospheric spectrometry.",
      objectives: ["Flyby imaging", "Spectral analysis"],
      datasetUrl: "https://nssdc.gsfc.nasa.gov/planetary/mars/mariner7.html",
      color: "#ef4444",
      icon: "🛰️"
    },
  
    {
      id: "mars2",
      name: "Mars 2",
      agency: "Soviet Union",
      status: "Completed",
      planet: "Mars",
      launchDate: "May 19, 1971",
      description:
        "First Mars orbiter. Lander crashed but orbiter returned valuable data on atmosphere and surface.",
      objectives: ["Orbit Mars", "Study atmosphere", "Surface imaging"],
      datasetUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-045A",
      color: "#ef4444",
      icon: "🛰️"
    },
  
    {
      id: "mars3",
      name: "Mars 3",
      agency: "Soviet Union",
      status: "Completed",
      planet: "Mars",
      launchDate: "May 28, 1971",
      description:
        "First soft landing on Mars, but lander transmitted for only 20 seconds before failing.",
      objectives: ["Soft landing", "Transmit surface data", "Orbit Mars"],
      datasetUrl: "https://nssdc.gsfc.nasa.gov/planetary/mars/mars3.html",
      color: "#ef4444",
      icon: "🚀"
    },
  
    {
      id: "marsorbiter",
      name: "Mars Orbiter Mission (Mangalyaan)",
      agency: "ISRO",
      status: "Completed",
      planet: "Mars",
      launchDate: "November 5, 2013",
      completionDate: "September 28, 2022",
      description:
        "India’s first Mars mission. Demonstrated interplanetary navigation and studied atmosphere and surface.",
      objectives: [
        "Demonstrate interplanetary mission capability",
        "Study surface features",
        "Analyze atmosphere and methane"
      ],
      datasetUrl: "https://pradan.iiap.res.in/mom_data/",
      color: "#ef4444",
      icon: "🌏"
    },
  
    {
      id: "tianwen1_orbiter",
      name: "Tianwen-1 Orbiter",
      agency: "China National Space Administration",
      status: "Active",
      planet: "Mars",
      launchDate: "July 23, 2020",
      description:
        "Part of China’s first Mars mission, includes orbiter, lander, and rover. Provides high-resolution mapping and atmospheric studies.",
      objectives: [
        "Orbit Mars",
        "Study atmosphere",
        "Map surface",
        "Relay for Zhurong rover"
      ],
      datasetUrl: "http://www.cnsa.gov.cn",
      color: "#ef4444",
      icon: "🛰️"
    },
    { id: "mariner9", name: "Mariner 9", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "May 30, 1971", completionDate: "August 27, 1972", description: "First spacecraft to orbit Mars, providing detailed images of the planet's surface, atmosphere, and moons. Discovered enormous volcanoes and a vast canyon system.", objectives: ["Orbit Mars and conduct remote sensing", "Acquire high-resolution images of surface", "Study atmospheric composition", "Investigate water features and geology"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mariner/index.htm", color: "#ef4444", icon: "🛰️" },
    { id: "viking1", name: "Viking 1", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "August 20, 1975", completionDate: "November 13, 1982", description: "Orbiter-lander combination conducting the first successful Mars landing and performing experiments to detect signs of extraterrestrial life.", objectives: ["Land on Mars and conduct surface experiments", "Search for organic compounds and life", "Analyze soil and atmosphere", "Transmit high-resolution images"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/viking/visedr.html", color: "#ef4444", icon: "🚀" },
    { id: "viking2", name: "Viking 2", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "September 9, 1975", completionDate: "April 11, 1989", description: "Second Viking lander mission providing complementary data from different Martian location and conducting additional life-detection experiments.", objectives: ["Land at different site for comprehensive coverage", "Conduct life detection and chemistry experiments", "Study Martian geology and atmosphere", "Return extensive photographic data"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/viking/visedr.html", color: "#ef4444", icon: "🚀" },
    { id: "sojourner", name: "Sojourner Rover", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "December 4, 1996", completionDate: "September 27, 1997", description: "First Mars rover, weighing just 65 pounds. Despite its short mission, it proved the feasibility of rover-based exploration and collected valuable geological data.", objectives: ["Test rover mobility and navigation", "Conduct in-situ mineral analysis", "Study rock and soil composition", "Demonstrate new exploration techniques"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mpf/index.htm", color: "#ef4444", icon: "🤖" },
    { id: "marsodyssey", name: "Mars Odyssey", agency: "NASA", status: "Active", planet: "Mars", launchDate: "April 7, 2001", description: "Long-duration orbiter mission studying Mars's geology, climate, and radiation environment. Currently the longest-operating spacecraft at Mars.", objectives: ["Map hydrogen and water ice distribution", "Measure radiation environment", "Study mineralogy and geology", "Provide telecommunications relay for rovers"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/odyssey/index.htm", color: "#ef4444", icon: "🛰️" },
    { id: "spirit", name: "Spirit Rover", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "June 10, 2003", completionDate: "March 22, 2010", description: "One of two Mars Exploration Rovers. Spirit operated for nearly seven years, discovering evidence of ancient water activity and exploring the Gusev Crater.", objectives: ["Search for evidence of ancient water", "Study rock and soil composition", "Investigate past habitability", "Conduct geological surveys"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mer/geo_mer_datasets.htm", color: "#ef4444", icon: "🤖" },
    { id: "opportunity", name: "Opportunity Rover", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "July 8, 2003", completionDate: "June 10, 2018", description: "Mars Exploration Rover that far exceeded its planned 90-day mission, operating for nearly 15 years. Discovered evidence of ancient water-altered rocks in Meridiani Planum.", objectives: ["Study ancient aqueous environments", "Analyze hematite and mineral deposits", "Search for signs of past life", "Traverse and map extensive terrain"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mer/geo_mer_datasets.htm", color: "#ef4444", icon: "🚗" },
    { id: "marsexpress", name: "Mars Express", agency: "European Space Agency", status: "Active", planet: "Mars", launchDate: "June 2, 2003", description: "ESA's orbiter studying Mars's geology, atmosphere, and subsurface structure. Operating successfully since 2003, providing valuable high-resolution data.", objectives: ["Map Mars's mineralogy and geology", "Study atmospheric circulation", "Search for subsurface water", "Investigate planet's magnetic field"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mars_express/default.htm", color: "#ef4444", icon: "🛰️" },
    { id: "mro", name: "Mars Reconnaissance Orbiter", agency: "NASA", status: "Active", planet: "Mars", launchDate: "August 12, 2005", description: "Sophisticated orbiter providing the highest-resolution images of Mars surface. Key mission supporting rover operations through data relay and reconnaissance.", objectives: ["Acquire high-resolution surface imagery", "Study water ice and layered deposits", "Monitor atmospheric dynamics", "Provide relay for rover communications"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/mro/default.htm", color: "#ef4444", icon: "📷" },
    { id: "phoenix", name: "Phoenix Lander", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "August 4, 2007", completionDate: "November 2, 2008", description: "Lander mission focused on the Martian arctic. Confirmed presence of water ice and conducted extensive meteorological and soil analysis at high northern latitudes.", objectives: ["Study water ice and subsurface conditions", "Analyze soil chemistry and composition", "Monitor weather and atmospheric patterns", "Investigate habitability potential"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/phoenix/index.htm", color: "#ef4444", icon: "🏠" },
    { id: "maven", name: "MAVEN", agency: "NASA", status: "Active", planet: "Mars", launchDate: "November 18, 2013", description: "Mars Atmosphere and Volatile Evolution orbiter studying how the Martian atmosphere was lost to space over billions of years.", objectives: ["Study atmospheric loss to space", "Measure solar wind interactions", "Analyze ionosphere and chemistry", "Understand climate change mechanisms"], datasetUrl: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MAVEN/maven_main.html", color: "#ef4444", icon: "💨" },
    { id: "curiosity", name: "Curiosity Rover", agency: "NASA", status: "Active", planet: "Mars", launchDate: "November 26, 2011", description: "Car-sized rover conducting detailed geological investigation of Gale Crater. Successfully confirms Mars had environmental conditions suitable for microbial life.", objectives: ["Search for organic compounds", "Measure radiation environment", "Study atmospheric composition", "Investigate water history and geology"], datasetUrl: "https://data.nasa.gov/dataset/mars-surface-image-curiosity-rover-labeled-data-set-version-1", color: "#ef4444", icon: "🤖" },
    { id: "insight", name: "InSight Lander", agency: "NASA", status: "Completed", planet: "Mars", launchDate: "May 5, 2018", completionDate: "December 19, 2022", description: "First mission to study Mars's interior structure. Deployed a seismometer to detect marsquakes and drill to measure subsurface heat flow.", objectives: ["Measure seismic activity and structure", "Study internal heat flow", "Map subsurface composition", "Understand planetary formation"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/INSIGHT/insight.html", color: "#ef4444", icon: "📡" },
    { id: "perseverance", name: "Perseverance Rover", agency: "NASA", status: "Active", planet: "Mars", launchDate: "July 30, 2020", description: "Advanced rover collecting rock samples and searching for signs of ancient microbial life. Accompanied by Ingenuity helicopter, first aircraft to fly on another planet.", objectives: ["Collect rock samples for future return", "Search for microbial life signs", "Test oxygen production from atmosphere", "Map terrain and geology"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/perseverance_rover.html", color: "#ef4444", icon: "🚗" },
    { id: "ingenuity", name: "Ingenuity Helicopter", agency: "NASA", status: "Active", planet: "Mars", launchDate: "July 30, 2020", description: "Small rotorcraft demonstrating powered flight in Mars's thin atmosphere. Far exceeded its planned five-flight mission with dozens of successful flights.", objectives: ["Demonstrate powered flight feasibility", "Conduct aerial reconnaissance", "Map terrain from above", "Support rover operations planning"], datasetUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/", color: "#ef4444", icon: "🚁" },
    { id: "hope", name: "Hope Orbiter (Al-Amal)", agency: "United Arab Emirates Space Agency", status: "Active", planet: "Mars", launchDate: "July 20, 2020", description: "First Mars mission by the UAE. Orbiter studying Martian atmosphere and its variations across regions, seasons, and over time.", objectives: ["Study atmospheric circulation patterns", "Measure atmospheric composition", "Investigate weather dynamics", "Study loss mechanisms to space"], datasetUrl: "https://sdc.emiratesmarsmission.ae/", color: "#ef4444", icon: "🌍" },
    { id: "exomars2016", name: "ExoMars 2016", agency: "European Space Agency / Roscosmos", status: "Completed", planet: "Mars", launchDate: "March 14, 2016", completionDate: "December 2022", description: "Orbiter and entry/descent vehicle mission to test landing technologies and search for organic compounds in Martian soil.", objectives: ["Test landing technologies", "Search for organic compounds", "Study atmospheric chemistry", "Prepare for future rovers"], datasetUrl: "https://www.cosmos.esa.int/web/psa/exomars2016", color: "#ef4444", icon: "🛰️" },
    { id: "zhurong", name: "Zhurong Rover", agency: "China National Space Administration", status: "Active", planet: "Mars", launchDate: "July 23, 2020", description: "China's first Mars rover, successfully landed in Utopia Planitia. Exploring terrain, detecting subsurface water, and studying surface composition.", objectives: ["Explore landing site terrain", "Detect subsurface water and ice", "Study soil and rock composition", "Conduct atmospheric measurements"], datasetUrl: "https://www.scidb.cn/en/detail?dataSetId=6a95d2dc3e1d4ca0ad86b28855862db6", color: "#ef4444", icon: "🤖" },
    // JUPITER MISSIONS
    { id: "voyager1j", name: "Voyager 1 (Jupiter Flyby)", agency: "NASA", status: "Active", planet: "Jupiter", launchDate: "September 5, 1977", description: "Historic deep space probe conducting gravity assist flyby of Jupiter to reach outer planets. Discovered Jupiter's faint rings and discovered several moons.", objectives: ["Study Jupiter's atmosphere and magnetosphere", "Investigate Galilean moons", "Discover new moons and rings", "Test outer planet exploration techniques"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/Voyager/ephemeris_data.html", color: "#fbbf24", icon: "🚀" },
    { id: "voyager2j", name: "Voyager 2 (Jupiter Flyby)", agency: "NASA", status: "Active", planet: "Jupiter", launchDate: "August 20, 1977", description: "Second Voyager spacecraft conducting Jupiter flyby, discovering active volcanism on Io and ring system details. Continued to Neptune after Jupiter.", objectives: ["Study Jupiter's weather systems", "Investigate moon interactions", "Discover volcanic activity on Io", "Study ring structure and composition"], datasetUrl: "https://data.nasa.gov/dataset/?tags=voyager", color: "#fbbf24", icon: "🚀" },
    { id: "galileo", name: "Galileo Orbiter", agency: "NASA", status: "Completed", planet: "Jupiter", launchDate: "October 18, 1989", completionDate: "September 21, 2003", description: "First spacecraft to orbit Jupiter and enter its atmosphere. Discovered subsurface ocean on Europa, conducted detailed moon and atmosphere studies.", objectives: ["Orbit Jupiter for extended study", "Investigate Galilean moons in detail", "Search for subsurface oceans", "Study atmospheric composition"], datasetUrl: "https://data.nasa.gov/dataset/galileo-orbiter-at-jupiter-calibrated-mag-high-res-v1-0-afa22", color: "#fbbf24", icon: "📡" },
    { id: "galileoprobe", name: "Galileo Probe", agency: "NASA", status: "Completed", planet: "Jupiter", launchDate: "October 18, 1989", completionDate: "December 7, 1995", description: "Atmospheric probe released by Galileo orbiter, entering Jupiter's atmosphere and transmitting data on composition, temperature, and pressure.", objectives: ["Measure atmospheric composition", "Study temperature and pressure profiles", "Investigate cloud composition", "Test entry and parachute systems"], datasetUrl: "https://data.nasa.gov/dataset/?tags=jupiter&tags=galileo", color: "#fbbf24", icon: "🌪️" },
    { id: "juno", name: "Juno Orbiter", agency: "NASA", status: "Active", planet: "Jupiter", launchDate: "August 5, 2011", description: "Orbiter studying Jupiter's composition, gravity field, and magnetic field. Revealing large cyclones at poles and detailed internal structure information.", objectives: ["Measure atmospheric water content", "Study magnetic field properties", "Investigate internal structure", "Analyze auroras and radiation"], datasetUrl: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/JUNO/juno.html", color: "#fbbf24", icon: "🪐" },
    // SATURN MISSIONS
    { id: "voyager1s", name: "Voyager 1 (Saturn Flyby)", agency: "NASA", status: "Active", planet: "Saturn", launchDate: "September 5, 1977", description: "Conducted detailed Saturn encounter discovering complex ring structure, new moons, and detailed views of Titan's thick atmosphere.", objectives: ["Study Saturn's rings in detail", "Investigate Titan's atmosphere", "Discover new moons and rings", "Measure magnetic field"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/saturnvoyager/voyager.html", color: "#fde68a", icon: "🚀" },
    { id: "voyager2s", name: "Voyager 2 (Saturn Flyby)", agency: "NASA", status: "Active", planet: "Saturn", launchDate: "August 20, 1977", description: "Second Voyager encounter with Saturn, discovering new ring structure, moonlets, and detailed atmospheric features. Found spokes in rings.", objectives: ["Study atmospheric dynamics", "Investigate ring composition", "Search for new moons", "Measure radiation environment"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/saturnvoyager/voyager.html", color: "#fde68a", icon: "🚀" },
    { id: "cassini", name: "Cassini Orbiter", agency: "NASA / ESA / ASI", status: "Completed", planet: "Saturn", launchDate: "October 15, 1997", completionDate: "September 15, 2017", description: "Long-duration Saturn mission orbiting for 13 years. Discovered methane seas on Titan, detected geysers from Enceladus, and revealed Saturn's complex ring system.", objectives: ["Study Saturn's rings in detail", "Investigate Titan's complex atmosphere", "Search for habitable worlds (Enceladus)", "Discover and characterize new moons"], datasetUrl: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/Cassini/Cassini.html", color: "#fde68a", icon: "🛰️" },
    { id: "huygens", name: "Huygens Probe", agency: "ESA / NASA", status: "Completed", planet: "Saturn", launchDate: "October 15, 1997", completionDate: "January 14, 2005", description: "Atmospheric probe landing on Titan. Revealed methane lakes and organic chemistry on Titan's surface, providing unprecedented data about this moon.", objectives: ["Descend through Titan's atmosphere", "Study atmospheric composition", "Image surface during descent", "Conduct surface measurements"], datasetUrl: "https://psa.esa.int/psa/#/pages/searchv", color: "#fde68a", icon: "🏠" },
    // MOON MISSIONS
    { id: "luna2", name: "Luna 2", agency: "Soviet Union", status: "Completed", planet: "Moon", launchDate: "September 12, 1959", completionDate: "September 14, 1959", description: "First spacecraft to impact the Moon, though unintentionally. Provided first close-up images and radiation measurements near lunar surface.", objectives: ["Reach the Moon", "Transmit near-surface data", "Measure radiation environment", "Test spacecraft systems"], datasetUrl: "https://www.lpi.usra.edu/lunar/missions/luna/", color: "#93c5fd", icon: "📡" },
    { id: "luna9", name: "Luna 9", agency: "Soviet Union", status: "Completed", planet: "Moon", launchDate: "January 31, 1966", completionDate: "February 4, 1966", description: "First spacecraft to achieve soft landing on Moon and transmit images from surface. Demonstrated safe landing techniques for future missions.", objectives: ["Achieve soft lunar landing", "Transmit surface images", "Study surface conditions", "Test landing systems"], datasetUrl: "https://www.britannica.com/technology/Luna-space-probe", color: "#93c5fd", icon: "📡" },
    { id: "apollo11", name: "Apollo 11", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "July 16, 1969", completionDate: "July 24, 1969", description: "Historic mission achieving first human landing on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.", objectives: ["Land humans on the Moon", "Collect lunar samples", "Deploy scientific instruments", "Test lunar surface operations"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "apollo12", name: "Apollo 12", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "November 14, 1969", completionDate: "November 24, 1969", description: "Second moon landing achieving precision landing near Surveyor 3 spacecraft. Deployed experiments and collected rock samples from Oceanus Procellarum.", objectives: ["Achieve precision landing", "Retrieve Surveyor samples", "Deploy ALSEP experiments", "Extend lunar exploration range"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "apollo14", name: "Apollo 14", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "January 31, 1971", completionDate: "February 9, 1971", description: "Third moon landing at Fra Mauro Highlands. Expanded exploration with Modular Equipment Transporter, collecting rocks from site of ancient lunar impact basin.", objectives: ["Land in highland terrain", "Collect diverse rock samples", "Deploy scientific instruments", "Test enhanced mobility"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "apollo15", name: "Apollo 15", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "July 26, 1971", completionDate: "August 7, 1971", description: "First mission using Lunar Roving Vehicle. Significantly expanded exploration range, visiting Hadley-Apennine area and collecting diverse geological samples.", objectives: ["Operate Lunar Roving Vehicle", "Explore vast terrain area", "Collect mountain and mare samples", "Deploy comprehensive experiments"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "apollo16", name: "Apollo 16", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "April 16, 1972", completionDate: "April 27, 1972", description: "Landing in lunar highlands at Descartes. Explored high-altitude plateau terrain collecting highland rocks and conducting extensive scientific experiments.", objectives: ["Study highland geology", "Collect plateau samples", "Deploy experiments on highlands", "Conduct orbital observations"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "apollo17", name: "Apollo 17", agency: "NASA", status: "Completed", planet: "Moon", launchDate: "December 7, 1972", completionDate: "December 19, 1972", description: "Final Apollo landing and only mission with scientist-astronaut. Harrison Schmitt was first geologist on Moon. Explored Taurus-Littrow Valley extensively.", objectives: ["Explore valley floor and mountain", "Collect diverse samples including orange soil", "Conduct longest lunar stay", "Deploy sophisticated experiments"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/apollo/index.htm", color: "#93c5fd", icon: "👨‍🚀" },
    { id: "kaguya", name: "Kaguya (SELENE)", agency: "Japan Aerospace Exploration Agency", status: "Completed", planet: "Moon", launchDate: "September 14, 2007", completionDate: "June 10, 2009", description: "Large lunar orbiter mission with high-resolution camera and spectrometers. Mapped Moon's topography and mineral composition from lunar orbit.", objectives: ["Map lunar topography", "Analyze mineral composition", "Study gravity field variations", "Investigate geological features"], datasetUrl: "https://darts.isas.jaxa.jp/en/missions/kaguya", color: "#93c5fd", icon: "📡" },
    { id: "chandrayaan1", name: "Chandrayaan-1", agency: "Indian Space Research Organisation", status: "Completed", planet: "Moon", launchDate: "October 22, 2008", completionDate: "August 28, 2009", description: "India's first lunar mission, lunar orbiter discovering water molecules in lunar soil. Key mission in understanding Moon's composition.", objectives: ["Discover water on the Moon", "Map lunar surface composition", "Study lunar minerals", "Detect subsurface features"], datasetUrl: "https://webapps.issdc.gov.in/CHBrowse/index.jsp", color: "#93c5fd", icon: "🛰️" },
    { id: "chandrayaan2", name: "Chandrayaan-2", agency: "Indian Space Research Organisation", status: "Active", planet: "Moon", launchDate: "July 22, 2019", description: "Advanced lunar mission with orbiter, lander, and rover. Orbiter continues operations mapping lunar features while lander/rover faced landing challenges.", objectives: ["Map lunar south pole region", "Study water and mineral deposits", "Conduct comprehensive surveys", "Search for subsurface resources"], datasetUrl: "https://pradan.issdc.gov.in/ch2/", color: "#93c5fd", icon: "🛰️" },
    { id: "chandrayaan3", name: "Chandrayaan-3", agency: "Indian Space Research Organisation", status: "Completed", planet: "Moon", launchDate: "July 14, 2023", completionDate: "August 23, 2023", description: "Successful lunar landing at south pole region with Vikram lander and Pragyan rover. India's first successful landing after Chandrayaan-2 challenges.", objectives: ["Land on lunar south pole", "Deploy rover for surface exploration", "Conduct in-situ measurements", "Study polar region geology"], datasetUrl: "https://pradan.issdc.gov.in/ch3/", color: "#93c5fd", icon: "🤖" },
    { id: "change3", name: "Chang'e 3", agency: "China National Space Administration", status: "Completed", planet: "Moon", launchDate: "December 1, 2013", completionDate: "February 15, 2014", description: "China's first lunar soft landing. Deployed Yutu rover exploring Mare Imbrium with ground-penetrating radar revealing subsurface structure.", objectives: ["Achieve soft landing", "Deploy rover for exploration", "Measure subsurface composition", "Study surface geology"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/chang'e/index.htm", color: "#93c5fd", icon: "🤖" },
    { id: "yutu", name: "Yutu Rover", agency: "China National Space Administration", status: "Completed", planet: "Moon", launchDate: "December 1, 2013", completionDate: "March 2014", description: "China's first lunar rover deployed from Chang'e 3. Operated far longer than expected, conducting geological surveys and radar measurements.", objectives: ["Explore lunar surface", "Conduct soil and rock analysis", "Perform subsurface radar scans", "Test rover technologies"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/chang'e/index.htm", color: "#93c5fd", icon: "🤖" },
    { id: "change4", name: "Chang'e 4", agency: "China National Space Administration", status: "Active", planet: "Moon", launchDate: "December 7, 2018", description: "First spacecraft to land on far side of Moon. Deployed Yutu-2 rover conducting long-term exploration on previously unexplored lunar terrain.", objectives: ["Explore lunar far side", "Deploy rover on far side", "Conduct subsurface surveys", "Study far side geology"], datasetUrl: "https://ode.rsl.wustl.edu/MArs/pagehelp/Content/Missions_Instruments/Change/Intro.htm", color: "#93c5fd", icon: "🤖" },
    { id: "yutu2", name: "Yutu-2 Rover", agency: "China National Space Administration", status: "Active", planet: "Moon", launchDate: "December 7, 2018", description: "China's lunar far side rover. Longest-operating lunar rover as of 2025, traveling over 1,600 meters and revealing subsurface layer composition.", objectives: ["Explore far side terrain", "Measure subsurface structure", "Study mineral composition", "Set longevity records"], datasetUrl: "https://en.wikipedia.org/wiki/Yutu-2", color: "#93c5fd", icon: "🤖" },
    { id: "change6", name: "Chang'e 6", agency: "China National Space Administration", status: "Completed", planet: "Moon", launchDate: "May 3, 2024", completionDate: "June 25, 2024", description: "First mission returning samples from far side of Moon. Collected rocks and soil from south pole region for study on Earth.", objectives: ["Land on far side", "Collect sample materials", "Return samples to Earth", "Study far side composition"], datasetUrl: "https://en.wikipedia.org/wiki/Chang%27e_6", color: "#93c5fd", icon: "🚀" },
    // MERCURY MISSIONS
    { id: "mariner10", name: "Mariner 10", agency: "NASA", status: "Completed", planet: "Mercury", launchDate: "November 3, 1973", completionDate: "March 24, 1975", description: "First spacecraft to visit Mercury. Conducted three close flybys revealing cratered surface, thin atmosphere, and large iron core.", objectives: ["Flyby Mercury multiple times", "Image surface features", "Measure atmosphere", "Study magnetic field"], datasetUrl: "https://atmos.nmsu.edu/data_and_services/atmospheres_data/MARINER/mariner10.html", color: "#9ca3af", icon: "🛰️" },
    { id: "messenger", name: "MESSENGER", agency: "NASA", status: "Completed", planet: "Mercury", launchDate: "August 3, 2004", completionDate: "April 30, 2015", description: "First spacecraft to orbit Mercury. Revealed water ice in permanently shadowed craters and discovered unusual magnetic field properties.", objectives: ["Orbit Mercury", "Map entire surface", "Study magnetic field", "Investigate surface composition"], datasetUrl: "https://pds-geosciences.wustl.edu/missions/messenger/index.htm", color: "#9ca3af", icon: "📡" },
    { id: "bepicolombo", name: "BepiColombo", agency: "European Space Agency / Japan Aerospace Exploration Agency", status: "Active", planet: "Mercury", launchDate: "October 20, 2018", description: "Joint ESA-JAXA mission to Mercury with two orbiters. Currently conducting Venus and Mercury flybys to adjust trajectory for Mercury orbit insertion.", objectives: ["Orbit Mercury with dual orbiters", "Map surface and mineralogy", "Study magnetic field", "Investigate planetary evolution"], datasetUrl: "https://psa.esa.int/psa/#/pages/search", color: "#9ca3af", icon: "🛰️" },
    // VENUS MISSIONS
    
  {id: "shukrayaan1",
    name: "Shukrayaan-1",
    agency: "ISRO",
    status: "Planned",
    planet: "Venus",
    launchDate: "TBD (likely 2026–2031)",
    description:
      "ISRO's first Venus orbiter to study atmosphere, surface emission, and ionosphere.",
    objectives: [
      "Radar mapping",
      "Atmospheric chemistry",
      "Surface emissivity",
      "Ionosphere profiling"
    ],
    datasetUrl: null,
    color: "#fca5a5",
    icon: "🛰️"
  },
  {
    id: "venera13_14",
    name: "Venera 13 & 14",
    agency: "Soviet Union",
    status: "Completed",
    planet: "Venus",
    launchDate: "October 30 & November 4, 1981",
    description:
      "Captured the first color images of Venus’ surface and performed soil analysis.",
    objectives: [
      "Color imaging",
      "Acoustic soil drilling",
      "Atmospheric chemistry"
    ],
    datasetUrl: "https://pds-geosciences.wustl.edu/missions/venera/index.htm",
    color: "#fca5a5",
    icon: "🌋"
  },
  {
    id: "vega1_2",
    name: "Vega 1 & 2",
    agency: "Soviet Union",
    status: "Completed",
    planet: "Venus",
    launchDate: "December 15 & 21, 1984",
    description:
      "Deployed atmospheric balloons into Venus' clouds—the only floating probes ever used on another planet.",
    objectives: [
      "Deploy atmospheric balloon",
      "Study wind patterns",
      "Analyze cloud composition"
    ],
    datasetUrl: "https://pds-smallbodies.astro.umd.edu/data_sb/missions/vega1/index.shtml",
    color: "#fca5a5",
    icon: "🎈"
  },
  {
    id: "galileo_flyby",
    name: "Galileo Venus Flyby",
    agency: "NASA",
    status: "Completed",
    planet: "Venus",
    launchDate: "October 18, 1989",
    description:
      "Performed Venus flyby on its way to Jupiter, capturing atmospheric data and images.",
    objectives: ["Flyby imaging", "Atmospheric studies"],
    datasetUrl: "https://sbn.psi.edu/pds/archive/galileo.html",
    color: "#fca5a5",
    icon: "📡"
  },
  {
    id: "cassini_venus_flybys",
    name: "Cassini Venus Flybys",
    agency: "NASA / ESA",
    status: "Completed",
    planet: "Venus",
    launchDate: "October 15, 1997",
    description:
      "Two Venus flybys during cruise to Saturn allowed atmospheric and surface infrared studies.",
    objectives: ["Flyby imaging", "Infrared spectroscopy"],
    datasetUrl: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/Cassini_PDS3/Cassini.html",
    color: "#fca5a5",
    icon: "🛰️"
  },
  {
    id: "venus_express",
    name: "Venus Express",
    agency: "ESA",
    status: "Completed",
    planet: "Venus",
    launchDate: "November 9, 2005",
    completionDate: "December 16, 2014",
    description:
      "Long-term orbiter studying atmosphere, cloud structure, and evidence of volcanic activity.",
    objectives: [
      "Atmospheric structure",
      "Super-rotation winds",
      "Volcanism study",
      "Thermal mapping"
    ],
    datasetUrl: "https://archives.esac.esa.int/psa/#!Table%20of%20Content/VENUS-EXPRESS",
    color: "#fca5a5",
    icon: "🛰️"
  },
  {
    id: "mariner2",
    name: "Mariner 2",
    agency: "NASA",
    status: "Completed",
    planet: "Venus",
    launchDate: "August 27, 1962",
    completionDate: "December 14, 1962",
    description:
      "First successful planetary mission. Performed a flyby of Venus and measured its high surface temperature and dense atmosphere.",
    objectives: [
      "Perform Venus flyby",
      "Measure surface temperature",
      "Study atmosphere and magnetic fields"
    ],
    datasetUrl: "https://historicspacecraft.com/Probes_Mariner.html",
    color: "#fca5a5",
    icon: "🛰️"
  },
  {
    id: "mariner5",
    name: "Mariner 5",
    agency: "NASA",
    status: "Completed",
    planet: "Venus",
    launchDate: "June 14, 1967",
    description:
      "Flyby mission that performed atmospheric radio occultation measurements, confirming extremely high surface pressure.",
    objectives: [
      "Study atmospheric structure",
      "Measure magnetic field",
      "Analyze ionosphere"
    ],
    datasetUrl: "https://historicspacecraft.com/Probes_Mariner.html",
    color: "#fca5a5",
    icon: "📡"
  },
  {
    id: "venera_series",
    name: "Venera Program",
    agency: "Soviet Union",
    status: "Completed",
    planet: "Venus",
    launchDate: "1961–1983",
    description:
      "Most extensive Venus exploration program. Included orbiters and the only successful landers to transmit surface images from Venus.",
    objectives: [
      "Orbit Venus",
      "Land on surface",
      "Transmit first-ever surface images",
      "Analyze atmosphere and soil"
    ],
    datasetUrl: "https://pds-geosciences.wustl.edu/missions/venera/index.html",
    color: "#fca5a5",
    icon: "🚀"
  },
  
    { id: "magellan", name: "Magellan", agency: "NASA", status: "Completed", planet: "Venus", launchDate: "May 4, 1989", completionDate: "October 12, 1994", description: "Radar mapping spacecraft revealing Venus's surface beneath thick cloud cover. Discovered vast highland regions, volcanic features, and coronae structures.", objectives: ["Map Venus surface with radar", "Reveal geological features", "Study volcanic activity", "Investigate atmospheric effects"], datasetUrl: "https://en.wikipedia.org/wiki/Magellan_(spacecraft)", color: "#f59e0b", icon: "📡" },
    { id: "akatsuki", name: "Akatsuki (Venus Climate Orbiter)", agency: "Japan Aerospace Exploration Agency", status: "Active", planet: "Venus", launchDate: "May 21, 2010", description: "Orbiter studying Venus's atmosphere, weather patterns, and atmospheric dynamics. Reveals atmospheric super-rotation and cloud movements.", objectives: ["Study atmospheric circulation", "Investigate weather patterns", "Measure atmospheric composition", "Analyze thermal dynamics"], datasetUrl: "https://science.nasa.gov/mission/akatsuki/", color: "#f59e0b", icon: "📡" },
    { id: "parker", name: "Parker Solar Probe", agency: "NASA", status: "Active", planet: "Venus", launchDate: "August 12, 2018", description: "Solar mission conducting Venus flybys for trajectory adjustment while studying the Sun. Provides additional Venus atmospheric data during flybys.", objectives: ["Study solar corona", "Conduct Venus gravity assists", "Trace solar wind origin", "Understand particle acceleration"], datasetUrl: "https://spdf.gsfc.nasa.gov/pub/data/psp/", color: "#ff6a00", icon: "☀️" },
    // URANUS AND NEPTUNE
    { id: "voyager2u", name: "Voyager 2 (Uranus Encounter)", agency: "NASA", status: "Active", planet: "Uranus", launchDate: "August 20, 1977", description: "Only spacecraft to visit Uranus, discovering 11 new moons, two new rings, and unusual 59-degree tilted magnetic field.", objectives: ["Study Uranus atmosphere", "Investigate ring system", "Discover new moons", "Measure magnetic properties"], datasetUrl: "https://voyager.jpl.nasa.gov/", color: "#60a5fa", icon: "🚀" },
    { id: "voyager2n", name: "Voyager 2 (Neptune Encounter)", agency: "NASA", status: "Active", planet: "Neptune", launchDate: "August 20, 1977", description: "First close encounter with Neptune, discovering five new moons, detecting ring system, and studying atmospheric dynamics including Great Dark Spot.", objectives: ["Study Neptune atmosphere", "Discover new moons and rings", "Investigate weather systems", "Measure wind speeds"], datasetUrl: "https://voyager.jpl.nasa.gov/", color: "#3b82f6", icon: "🚀" },
  ];

  return missions;
}

export async function fetchNASAPlanets(): Promise<NASAPlanetData[]> {
  const planets: NASAPlanetData[] = [
    {
      slug: "mercury",
      name: "Mercury",
      color: "#9ca3af",
      glow: "#60a5fa",
      short: "Smallest planet, closest to the Sun with extreme temperature swings.",
      description:
        "Mercury is the smallest and innermost planet in the Solar System. Its surface is cratered like the Moon and it has almost no atmosphere.",
      facts: [
        { label: "Orbital period", value: "88 days" },
        { label: "Mean radius", value: "2,439.7 km" },
        { label: "Day length", value: "59 Earth days" },
      ],
      size: 0.7,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F26590902ca0e4fc2a0ff7df6f351319d",
    },
    {
      slug: "venus",
      name: "Venus",
      color: "#f59e0b",
      glow: "#f472b6",
      short: "Shrouded in thick clouds with a runaway greenhouse effect.",
      description:
        "Venus is similar in size to Earth but has a thick, toxic atmosphere and surface temperatures hot enough to melt lead.",
      facts: [
        { label: "Orbital period", value: "225 days" },
        { label: "Mean radius", value: "6,051.8 km" },
        { label: "Surface temp", value: "~465°C" },
      ],
      size: 0.95,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Ffa2d85ddcfa34a4f93b85fa2a3745015",
    },
    {
      slug: "earth",
      name: "Earth",
      color: "#22d3ee",
      glow: "#84cc16",
      short: "Our home world—liquid water oceans and life-supporting atmosphere.",
      description:
        "Earth is the third planet from the Sun and the only place in the universe known to harbor life, with vast oceans and diverse climates.",
      facts: [
        { label: "Orbital period", value: "365.25 days" },
        { label: "Mean radius", value: "6,371 km" },
        { label: "Moons", value: "1 (the Moon)" },
      ],
      size: 1,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Fc6d54e11258f437db7a1dc0cc0e7781e",
    },
    {
      slug: "mars",
      name: "Mars",
      color: "#ef4444",
      glow: "#f97316",
      short: "The Red Planet—home to Olympus Mons and ancient riverbeds.",
      description:
        "Mars is a cold desert world with a thin atmosphere. Evidence suggests it once had flowing water and perhaps conditions suitable for life.",
      facts: [
        { label: "Orbital period", value: "687 days" },
        { label: "Mean radius", value: "3,389.5 km" },
        { label: "Moons", value: "Phobos & Deimos" },
      ],
      size: 0.53,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F3143db63a0764512ab6a24e6942593f0",
    },
    {
      slug: "jupiter",
      name: "Jupiter",
      color: "#fbbf24",
      glow: "#60a5fa",
      short: "Giant gas world with the Great Red Spot and dozens of moons.",
      description:
        "Jupiter is the largest planet, a gas giant with powerful storms and a strong magnetic field. Its moons form a miniature solar system.",
      facts: [
        { label: "Orbital period", value: "11.86 years" },
        { label: "Mean radius", value: "69,911 km" },
        { label: "Moons", value: "> 90" },
      ],
      size: 11,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Faa0f5db6cb8b434a85259a6cd945f669",
    },
    {
      slug: "saturn",
      name: "Saturn",
      color: "#fde68a",
      glow: "#a78bfa",
      short: "Iconic ring system made of ice and rock particles.",
      description:
        "Saturn is a gas giant known for its stunning rings. It has numerous moons, including Titan with a thick atmosphere.",
      facts: [
        { label: "Orbital period", value: "29.46 years" },
        { label: "Mean radius", value: "58,232 km" },
        { label: "Rings", value: "Prominent and complex" },
      ],
      hasRings: true,
      size: 9.1,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F85fbeb7b5cd741ca9bce110836c431b7",
      ringTexture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F3ad96b7f90c34dd6aeba4ab81a06590c",
    },
    {
      slug: "uranus",
      name: "Uranus",
      color: "#60a5fa",
      glow: "#a7f3d0",
      short: "An ice giant that rotates on its side.",
      description:
        "Uranus is an ice giant with a pale blue color due to methane in its atmosphere and an unusual axial tilt of about 98 degrees.",
      facts: [
        { label: "Orbital period", value: "84 years" },
        { label: "Mean radius", value: "25,362 km" },
        { label: "Moons", value: "27 known" },
      ],
      size: 4,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2F9eb43f2e35e94e088e8b5aa19131d12c",
    },
    {
      slug: "neptune",
      name: "Neptune",
      color: "#3b82f6",
      glow: "#93c5fd",
      short: "Farthest known planet with supersonic winds.",
      description:
        "Neptune is a deep blue ice giant with dynamic weather and the strongest winds in the solar system.",
      facts: [
        { label: "Orbital period", value: "164.8 years" },
        { label: "Mean radius", value: "24,622 km" },
        { label: "Moons", value: "14 known" },
      ],
      size: 3.9,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Fc5be8f956000442dabf730a1d8302f39",
    },
    {
      slug: "moon",
      name: "Moon",
      color: "#cbd5e1",
      glow: "#93c5fd",
      short: "Earth's natural satellite with a heavily cratered surface.",
      description:
        "The Moon is Earth's only natural satellite. Its synchronous rotation means the same side always faces Earth, and its surface is covered with ancient impact craters.",
      facts: [
        { label: "Orbital period", value: "27.3 days (sidereal)" },
        { label: "Mean radius", value: "1,737.4 km" },
        { label: "Orbits", value: "Earth" },
      ],
      size: 0.27,
      texture: "https://cdn.builder.io/api/v1/image/assets%2F0cc0dbf4af1f4b28baeda2a625a6fb28%2Ff9c43f9660a44962876fdb90714fd886",
    },
    {
      slug: "pluto",
      name: "Pluto",
      color: "#d1bfa3",
      glow: "#a78bfa",
      short: "Dwarf planet in the Kuiper Belt discovered in 1930.",
      description:
        "Pluto is a dwarf planet in the Kuiper Belt. It has a complex geology with icy plains and mountains, and a thin, variable atmosphere.",
      facts: [
        { label: "Orbital period", value: "248 years" },
        { label: "Mean radius", value: "1,188.3 km" },
        { label: "Status", value: "Dwarf planet" },
      ],
      size: 0.186,
    },
  ];

  return planets;
}
