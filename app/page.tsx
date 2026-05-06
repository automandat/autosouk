"use client";

import Link from "next/link";

const pillars = [
  {
    title: "Annonce guidée",
    text: "Un parcours clair pour renseigner les informations essentielles sans se perdre."
  },
  {
    title: "Prix plus cohérent",
    text: "Un repère marché aide à positionner le véhicule avec plus de justesse."
  },
  {
    title: "Dossier rassurant",
    text: "Photos, état, historique et documents sont structurés pour inspirer confiance."
  }
];

const steps = [
  "Décrivez votre véhicule",
  "Précisez son état",
  "Définissez votre prix",
  "Ajoutez vos photos"
];

export default function HomePage() {
  return (
    <main className="home">
      <header className="blueBar">
        <div className="blueInner">
          <Link href="/" className="brand">Auto<span>Souk</span></Link>
          <nav className="topLinks" aria-label="Navigation principale">
            <a href="#how">Comment ça marche</a>
            <Link href="/espace" className="accountLink">Accéder à mon espace personnel</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">Vente automobile accompagnée</span>
          <h1>Vendez votre voiture avec plus de sérénité.</h1>
          <p>
            AutoSouk vous accompagne dans la préparation d’une annonce claire,
            complète et rassurante, avant sa mise en relation avec les acheteurs.
          </p>

          <div className="actions">
            <Link href="/mandat" className="primaryButton">Confier mon véhicule</Link>
            <a href="#how" className="secondaryButton">Voir comment ça marche</a>
          </div>
        </div>

        <aside className="announcement" aria-label="Aperçu d’une annonce AutoSouk">
          <div className="announcementHeader">
            <div>
              <small>Exemple d’annonce</small>
              <strong>BMW Série 3</strong>
              <p>320d · 2021 · 74 000 km</p>
            </div>
            <span>92</span>
          </div>

          <div className="vehicleVisual">
            <div className="carBody" />
            <div className="wheel wheelLeft" />
            <div className="wheel wheelRight" />
          </div>

          <div className="announcementInfo">
            <div>
              <small>Repère marché</small>
              <b>210 000 - 225 000 DH</b>
            </div>
            <div>
              <small>Dossier</small>
              <b>Photos + historique</b>
            </div>
          </div>

          <div className="badges">
            <span>Prix cohérent</span>
            <span>Annonce claire</span>
          </div>
        </aside>
      </section>

      <section className="introStrip">
        <p>
          Une annonce bien préparée réduit les hésitations, clarifie les échanges
          et aide l’acheteur à se projeter plus rapidement.
        </p>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <span>Pourquoi AutoSouk ?</span>
          <h2>Un accompagnement simple pour mieux présenter votre voiture.</h2>
        </div>

        <div className="pillars">
          {pillars.map((item) => (
            <article className="pillar" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section how" id="how">
        <div className="sectionTitle center">
          <span>Comment ça marche</span>
          <h2>Quatre étapes, sans complexité.</h2>
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="trustPanel">
        <div>
          <span>Confiance acheteur</span>
          <h2>Les informations importantes, présentées proprement.</h2>
          <p>
            AutoSouk vous aide à structurer le kilométrage, l’état, le prix,
            les photos et les documents utiles, sans rendre le parcours lourd.
          </p>
        </div>
        <Link href="/mandat" className="primaryButton">Commencer</Link>
      </section>

      <footer className="footer">
        <Link href="/" className="footerBrand">AutoSouk</Link>
        <p>Vente automobile accompagnée au Maroc.</p>
      </footer>

      <style jsx>{`
        .home,
        .home * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif !important;
        }

        .home {
          min-height: 100vh;
          background: #f5f5f7;
          color: #1d1d1f;
        }

        .blueBar {
          background: #0071e3;
          color: #fff;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.16) inset;
        }

        .blueInner {
          max-width: 1180px;
          height: 64px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .brand {
          color: #fff;
          text-decoration: none;
          font-size: 23px;
          font-weight: 800;
          letter-spacing: -0.045em;
        }

        .brand span {
          color: rgba(255, 255, 255, 0.74);
        }

        .topLinks {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .topLinks a {
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
          font-size: 14px;
          font-weight: 650;
        }

        .topLinks a:hover {
          color: #fff;
        }

        .accountLink {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.42);
          border-radius: 999px;
          padding: 0 14px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 92px 28px 66px;
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.72fr);
          gap: 58px;
          align-items: center;
        }

        .eyebrow,
        .sectionTitle span,
        .trustPanel span {
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
          max-width: 780px;
          margin: 20px 0 18px;
          color: #1d1d1f;
          font-size: clamp(48px, 6.2vw, 78px);
          line-height: 0.96;
          letter-spacing: -0.072em;
          font-weight: 820;
        }

        .heroCopy p {
          max-width: 610px;
          margin: 0;
          color: #6e6e73;
          font-size: 19px;
          line-height: 1.55;
          letter-spacing: -0.015em;
        }

        .actions {
          margin-top: 30px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primaryButton,
        .secondaryButton {
          min-height: 48px;
          border-radius: 999px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 15px;
          font-weight: 750;
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .primaryButton {
          background: #0071e3;
          color: #fff;
          border: 1px solid #0071e3;
        }

        .primaryButton:hover {
          background: #0077ed;
          transform: translateY(-1px);
        }

        .secondaryButton {
          background: #fff;
          color: #1d1d1f;
          border: 1px solid #dcdce1;
        }

        .secondaryButton:hover {
          border-color: #bfc0c6;
          transform: translateY(-1px);
        }

        .announcement {
          width: min(100%, 340px);
          justify-self: end;
          background: #fff;
          border: 1px solid #e5e5ea;
          border-radius: 30px;
          padding: 20px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
        }

        .announcementHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .announcementHeader small {
          display: block;
          margin-bottom: 6px;
          color: #0071e3;
          font-size: 11px;
          font-weight: 750;
        }

        .announcementHeader strong {
          display: block;
          color: #1d1d1f;
          font-size: 21px;
          line-height: 1.05;
          letter-spacing: -0.05em;
        }

        .announcementHeader p {
          margin: 6px 0 0;
          color: #6e6e73;
          font-size: 13px;
        }

        .announcementHeader span {
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #f0f7ff;
          color: #0071e3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          font-weight: 820;
        }

        .vehicleVisual {
          position: relative;
          height: 132px;
          margin: 18px 0;
          border-radius: 24px;
          background: linear-gradient(180deg, #f8fafc, #edf2f7);
          overflow: hidden;
        }

        .carBody {
          position: absolute;
          left: 50%;
          top: 55%;
          width: 68%;
          height: 40px;
          transform: translate(-50%, -50%);
          border-radius: 60px 70px 26px 26px;
          background: linear-gradient(135deg, #1d1d1f, #3a3a3c);
        }

        .carBody:before {
          content: "";
          position: absolute;
          left: 24%;
          top: -26px;
          width: 38%;
          height: 31px;
          border-radius: 34px 34px 7px 7px;
          background: #3a3a3c;
          transform: skewX(-16deg);
        }

        .wheel {
          position: absolute;
          bottom: 36px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #111;
          border: 5px solid #555;
        }

        .wheelLeft {
          left: 30%;
        }

        .wheelRight {
          right: 30%;
        }

        .announcementInfo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .announcementInfo div {
          background: #f5f5f7;
          border-radius: 15px;
          padding: 11px;
        }

        .announcementInfo small {
          display: block;
          margin-bottom: 4px;
          color: #86868b;
          font-size: 10px;
        }

        .announcementInfo b {
          color: #1d1d1f;
          font-size: 12px;
          letter-spacing: -0.02em;
        }

        .badges {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .badges span {
          background: #f0f7ff;
          color: #0071e3;
          border-radius: 999px;
          padding: 6px 8px;
          font-size: 11px;
          font-weight: 750;
        }

        .introStrip {
          max-width: 1124px;
          margin: 0 auto 16px;
          padding: 0 28px;
        }

        .introStrip p {
          margin: 0;
          border-radius: 28px;
          background: #fff;
          border: 1px solid #e5e5ea;
          padding: 24px 28px;
          color: #1d1d1f;
          font-size: clamp(20px, 2.6vw, 30px);
          line-height: 1.22;
          letter-spacing: -0.05em;
          font-weight: 760;
        }

        .section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 62px 28px;
        }

        .sectionTitle {
          max-width: 760px;
          margin-bottom: 24px;
        }

        .sectionTitle.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .sectionTitle h2,
        .trustPanel h2 {
          margin: 14px 0 0;
          color: #1d1d1f;
          font-size: clamp(34px, 4.8vw, 58px);
          line-height: 1;
          letter-spacing: -0.068em;
          font-weight: 820;
        }

        .pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .pillar,
        .step {
          background: #fff;
          border: 1px solid #e5e5ea;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.04);
        }

        .pillar h3 {
          margin: 0 0 10px;
          color: #1d1d1f;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .pillar p {
          margin: 0;
          color: #6e6e73;
          font-size: 15px;
          line-height: 1.5;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .step {
          min-height: 132px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .step span {
          color: #0071e3;
          font-size: 13px;
          font-weight: 820;
        }

        .step strong {
          color: #1d1d1f;
          font-size: 19px;
          line-height: 1.25;
          letter-spacing: -0.04em;
        }

        .trustPanel {
          max-width: 1124px;
          margin: 42px auto 70px;
          padding: 46px;
          border-radius: 38px;
          background: #fff;
          border: 1px solid #e5e5ea;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.06);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 28px;
          align-items: center;
        }

        .trustPanel p {
          max-width: 620px;
          margin: 16px 0 0;
          color: #6e6e73;
          font-size: 16px;
          line-height: 1.55;
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

        .footerBrand {
          color: #1d1d1f;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .footer p {
          margin: 0;
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
            padding-top: 58px;
          }

          .announcement {
            justify-self: start;
          }

          .pillars,
          .steps,
          .trustPanel {
            grid-template-columns: 1fr;
          }

          .topLinks a:first-child {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .blueInner,
          .hero,
          .section,
          .introStrip,
          .footer {
            padding-left: 18px;
            padding-right: 18px;
          }

          .blueInner {
            height: 60px;
          }

          .accountLink {
            display: none;
          }

          h1 {
            font-size: 43px;
          }

          .heroCopy p {
            font-size: 17px;
          }

          .announcement {
            width: 100%;
          }

          .announcementInfo {
            grid-template-columns: 1fr;
          }

          .trustPanel {
            margin-left: 18px;
            margin-right: 18px;
            padding: 28px;
            border-radius: 28px;
          }

          .footer {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
