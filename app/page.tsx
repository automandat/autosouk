"use client";

import Link from "next/link";

const pillars = [
  {
    title: "Annonce guidée",
    text: "Un parcours clair pour préparer une annonce structurée, complète et simple à comprendre."
  },
  {
    title: "Prix mieux positionné",
    text: "Un repère marché vous aide à fixer un prix cohérent et plus rassurant pour les acheteurs."
  },
  {
    title: "Dossier plus crédible",
    text: "Photos, état, historique et documents utiles sont mis en avant avec une présentation propre."
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
      <header
        className="blueBar"
        style={{
          height: "80px",
          background: "#2f5bea",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 10px 28px rgba(47,91,234,.16)",
          borderBottom: "1px solid rgba(255,255,255,.18)"
        }}
      >
        <div
          className="blueInner"
          style={{
            height: "80px",
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "0 28px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <div />

          <Link
            href="/"
            className="centerHeaderLogo"
            aria-label="Accueil AutoSouk"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80px",
              lineHeight: 0,
              textDecoration: "none"
            }}
          >
            <img
              src="/autosouk-logo-header.svg.png"
              alt="AutoSouk - Le prix, le bon, pour tous !"
              style={{
                height: "60px",
                maxHeight: "60px",
                width: "auto",
                maxWidth: "360px",
                objectFit: "contain",
                display: "block"
              }}
            />
          </Link>

          <div
            className="headerRight"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0
            }}
          >
            <Link
              href="/espace"
              className="accountPill"
              style={{
                minHeight: "40px",
                padding: "0 18px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                background: "#ffffff",
                color: "#2f5bea",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,.72)",
                boxShadow: "0 10px 24px rgba(0,35,110,.14)",
                fontSize: "14px",
                fontWeight: 750,
                letterSpacing: "-.01em",
                whiteSpace: "nowrap"
              }}
            >
              Accéder à mon espace personnel
            </Link>
          </div>
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
              <b>210 000 – 225 000 DH</b>
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

      <section className="brandPanel" aria-label="Signature AutoSouk">
        <img src="/autosouk-logo-header.svg" alt="AutoSouk - Le prix, le bon, pour tous !" />
      </section>

      <section className="section">
        <div className="sectionTitle">
          <span>Pourquoi AutoSouk ?</span>
          <h2>Une annonce mieux préparée inspire plus confiance.</h2>
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
        <Link href="/" className="footerBrand">AutoSouk.</Link>
        <p>Le prix, le bon, pour tous !</p>
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
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(180deg, #2f5bea 0%, #2650d9 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 12px 34px rgba(20, 72, 180, 0.18);
        }

        .blueInner {
          max-width: 1180px;
          height: 76px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .headerLogo {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          text-decoration: none;
          color: #fff;
        }

        .logoMark {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
          background: #fff;
        }

        .brandTexts {
          display: grid;
          gap: 2px;
        }

        .brandLine {
          display: inline-flex;
          align-items: baseline;
          line-height: 0.92;
        }

        .brandAuto {
          color: rgba(255, 255, 255, 0.7);
          font-size: 30px;
          font-weight: 300;
          letter-spacing: -0.055em;
        }

        .brandSouk {
          color: #fff;
          font-size: 30px;
          font-weight: 850;
          letter-spacing: -0.058em;
        }

        .brandDot {
          color: #fff;
          font-size: 34px;
          font-weight: 950;
          margin-left: 1px;
          transform: translateY(-1px);
        }

        .brandSlogan {
          color: rgba(255, 255, 255, 0.72);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .accountPill {
          min-height: 42px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #fff;
          color: #2f5bea;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow: 0 10px 24px rgba(0, 35, 110, 0.14);
          font-size: 14px;
          font-weight: 750;
          letter-spacing: -0.01em;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }

        .accountPill:hover {
          transform: translateY(-1px);
          background: #f7fbff;
          box-shadow: 0 14px 28px rgba(0, 35, 110, 0.18);
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 92px 28px 58px;
          display: grid;
          grid-template-columns: minmax(0, 1.24fr) minmax(260px, 0.68fr);
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
          color: #2f5bea;
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
          background: #2f5bea;
          color: #fff;
          border: 1px solid #2f5bea;
        }

        .primaryButton:hover {
          background: #244ed8;
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
          width: min(100%, 300px);
          justify-self: end;
          background: #fff;
          border: 1px solid #e5e5ea;
          border-radius: 28px;
          padding: 18px;
          box-shadow: 0 22px 54px rgba(0, 0, 0, 0.07);
        }

        .announcementHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
        }

        .announcementHeader small {
          display: block;
          margin-bottom: 6px;
          color: #2f5bea;
          font-size: 11px;
          font-weight: 750;
        }

        .announcementHeader strong {
          display: block;
          color: #1d1d1f;
          font-size: 20px;
          line-height: 1.05;
          letter-spacing: -0.05em;
        }

        .announcementHeader p {
          margin: 6px 0 0;
          color: #6e6e73;
          font-size: 12px;
        }

        .announcementHeader span {
          width: 44px;
          height: 44px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #f0f4ff;
          color: #2f5bea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 820;
        }

        .vehicleVisual {
          position: relative;
          height: 118px;
          margin: 16px 0;
          border-radius: 22px;
          background: linear-gradient(180deg, #f8fafc, #edf2f7);
          overflow: hidden;
        }

        .carBody {
          position: absolute;
          left: 50%;
          top: 55%;
          width: 68%;
          height: 36px;
          transform: translate(-50%, -50%);
          border-radius: 60px 70px 24px 24px;
          background: linear-gradient(135deg, #1d1d1f, #3a3a3c);
        }

        .carBody:before {
          content: "";
          position: absolute;
          left: 24%;
          top: -23px;
          width: 38%;
          height: 28px;
          border-radius: 34px 34px 7px 7px;
          background: #3a3a3c;
          transform: skewX(-16deg);
        }

        .wheel {
          position: absolute;
          bottom: 31px;
          width: 20px;
          height: 20px;
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
          border-radius: 14px;
          padding: 10px;
        }

        .announcementInfo small {
          display: block;
          margin-bottom: 4px;
          color: #86868b;
          font-size: 10px;
        }

        .announcementInfo b {
          color: #1d1d1f;
          font-size: 11px;
          letter-spacing: -0.02em;
        }

        .badges {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .badges span {
          background: #f0f4ff;
          color: #2f5bea;
          border-radius: 999px;
          padding: 6px 8px;
          font-size: 11px;
          font-weight: 750;
        }

        .brandPanel {
          max-width: 620px;
          margin: 0 auto 18px;
          padding: 0 28px;
        }

        .brandPanel img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 34px;
          box-shadow: 0 22px 58px rgba(47, 91, 234, 0.14);
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
          color: #2f5bea;
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
          font-weight: 850;
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
        }

        @media (max-width: 640px) {
          .blueInner,
          .hero,
          .section,
          .brandPanel,
          .footer {
            padding-left: 18px;
            padding-right: 18px;
          }

          .blueInner {
            height: 64px;
          }

          .brandAuto,
          .brandSouk {
            font-size: 23px;
          }

          .brandDot {
            font-size: 27px;
          }

          .brandSlogan {
            display: none;
          }

          .logoMark {
            width: 36px;
            height: 36px;
          }

          .accountPill {
            min-height: 38px;
            padding: 0 12px;
            font-size: 12px;
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

        /* V5 - Centered logo in blue header */
        .blueBar {
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          background: #2f5bea !important;
          border-bottom: 1px solid rgba(255,255,255,.18) !important;
          box-shadow: 0 10px 28px rgba(47,91,234,.16) !important;
        }

        .blueInner {
          max-width: 1180px !important;
          height: 82px !important;
          margin: 0 auto !important;
          padding: 0 28px !important;
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          align-items: center !important;
          gap: 24px !important;
        }

        .headerSide {
          min-width: 0 !important;
        }

        .headerRight {
          display: flex !important;
          justify-content: flex-end !important;
          align-items: center !important;
        }

        .centerHeaderLogo {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          line-height: 0 !important;
        }

        .centerHeaderLogo img {
          display: block !important;
          height: 54px !important;
          width: auto !important;
          max-width: 360px !important;
          object-fit: contain !important;
        }

        .accountPill {
          min-height: 40px !important;
          padding: 0 18px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 999px !important;
          background: #ffffff !important;
          color: #2f5bea !important;
          text-decoration: none !important;
          border: 1px solid rgba(255,255,255,.72) !important;
          box-shadow: 0 10px 24px rgba(0,35,110,.14) !important;
          font-size: 14px !important;
          font-weight: 750 !important;
          letter-spacing: -.01em !important;
          white-space: nowrap !important;
        }

        .accountPill:hover {
          transform: translateY(-1px) !important;
          background: #f7fbff !important;
          box-shadow: 0 14px 28px rgba(0,35,110,.18) !important;
        }

        @media (max-width: 760px) {
          .blueInner {
            height: 72px !important;
            grid-template-columns: auto 1fr !important;
            padding: 0 18px !important;
          }

          .blueInner .headerSide:first-child {
            display: none !important;
          }

          .centerHeaderLogo {
            justify-content: flex-start !important;
          }

          .centerHeaderLogo img {
            height: 44px !important;
            max-width: 220px !important;
          }

          .accountPill {
            min-height: 36px !important;
            padding: 0 12px !important;
            font-size: 12px !important;
          }
        }

        @media (max-width: 520px) {
          .accountPill {
            display: none !important;
          }

          .blueInner {
            display: flex !important;
            justify-content: center !important;
          }

          .centerHeaderLogo {
            justify-content: center !important;
          }
        }


        /* V6 - Header logo fixed sizing */
        @media (max-width: 760px) {
          .blueBar,
          .blueInner {
            height: 70px !important;
          }

          .blueInner {
            grid-template-columns: auto 1fr !important;
            padding: 0 18px !important;
          }

          .blueInner > div:first-child {
            display: none !important;
          }

          .centerHeaderLogo {
            height: 70px !important;
            justify-content: flex-start !important;
          }

          .centerHeaderLogo img {
            height: 52px !important;
            max-height: 52px !important;
            max-width: 260px !important;
          }

          .accountPill {
            min-height: 36px !important;
            padding: 0 12px !important;
            font-size: 12px !important;
          }
        }

        @media (max-width: 520px) {
          .accountPill {
            display: none !important;
          }

          .blueInner {
            display: flex !important;
            justify-content: center !important;
          }

          .centerHeaderLogo {
            justify-content: center !important;
          }

          .centerHeaderLogo img {
            height: 52px !important;
            max-height: 52px !important;
            max-width: 280px !important;
          }
        }

      `}</style>
    </main>
  );
}
