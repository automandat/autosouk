export default function MandatPage() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Déposer mon véhicule</h1>
      <p>Formulaire de dépôt de mandat AutoSouk.</p>

      <form style={{ maxWidth: 600, display: "grid", gap: 16 }}>
        <input placeholder="Prénom" />
        <input placeholder="Nom" />
        <input placeholder="Téléphone" />
        <input placeholder="Ville" />
        <input placeholder="Marque" />
        <input placeholder="Modèle" />
        <input placeholder="Année" />
        <input placeholder="Kilométrage" />
        <input placeholder="Prix souhaité" />
        <input placeholder="Prix plancher" />
        <textarea placeholder="Remarques" />

        <button type="button">Envoyer ma demande</button>
      </form>
    </main>
  );
}
