'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda',
  'Kénitra', 'Tétouan', 'Safi', 'Mohammedia', 'El Jadida', 'Béni Mellal', 'Nador',
  'Khouribga', 'Settat', 'Taza', 'Larache', 'Ksar El Kébir', 'Khemisset', 'Guelmim',
  'Berrechid', 'Wad Zem', 'Fquih Ben Salah', 'Taourirt', 'Berkane', 'Sidi Slimane',
  'Errachidia', 'Guercif', 'Ouarzazate', 'Tiznit', 'Taroudant', 'Essaouira',
  'Al Hoceïma', 'Chefchaouen', 'Sidi Kacem', 'Youssoufia', 'Tan-Tan', 'Dakhla',
  'Laâyoune', 'Boujdour', 'Ifrane', 'Azrou', 'Midelt', 'Zagora', 'Tinghir',
  'Skhirat', 'Temara', 'Salé', 'Bouskoura', 'Nouaceur', 'Mediouna', 'Dar Bouazza',
  'Autre'
];

const BRAND_MODELS: Record<string, string[]> = {
  'Abarth': ['124 Spider', '500', '595', '695'],
  'Alfa Romeo': ['Giulia', 'Giulietta', 'MiTo', 'Stelvio', 'Tonale'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'e-tron'],
  'BMW': ['Série 1', 'Série 2', 'Série 3', 'Série 4', 'Série 5', 'Série 6', 'Série 7', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'i3', 'i4', 'iX'],
  'BYD': ['Atto 3', 'Dolphin', 'Han', 'Seal', 'Tang'],
  'Changan': ['Alsvin', 'CS35 Plus', 'CS55 Plus', 'UNI-K', 'UNI-T'],
  'Chery': ['Arrizo 5', 'Tiggo 2', 'Tiggo 4', 'Tiggo 7', 'Tiggo 8'],
  'Chevrolet': ['Aveo', 'Captiva', 'Cruze', 'Spark', 'Trax'],
  'Citroën': ['C1', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C5 Aircross', 'Berlingo', 'DS3'],
  'Cupra': ['Ateca', 'Born', 'Formentor', 'Leon'],
  'Dacia': ['Dokker', 'Duster', 'Jogger', 'Lodgy', 'Logan', 'Logan MCV', 'Sandero', 'Sandero Stepway', 'Spring'],
  'DS Automobiles': ['DS 3', 'DS 4', 'DS 7', 'DS 9'],
  'Fiat': ['500', '500X', 'Doblo', 'Fiorino', 'Panda', 'Punto', 'Tipo'],
  'Ford': ['EcoSport', 'Fiesta', 'Focus', 'Kuga', 'Mondeo', 'Mustang', 'Puma', 'Ranger', 'Transit'],
  'Geely': ['Coolray', 'Geometry C', 'Okavango', 'Tugella'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'HR-V', 'Jazz'],
  'Hyundai': ['Accent', 'Atos', 'Creta', 'Elantra', 'i10', 'i20', 'i30', 'Kona', 'Santa Fe', 'Tucson', 'Venue'],
  'Isuzu': ['D-Max', 'MU-X'],
  'Jaguar': ['E-Pace', 'F-Pace', 'XE', 'XF', 'XJ'],
  'Jeep': ['Cherokee', 'Compass', 'Grand Cherokee', 'Renegade', 'Wrangler'],
  'Kia': ['Ceed', 'Cerato', 'Picanto', 'Rio', 'Seltos', 'Sorento', 'Sportage', 'Stonic'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Velar'],
  'Lexus': ['CT', 'ES', 'IS', 'NX', 'RX', 'UX'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'MX-5'],
  'Mercedes-Benz': ['Classe A', 'Classe B', 'Classe C', 'Classe CLA', 'Classe CLS', 'Classe E', 'Classe G', 'Classe GLA', 'Classe GLB', 'Classe GLC', 'Classe GLE', 'Classe GLS', 'Classe S', 'Vito'],
  'MG': ['MG3', 'MG4', 'MG5', 'HS', 'Marvel R', 'ZS'],
  'Mini': ['Clubman', 'Cooper', 'Countryman', 'Paceman'],
  'Mitsubishi': ['ASX', 'Eclipse Cross', 'L200', 'Outlander', 'Pajero', 'Space Star'],
  'Nissan': ['Juke', 'Micra', 'Navara', 'Note', 'Qashqai', 'X-Trail'],
  'Opel': ['Astra', 'Corsa', 'Crossland', 'Grandland', 'Insignia', 'Mokka'],
  'Peugeot': ['108', '2008', '208', '3008', '301', '308', '5008', '508', 'Partner', 'Rifter'],
  'Porsche': ['911', 'Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'],
  'Renault': ['Arkana', 'Captur', 'Clio', 'Kadjar', 'Kangoo', 'Koleos', 'Laguna', 'Megane', 'Scenic', 'Symbol', 'Talisman', 'Trafic', 'Twingo'],
  'Seat': ['Arona', 'Ateca', 'Ibiza', 'Leon', 'Tarraco'],
  'Skoda': ['Fabia', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Rapid', 'Scala', 'Superb'],
  'Smart': ['Forfour', 'Fortwo'],
  'Suzuki': ['Alto', 'Baleno', 'Celerio', 'Jimny', 'S-Cross', 'Swift', 'Vitara'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y'],
  'Toyota': ['Auris', 'Avensis', 'C-HR', 'Camry', 'Corolla', 'Hilux', 'Land Cruiser', 'Prado', 'RAV4', 'Yaris', 'Yaris Cross'],
  'Volkswagen': ['Arteon', 'Caddy', 'Golf', 'Golf VII', 'Golf VIII', 'Jetta', 'Passat', 'Polo', 'T-Cross', 'T-Roc', 'Tiguan', 'Touareg', 'Touran'],
  'Volvo': ['S60', 'S90', 'V40', 'V60', 'XC40', 'XC60', 'XC90'],
  'Autre': ['Autre modèle']
};

const BRANDS = Object.keys(BRAND_MODELS).sort();

const YEARS = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => String(new Date().getFullYear() - i)
);

const MILEAGE_BUCKETS = [
  '< 1 000 km',
  ...Array.from({ length: 199 }, (_, i) => `> ${(i + 1) * 1000} km`),
  '> 200 000 km'
];

const PHOTO_REQUIREMENTS = [
  'Avant du véhicule',
  'Arrière du véhicule',
  'Côté gauche',
  'Côté droit',
  'Tableau de bord',
  'Compteur kilométrique',
  'Sièges avant',
  'Sièges arrière',
  'Coffre',
  'Jantes / pneus',
  'Défauts éventuels'
];

export default function MandatPage() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [hasDocs, setHasDocs] = useState(false);

  const models = useMemo(() => {
    if (!brand) return [];
    return BRAND_MODELS[brand] || ['Autre modèle'];
  }, [brand]);

  return (
    <main className="mandatPage">
      <nav className="topbar">
        <Link href="/" className="brandLogo">Auto<span>Souk</span></Link>
        <Link href="/" className="backBtn">← Retour au site</Link>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">Dépôt vendeur</div>
          <h1>Confiez-nous votre <em>véhicule</em></h1>
          <p>
            Un parcours guidé, structuré comme une inspection professionnelle :
            informations véhicule, stratégie de prix, photos obligatoires et documents vérifiables.
          </p>
        </div>

        <div className="trustCard">
          <strong>Ce que vous obtenez</strong>
          <ul>
            <li>Argus AutoSouk basé sur comparables</li>
            <li>Prix plancher strictement confidentiel</li>
            <li>Annonce mieux structurée et plus rassurante</li>
            <li>Badge Verified si les documents sont fournis</li>
          </ul>
        </div>
      </section>

      <section className="content">
        <aside className="sidePanel">
          <div className="step active">1. Coordonnées</div>
          <div className="step">2. Véhicule</div>
          <div className="step">3. Prix</div>
          <div className="step">4. Photos</div>
          <div className="step">5. Documents</div>
          <div className="hint">
            <strong>Conseil</strong>
            <p>Plus votre dossier est complet, plus l’annonce inspire confiance et plus la négociation est fluide.</p>
          </div>
        </aside>

        <form className="formCard">
          <SectionTitle number="01" title="Vos coordonnées" subtitle="Ces informations ne sont pas visibles par les acheteurs." />
          <div className="grid2">
            <Field label="Prénom" required><input placeholder="Mohammed" /></Field>
            <Field label="Nom" required><input placeholder="El Fassi" /></Field>
            <Field label="Téléphone" required><input placeholder="06 XX XX XX XX" /></Field>
            <Field label="Ville" required>
              <select defaultValue="">
                <option value="" disabled>Sélectionner une ville</option>
                {MOROCCAN_CITIES.map(city => <option key={city}>{city}</option>)}
              </select>
            </Field>
          </div>

          <SectionTitle number="02" title="Votre véhicule" subtitle="Les champs sont normalisés pour faciliter le matching avec les comparables marché." />
          <div className="grid2">
            <Field label="Marque" required>
              <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }}>
                <option value="">Sélectionner une marque</option>
                {BRANDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </Field>

            <Field label="Modèle" required>
              <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
                <option value="">{brand ? 'Sélectionner un modèle' : 'Choisissez d’abord une marque'}</option>
                {models.map(m => <option key={m}>{m}</option>)}
              </select>
            </Field>

            <Field label="Année" required>
              <select defaultValue="">
                <option value="" disabled>Sélectionner l’année</option>
                {YEARS.map(year => <option key={year}>{year}</option>)}
              </select>
            </Field>

            <Field label="Kilométrage" required>
              <select defaultValue="">
                <option value="" disabled>Sélectionner un palier</option>
                {MILEAGE_BUCKETS.map(km => <option key={km}>{km}</option>)}
              </select>
            </Field>

            <Field label="Carburant" required>
              <select defaultValue="">
                <option value="" disabled>Sélectionner</option>
                <option>Diesel</option>
                <option>Essence</option>
                <option>Hybride</option>
                <option>Hybride rechargeable</option>
                <option>Électrique</option>
                <option>GPL</option>
              </select>
            </Field>

            <Field label="Boîte" required>
              <select defaultValue="">
                <option value="" disabled>Sélectionner</option>
                <option>Manuelle</option>
                <option>Automatique</option>
              </select>
            </Field>
          </div>

          <SectionTitle number="03" title="Votre stratégie de prix" subtitle="Le prix plancher reste strictement confidentiel. Il n’est jamais affiché côté acheteur." />
          <div className="notice">🔒 Ces montants sont utilisés uniquement pour piloter la négociation en votre faveur.</div>
          <div className="grid2">
            <Field label="Prix souhaité, en dirhams" required><input type="number" placeholder="Ex. 160000" /></Field>
            <Field label="Prix plancher minimum, en dirhams" required><input type="number" placeholder="Ex. 145000" /></Field>
          </div>
          <Field label="Remarques sur l’état, options, historique">
            <textarea placeholder="Première main, carnet complet, entretien récent, pneus neufs, défauts éventuels..." />
          </Field>

          <SectionTitle number="04" title="Photos obligatoires" subtitle="Ajoutez des photos précises, comme lors d’une restitution Getaround : chaque angle important doit être documenté." />
          <div className="photoGrid">
            {PHOTO_REQUIREMENTS.map((item, index) => (
              <label className="uploadBox" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
                <small>JPG / PNG</small>
                <input type="file" accept="image/*" required />
              </label>
            ))}
          </div>

          <SectionTitle number="05" title="Documentation facultative" subtitle="Ces documents peuvent renforcer la confiance acheteur. Les informations sensibles doivent être masquées avant dépôt." />
          <label className="checkline">
            <input type="checkbox" checked={hasDocs} onChange={(e) => setHasDocs(e.target.checked)} />
            Je souhaite ajouter des documents publics et obtenir un badge Verified si le dossier est conforme
          </label>

          {hasDocs && (
            <div className="docsBox">
              <div className="verifiedBadge">Badge potentiel : Verified</div>
              <div className="grid2">
                <Field label="Carte grise avec informations sensibles floutées">
                  <input type="file" accept="image/*,.pdf" />
                </Field>
                <Field label="Carnet / factures d’entretien partageables">
                  <input type="file" accept="image/*,.pdf" multiple />
                </Field>
                <Field label="Contrôle technique">
                  <input type="file" accept="image/*,.pdf" />
                </Field>
                <Field label="Autres documents utiles">
                  <input type="file" accept="image/*,.pdf" multiple />
                </Field>
              </div>
            </div>
          )}

          <div className="finalBox">
            <div>
              <strong>Avant envoi</strong>
              <p>Vérifiez les informations, les photos et les montants. AutoSouk vous contactera avant toute publication.</p>
            </div>
            <button type="button">Envoyer ma demande gratuitement →</button>
          </div>
        </form>
      </section>

      <style>{`
        .mandatPage {
          min-height: 100vh;
          background: linear-gradient(160deg, #faf7f2 0%, #f3ede3 100%);
          color: #2d2419;
          font-family: Arial, sans-serif;
        }

        .topbar {
          height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .brandLogo {
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          text-decoration: none;
          color: #1a1410;
        }

        .brandLogo span {
          color: #b8924a;
        }

        .backBtn {
          text-decoration: none;
          color: #3d3228;
          border: 1px solid #d4c8b8;
          background: white;
          border-radius: 999px;
          padding: 10px 16px;
          font-weight: 600;
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 24px 36px;
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 32px;
          align-items: end;
        }

        .eyebrow {
          color: #b8924a;
          text-transform: uppercase;
          letter-spacing: .14em;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(40px, 6vw, 68px);
          line-height: 1;
          margin: 0 0 18px;
        }

        h1 em {
          color: #b8924a;
        }

        .hero p {
          color: #8c7b6b;
          font-size: 18px;
          line-height: 1.7;
          max-width: 680px;
        }

        .trustCard {
          background: white;
          border: 1px solid #e8ddd0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 12px 40px rgba(58,40,20,.10);
        }

        .trustCard strong {
          font-family: Georgia, serif;
          font-size: 22px;
        }

        .trustCard ul {
          margin: 16px 0 0;
          padding-left: 18px;
          color: #6f6255;
          line-height: 1.9;
        }

        .content {
          max-width: 1180px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
        }

        .sidePanel {
          position: sticky;
          top: 24px;
          align-self: start;
          background: rgba(255,255,255,.65);
          border: 1px solid #e8ddd0;
          border-radius: 20px;
          padding: 18px;
        }

        .step {
          padding: 12px 14px;
          border-radius: 12px;
          color: #8c7b6b;
          font-weight: 700;
          font-size: 14px;
        }

        .step.active {
          background: #fdf5e6;
          color: #b8924a;
        }

        .hint {
          margin-top: 18px;
          border-top: 1px solid #e8ddd0;
          padding-top: 18px;
          color: #8c7b6b;
          font-size: 14px;
        }

        .formCard {
          background: white;
          border: 1px solid #e8ddd0;
          border-radius: 24px;
          padding: 34px;
          box-shadow: 0 14px 50px rgba(58,40,20,.12);
        }

        .sectionTitle {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin: 34px 0 18px;
          padding-top: 8px;
          border-top: 1px solid #efe7dc;
        }

        .sectionTitle:first-child {
          margin-top: 0;
          border-top: none;
        }

        .sectionTitle span {
          background: #fdf5e6;
          color: #b8924a;
          border: 1px solid #f0d9a8;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 800;
        }

        .sectionTitle h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 28px;
        }

        .sectionTitle p {
          margin: 4px 0 0;
          color: #8c7b6b;
          font-size: 14px;
        }

        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .field {
          display: grid;
          gap: 7px;
          margin-bottom: 16px;
        }

        .field label {
          font-size: 13px;
          font-weight: 800;
          color: #3d3228;
        }

        .required {
          color: #b8924a;
        }

        input, select, textarea {
          width: 100%;
          border: 1.5px solid #e8ddd0;
          background: #faf7f2;
          color: #2d2419;
          border-radius: 12px;
          padding: 14px 14px;
          font-size: 15px;
          outline: none;
        }

        textarea {
          min-height: 110px;
          resize: vertical;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #b8924a;
          background: white;
          box-shadow: 0 0 0 4px rgba(184,146,74,.10);
        }

        .notice {
          background: #fdf5e6;
          border: 1px solid #f0d9a8;
          color: #a07932;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 16px;
          font-weight: 700;
          font-size: 14px;
        }

        .photoGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .uploadBox {
          border: 1.5px dashed #d4c8b8;
          background: #faf7f2;
          border-radius: 16px;
          padding: 16px;
          min-height: 145px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          cursor: pointer;
          transition: .2s;
        }

        .uploadBox:hover {
          background: #fdf5e6;
          border-color: #b8924a;
        }

        .uploadBox span {
          color: #b8924a;
          font-weight: 900;
          font-size: 12px;
        }

        .uploadBox small {
          color: #8c7b6b;
        }

        .uploadBox input {
          background: white;
          padding: 8px;
          font-size: 12px;
        }

        .checkline {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #faf7f2;
          border: 1px solid #e8ddd0;
          padding: 16px;
          border-radius: 14px;
          font-weight: 700;
        }

        .checkline input {
          width: auto;
          margin-top: 3px;
        }

        .docsBox {
          margin-top: 18px;
          background: #edf7f2;
          border: 1px solid #c3e6d4;
          border-radius: 18px;
          padding: 20px;
        }

        .verifiedBadge {
          display: inline-flex;
          background: #2d8653;
          color: white;
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .finalBox {
          margin-top: 34px;
          background: #1a1410;
          color: white;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .finalBox p {
          color: rgba(255,255,255,.65);
          margin: 6px 0 0;
        }

        .finalBox button {
          background: #b8924a;
          color: white;
          border: none;
          padding: 15px 22px;
          border-radius: 12px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .hero, .content {
            grid-template-columns: 1fr;
          }

          .sidePanel {
            position: static;
          }

          .grid2, .photoGrid {
            grid-template-columns: 1fr;
          }

          .formCard {
            padding: 22px;
          }

          .finalBox {
            flex-direction: column;
            align-items: flex-start;
          }

          .finalBox button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="sectionTitle">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label>{label} {required && <span className="required">*</span>}</label>
      {children}
    </div>
  );
}
