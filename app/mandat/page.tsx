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
  "Mercedes-Benz":["Classe A","Classe B","Classe C","C300e","Classe CLA","Classe E","Classe GLA","Classe GLC","Classe GLE","Classe S","Vito","Autre"],
  "Mini":["Cooper","Countryman","Clubman","Autre"],
  "Nissan":["Juke","Micra","Navara","Qashqai","X-Trail","Autre"],
  "Opel":["Astra","Corsa","Crossland","Grandland","Mokka"],
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
  "Autre":["Autre modèle"]
};

const BRANDS = Object.keys(MODELS).sort();
const YEARS = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(new Date().getFullYear() - i));
const MILEAGES = ["< 1 000 km", ...Array.from({ length: 199 }, (_, i) => `> ${(i + 1) * 1000} km`), "> 200 000 km"];

const REASONS = ["Achat d’un nouveau véhicule","Départ à l’étranger","Besoin de liquidités","Véhicule peu utilisé","Changement de situation familiale","Fin de leasing / financement","Véhicule professionnel remplacé","Autre"];
const PHOTOS = ["Avant","Arrière","Profil gauche","Profil droit","Tableau de bord","Compteur","Sièges avant","Sièges arrière","Coffre","Jantes / pneus","Défauts visibles"];

const STEPS = [
  ["identity","Identité"],
  ["vehicle","Véhicule"],
  ["condition","État"],
  ["pricing","Prix"],
  ["media","Photos"],
  ["documents","Docs"],
  ["preview","Aperçu"]
];

// Démo front. À remplacer ensuite par la table Supabase monthly_market_benchmark.
const MARKET_PRICES = [104000,108000,109000,112000,115000,117000,118000,121000,123000,125000,128000,131000,135000,139000,142000,148000,152000,158000];

function formatDh(value: number) {
  return `${value.toLocaleString("fr-FR")} DH`;
}

function median(values: number[]) {
  const sorted = [...values].sort((a,b) => a-b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function buildHistogram(values: number[], buckets = 7) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = Math.ceil((max - min) / buckets);
  const rows = Array.from({ length: buckets }, (_, i) => {
    const low = min + i * step;
    const high = i === buckets - 1 ? max : low + step;
    const count = values.filter(v => i === buckets - 1 ? v >= low && v <= high : v >= low && v < high).length;
    return { low, high, count, pct: Math.round((count / values.length) * 100) };
  });
  return rows;
}

export default function MandatPage() {
  const [active,setActive] = useState("identity");
  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [reason,setReason] = useState("");
  const [docs,setDocs] = useState(false);
  const [form,setForm] = useState<Record<string,string>>({});

  const models = useMemo(() => brand ? MODELS[brand] || [] : [], [brand]);
  const set = (k:string,v:string) => setForm(prev => ({...prev,[k]:v}));

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
  const market = useMemo(() => {
    const avg = Math.round(MARKET_PRICES.reduce((a,b)=>a+b,0) / MARKET_PRICES.length);
    return {
      min: Math.min(...MARKET_PRICES),
      max: Math.max(...MARKET_PRICES),
      avg,
      median: median(MARKET_PRICES),
      count: MARKET_PRICES.length,
      histogram: buildHistogram(MARKET_PRICES)
    };
  }, []);

  const priceSignal = useMemo(() => {
    if (!desired) return { tone:"neutral", label:"Renseignez un prix souhaité pour obtenir un signal marché.", badge:"En attente" };
    const diff = (desired - market.avg) / market.avg;
    if (diff < -0.05) return { tone:"green", label:"Prix plus bas que le marché. Votre annonce devrait générer plus de demandes.", badge:"Sous marché" };
    if (diff > 0.05) return { tone:"red", label:"Prix plus haut que le marché. Le délai de vente peut être plus long.", badge:"Au-dessus marché" };
    return { tone:"black", label:"Prix du marché. Positionnement cohérent avec les comparables collectés.", badge:"Prix du marché ✓" };
  }, [desired, market.avg]);

  const required = [form.first, form.last, form.phone, form.city, brand, model, form.year, form.mileage, form.fuel, form.gearbox, form.condition, form.ownership, reason, form.desired, form.floor];
  const completion = Math.round(required.filter(Boolean).length / required.length * 100);

  const description = useMemo(() => {
    const b = brand || "Véhicule";
    const m = model || "";
    const y = form.year ? ` ${form.year}` : "";
    const f = form.fuel ? ` ${form.fuel.toLowerCase()}` : "";
    const g = form.gearbox ? ` ${form.gearbox.toLowerCase()}` : "";
    const km = form.mileage ? ` avec ${form.mileage} au compteur` : "";
    const city = form.city ? `, disponible à ${form.city}` : "";
    const condition = form.condition ? ` État déclaré : ${form.condition.toLowerCase()}.` : "";
    const px = form.desired ? ` Prix souhaité : ${formatDh(Number(form.desired))}.` : "";
    const r = reason && reason !== "Autre" ? ` Motif de vente : ${reason.toLowerCase()}.` : "";
    return `${b} ${m}${y}${f}${g} à vendre${km}${city}.${condition}${px}${r}`.replace(/\s+/g," ").trim();
  }, [brand, model, form, reason]);

  return (
    <main className="page">
      <nav className="topbar">
        <Link href="/" className="logo">Auto<span>Souk</span></Link>
        <div className="topRight">
          <span className="draft">Brouillon sauvegardé</span>
          <Link href="/" className="back">Retour</Link>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">Studio de publication vendeur</div>
          <h1>L’annonce auto la plus <em>claire</em> du marché.</h1>
          <p>Une expérience pensée comme un cockpit : données normalisées, dossier qualité, benchmark prix et aperçu vendeur en temps réel.</p>
        </div>

        <div className="heroGlass">
          <div className="heroMetric">
            <span>Qualité du dossier</span>
            <strong>{completion}%</strong>
          </div>
          <div className="track"><div style={{width:`${completion}%`}} /></div>
          <div className="heroList">
            <span>Argus mensuel benchmarké</span>
            <span>Photos guidées</span>
            <span>Résumé automatique</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="leftNav">
          <div className="navTitle">Publication</div>
          {STEPS.map(([id,label], i) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              <small>{String(i + 1).padStart(2,"0")}</small>
              <span>{label}</span>
            </a>
          ))}
        </aside>

        <form className="panel">
          <Section id="identity" number="01" title="Identité vendeur" subtitle="Privé. Ces informations ne sont jamais publiées." />
          <div className="grid">
            <Field label="Prénom" required><input onChange={e=>set("first",e.target.value)} placeholder="Mohammed" /></Field>
            <Field label="Nom" required><input onChange={e=>set("last",e.target.value)} placeholder="El Fassi" /></Field>
            <Field label="Téléphone" required><input onChange={e=>set("phone",e.target.value)} placeholder="06 XX XX XX XX" /></Field>
            <Field label="Ville" required>
              <select defaultValue="" onChange={e=>set("city",e.target.value)}>
                <option value="" disabled>Sélectionner une ville</option>
                {CITIES.map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
          </div>

          <Section id="vehicle" number="02" title="Véhicule" subtitle="Les champs sont calibrés pour matcher les comparables marché." />
          <div className="grid">
            <Field label="Marque" required>
              <select value={brand} onChange={e=>{setBrand(e.target.value); setModel("");}}>
                <option value="">Sélectionner une marque</option>
                {Object.keys(MODELS).sort().map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Modèle" required>
              <select value={model} disabled={!brand} onChange={e=>setModel(e.target.value)}>
                <option value="">{brand ? "Sélectionner un modèle" : "Choisissez d’abord une marque"}</option>
                {models.map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Année" required>
              <select defaultValue="" onChange={e=>set("year",e.target.value)}>
                <option value="" disabled>Sélectionner l’année</option>
                {YEARS.map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Kilométrage" required>
              <select defaultValue="" onChange={e=>set("mileage",e.target.value)}>
                <option value="" disabled>Sélectionner un palier</option>
                {MILEAGES.map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Carburant" required>
              <select defaultValue="" onChange={e=>set("fuel",e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                <option>Diesel</option><option>Essence</option><option>Hybride</option><option>Hybride rechargeable</option><option>Électrique</option><option>GPL</option>
              </select>
            </Field>
            <Field label="Boîte" required>
              <select defaultValue="" onChange={e=>set("gearbox",e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                <option>Manuelle</option><option>Automatique</option>
              </select>
            </Field>
          </div>

          <Section id="condition" number="03" title="État & historique" subtitle="Ce sont les critères qui rassurent le plus les acheteurs sérieux." />
          <div className="grid">
            <Field label="État général" required>
              <select defaultValue="" onChange={e=>set("condition",e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                <option>Excellent état</option><option>Très bon état</option><option>Bon état</option><option>État correct</option><option>Petits frais à prévoir</option>
              </select>
            </Field>
            <Field label="Statut" required>
              <select defaultValue="" onChange={e=>set("ownership",e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                <option>Première main</option><option>Deuxième main</option><option>Importé</option><option>Véhicule société</option>
              </select>
            </Field>
            <Field label="Entretien">
              <select defaultValue="">
                <option value="" disabled>Sélectionner</option>
                <option>Carnet complet</option><option>Factures disponibles</option><option>Historique partiel</option><option>Non disponible</option>
              </select>
            </Field>
            <Field label="Accident / peinture">
              <select defaultValue="">
                <option value="" disabled>Sélectionner</option>
                <option>Aucun accident déclaré</option><option>Petite peinture esthétique</option><option>Réparation déclarée</option><option>À préciser</option>
              </select>
            </Field>
          </div>

          <Section id="pricing" number="04" title="Prix & benchmark" subtitle="Le prix est comparé aux données marché mensuelles." />
          <div className="critical">🔒 <strong>Le prix plancher reste confidentiel.</strong> Il n’est jamais montré aux acheteurs.</div>
          <div className="grid">
            <Field label="Prix souhaité, en dirhams" required><input type="number" placeholder="Ex. 160000" onChange={e=>set("desired",e.target.value)} /></Field>
            <Field label="Prix plancher minimum, en dirhams" required><input type="number" placeholder="Ex. 145000" onChange={e=>set("floor",e.target.value)} /></Field>
          </div>
          <Field label="Remarques vendeur">
            <textarea placeholder="Première main, carnet complet, pneus neufs, défauts éventuels..." />
          </Field>

          <Section id="media" number="05" title="Photos guidées" subtitle="Une annonce forte commence par des preuves visuelles structurées." />
          <div className="photoGrid">
            {PHOTOS.map((p,i)=>(
              <label className="upload" key={p}>
                <b>{String(i+1).padStart(2,"0")}</b>
                <span>{p}</span>
                <small>Ajouter une photo</small>
                <input type="file" accept="image/*" />
              </label>
            ))}
          </div>

          <Section id="documents" number="06" title="Documents publics" subtitle="Facultatif, mais fortement recommandé pour obtenir un badge Verified." />
          <label className="check">
            <input type="checkbox" checked={docs} onChange={e=>setDocs(e.target.checked)} />
            Ajouter carte grise floutée, contrôle technique ou factures partageables
          </label>
          {docs && (
            <div className="docs">
              <div className="verified">Verified potentiel</div>
              <div className="grid">
                <Field label="Carte grise floutée"><input type="file" accept="image/*,.pdf" /></Field>
                <Field label="Factures / carnet"><input type="file" accept="image/*,.pdf" multiple /></Field>
                <Field label="Contrôle technique"><input type="file" accept="image/*,.pdf" /></Field>
                <Field label="Autres documents"><input type="file" accept="image/*,.pdf" multiple /></Field>
              </div>
            </div>
          )}

          <Section id="preview" number="07" title="Aperçu de l’annonce" subtitle="Résumé public généré automatiquement." />
          <div className="preview">{description}</div>

          <div className="final">
            <div>
              <strong>Soumettre pour revue</strong>
              <p>AutoSouk vérifie le dossier avant publication. Aucune donnée sensible n’est publiée.</p>
            </div>
            <button type="button">Envoyer ma demande gratuitement</button>
          </div>
        </form>

        <aside className="rightRail">
          <div className="marketCard">
            <div className="marketHeader">
              <span>Argus AutoSouk</span>
              <b>Benchmark mensuel</b>
            </div>

            <div className="marketIdentity">
              <strong>{brand || "Marque"} {model || "Modèle"}</strong>
              <small>{form.year || "Année"} · {form.mileage || "Kilométrage"} · {form.fuel || "Carburant"}</small>
            </div>

            <div className="marketStats">
              <div><small>Min</small><strong>{formatDh(market.min)}</strong></div>
              <div><small>Moy.</small><strong>{formatDh(market.avg)}</strong></div>
              <div><small>Médiane</small><strong>{formatDh(market.median)}</strong></div>
              <div><small>Max</small><strong>{formatDh(market.max)}</strong></div>
            </div>

            <div className="chart">
              {market.histogram.map((bar, i) => (
                <div className="barRow" key={i}>
                  <span>{Math.round(bar.low/1000)}-{Math.round(bar.high/1000)}k</span>
                  <div className="barTrack"><div style={{width:`${Math.max(bar.pct, 3)}%`}} /></div>
                  <b>{bar.pct}%</b>
                </div>
              ))}
            </div>

            <div className={`signal ${priceSignal.tone}`}>
              <strong>{priceSignal.badge}</strong>
              <p>{priceSignal.label}</p>
            </div>

            <p className="sourceNote">Données de démonstration. À connecter à la base mensuelle issue des sites de revente marocains validés légalement.</p>
          </div>
        </aside>
      </section>

      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        .page{min-height:100vh;background:#f7f1e8;color:#15110d;font-family:Inter,Arial,sans-serif;background-image:radial-gradient(circle at top left,rgba(184,146,74,.18),transparent 35%),linear-gradient(135deg,#fbf8f2,#efe4d3)}
        .topbar{height:76px;display:flex;justify-content:space-between;align-items:center;max-width:1360px;margin:auto;padding:0 28px}
        .logo{font-family:Georgia,serif;font-size:30px;font-weight:800;text-decoration:none;color:#17110c}.logo span{color:#b8924a}
        .topRight{display:flex;gap:12px;align-items:center}.draft{background:rgba(45,134,83,.1);border:1px solid rgba(45,134,83,.22);color:#2d8653;border-radius:999px;padding:9px 13px;font-size:12px;font-weight:800}.back{background:white;color:#17110c;text-decoration:none;padding:10px 16px;border-radius:999px;border:1px solid #e3d6c7;font-weight:800}
        .hero{max-width:1360px;margin:auto;padding:54px 28px 30px;display:grid;grid-template-columns:1.2fr .8fr;gap:34px;align-items:end}
        .eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.16em;color:#b8924a;font-weight:950;margin-bottom:14px}
        h1{font-family:Georgia,serif;font-size:clamp(44px,6vw,78px);line-height:.96;margin:0 0 18px;letter-spacing:-.04em;max-width:820px}h1 em{color:#b8924a}
        .hero p{font-size:18px;line-height:1.7;color:#7d6d5f;max-width:720px}.heroGlass{background:rgba(255,255,255,.78);border:1px solid rgba(255,255,255,.9);box-shadow:0 24px 70px rgba(58,40,20,.16);backdrop-filter:blur(14px);border-radius:30px;padding:26px}
        .heroMetric{display:flex;justify-content:space-between;align-items:center}.heroMetric span{color:#7d6d5f;font-weight:800}.heroMetric strong{font-size:34px;color:#b8924a}
        .track{height:10px;background:#eee2d5;border-radius:999px;overflow:hidden;margin:14px 0 18px}.track div{height:100%;border-radius:999px;background:linear-gradient(90deg,#9c7632,#d9ad62)}
        .heroList{display:grid;gap:10px}.heroList span{background:#fbf8f2;border:1px solid #eadfce;border-radius:14px;padding:10px 12px;color:#5d5045;font-weight:800}
        .workspace{max-width:1360px;margin:auto;padding:24px 28px 80px;display:grid;grid-template-columns:230px minmax(0,1fr) 360px;gap:24px;align-items:start}
        .leftNav,.rightRail{position:sticky;top:22px}.leftNav{background:rgba(255,255,255,.72);border:1px solid #eadfce;border-radius:24px;padding:16px;box-shadow:0 15px 40px rgba(58,40,20,.08);backdrop-filter:blur(12px)}
        .navTitle{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#9a8a7b;font-weight:950;margin:4px 8px 12px}
        .leftNav a{display:flex;align-items:center;gap:10px;padding:12px;border-radius:16px;text-decoration:none;color:#7d6d5f;font-weight:900}.leftNav a small{color:#b8924a}.leftNav a.active{background:#17110c;color:white}.leftNav a.active small{color:#d9ad62}
        .panel{background:rgba(255,255,255,.92);border:1px solid #eadfce;border-radius:32px;padding:38px;box-shadow:0 30px 90px rgba(58,40,20,.14);overflow:hidden}
        .sectionTitle{scroll-margin-top:30px;margin:42px 0 22px;padding-top:12px;border-top:1px solid #eee2d5;display:flex;gap:14px}.sectionTitle:first-child{margin-top:0;border-top:0}.sectionTitle span{align-self:start;background:#17110c;color:#d9ad62;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:950}.sectionTitle h2{font-family:Georgia,serif;font-size:31px;margin:0;letter-spacing:-.02em}.sectionTitle p{margin:4px 0 0;color:#827367;font-size:14px}
        .grid{display:grid;grid-template-columns:repeat(2,minmax(280px,1fr));gap:24px 28px;align-items:start}.field{display:grid;gap:9px;min-width:0}.field label{font-weight:950;font-size:13px;color:#201812}.req{color:#b8924a}
        input,select,textarea{display:block;width:100%;max-width:100%;min-width:0;border:1.5px solid #e6dac9;background:#fbf8f2;border-radius:18px;padding:16px 17px;font-size:15px;color:#17110c;outline:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.7)}
        textarea{min-height:120px;resize:vertical}input:focus,select:focus,textarea:focus{background:white;border-color:#b8924a;box-shadow:0 0 0 5px rgba(184,146,74,.12)}
        .critical{background:#fff2f0;border:1.5px solid #f2aaa2;color:#b42318;border-radius:18px;padding:16px 18px;margin-bottom:22px;font-weight:900}.critical strong{font-weight:950;color:#b42318}
        .photoGrid{display:grid;grid-template-columns:repeat(3,minmax(170px,1fr));gap:16px}.upload{background:#fbf8f2;border:1.5px dashed #d8c8b5;border-radius:22px;padding:17px;min-height:152px;display:flex;flex-direction:column;gap:9px;cursor:pointer;transition:.18s}.upload:hover{background:#fff9ee;border-color:#b8924a;transform:translateY(-2px)}.upload b{color:#b8924a}.upload span{font-weight:950}.upload small{color:#827367}.upload input{padding:8px;border-radius:12px;background:white;font-size:12px}
        .check{display:flex;gap:12px;background:#fbf8f2;border:1px solid #e6dac9;border-radius:18px;padding:17px;font-weight:900}.check input{width:auto}.docs{margin-top:18px;background:#eef8f2;border:1px solid #c7e8d3;border-radius:22px;padding:22px}.verified{display:inline-flex;background:#2d8653;color:white;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:950;margin-bottom:18px}
        .preview{background:#fbf8f2;border:1px solid #e6dac9;border-radius:22px;padding:22px;font-size:17px;line-height:1.75;color:#362c24}
        .final{margin-top:38px;background:#17110c;color:white;border-radius:26px;padding:26px;display:flex;justify-content:space-between;align-items:center;gap:22px}.final p{color:rgba(255,255,255,.62);margin:6px 0 0}.final button{background:#b8924a;color:white;border:0;border-radius:18px;padding:16px 22px;font-weight:950;cursor:pointer;white-space:nowrap}
        .marketCard{background:rgba(255,255,255,.82);border:1px solid #eadfce;border-radius:28px;padding:22px;box-shadow:0 24px 70px rgba(58,40,20,.13);backdrop-filter:blur(14px)}
        .marketHeader{display:flex;justify-content:space-between;gap:10px;align-items:start;margin-bottom:18px}.marketHeader span{font-family:Georgia,serif;font-size:24px;font-weight:800}.marketHeader b{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#b8924a;background:#fff6e8;border:1px solid #efd8ae;border-radius:999px;padding:7px 9px}
        .marketIdentity{background:#17110c;color:white;border-radius:20px;padding:16px;margin-bottom:16px}.marketIdentity strong{display:block;font-size:16px}.marketIdentity small{display:block;color:rgba(255,255,255,.58);margin-top:4px}
        .marketStats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}.marketStats div{background:#fbf8f2;border:1px solid #eadfce;border-radius:18px;padding:13px}.marketStats small{display:block;color:#827367;font-size:11px;text-transform:uppercase;font-weight:900}.marketStats strong{display:block;margin-top:4px;font-size:14px}
        .chart{display:grid;gap:9px;margin:18px 0}.barRow{display:grid;grid-template-columns:56px 1fr 38px;gap:10px;align-items:center;font-size:12px;color:#5d5045}.barTrack{height:10px;background:#eee2d5;border-radius:999px;overflow:hidden}.barTrack div{height:100%;background:linear-gradient(90deg,#b8924a,#d9ad62);border-radius:999px}.barRow b{text-align:right}
        .signal{border-radius:20px;padding:16px;margin-top:16px;border:1px solid #ddd}.signal strong{display:block;margin-bottom:4px}.signal p{margin:0;line-height:1.5;font-size:14px}.signal.green{background:#edf7f2;border-color:#c3e6d4;color:#2d8653}.signal.red{background:#fff2f0;border-color:#f2aaa2;color:#b42318}.signal.black{background:#f3f0ec;border-color:#d8c8b5;color:#17110c}.signal.neutral{background:#fbf8f2;border-color:#eadfce;color:#827367}
        .sourceNote{font-size:11px;color:#9a8a7b;line-height:1.5;margin:14px 0 0}
        @media(max-width:1180px){.workspace{grid-template-columns:220px minmax(0,1fr)}.rightRail{position:static;grid-column:2}.marketCard{margin-top:0}}
        @media(max-width:900px){.topRight .draft{display:none}.hero,.workspace{grid-template-columns:1fr}.leftNav,.rightRail{position:static}.grid,.photoGrid{grid-template-columns:1fr}.panel{padding:24px}.final{flex-direction:column;align-items:flex-start}.final button{width:100%}}
      `}</style>
    </main>
  );
}

function Section({id,number,title,subtitle}:{id:string;number:string;title:string;subtitle:string}) {
  return <div id={id} className="sectionTitle"><span>{number}</span><div><h2>{title}</h2><p>{subtitle}</p></div></div>;
}

function Field({label,required,children}:{label:string;required?:boolean;children:React.ReactNode}) {
  return <div className="field"><label>{label} {required && <span className="req">*</span>}</label>{children}</div>;
}
