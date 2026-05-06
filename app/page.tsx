"use client";

import Link from "next/link";

const benefits = [
  {
    title: "Annonce guidée",
    text: "Un parcours simple pour renseigner les informations essentielles de votre véhicule."
  },
  {
    title: "Prix mieux positionné",
    text: "Un repère marché vous aide à définir un prix cohérent et rassurant."
  },
  {
    title: "Dossier plus clair",
    text: "Photos, historique et documents utiles rendent votre annonce plus crédible."
  }
];

const steps = [
  "Décrivez votre véhicule",
  "Ajoutez son état et son historique",
  "Définissez votre prix",
  "Préparez les photos avant publication"
];

export default function HomePage() {
  return (
    <main className="home">
      <nav className="nav">
        <Link href="/" className="brand">Auto<span>Souk</span></Link>
        <div className="navRight">
          <a href="#how">Comment ça marche</a>
          <Link href="/mandat" className="navCta">Confier mon véhicule</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="copy">
          <span className="eyebrow">Vente automobile accompagnée</span>
          <h1>Vendez votre voiture simplement, avec plus de confiance.</h1>
          <p>
            AutoSouk vous accompagne pour préparer une annonce claire, complète
            et rassurante avant sa publication.
          </p>
          <div className="actions">
            <Link href="/mandat" className="primary">Confier mon véhicule</Link>
            <a href="#how" className="secondary">Voir comment ça marche</a>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <div>
              <small>Exemple d’annonce</small>
              <strong>BMW Série 3 320d</strong>
              <p>2021 · Diesel · Automatique · 74 000 km</p>
            </div>
            <span>92</span>
          </div>

          <div className="vehicle">
            <div className="body" />
            <div className="wheel left" />
            <div className="wheel right" />
          </div>

          <div className="meta">
            <div>
              <small>Repère marché</small>
              <b>210 000 – 225 000 DH</b>
            </div>
            <div>
              <small>Dossier</small>
              <b>Photos + historique</b>
            </div>
          </div>

          <div className="badges">
            <span>Prix cohérent</span>
            <span>Photos guidées</span>
            <span>Annonce claire</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <span>Pourquoi AutoSouk ?</span>
          <h2>Une annonce mieux préparée inspire plus confiance.</h2>
        </div>

        <div className="benefits">
          {benefits.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <div className="sectionTitle">
          <span>Comment ça marche</span>
          <h2>Un parcours simple, en quatre étapes.</h2>
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="trust">
        <h2>Les bons éléments, présentés simplement.</h2>
        <p>
          AutoSouk vous aide à mettre en avant le kilométrage, l’état, le prix,
          les photos et les documents utiles, sans complexifier le parcours.
        </p>
        <Link href="/mandat" className="primary">Commencer</Link>
      </section>

      <footer className="footer">
        <Link href="/" className="brand">Auto<span>Souk</span></Link>
        <p>Vente automobile accompagnée au Maroc.</p>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .home {
          min-height: 100vh;
          background: #f5f5f7;
          color: #1d1d1f;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif;
        }

        .nav {
          max-width: 1180px;
          height: 76px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          color: #1d1d1f;
          text-decoration: none;
          font-size: 24px;
          font-weight: 850;
          letter-spacing: -0.05em;
        }

        .brand span {
          color: #0071e3;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .navRight a {
          color: #6e6e73;
          text-decoration: none;
          font-size: 14px;
          font-weight: 650;
        }

        .navCta {
          background: #1d1d1f;
          color: #fff !important;
          border-radius: 999px;
          padding: 11px 16px;
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 86px 28px 72px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
          gap: 56px;
          align-items: center;
        }

        .eyebrow,
        .sectionTitle span {
          display: inline-flex;
          width: max-content;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #e5e5ea;
          color: #0071e3;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.09em;
        }

        h1 {
          max-width: 760px;
          margin: 18px 0;
          font-size: clamp(48px, 7vw, 86px);
          line-height: 0.94;
          letter-spacing: -0.078em;
          font-weight: 850;
        }

        .copy p {
          max-width: 620px;
          margin: 0;
          color: #6e6e73;
          font-size: 20px;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .primary,
        .secondary {
          min-height: 48px;
          border-radius: 999px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 750;
          font-size: 15px;
        }

        .primary {
          background: #0071e3;
          color: #fff;
        }

        .secondary {
          background: #fff;
          color: #1d1d1f;
          border: 1px solid #e5e5ea;
        }

        .card {
          background: #fff;
          border: 1px solid #e5e5ea;
          border-radius: 36px;
          padding: 26px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.08);
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .cardHeader small {
          display: block;
          color: #0071e3;
          font-size: 12px;
          font-weight: 750;
          margin-bottom: 7px;
        }

        .cardHeader strong {
          display: block;
          font-size: 24px;
          letter-spacing: -0.05em;
        }

        .cardHeader p {
          margin: 6px 0 0;
          color: #6e6e73;
          font-size: 14px;
        }

        .cardHeader span {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #f0f7ff;
          color: #0071e3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 850;
          font-size: 22px;
        }

        .vehicle {
          position: relative;
          height: 174px;
          margin: 26px 0;
          border-radius: 28px;
          background: linear-gradient(180deg, #f5f7fb, #eef2f7);
          overflow: hidden;
        }

        .body {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70%;
          height: 54px;
          transform: translate(-50%, -35%);
          border-radius: 70px 80px 34px 34px;
          background: linear-gradient(135deg, #1d1d1f, #3a3a3c);
        }

        .body:before {
          content: "";
          position: absolute;
          left: 24%;
          top: -35px;
          width: 38%;
          height: 42px;
          border-radius: 42px 42px 8px 8px;
          background: #3a3a3c;
          transform: skewX(-16deg);
        }

        .wheel {
          position: absolute;
          bottom: 49px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #111;
          border: 6px solid #555;
        }

        .wheel.left {
          left: 28%;
        }

        .wheel.right {
          right: 28%;
        }

        .meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .meta div {
          background: #f5f5f7;
          border-radius: 18px;
          padding: 13px;
        }

        .meta small {
          display: block;
          color: #86868b;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .meta b {
          font-size: 13px;
          letter-spacing: -0.02em;
        }

        .badges {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .badges span {
          background: #f0f7ff;
          color: #0071e3;
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 750;
        }

        .section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 56px 28px;
        }

        .sectionTitle {
          max-width: 720px;
          margin-bottom: 24px;
        }

        .sectionTitle h2,
        .trust h2 {
          margin: 14px 0 0;
          font-size: clamp(34px, 4.5vw, 56px);
          line-height: 1;
          letter-spacing: -0.065em;
          font-weight: 850;
        }

        .benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .benefits article,
        .step {
          background: #fff;
          border: 1px solid #e5e5ea;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.04);
        }

        .benefits h3 {
          margin: 0 0 10px;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .benefits p,
        .trust p {
          margin: 0;
          color: #6e6e73;
          font-size: 15px;
          line-height: 1.55;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .step strong {
          display: inline-flex;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #0071e3;
          color: #fff;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          margin-bottom: 18px;
        }

        .step p {
          margin: 0;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: -0.02em;
        }

        .trust {
          max-width: 980px;
          margin: 56px auto;
          padding: 56px 28px;
          text-align: center;
        }

        .trust p {
          max-width: 620px;
          margin: 16px auto 24px;
        }

        .footer {
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px;
          border-top: 1px solid #e5e5ea;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: #86868b;
        }

        .footer p {
          margin: 0;
        }

        @media (max-width: 980px) {
          .navRight a:not(.navCta) {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            padding-top: 54px;
          }

          .benefits,
          .steps {
            grid-template-columns: 1fr;
          }

          .card {
            max-width: 560px;
          }
        }

        @media (max-width: 640px) {
          .nav,
          .hero,
          .section,
          .trust,
          .footer {
            padding-left: 18px;
            padding-right: 18px;
          }

          .navCta {
            display: none;
          }

          h1 {
            font-size: 44px;
          }

          .meta {
            grid-template-columns: 1fr;
          }

          .footer {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
