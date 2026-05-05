"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const CITIES = [
  "Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan","Safi","Mohammedia","El Jadida","Béni Mellal","Nador","Khouribga","Settat","Taza","Larache","Ksar El Kébir","Khemisset","Guelmim","Berrechid","Wad Zem","Fquih Ben Salah","Taourirt","Berkane","Sidi Slimane","Errachidia","Guercif","Ouarzazate","Tiznit","Taroudant","Essaouira","Al Hoceïma","Chefchaouen","Sidi Kacem","Youssoufia","Tan-Tan","Dakhla","Laâyoune","Boujdour","Ifrane","Azrou","Midelt","Zagora","Tinghir","Skhirat","Temara","Salé","Bouskoura","Nouaceur","Mediouna","Dar Bouazza","Autre"
];

const MODELS: Record<string, string[]> = {
  "Audi":["A1","A3","A4","A5","A6","Q2","Q3","Q5","Q7","Q8","TT","e-tron"],
  "BMW":["Série 1","Série 2","Série 3","Série 4","Série 5","Série 7","X1","X2","X3","X4","X5","X6","X7","i3","i4","iX"],
  "Citroën":["C1","C3","C3 Aircross","C4","C5 Aircross","Berlingo"],
  "Dacia":["Dokker","Duster","Jogger","Lodgy","Logan","Sandero","Sandero Stepway","Spring"],
  "Fiat":["500","500X","Doblo","Panda","Punto","Tipo"],
  "Ford":["EcoSport","Fiesta","Focus","Kuga","Mondeo","Puma","Ranger"],
  "Honda":["Accord","Civic","CR-V","HR-V","Jazz"],
  "Hyundai":["Accent","Atos","Creta","Elantra","i10","i20","i30","Kona","Santa Fe","Tucson"],
  "Jeep":["Compass","Grand Cherokee","Renegade","Wrangler"],
  "Kia":["Ceed","Cerato","Picanto","Rio","Seltos","Sorento","Sportage","Stonic"],
  "Land Rover":["Defender","Discovery","Range Rover","Range Rover Evoque","Range Rover Sport","Velar"],
  "Mazda":["2","3","6","CX-3","CX-30","CX-5"],
  "Mercedes-Benz":["Classe A","Classe B","Classe C","C300e","Classe CLA","Classe E","Classe GLA","Classe GLC","Classe GLE","Classe S","Vito"],
  "Mini":["Cooper","Countryman","Clubman"],
  "Nissan":["Juke","Micra","Navara","Qashqai","X-Trail"],
  "Opel":["Astra","Corsa","Crossland","Grandland","Mokka"],
  "Peugeot":["108","2008","208","3008","301","308","5008","508","Partner"],
  "Porsche":["911","Cayenne","Macan","Panamera","Taycan"],
  "Renault":["Arkana","Captur","Clio","Kadjar","Kangoo","Koleos","Megane","Scenic","Symbol","Talisman","Twingo"],
  "Seat":["Arona","Ateca","Ibiza","Leon","Tarraco"],
  "Skoda":["Fabia","Kamiq","Karoq","Kodiaq","Octavia","Superb"],
  "Suzuki":["Alto","Baleno","Celerio","Jimny","Swift","Vitara"],
  "Tesla":["Model 3","Model S","Model X","Model Y"],
  "Toyota":["Auris","C-HR","Camry","Corolla","Hilux","Land Cruiser","Prado","RAV4","Yaris","Yaris Cross"],
  "Volkswagen":["Caddy","Golf","Golf VII","Golf VIII","Jetta","Passat","Polo","T-Cross","T-Roc","Tiguan","Touareg"],
  "Volvo":["S60","S90","XC40","XC60","XC90"],
  "Autre":["Autre modèle"]
};

const BRANDS = Object.keys(MODELS).sort();
const YEARS = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(new Date().getFullYear() - i));
const MILEAGES = ["< 1 000 km", ...Array.from({ length: 199 }, (_, i) => `> ${(i + 1) * 1000} km`), "> 200 000 km"];

const REASONS = [
  "Achat d’un nouveau véhicule",
  "Départ à l’étranger",
  "Besoin de liquidités",
  "Véhicule peu utilisé",
  "Changement de situation familiale",
  "Fin de leasing / financement",
  "Véhicule professionnel remplacé",
  "Autre"
];

const PHOTOS = [
  "Avant du véhicule",
  "Arrière du véhicule",
  "Côté gauche",
  "Côté droit",
  "Tableau de bord",
  "Compteur kilométrique",
  "Sièges avant",
  "Sièges arrière",
  "Coffre",
  "Jantes / pneus",
  "Défauts éventuels"
];

const STEPS = [
  ["contact","Coordonnées"],
  ["car","Véhicule"],
  ["reason","Motif"],
  ["price","Prix"],
  ["photos","Photos"],
  ["docs","Documents"],
  ["summary","Résumé"]
];

export default function MandatPage() {
  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [reason,setReason] = useState("");
  const [docs,setDocs] = useState(false);
  const [form,setForm] = useState<Record<string,string>>({});

  const models = useMemo(() => brand ? MODELS[brand] || [] : [], [brand]);
  const set = (k:string,v:string) => setForm(prev => ({...prev,[k]:v}));

  const description = useMemo(() => {
    const b = brand || "Véhicule";
    const m = model || "";
    const y = form.year ? ` ${form.year}` : "";
    const f = form.fuel ? ` ${form.fuel.toLowerCase()}` : "";
    const g = form.gearbox ? ` ${form.gearbox.toLowerCase()}` : "";
    const km = form.mileage ? ` avec ${form.mileage} au compteur` : "";
    const city = form.city ? `, disponible à ${form.city}` : "";
    const px = form.desired ? ` Prix souhaité : ${Number(form.desired).toLocaleString("fr-FR")} DH.` : "";
    const r = reason && reason !== "Autre" ? ` Motif de vente : ${reason.toLowerCase()}.` : "";
    return `${b} ${m}${y}${f}${g} à vendre${km}${city}.${px}${r}`.replace(/\s+/g," ").trim();
  }, [brand, model, form, reason]);

  return (
    <main className="page">
      <nav className="topbar">
        <Link href="/" className="logo">Auto<span>Souk</span></Link>
        <Link href="/" className="back">← Retour au site</Link>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">Dépôt vendeur</div>
          <h1>Mettre en ligne votre <em>véhicule</em></h1>
          <p>Un parcours guidé pour créer une annonce claire, rassurante et mieux structurée que les annonces classiques.</p>
        </div>
        <div className="heroCard">
          <strong>Annonce premium</strong>
          <ul>
            <li>Champs normalisés</li>
            <li>Photos par angle</li>
            <li>Badge Verified possible</li>
            <li>Résumé automatique généré</li>
          </ul>
        </div>
      </section>

      <section className="layout">
        <aside className="side">
          <div className="rail">
            {STEPS.map(([id,label]) => <a key={id} href={`#${id}`} className="navstep">{label}</a>)}
          </div>
          <p className="sideText">Les rubriques restent visibles pendant le scroll. Cliquez pour naviguer.</p>
        </aside>

        <form className="card">
          <Block id="contact" n="01" title="Vos coordonnées" sub="Ces informations ne sont pas visibles par les acheteurs." />
          <div className="grid2">
            <Field label="Prénom" required><input placeholder="Mohammed" onChange={e=>set("first",e.target.value)} /></Field>
            <Field label="Nom" required><input placeholder="El Fassi" onChange={e=>set("last",e.target.value)} /></Field>
            <Field label="Téléphone" required><input placeholder="06 XX XX XX XX" onChange={e=>set("phone",e.target.value)} /></Field>
            <Field label="Ville" required><select defaultValue="" onChange={e=>set("city",e.target.value)}><option value="" disabled>Sélectionner une ville</option>{CITIES.map(x=><option key={x}>{x}</option>)}</select></Field>
          </div>

          <Block id="car" n="02" title="Votre véhicule" sub="Marque, modèle et caractéristiques normalisées." />
          <div className="grid2">
            <Field label="Marque" required><select value={brand} onChange={e=>{setBrand(e.target.value);setModel("");}}><option value="">Sélectionner une marque</option>{BRANDS.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Modèle" required><select value={model} disabled={!brand} onChange={e=>setModel(e.target.value)}><option value="">{brand ? "Sélectionner un modèle" : "Choisissez d’abord une marque"}</option>{models.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Année" required><select defaultValue="" onChange={e=>set("year",e.target.value)}><option value="" disabled>Sélectionner l’année</option>{YEARS.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Kilométrage" required><select defaultValue="" onChange={e=>set("mileage",e.target.value)}><option value="" disabled>Sélectionner un palier</option>{MILEAGES.map(x=><option key={x}>{x}</option>)}</select></Field>
            <Field label="Carburant" required><select defaultValue="" onChange={e=>set("fuel",e.target.value)}><option value="" disabled>Sélectionner</option><option>Diesel</option><option>Essence</option><option>Hybride</option><option>Hybride rechargeable</option><option>Électrique</option><option>GPL</option></select></Field>
            <Field label="Boîte" required><select defaultValue="" onChange={e=>set("gearbox",e.target.value)}><option value="" disabled>Sélectionner</option><option>Manuelle</option><option>Automatique</option></select></Field>
          </div>

          <Block id="reason" n="03" title="Motif de vente" sub="Rassure l’acheteur sans exposer d’informations personnelles." />
          <Field label="Motif principal" required><select value={reason} onChange={e=>setReason(e.target.value)}><option value="">Sélectionner un motif</option>{REASONS.map(x=><option key={x}>{x}</option>)}</select></Field>
          {reason === "Autre" && <Field label="Autre motif facultatif"><textarea placeholder="Précisez si vous le souhaitez..." /></Field>}

          <Block id="price" n="04" title="Votre stratégie de prix" sub="Le prix plancher reste confidentiel." />
          <div className="notice">🔒 Ces montants sont en dirhams et servent uniquement à piloter la négociation.</div>
          <div className="grid2">
            <Field label="Prix souhaité, en dirhams" required><input type="number" placeholder="Ex. 160000" onChange={e=>set("desired",e.target.value)} /></Field>
            <Field label="Prix plancher minimum, en dirhams" required><input type="number" placeholder="Ex. 145000" /></Field>
          </div>
          <Field label="Remarques"><textarea placeholder="Première main, carnet complet, entretien récent, défauts éventuels..." /></Field>

          <Block id="photos" n="05" title="Photos obligatoires" sub="Chaque angle important doit être documenté." />
          <div className="photoGrid">{PHOTOS.map((p,i)=><label key={p} className="upload"><span>{String(i+1).padStart(2,"0")}</span><strong>{p}</strong><small>JPG / PNG</small><input type="file" accept="image/*" /></label>)}</div>

          <Block id="docs" n="06" title="Documentation facultative" sub="Les documents publics peuvent déclencher un badge Verified." />
          <label className="check"><input type="checkbox" checked={docs} onChange={e=>setDocs(e.target.checked)} /> Ajouter des documents publics et obtenir un badge Verified si le dossier est conforme</label>
          {docs && <div className="docs"><div className="badge">Verified potentiel</div><div className="grid2"><Field label="Carte grise floutée"><input type="file" accept="image/*,.pdf" /></Field><Field label="Factures / carnet d’entretien"><input type="file" accept="image/*,.pdf" multiple /></Field><Field label="Contrôle technique"><input type="file" accept="image/*,.pdf" /></Field><Field label="Autres documents"><input type="file" accept="image/*,.pdf" multiple /></Field></div></div>}

          <Block id="summary" n="07" title="Résumé automatique de l’annonce" sub="Base de description publique générée à partir des informations renseignées." />
          <div className="summary">{description}</div>

          <div className="final">
            <div><strong>Prêt pour validation</strong><p>AutoSouk vous contactera avant toute publication.</p></div>
            <button type="button">Envoyer ma demande gratuitement →</button>
          </div>
        </form>
      </section>

      <style>{`
        html{scroll-behavior:smooth}.page{min-height:100vh;background:linear-gradient(160deg,#faf7f2,#f3ede3);color:#2d2419;font-family:Arial,sans-serif}.topbar{height:72px;display:flex;justify-content:space-between;align-items:center;max-width:1180px;margin:auto;padding:0 24px}.logo{font-family:Georgia,serif;font-size:28px;font-weight:700;text-decoration:none;color:#1a1410}.logo span{color:#b8924a}.back{text-decoration:none;color:#3d3228;background:white;border:1px solid #d4c8b8;border-radius:999px;padding:10px 16px;font-weight:700}
        .hero{max-width:1180px;margin:auto;padding:56px 24px 36px;display:grid;grid-template-columns:1.2fr .8fr;gap:32px;align-items:end}.eyebrow{color:#b8924a;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:900;margin-bottom:14px}h1{font-family:Georgia,serif;font-size:clamp(40px,6vw,68px);line-height:1;margin:0 0 18px}h1 em{color:#b8924a}.hero p{color:#8c7b6b;font-size:18px;line-height:1.7}.heroCard{background:white;border:1px solid #e8ddd0;border-radius:20px;padding:24px;box-shadow:0 12px 40px rgba(58,40,20,.10)}.heroCard strong{font-family:Georgia,serif;font-size:22px}.heroCard ul{color:#6f6255;line-height:1.9}
        .layout{max-width:1180px;margin:auto;padding:24px;display:grid;grid-template-columns:280px minmax(0,1fr);gap:28px}.side{position:sticky;top:20px;align-self:start;background:rgba(255,255,255,.74);border:1px solid #e8ddd0;border-radius:20px;padding:18px;backdrop-filter:blur(8px)}.rail{max-height:58vh;overflow-y:auto;padding-right:4px}.navstep{display:block;padding:12px 14px;border-radius:12px;color:#8c7b6b;font-weight:900;font-size:14px;text-decoration:none;border-left:3px solid transparent}.navstep:hover,.navstep:focus{background:#fdf5e6;color:#b8924a;border-left-color:#b8924a}.sideText{font-size:14px;color:#8c7b6b;border-top:1px solid #e8ddd0;margin-top:18px;padding-top:18px}
        .card{background:white;border:1px solid #e8ddd0;border-radius:24px;padding:34px;box-shadow:0 14px 50px rgba(58,40,20,.12);min-width:0}.section{scroll-margin-top:24px;margin:34px 0 18px;padding-top:8px;border-top:1px solid #efe7dc;display:flex;gap:14px}.section:first-child{margin-top:0;border-top:none}.section span{background:#fdf5e6;color:#b8924a;border:1px solid #f0d9a8;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:900;align-self:start}.section h2{margin:0;font-family:Georgia,serif;font-size:28px}.section p{margin:4px 0 0;color:#8c7b6b;font-size:14px}
        .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 22px}.field{display:grid;gap:7px;margin-bottom:18px;min-width:0}.field label{font-size:13px;font-weight:900}.req{color:#b8924a}input,select,textarea{width:100%;border:1.5px solid #e8ddd0;background:#faf7f2;color:#2d2419;border-radius:12px;padding:14px;font-size:15px;outline:none;min-width:0}textarea{min-height:110px;resize:vertical}input:focus,select:focus,textarea:focus{border-color:#b8924a;background:white;box-shadow:0 0 0 4px rgba(184,146,74,.10)}.notice{background:#fdf5e6;border:1px solid #f0d9a8;color:#a07932;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-weight:800}
        .photoGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.upload{border:1.5px dashed #d4c8b8;background:#faf7f2;border-radius:16px;padding:16px;min-height:145px;display:flex;flex-direction:column;gap:8px;cursor:pointer}.upload:hover{background:#fdf5e6;border-color:#b8924a}.upload span{color:#b8924a;font-weight:900;font-size:12px}.upload small{color:#8c7b6b}.upload input{background:white;padding:8px;font-size:12px}.check{display:flex;gap:10px;background:#faf7f2;border:1px solid #e8ddd0;padding:16px;border-radius:14px;font-weight:800}.check input{width:auto}.docs{margin-top:18px;background:#edf7f2;border:1px solid #c3e6d4;border-radius:18px;padding:20px}.badge{display:inline-flex;background:#2d8653;color:white;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:900;margin-bottom:16px}.summary{background:#faf7f2;border:1px solid #e8ddd0;border-radius:16px;padding:18px;font-size:16px;line-height:1.7;color:#3d3228}
        .final{margin-top:34px;background:#1a1410;color:white;border-radius:20px;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:20px}.final p{color:rgba(255,255,255,.65);margin:6px 0 0}.final button{background:#b8924a;color:white;border:0;padding:15px 22px;border-radius:12px;font-weight:900;cursor:pointer;white-space:nowrap}
        @media(max-width:900px){.hero,.layout{grid-template-columns:1fr}.side{position:static}.grid2,.photoGrid{grid-template-columns:1fr}.card{padding:22px}.final{flex-direction:column;align-items:flex-start}.final button{width:100%}}
      `}</style>
    </main>
  );
}

function Block({id,n,title,sub}:{id:string;n:string;title:string;sub:string}) {
  return <div id={id} className="section"><span>{n}</span><div><h2>{title}</h2><p>{sub}</p></div></div>
}

function Field({label,required,children}:{label:string;required?:boolean;children:React.ReactNode}) {
  return <div className="field"><label>{label} {required && <span className="req">*</span>}</label>{children}</div>
}
