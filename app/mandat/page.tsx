"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const CITIES = [
  "Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan","Safi","Mohammedia","El Jadida","Béni Mellal","Nador","Khouribga","Settat","Taza","Larache","Ksar El Kébir","Khemisset","Guelmim","Berrechid","Wad Zem","Fquih Ben Salah","Taourirt","Berkane","Sidi Slimane","Errachidia","Guercif","Ouarzazate","Tiznit","Taroudant","Essaouira","Al Hoceïma","Chefchaouen","Sidi Kacem","Youssoufia","Tan-Tan","Dakhla","Laâyoune","Boujdour","Ifrane","Azrou","Midelt","Zagora","Tinghir","Skhirat","Temara","Salé","Bouskoura","Nouaceur","Mediouna","Dar Bouazza","Autre"
];

const MODELS: Record<string, string[]> = {
  "Audi":["A1","A3","A4","A5","A6","Q2","Q3","Q5","Q7","Q8","TT","e-tron","Autre"],
  "BMW":["Série 1","Série 2","Série 3","Série 4","Série 5","Série 7","X1","X2","X3","X4","X5","X6","X7","i3","i4","iX","Autre"],
  "Citroën":["C1","C3","C3 Aircross","C4","C5 Aircross","Berlingo","Autre"],
  "Dacia":["Dokker","Duster","Jogger","Lodgy","Logan","Sandero","Sandero Stepway","Spring","Autre"],
  "Fiat":["500","500X","Doblo","Panda","Punto","Tipo","Autre"],
  "Ford":["EcoSport","Fiesta","Focus","Kuga","Mondeo","Puma","Ranger","Autre"],
  "Honda":["Accord","Civic","CR-V","HR-V","Jazz","Autre"],
  "Hyundai":["Accent","Atos","Creta","Elantra","i10","i20","i30","Kona","Santa Fe","Tucson","Autre"],
  "Jeep":["Compass","Grand Cherokee","Renegade","Wrangler","Autre"],
  "Kia":["Ceed","Cerato","Picanto","Rio","Seltos","Sorento","Sportage","Stonic","Autre"],
  "Land Rover":["Defender","Discovery","Range Rover","Range Rover Evoque","Range Rover Sport","Velar","Autre"],
  "Mazda":["2","3","6","CX-3","CX-30","CX-5","Autre"],
  "Mercedes-Benz":["Classe A","Classe B","Classe C","Classe CLA","Classe E","Classe GLA","Classe GLB","Classe GLC","Classe GLE","Classe GLS","Classe S","Classe V","Vito","Autre"],
  "Mini":["Cooper","Countryman","Clubman","Autre"],
  "Nissan":["Juke","Micra","Navara","Qashqai","X-Trail","Autre"],
  "Opel":["Astra","Corsa","Crossland","Grandland","Mokka","Autre"],
  "Peugeot":["108","2008","208","3008","301","308","5008","508","Partner","Autre"],
  "Porsche":["911","Cayenne","Macan","Panamera","Taycan","Autre"],
  "Renault":["Arkana","Captur","Clio","Kadjar","Kangoo","Koleos","Megane","Scenic","Symbol","Talisman","Twingo","Autre"],
  "Seat":["Arona","Ateca","Ibiza","Leon","Tarraco","Autre"],
  "Skoda":["Fabia","Kamiq","Karoq","Kodiaq","Octavia","Superb","Autre"],
  "Suzuki":["Alto","Baleno","Celerio","Jimny","Swift","Vitara","Autre"],
  "Tesla":["Model 3","Model S","Model X","Model Y","Autre"],
  "Toyota":["Auris","C-HR","Camry","Corolla","Hilux","Land Cruiser","Prado","RAV4","Yaris","Yaris Cross","Autre"],
  "Volkswagen":["Caddy","Golf","Golf VII","Golf VIII","Jetta","Passat","Polo","T-Cross","T-Roc","Tiguan","Touareg","Autre"],
  "Volvo":["S60","S90","XC40","XC60","XC90","Autre"],
  "Autre":["Autre"]
};

const ENGINE_BY_BRAND_MODEL: Record<string, string[]> = {
  "Mercedes-Benz|Classe A": ["A160", "A180", "A200", "A220", "A250", "A250e", "A35 AMG", "A45 AMG", "Autre"],
  "Mercedes-Benz|Classe B": ["B160", "B180", "B200", "B220", "B250e", "Autre"],
  "Mercedes-Benz|Classe C": ["C180", "C200", "C220d", "C250", "C300", "C300e", "C350e", "C400", "C43 AMG", "C63 AMG", "Autre"],
  "Mercedes-Benz|Classe CLA": ["CLA180", "CLA200", "CLA220d", "CLA250", "CLA250e", "CLA35 AMG", "CLA45 AMG", "Autre"],
  "Mercedes-Benz|Classe E": ["E200", "E220d", "E250", "E300", "E300e", "E350e", "E400d", "E450", "E53 AMG", "E63 AMG", "Autre"],
  "Mercedes-Benz|Classe GLA": ["GLA180", "GLA200", "GLA220d", "GLA250", "GLA35 AMG", "GLA45 AMG", "Autre"],
  "Mercedes-Benz|Classe GLB": ["GLB180", "GLB200", "GLB220d", "GLB250", "GLB35 AMG", "Autre"],
  "Mercedes-Benz|Classe GLC": ["GLC200", "GLC220d", "GLC250", "GLC300", "GLC300e", "GLC350e", "GLC43 AMG", "GLC63 AMG", "Autre"],
  "Mercedes-Benz|Classe GLE": ["GLE250d", "GLE300d", "GLE350d", "GLE350e", "GLE400d", "GLE450", "GLE53 AMG", "GLE63 AMG", "Autre"],
  "Mercedes-Benz|Classe GLS": ["GLS350d", "GLS400d", "GLS450", "GLS580", "GLS63 AMG", "Autre"],
  "Mercedes-Benz|Classe S": ["S350d", "S400d", "S450", "S500", "S560", "S580e", "S63 AMG", "Autre"],

  "BMW|Série 1": ["116i", "116d", "118i", "118d", "120i", "120d", "125i", "125d", "128ti", "M135i", "Autre"],
  "BMW|Série 2": ["216i", "216d", "218i", "218d", "220i", "220d", "225i", "225e", "230i", "M235i", "M240i", "Autre"],
  "BMW|Série 3": ["316i", "316d", "318i", "318d", "320i", "320d", "325i", "325d", "328i", "330i", "330d", "330e", "335i", "335d", "340i", "M340i", "M3", "Autre"],
  "BMW|Série 4": ["418i", "418d", "420i", "420d", "425d", "428i", "430i", "430d", "435i", "435d", "440i", "M440i", "M4", "Autre"],
  "BMW|Série 5": ["518d", "520i", "520d", "523i", "525i", "525d", "528i", "530i", "530d", "530e", "535i", "535d", "540i", "545e", "550i", "M550d", "M550i", "M5", "Autre"],
  "BMW|Série 7": ["730d", "730i", "740d", "740i", "740e", "745e", "750i", "750d", "760Li", "Autre"],
  "BMW|X1": ["16d", "18i", "18d", "20i", "20d", "23d", "25e", "28i", "Autre"],
  "BMW|X3": ["18d", "20i", "20d", "25d", "28i", "30i", "30d", "30e", "35i", "35d", "M40i", "M40d", "X3M", "Autre"],
  "BMW|X5": ["25d", "30d", "35i", "40i", "40d", "45e", "50i", "M50d", "M50i", "X5M", "Autre"],

  "Audi|A1": ["25 TFSI", "30 TFSI", "35 TFSI", "40 TFSI", "Autre"],
  "Audi|A3": ["30 TFSI", "35 TFSI", "35 TDI", "40 TFSI", "40 TDI", "45 TFSI e", "S3", "RS3", "Autre"],
  "Audi|A4": ["35 TFSI", "35 TDI", "40 TFSI", "40 TDI", "45 TFSI", "50 TDI", "S4", "RS4", "Autre"],
  "Audi|A5": ["35 TFSI", "35 TDI", "40 TFSI", "40 TDI", "45 TFSI", "50 TDI", "S5", "RS5", "Autre"],
  "Audi|A6": ["40 TDI", "45 TFSI", "45 TDI", "50 TDI", "55 TFSI", "55 TFSI e", "S6", "RS6", "Autre"],
  "Audi|Q3": ["35 TFSI", "35 TDI", "40 TFSI", "40 TDI", "45 TFSI", "RS Q3", "Autre"],
  "Audi|Q5": ["35 TDI", "40 TDI", "45 TFSI", "50 TFSI e", "55 TFSI e", "SQ5", "Autre"],
  "Audi|Q7": ["45 TDI", "50 TDI", "55 TFSI", "55 TFSI e", "60 TFSI e", "SQ7", "Autre"],

  "Volkswagen|Golf": ["1.0 TSI", "1.2 TSI", "1.4 TSI", "1.5 TSI", "1.6 TDI", "2.0 TDI", "eTSI", "GTE", "GTI", "GTD", "R", "Autre"],
  "Volkswagen|Golf VII": ["1.0 TSI", "1.2 TSI", "1.4 TSI", "1.5 TSI", "1.6 TDI", "2.0 TDI", "GTE", "GTI", "GTD", "R", "Autre"],
  "Volkswagen|Polo": ["1.0 MPI", "1.0 TSI", "1.2 TSI", "1.4 TDI", "1.6 TDI", "GTI", "Autre"],
  "Volkswagen|Tiguan": ["1.4 TSI", "1.5 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "eHybrid", "R", "Autre"],

  "Dacia|Logan": ["1.0 SCe", "1.0 TCe", "1.2 16V", "1.5 dCi", "1.6 MPI", "ECO-G", "Autre"],
  "Dacia|Sandero": ["1.0 SCe", "1.0 TCe", "1.2 16V", "1.5 dCi", "ECO-G", "Autre"],
  "Dacia|Sandero Stepway": ["1.0 SCe", "1.0 TCe", "1.5 dCi", "ECO-G", "Autre"],
  "Dacia|Duster": ["1.0 TCe", "1.2 TCe", "1.3 TCe", "1.5 dCi", "1.6 SCe", "ECO-G", "Autre"],

  "Renault|Clio": ["0.9 TCe", "1.0 SCe", "1.0 TCe", "1.2 16V", "1.3 TCe", "1.5 dCi", "E-Tech Hybrid", "RS", "Autre"],
  "Renault|Captur": ["0.9 TCe", "1.0 TCe", "1.3 TCe", "1.5 dCi", "E-Tech Hybrid", "E-Tech Plug-in", "Autre"],
  "Renault|Megane": ["1.2 TCe", "1.3 TCe", "1.5 dCi", "1.6 dCi", "2.0 TCe", "E-Tech", "RS", "Autre"],

  "Peugeot|208": ["1.2 PureTech", "1.5 BlueHDi", "e-208", "GTi", "Autre"],
  "Peugeot|308": ["1.2 PureTech", "1.6 PureTech", "1.5 BlueHDi", "2.0 BlueHDi", "Hybrid 180", "Hybrid 225", "GTi", "Autre"],
  "Peugeot|3008": ["1.2 PureTech", "1.6 PureTech", "1.5 BlueHDi", "2.0 BlueHDi", "Hybrid 225", "Hybrid4 300", "Autre"],
  "Peugeot|5008": ["1.2 PureTech", "1.6 PureTech", "1.5 BlueHDi", "2.0 BlueHDi", "Autre"],

  "Toyota|Yaris": ["1.0 VVT-i", "1.3 VVT-i", "1.5 VVT-i", "Hybrid", "GR Yaris", "Autre"],
  "Toyota|Corolla": ["1.2 Turbo", "1.6 VVT-i", "1.8 Hybrid", "2.0 Hybrid", "Autre"],
  "Toyota|RAV4": ["2.0 VVT-i", "2.2 D-4D", "2.5 Hybrid", "Plug-in Hybrid", "Autre"],

  "Hyundai|i10": ["1.0 MPI", "1.2 MPI", "Autre"],
  "Hyundai|i20": ["1.0 T-GDi", "1.2 MPI", "1.4 CRDi", "Autre"],
  "Hyundai|Tucson": ["1.6 GDi", "1.6 T-GDi", "1.6 CRDi", "2.0 CRDi", "Hybrid", "Plug-in Hybrid", "Autre"],

  "Kia|Picanto": ["1.0 MPI", "1.2 MPI", "Autre"],
  "Kia|Rio": ["1.0 T-GDi", "1.2 MPI", "1.4 MPI", "1.4 CRDi", "Autre"],
  "Kia|Sportage": ["1.6 GDi", "1.6 T-GDi", "1.6 CRDi", "2.0 CRDi", "Hybrid", "Plug-in Hybrid", "Autre"],

  "Porsche|911": ["Carrera", "Carrera S", "Carrera 4", "Carrera 4S", "Targa", "Turbo", "Turbo S", "GT3", "GT3 RS", "Autre"],
  "Porsche|Cayenne": ["Cayenne", "Cayenne S", "Cayenne E-Hybrid", "Cayenne GTS", "Cayenne Turbo", "Autre"],
  "Porsche|Macan": ["Macan", "Macan S", "Macan GTS", "Macan Turbo", "Autre"]
};

const TRIMS_BY_BRAND_MODEL: Record<string, string[]> = {
  "Mercedes-Benz|Classe C":["Classic","Avantgarde","Exclusive","AMG Line","AMG Line Premium","Business Line","Edition 1","Autre"],
  "Mercedes-Benz|C300e":["Avantgarde","Exclusive","AMG Line","AMG Line Premium","Autre"],
  "BMW|Série 5":["Base","Luxury Line","Sport Line","M Sport","Pack M","Executive","M Performance","Autre"],
  "BMW|Série 3":["Base","Advantage","Luxury","Sport Line","M Sport","Pack M","M Performance","Autre"],
  "Audi|A3":["Attraction","Ambition","Ambiente","Design","S line","Business Line","Advanced","Autre"],
  "Volkswagen|Golf VII":["Trendline","Confortline","Carat","Sound","R-Line","GTI","GTD","R","Autre"],
  "Dacia|Logan":["Access","Essentiel","Ambiance","Confort","Prestige","Stepway","Autre"],
  "Peugeot|3008":["Active","Allure","GT Line","GT","Féline","Autre"],
  "Renault|Clio":["Life","Zen","Intens","Business","Limited","RS Line","Initiale Paris","Autre"]
};

const DEFAULT_ENGINES = ["Essence","Diesel","Hybride","Hybride rechargeable","Électrique","GPL","Autre"];
const DEFAULT_TRIMS = ["Base","Confort","Business","Sport","Premium","Luxury","GT","R-Line","AMG Line","Pack M","S line","Autre"];

const YEARS = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(new Date().getFullYear() - i));
const MILEAGES = ["< 1 000 km", ...Array.from({ length: 199 }, (_, i) => `> ${(i + 1) * 1000} km`), "> 200 000 km"];

const VEHICLE_TYPES = ["Cabriolet/Roadster","SUV / Tout-terrain / Pickup","Citadine","Break","Berline","Sport / Coupé","Monospace / Minibus","Utilitaire","Autre"];
const BODY_COLORS = ["Beige","Bleu","Brun","Jaune","Or","Vert","Gris","Orange","Rouge","Noir","Argent","Violet","Blanc","Mat","Métallique"];
const INTERIOR_COLORS = ["Beige","Noir","Bleu","Brun","Gris","Rouge","Autres"];
const INTERIOR_MATERIALS = ["Alcantara","Tissu","Imitation cuir","Cuir partiel","Tout cuir","Velours","Autres"];

const SAFETY_OPTIONS = [
  "ABS","ESP","Airbags frontaux","Airbags latéraux","Freinage d’urgence","Détecteur angle mort","Aide maintien de voie",
  "Assistant feux de route","Contrôle pression pneus","Alerte franchissement ligne","Reconnaissance panneaux","Appel d’urgence",
  "Caméra 360°","Caméra de recul","Radars avant","Radars arrière","Park Assist"
];

const COMFORT_OPTIONS = [
  "Climatisation automatique","Climatisation bi-zone","Sièges chauffants","Sièges ventilés","Sièges électriques","Mémoire de siège",
  "Volant chauffant","Volant multifonction","Accès sans clé","Démarrage sans clé","Hayon électrique","Vitres teintées",
  "Toit ouvrant","Toit panoramique","Toit panoramique ouvrant","Suspension adaptative","Régulateur de vitesse","Régulateur adaptatif"
];

const INFOTAINMENT_OPTIONS = [
  "Apple CarPlay","Android Auto","Navigation GPS","Écran tactile","Cockpit numérique","Affichage tête haute",
  "Bluetooth","Chargeur induction","USB arrière","Système audio premium","Burmester","Harman Kardon","Bose","TV","WLAN / Wi-Fi"
];

const EXTERIOR_OPTIONS = [
  "Jantes alliage","Jantes en couleur","Pack sport","Pack chrome","Phares LED","Phares Matrix LED","Phares xénon",
  "Feux de jour LED","Phares antibrouillard","Attelage fixe","Attelage pivotant","Barres de toit","Vitres arrière surteintées"
];

const PHOTOS = ["Avant","Arrière","Profil gauche","Profil droit","Tableau de bord","Compteur kilométrique","Sièges avant","Sièges arrière","Coffre","Jantes / pneus","Défauts visibles"];

const STEPS = [
  ["identity","Identité"],
  ["main","Données principales"],
  ["technical","Technique"],
  ["exterior","Extérieur"],
  ["interior","Intérieur"],
  ["options","Équipements"],
  ["condition","État"],
  ["pricing","Prix"],
  ["media","Photos"],
  ["documents","Documents"],
  ["preview","Aperçu"]
];

const MARKET_PRICES = [104000,108000,109000,112000,115000,117000,118000,121000,123000,125000,128000,131000,135000,139000,142000,148000,152000,158000];

function formatDh(value: number) { return `${value.toLocaleString("fr-FR")} DH`; }
function median(values: number[]) {
  const sorted = [...values].sort((a,b) => a-b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}
function buildHistogram(values: number[], buckets = 7) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = Math.ceil((max - min) / buckets);
  return Array.from({ length: buckets }, (_, i) => {
    const low = min + i * step;
    const high = i === buckets - 1 ? max : low + step;
    const count = values.filter(v => i === buckets - 1 ? v >= low && v <= high : v >= low && v < high).length;
    return { low, high, count, pct: Math.round((count / values.length) * 100) };
  });
}

export default function MandatPage() {
  const [active,setActive] = useState("identity");
  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [engine,setEngine] = useState("");
  const [trim,setTrim] = useState("");
  const [otherModel,setOtherModel] = useState("");
  const [otherEngine,setOtherEngine] = useState("");
  const [docs,setDocs] = useState(false);
  const [selected,setSelected] = useState<string[]>([]);
  const [customFields,setCustomFields] = useState<Record<string, {checked:boolean, value:string}>>({});
  const [form,setForm] = useState<Record<string,string>>({});

  const models = useMemo(() => brand ? MODELS[brand] || ["Autre"] : [], [brand]);
  const key = `${brand}|${model}`;
  const engines = useMemo(() => brand && model ? (ENGINE_BY_BRAND_MODEL[key] || DEFAULT_ENGINES) : [], [brand, model, key]);
  const trims = useMemo(() => brand && model ? (TRIMS_BY_BRAND_MODEL[key] || DEFAULT_TRIMS) : [], [brand, model, key]);

  const displayModel = model === "Autre" ? otherModel : model;
  const displayEngine = engine === "Autre" ? otherEngine : engine;
  const displayTrim = trim;

  const set = (k:string,v:string) => setForm(prev => ({...prev,[k]:v}));
  const toggle = (x:string) => setSelected(prev => prev.includes(x) ? prev.filter(i => i !== x) : [...prev, x]);

  const toggleCustom = (key:string) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: {
        checked: !prev[key]?.checked,
        value: prev[key]?.value || ""
      }
    }));
  };

  const setCustomValue = (key:string, value:string) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: {
        checked: true,
        value
      }
    }));
  };

  useEffect(() => {
    const sections = STEPS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -62% 0px", threshold: [0.12,0.25,0.5,0.75] });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const desired = Number(form.desired || 0);
  const avg = Math.round(MARKET_PRICES.reduce((a,b)=>a+b,0)/MARKET_PRICES.length);
  const priceSignal = useMemo(() => {
    if (!desired) return { tone:"neutral", badge:"En attente", label:"Renseignez un prix souhaité pour obtenir un signal marché." };
    const diff = (desired - avg) / avg;
    if (diff < -0.05) return { tone:"green", badge:"Sous marché", label:"Prix plus bas que le marché. Votre annonce devrait générer plus de demandes." };
    if (diff > 0.05) return { tone:"red", badge:"Au-dessus marché", label:"Prix plus haut que le marché. Le délai de vente peut être plus long." };
    return { tone:"black", badge:"Prix du marché ✓", label:"Prix cohérent avec les comparables collectés." };
  }, [desired, avg]);

  const required = [form.first, form.last, form.phone, form.city, brand, displayModel, displayEngine, displayTrim, form.year, form.mileage, form.fuel, form.gearbox, form.condition, form.ownership, form.desired, form.floor];
  const completion = Math.round(required.filter(Boolean).length / required.length * 100);

  const description = useMemo(() => {
    const customOptions = Object.values(customFields).filter(x => x.checked && x.value.trim()).map(x => x.value.trim());
    const allOptions = [...selected, ...customOptions];
    const opts = allOptions.length ? ` Équipements notables : ${allOptions.slice(0, 10).join(", ")}.` : "";
    return `${brand || "Véhicule"} ${displayModel || ""} ${displayEngine || ""}${displayTrim ? ` finition ${displayTrim}` : ""}${form.year ? ` ${form.year}` : ""}${form.fuel ? ` ${form.fuel.toLowerCase()}` : ""}${form.gearbox ? ` ${form.gearbox.toLowerCase()}` : ""} à vendre${form.mileage ? ` avec ${form.mileage} au compteur` : ""}${form.city ? `, disponible à ${form.city}` : ""}.${form.condition ? ` État déclaré : ${form.condition.toLowerCase()}.` : ""}${opts}${form.desired ? ` Prix souhaité : ${formatDh(Number(form.desired))}.` : ""}`.replace(/\s+/g," ").trim();
  }, [brand, displayModel, displayEngine, displayTrim, form, selected, customFields]);

  return (
    <main className="page">
      <nav className="topbar">
        <Link href="/" className="logo">Auto<span>Souk</span></Link>
        <div className="topRight"><span className="draft">Brouillon sauvegardé</span><Link href="/" className="back">Retour</Link></div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">Studio de publication vendeur</div>
          <h1>Une annonce auto <em>complète</em>, claire et valorisée.</h1>
          <p>Inspiré des meilleurs standards de marketplaces auto européennes, avec une identité AutoSouk premium adaptée au Maroc.</p>
        </div>
        <div className="heroGlass">
          <div className="heroMetric"><span>Qualité du dossier</span><strong>{completion}%</strong></div>
          <div className="track"><div style={{width:`${completion}%`}} /></div>
          <div className="heroList"><span>Données principales</span><span>Équipements détaillés</span><span>Argus benchmark mensuel</span></div>
        </div>
      </section>

      <section className="workspace">
        <aside className="leftNav">
          <div className="navTitle">Publication</div>
          {STEPS.map(([id,label], i) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}><small>{String(i+1).padStart(2,"0")}</small><span>{label}</span></a>
          ))}
        </aside>

        <form className="panel">
          <Section id="identity" title="Identité vendeur" subtitle="Privé. Ces informations ne sont jamais publiées." />
          <div className="grid">
            <Field label="Prénom" required><input placeholder="Mohammed" onChange={e=>set("first",e.target.value)} /></Field>
            <Field label="Nom" required><input placeholder="El Fassi" onChange={e=>set("last",e.target.value)} /></Field>
            <Field label="Téléphone" required><input placeholder="06 XX XX XX XX" onChange={e=>set("phone",e.target.value)} /></Field>
            <Field label="Ville" required><select defaultValue="" onChange={e=>set("city",e.target.value)}><option value="" disabled>Sélectionner une ville</option>{CITIES.map(x=><option key={x}>{x}</option>)}</select></Field>
          </div>

          <Section id="main" title="Données principales" subtitle="Marque, modèle, version, type de véhicule et données administratives." />
          <div className="grid">
            <Field label="Marque" required><select value={brand} onChange={e=>{setBrand(e.target.value);setModel("");setEngine("");setTrim("");}}><option value="">Sélectionner une marque</option>{Object.keys(MODELS).sort().map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Modèle" required><select value={model} disabled={!brand} onChange={e=>{setModel(e.target.value);setEngine("");setTrim("");}}><option value="">{brand ? "Sélectionner un modèle" : "Choisissez une marque"}</option>{models.map(x=><option key={x}>{x}</option>)}</select></Field>
            {model === "Autre" && <Field label="Autre modèle"><input placeholder="Préciser le modèle" value={otherModel} onChange={e=>setOtherModel(e.target.value)} /></Field>}
            <Field label="Motorisation" required><select value={engine} disabled={!brand || !model} onChange={e=>setEngine(e.target.value)}><option value="">{brand && model ? "Sélectionner" : "Choisissez marque et modèle"}</option>{engines.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Finition (Pack M, Pack AMG, R Line...)" required><input placeholder="Ex. Pack M, AMG Line, R Line..." value={trim} onChange={e=>setTrim(e.target.value)} /></Field>
            {engine === "Autre" && <Field label="Autre motorisation"><input value={otherEngine} onChange={e=>setOtherEngine(e.target.value)} placeholder="Ex. 300e, 20d..." /></Field>}
            {trim === "Autre" && <Field label="Autre finition"><input value={trim} onChange={e=>setOtherTrim(e.target.value)} placeholder="Ex. AMG Line, Pack M..." /></Field>}
            <Field label="Type de véhicule"><PillGroup items={VEHICLE_TYPES} onPick={(v)=>set("type",v)} /></Field>
            <Field label="Nombre de portes"><select defaultValue=""><option>Tous</option><option>2 portes</option><option>3 portes</option><option>4 portes</option><option>5 portes</option></select></Field>
            <Field label="Nombre de sièges"><select defaultValue=""><option>Tous</option><option>2</option><option>4</option><option>5</option><option>7</option><option>9+</option></select></Field>
            <Field label="Année" required><select defaultValue="" onChange={e=>set("year",e.target.value)}><option value="" disabled>Sélectionner</option>{YEARS.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Kilométrage" required><select defaultValue="" onChange={e=>set("mileage",e.target.value)}><option value="" disabled>Sélectionner</option>{MILEAGES.map(x=><option key={x}>{x}</option>)}</select></Field>
          </div>

          <Section id="technical" title="Données techniques" subtitle="Carburant, transmission, puissance, cylindrée et caractéristiques mécaniques." />
          <div className="grid">
            <Field label="Carburant" required><select defaultValue="" onChange={e=>set("fuel",e.target.value)}><option value="" disabled>Sélectionner</option><option>Essence</option><option>Diesel</option><option>Hybride</option><option>Hybride rechargeable</option><option>Électrique</option><option>GPL</option><option>Hydrogène</option><option>Bioéthanol</option><option>Gaz naturel CNG</option><option>Autre</option></select></Field>
            <Field label="Transmission" required><select defaultValue="" onChange={e=>set("gearbox",e.target.value)}><option value="" disabled>Sélectionner</option><option>Boîte manuelle</option><option>Boîte automatique</option><option>Boîte semi-automatique</option></select></Field>
            <Field label="Motricité"><select defaultValue=""><option>Tous</option><option>Traction avant</option><option>Propulsion</option><option>4x4</option></select></Field>
            <Field label="Puissance"><input placeholder="Ex. 204 ch DIN" /></Field>
            <Field label="Cylindrée"><input placeholder="Ex. 1998 ccm" /></Field>
            <Field label="Norme antipollution"><select defaultValue=""><option>Tous</option><option>Euro 4</option><option>Euro 5</option><option>Euro 6</option><option>Autre</option></select></Field>
          </div>

          <Section id="exterior" title="Extérieur" subtitle="Couleur, jantes, toit, aides de stationnement et équipements extérieurs." />
          <ColorGrid items={BODY_COLORS} />
          <OptionBlock title="Équipements extérieurs" items={EXTERIOR_OPTIONS} selected={selected} toggle={toggle} customKeys={["ext_other1","ext_other2","ext_other3"]} customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />

          <Section id="interior" title="Intérieur" subtitle="Couleurs, matériaux, confort et équipements d’habitacle." />
          <div className="grid">
            <Field label="Couleur intérieure">
              <PillGroup items={INTERIOR_COLORS} onPick={(v)=>set("interiorColor",v)} />
              {form.interiorColor === "Autres" && (
                <input placeholder="Préciser la couleur intérieure" onChange={(e)=>set("interiorColorOther", e.target.value)} />
              )}
            </Field>
            <Field label="Matériau intérieur">
              <PillGroup items={INTERIOR_MATERIALS} onPick={(v)=>set("interiorMaterial",v)} />
              {form.interiorMaterial === "Autres" && (
                <input placeholder="Préciser le matériau intérieur" onChange={(e)=>set("interiorMaterialOther", e.target.value)} />
              )}
            </Field>
          </div>
          <OptionBlock title="Confort & intérieur" items={COMFORT_OPTIONS} selected={selected} toggle={toggle} customKeys={["comfort_other1","comfort_other2","comfort_other3"]} customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />
          <OptionBlock title="Infotainment" items={INFOTAINMENT_OPTIONS} selected={selected} toggle={toggle} customKeys={["info_other1","info_other2","info_other3"]} customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />

          <Section id="options" title="Sécurité & aides à la conduite" subtitle="Options structurées en cases à cocher, comme les meilleures plateformes." />
          <OptionBlock title="Sécurité" items={SAFETY_OPTIONS} selected={selected} toggle={toggle} customKeys={["safety_other1","safety_other2","safety_other3"]} customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />

          <Section id="condition" title="État, vendeur & historique" subtitle="Ces informations réduisent les questions inutiles et renforcent la confiance." />
          <div className="grid">
            <Field label="État général" required><select defaultValue="" onChange={e=>set("condition",e.target.value)}><option value="" disabled>Sélectionner</option><option>Neuf</option><option>Excellent état</option><option>Très bon état</option><option>Bon état</option><option>État correct</option><option>Petits frais à prévoir</option></select></Field>
            <Field label="Vendeur"><select defaultValue=""><option>Particulier</option><option>Concessionnaire</option><option>Voiture de société</option></select></Field>
            <Field label="Propriétaires précédents"><select defaultValue=""><option>Tous</option><option>1</option><option>2</option><option>3+</option></select></Field>
            <Field label="Entretien"><select defaultValue=""><option>Carnet complet</option><option>Factures disponibles</option><option>Révision complète</option><option>Historique partiel</option><option>Non disponible</option></select></Field>
            <Field label="Véhicule fumeur ?"><select defaultValue=""><option value="" disabled>Sélectionner</option><option>Oui</option><option>Non</option></select></Field>
            <Field label="Garantie"><select defaultValue=""><option>Non renseigné</option><option>Oui</option><option>Non</option></select></Field>
          </div>

          <Section id="pricing" title="Prix & benchmark" subtitle="Le prix est comparé aux données marché mensuelles." />
          <div className="critical">🔒 <strong>Le prix plancher reste confidentiel.</strong> Il n’est jamais montré aux acheteurs.</div>
          <div className="grid">
            <Field label="Prix souhaité, en dirhams" required><input type="number" placeholder="Ex. 160000" onChange={e=>set("desired",e.target.value)} /></Field>
            <Field label="Prix plancher minimum, en dirhams" required><input type="number" placeholder="Ex. 145000" onChange={e=>set("floor",e.target.value)} /></Field>
          </div>
          <Field label="Remarques vendeur"><textarea placeholder="Première main, carnet complet, pneus neufs, défauts éventuels..." /></Field>

          <Section id="media" title="Photos guidées" subtitle="Une annonce forte commence par des preuves visuelles structurées." />
          <div className="photoGrid">{PHOTOS.map((p,i)=><label className="upload" key={p}><b>{String(i+1).padStart(2,"0")}</b><span>{p}</span><small>Ajouter une photo</small><input type="file" accept="image/*" /></label>)}</div>

          <Section id="documents" title="Documents publics" subtitle="Facultatif, mais fortement recommandé pour obtenir un badge Verified." />
          <label className="check"><input type="checkbox" checked={docs} onChange={e=>setDocs(e.target.checked)} /> Ajouter carte grise floutée, contrôle technique ou factures partageables</label>
          {docs && <div className="docs"><div className="verified">Verified potentiel</div><div className="grid"><Field label="Carte grise floutée"><input type="file" accept="image/*,.pdf" /></Field><Field label="Factures / carnet"><input type="file" accept="image/*,.pdf" multiple /></Field><Field label="Contrôle technique"><input type="file" accept="image/*,.pdf" /></Field><Field label="Autres documents"><input type="file" accept="image/*,.pdf" multiple /></Field></div></div>}

          <Section id="preview" title="Aperçu de l’annonce" subtitle="Résumé public généré automatiquement." />
          <div className="preview">{description}</div>

          <div className="final"><div><strong>Soumettre pour revue</strong><p>AutoSouk vérifie le dossier avant publication.</p></div><button type="button">Envoyer ma demande gratuitement</button></div>
        </form>

        <aside className="rightRail">
          <div className="marketCard">
            <div className="marketHeader"><span>Argus AutoSouk</span><b>Benchmark mensuel</b></div>
            <div className="marketIdentity"><strong>{brand || "Marque"} {displayModel || "Modèle"} {displayEngine || ""}</strong><small>{displayTrim || "Finition"} · {form.year || "Année"} · {form.mileage || "Kilométrage"}</small></div>
            <div className="marketStats"><div><small>Min</small><strong>{formatDh(Math.min(...MARKET_PRICES))}</strong></div><div><small>Moy.</small><strong>{formatDh(Math.round(MARKET_PRICES.reduce((a,b)=>a+b,0)/MARKET_PRICES.length))}</strong></div><div><small>Médiane</small><strong>{formatDh(median(MARKET_PRICES))}</strong></div><div><small>Max</small><strong>{formatDh(Math.max(...MARKET_PRICES))}</strong></div></div>
            <div className="chart">{buildHistogram(MARKET_PRICES).map((bar,i)=><div className="barRow" key={i}><span>{Math.round(bar.low/1000)}-{Math.round(bar.high/1000)}k</span><div className="barTrack"><div style={{width:`${Math.max(bar.pct,3)}%`}} /></div><b>{bar.pct}%</b></div>)}</div>
            <div className={`signal ${priceSignal.tone}`}><strong>{priceSignal.badge}</strong><p>{priceSignal.label}</p></div>
            <div className="sourceNote">Base démo. À connecter ensuite à la table mensuelle benchmark légale.</div>
          </div>
        </aside>
      </section>

      <style>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth}.page{min-height:100vh;background:#eef2f6;color:#15110d;font-family:Inter,Arial,sans-serif;background-image:linear-gradient(135deg,#f6f2ec,#e8edf3)}.topbar{height:76px;display:flex;justify-content:space-between;align-items:center;max-width:1420px;margin:auto;padding:0 28px}.logo{font-family:Georgia,serif;font-size:30px;font-weight:800;text-decoration:none;color:#17110c}.logo span{color:#b8924a}.topRight{display:flex;gap:12px;align-items:center}.draft{background:rgba(45,134,83,.1);border:1px solid rgba(45,134,83,.22);color:#2d8653;border-radius:999px;padding:9px 13px;font-size:12px;font-weight:800}.back{background:white;color:#17110c;text-decoration:none;padding:10px 16px;border-radius:999px;border:1px solid #d2d9e2;font-weight:800}
        .hero{max-width:1420px;margin:auto;padding:46px 28px 26px;display:grid;grid-template-columns:1.2fr .8fr;gap:34px;align-items:end}.eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.16em;color:#b8924a;font-weight:950;margin-bottom:14px}h1{font-family:Georgia,serif;font-size:clamp(44px,6vw,76px);line-height:.98;margin:0 0 18px;letter-spacing:-.04em;max-width:860px}h1 em{color:#b8924a}.hero p{font-size:18px;line-height:1.7;color:#657181;max-width:760px}.heroGlass{background:rgba(255,255,255,.85);border:1px solid white;box-shadow:0 24px 70px rgba(31,41,55,.12);backdrop-filter:blur(14px);border-radius:30px;padding:26px}.heroMetric{display:flex;justify-content:space-between;align-items:center}.heroMetric span{color:#657181;font-weight:800}.heroMetric strong{font-size:34px;color:#b8924a}.track{height:10px;background:#e5eaf0;border-radius:999px;overflow:hidden;margin:14px 0 18px}.track div{height:100%;border-radius:999px;background:linear-gradient(90deg,#9c7632,#d9ad62)}.heroList{display:grid;gap:10px}.heroList span{background:#f7f9fb;border:1px solid #e1e7ef;border-radius:14px;padding:10px 12px;color:#3f4a58;font-weight:800}
        .workspace{max-width:1420px;margin:auto;padding:24px 28px 80px;display:grid;grid-template-columns:220px minmax(0,1fr) 360px;gap:24px;align-items:start}.leftNav,.rightRail{position:sticky;top:22px}.leftNav{background:rgba(255,255,255,.82);border:1px solid #dce3eb;border-radius:24px;padding:14px;box-shadow:0 15px 40px rgba(31,41,55,.08);backdrop-filter:blur(12px)}.navTitle{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#8090a3;font-weight:950;margin:4px 8px 12px}.leftNav a{display:flex;align-items:center;gap:10px;padding:10px 11px;border-radius:14px;text-decoration:none;color:#5f6f82;font-weight:900;font-size:13px}.leftNav a small{color:#b8924a}.leftNav a.active{background:#161b22;color:white}.leftNav a.active small{color:#d9ad62}
        .panel{background:white;border:1px solid #dce3eb;border-radius:28px;padding:30px;box-shadow:0 30px 90px rgba(31,41,55,.10);overflow:hidden}.sectionTitle{scroll-margin-top:30px;margin:34px 0 20px;padding-top:18px;border-top:1px solid #e3e9f0}.sectionTitle:first-child{margin-top:0;border-top:0}.sectionTitle h2{font-size:24px;margin:0 0 4px;font-weight:950;letter-spacing:-.02em}.sectionTitle p{margin:0;color:#728196;font-size:14px}.grid{display:grid;grid-template-columns:repeat(3,minmax(180px,1fr));gap:20px 22px;align-items:start}.field{display:grid;gap:8px;min-width:0}.field label{font-weight:950;font-size:12px;color:#101820}.req{color:#b8924a}input,select,textarea{display:block;width:100%;max-width:100%;min-width:0;border:1.5px solid #cfd8e3;background:#f8fafc;border-radius:12px;padding:13px 14px;font-size:14px;color:#101820;outline:none}textarea{min-height:110px;resize:vertical}input:focus,select:focus,textarea:focus{background:white;border-color:#b8924a;box-shadow:0 0 0 4px rgba(184,146,74,.13)}.pillGroup{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.pill{display:flex;gap:8px;align-items:center;background:#f8fafc;border:1px solid #dce3eb;border-radius:12px;padding:9px;font-size:12px;font-weight:800;cursor:pointer}.pill input{width:auto}.colorGrid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;margin-bottom:22px}.colorItem{display:flex;gap:8px;align-items:center;font-size:12px;font-weight:800}.swatch{width:15px;height:15px;border-radius:4px;border:1px solid #9aa6b4}
        .optionBlock{margin-top:18px}.optionBlock h3{font-size:15px;margin:0 0 12px}.optionsGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.optionItem{display:flex;gap:8px;align-items:flex-start;background:#f8fafc;border:1px solid #dce3eb;border-radius:12px;padding:9px;font-size:12px;font-weight:800;cursor:pointer}.optionItem input{width:auto;margin-top:1px}.optionItem.selected{background:#fff6e8;border-color:#d9ad62;color:#7a5720}.customOther{align-items:center}
.customOther input[type="text"]{border:0;background:transparent;padding:0;font-size:12px;box-shadow:none}
.customOther input[type="text"]:disabled{opacity:.45;cursor:not-allowed}
.customOther input[type="text"]:focus{box-shadow:none;border:0;background:transparent}
.critical{background:#fff2f0;border:1.5px solid #f2aaa2;color:#b42318;border-radius:14px;padding:15px 16px;margin-bottom:20px;font-weight:900}.critical strong{font-weight:950;color:#b42318}
        .photoGrid{display:grid;grid-template-columns:repeat(3,minmax(160px,1fr));gap:14px}.upload{background:#f8fafc;border:1.5px dashed #cfd8e3;border-radius:16px;padding:15px;min-height:140px;display:flex;flex-direction:column;gap:8px;cursor:pointer}.upload:hover{background:#fff9ee;border-color:#b8924a}.upload b{color:#b8924a}.upload span{font-weight:950}.upload small{color:#728196}.upload input{padding:8px;border-radius:10px;background:white;font-size:12px}.check{display:flex;gap:12px;background:#f8fafc;border:1px solid #dce3eb;border-radius:14px;padding:15px;font-weight:900}.check input{width:auto}.docs{margin-top:18px;background:#eef8f2;border:1px solid #c7e8d3;border-radius:18px;padding:20px}.verified{display:inline-flex;background:#2d8653;color:white;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:950;margin-bottom:18px}.preview{background:#f8fafc;border:1px solid #dce3eb;border-radius:18px;padding:20px;font-size:16px;line-height:1.75;color:#27313c}.final{margin-top:34px;background:#161b22;color:white;border-radius:22px;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:22px}.final p{color:rgba(255,255,255,.62);margin:6px 0 0}.final button{background:#b8924a;color:white;border:0;border-radius:14px;padding:15px 22px;font-weight:950;cursor:pointer;white-space:nowrap}
        .marketCard{background:rgba(255,255,255,.88);border:1px solid #dce3eb;border-radius:24px;padding:20px;box-shadow:0 24px 70px rgba(31,41,55,.12);backdrop-filter:blur(14px)}.marketHeader{display:flex;justify-content:space-between;gap:10px;align-items:start;margin-bottom:18px}.marketHeader span{font-size:22px;font-weight:950}.marketHeader b{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#b8924a;background:#fff6e8;border:1px solid #efd8ae;border-radius:999px;padding:7px 9px}.marketIdentity{background:#161b22;color:white;border-radius:18px;padding:15px;margin-bottom:15px}.marketIdentity strong{display:block;font-size:15px}.marketIdentity small{display:block;color:rgba(255,255,255,.6);margin-top:4px}.marketStats{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px}.marketStats div{background:#f8fafc;border:1px solid #dce3eb;border-radius:15px;padding:11px}.marketStats small{display:block;color:#728196;font-size:10px;text-transform:uppercase;font-weight:900}.marketStats strong{display:block;margin-top:4px;font-size:13px}.chart{display:grid;gap:8px;margin:16px 0}.barRow{display:grid;grid-template-columns:56px 1fr 34px;gap:8px;align-items:center;font-size:11px;color:#5f6f82}.barTrack{height:9px;background:#e5eaf0;border-radius:999px;overflow:hidden}.barTrack div{height:100%;background:linear-gradient(90deg,#b8924a,#d9ad62)}.sourceNote{font-size:11px;color:#8090a3;line-height:1.5}
        .signal{border-radius:16px;padding:14px;margin-top:14px;border:1px solid #ddd}.signal strong{display:block;margin-bottom:4px}.signal p{margin:0;line-height:1.5;font-size:13px}.signal.green{background:#edf7f2;border-color:#c3e6d4;color:#2d8653}.signal.red{background:#fff2f0;border-color:#f2aaa2;color:#b42318}.signal.black{background:#f3f0ec;border-color:#d8c8b5;color:#17110c}.signal.neutral{background:#f8fafc;border-color:#dce3eb;color:#728196}
        @media(max-width:1280px){.workspace{grid-template-columns:210px minmax(0,1fr)}.rightRail{position:static;grid-column:2}.grid{grid-template-columns:repeat(2,minmax(220px,1fr))}.optionsGrid{grid-template-columns:repeat(3,1fr)}}@media(max-width:900px){.topRight .draft{display:none}.hero,.workspace{grid-template-columns:1fr}.leftNav,.rightRail{position:static}.grid,.photoGrid,.optionsGrid,.colorGrid{grid-template-columns:1fr}.panel{padding:22px}.final{flex-direction:column;align-items:flex-start}.final button{width:100%}}
      `}</style>
    </main>
  );
}

function Section({id,title,subtitle}:{id:string;title:string;subtitle:string}) {
  return <div id={id} className="sectionTitle"><h2>{title}</h2><p>{subtitle}</p></div>;
}
function Field({label,required,children}:{label:string;required?:boolean;children:React.ReactNode}) {
  return <div className="field"><label>{label} {required && <span className="req">*</span>}</label>{children}</div>;
}
function PillGroup({items,onPick}:{items:string[];onPick:(v:string)=>void}) {
  return <div className="pillGroup">{items.map(x=><label key={x} className="pill"><input type="radio" name={items.join("-")} onChange={()=>onPick(x)} />{x}</label>)}</div>;
}
function ColorGrid({items}:{items:string[]}) {
  const colors:Record<string,string> = {Beige:"#d7b98c",Bleu:"#3267d6",Brun:"#7a4f16",Jaune:"#f1d000",Or:"#c9a227",Vert:"#73b63a",Gris:"#a8a8a8",Orange:"#f97316",Rouge:"#ef4444",Noir:"#2f3437",Argent:"#d8d8d8",Violet:"#8b5cf6",Blanc:"#fff",Mat:"#e5e7eb",Métallique:"#cbd5e1"};
  return <div className="colorGrid">{items.map(x=><label key={x} className="colorItem"><span className="swatch" style={{background:colors[x]||"#ddd"}} />{x}</label>)}</div>;
}
function OptionBlock({
  title,
  items,
  selected,
  toggle,
  customKeys = [],
  customFields,
  toggleCustom,
  setCustomValue
}: {
  title:string;
  items:string[];
  selected:string[];
  toggle:(v:string)=>void;
  customKeys?:string[];
  customFields:Record<string, {checked:boolean, value:string}>;
  toggleCustom:(key:string)=>void;
  setCustomValue:(key:string, value:string)=>void;
}) {
  return (
    <div className="optionBlock">
      <h3>{title}</h3>
      <div className="optionsGrid">
        {items.map(option => (
          <label key={option} className={`optionItem ${selected.includes(option) ? "selected" : ""}`}>
            <input type="checkbox" checked={selected.includes(option)} onChange={()=>toggle(option)} />
            <span>{option}</span>
          </label>
        ))}

        {customKeys.map((key, index) => (
          <label key={key} className={`optionItem customOther ${customFields[key]?.checked ? "selected" : ""}`}>
            <input
              type="checkbox"
              checked={customFields[key]?.checked || false}
              onChange={()=>toggleCustom(key)}
            />
            <input
              type="text"
              placeholder={`Autre ${index + 1}`}
              disabled={!customFields[key]?.checked}
              value={customFields[key]?.value || ""}
              onChange={(e)=>setCustomValue(key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
