export default function Home() {
  return (
    <main>
      <section className="hero">
        <span className="badge">Plateforme automobile indépendante au Maroc</span>
        <h1>
          Vendez votre voiture au <em>juste prix</em>, sans stress.
        </h1>
        <p>
          AutoSouk gère votre annonce, les acheteurs, les offres et l’estimation marché.
          Vous gardez le contrôle, nous simplifions la vente.
        </p>

        <div className="actions">
          <a className="btn primary" href="/mandat">Confier mon véhicule</a>
          <a className="btn secondary" href="/catalogue">Voir les annonces</a>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Déposez votre mandat</h3>
            <p>Formulaire simple, prix souhaité et prix plancher confidentiel.</p>
          </div>
          <div className="card">
            <h3>Argus automatique</h3>
            <p>Comparaison avec des véhicules similaires : année ±1 et kilométrage ±10%.</p>
          </div>
          <div className="card">
            <h3>Gestion des offres</h3>
            <p>Interface vendeur, acheteur et admin à intégrer après validation du déploiement.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
