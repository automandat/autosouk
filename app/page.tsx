"use client";

import Link from "next/link";

const proofPoints = [
  "Prix difficile à fixer",
  "Photos pas toujours valorisantes",
  "Acheteurs qui négocient sans base",
  "Informations éparpillées"
];

const pillars = [
  {
    title: "Un prix qui se défend",
    text: "Positionnez votre véhicule avec un repère marché clair, pour éviter de vendre trop bas ou d’afficher un prix irréaliste."
  },
  {
    title: "Une annonce qui donne confiance",
    text: "État, historique, photos et documents sont structurés pour répondre aux vraies questions des acheteurs."
  },
  {
    title: "Moins d’allers-retours inutiles",
    text: "Une annonce complète filtre mieux les curieux et facilite les échanges avec les acheteurs sérieux."
  }
];

const steps = [
  "Vous renseignez votre véhicule",
  "AutoSouk structure l’annonce",
  "Vous ajoutez les photos utiles",
  "Votre annonce est prête à être présentée"
];

const trustBadges = [
  "Prix cohérent",
  "Photos guidées",
  "Historique clair",
  "Annonce structurée",
  "Acheteurs rassurés"
];

export default function HomePage() {
  return (
    <main className="home">
      <header className="blueBar">
        <div className="blueInner">
          <div />
          <Link href="/" className="centerHeaderLogo" aria-label="Accueil AutoSouk">
            <img src="/autosouk-logo-header.svg.png" alt="AutoSouk - Le prix, le bon, pour tous !" />
          </Link>
          <div className="headerRight">
            <Link href="/espace" className="accountPill">Accéder à mon espace personnel</Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">Vente automobile accompagnée</span>
          <h1>Vendez votre voiture au bon prix, sans perdre votre temps.</h1>
          <p>
            AutoSouk transforme les informations de votre véhicule en une annonce claire,
            attractive et rassurante — prête à convaincre les bons acheteurs.
          </p>
          <div className="actions">
            <Link href="/mandat" className="primaryButton">Estimer et confier mon véhicule</Link>
            <a href="#service" className="secondaryButton">Comprendre le service</a>
          </div>
        </div>

        <aside className="announcement" aria-label="Aperçu d’une annonce AutoSouk">
          <div className="announcementHeader">
            <div>
              <small>Annonce prête</small>
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
            <div><small>Prix défendu</small><b>210 000 – 225 000 DH</b></div>
            <div><small>Dossier</small><b>Photos + historique</b></div>
          </div>
          <div className="badges">
            <span>Prix cohérent</span>
            <span>Acheteurs rassurés</span>
          </div>
        </aside>
      </section>

      <section className="promise">
        <h2>Une meilleure annonce. Un prix mieux défendu. Des acheteurs plus rassurés.</h2>
        <p>
          AutoSouk vous aide à présenter votre voiture comme elle le mérite :
          avec les bonnes informations, les bonnes photos et un prix cohérent.
        </p>
      </section>

      <section className="problem">
        <div className="problemCopy">
          <span>Le vrai problème</span>
          <h2>Vendre une voiture seul, c’est souvent compliqué.</h2>
          <p>
            Entre le prix, les photos, les négociations et les informations à fournir,
            une annonce mal préparée peut vite faire perdre du temps.
          </p>
        </div>
        <div className="problemGrid">
          {proofPoints.map((point) => (
            <div key={point} className="problemItem">
              <span />
              <strong>{point}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="service">
        <div className="sectionTitle">
          <span>La réponse AutoSouk</span>
          <h2>On vous guide. On structure. Vous gardez le contrôle.</h2>
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
          <h2>Une annonce propre change la perception de votre voiture.</h2>
          <p>
            Un véhicule bien présenté paraît plus fiable, plus sérieux et plus facile à acheter.
            AutoSouk vous aide à créer ce niveau de confiance dès la première lecture.
          </p>
          <div className="trustBadges">
            {trustBadges.map((badge) => <small key={badge}>{badge}</small>)}
          </div>
        </div>
      </section>

      <section className="finalCta">
        <h2>Prêt à vendre mieux ?</h2>
        <p>Commencez par renseigner votre véhicule. AutoSouk vous guide étape par étape.</p>
        <Link href="/mandat" className="primaryButton">Confier mon véhicule</Link>
      </section>

      <footer className="footer">
        <Link href="/" className="footerBrand">AutoSouk.</Link>
        <p>Le prix, le bon, pour tous !</p>
      </footer>

      <style jsx>{`
        .home,.home *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif!important}
        .home{min-height:100vh;background:#f5f5f7;color:#1d1d1f}
        .blueBar{height:80px;background:#2f5bea;position:sticky;top:0;z-index:50;box-shadow:0 10px 28px rgba(47,91,234,.16);border-bottom:1px solid rgba(255,255,255,.18)}
        .blueInner{height:80px;max-width:1180px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px}
        .centerHeaderLogo{display:flex;align-items:center;justify-content:center;height:80px;line-height:0;text-decoration:none}
        .centerHeaderLogo img{height:60px;max-height:60px;width:auto;max-width:360px;object-fit:contain;display:block}
        .headerRight{display:flex;justify-content:flex-end;align-items:center;min-width:0}
        .accountPill{min-height:40px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#fff;color:#2f5bea;text-decoration:none;border:1px solid rgba(255,255,255,.72);box-shadow:0 10px 24px rgba(0,35,110,.14);font-size:14px;font-weight:750;letter-spacing:-.01em;white-space:nowrap}
        .hero{max-width:1180px;margin:0 auto;padding:92px 28px 64px;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(260px,.65fr);gap:58px;align-items:center}
        .eyebrow,.sectionTitle span,.problemCopy span,.trustPanel span{display:inline-flex;width:max-content;border-radius:999px;background:#fff;border:1px solid #e5e5ea;color:#2f5bea;padding:7px 11px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.09em}
        h1{max-width:820px;margin:20px 0 18px;color:#1d1d1f;font-size:clamp(50px,6.3vw,82px);line-height:.95;letter-spacing:-.074em;font-weight:830}
        .heroCopy p{max-width:670px;margin:0;color:#6e6e73;font-size:20px;line-height:1.55;letter-spacing:-.018em}
        .actions{margin-top:32px;display:flex;gap:12px;flex-wrap:wrap}
        .primaryButton,.secondaryButton{min-height:48px;border-radius:999px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:15px;font-weight:750;transition:transform .18s ease,background .18s ease,border-color .18s ease}
        .primaryButton{background:#2f5bea;color:#fff;border:1px solid #2f5bea}.primaryButton:hover{background:#244ed8;transform:translateY(-1px)}
        .secondaryButton{background:#fff;color:#1d1d1f;border:1px solid #dcdce1}.secondaryButton:hover{border-color:#bfc0c6;transform:translateY(-1px)}
        .announcement{width:min(100%,300px);justify-self:end;background:#fff;border:1px solid #e5e5ea;border-radius:28px;padding:18px;box-shadow:0 22px 54px rgba(0,0,0,.07)}
        .announcementHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.announcementHeader small{display:block;margin-bottom:6px;color:#2f5bea;font-size:11px;font-weight:750}.announcementHeader strong{display:block;color:#1d1d1f;font-size:20px;line-height:1.05;letter-spacing:-.05em}.announcementHeader p{margin:6px 0 0;color:#6e6e73;font-size:12px}.announcementHeader span{width:44px;height:44px;flex:0 0 auto;border-radius:50%;background:#f0f4ff;color:#2f5bea;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:820}
        .vehicleVisual{position:relative;height:118px;margin:16px 0;border-radius:22px;background:linear-gradient(180deg,#f8fafc,#edf2f7);overflow:hidden}
        .carBody{position:absolute;left:50%;top:55%;width:68%;height:36px;transform:translate(-50%,-50%);border-radius:60px 70px 24px 24px;background:linear-gradient(135deg,#1d1d1f,#3a3a3c)}.carBody:before{content:"";position:absolute;left:24%;top:-23px;width:38%;height:28px;border-radius:34px 34px 7px 7px;background:#3a3a3c;transform:skewX(-16deg)}.wheel{position:absolute;bottom:31px;width:20px;height:20px;border-radius:50%;background:#111;border:5px solid #555}.wheelLeft{left:30%}.wheelRight{right:30%}
        .announcementInfo{display:grid;grid-template-columns:1fr 1fr;gap:8px}.announcementInfo div{background:#f5f5f7;border-radius:14px;padding:10px}.announcementInfo small{display:block;margin-bottom:4px;color:#86868b;font-size:10px}.announcementInfo b{color:#1d1d1f;font-size:11px;letter-spacing:-.02em}
        .badges,.trustBadges{margin-top:12px;display:flex;flex-wrap:wrap;gap:7px}.badges span,.trustBadges small{background:#f0f4ff;color:#2f5bea;border-radius:999px;padding:6px 8px;font-size:11px;font-weight:750}
        .promise{max-width:1124px;margin:0 auto 34px;padding:0 28px}.promise h2{margin:0;border-radius:36px;background:#fff;border:1px solid #e5e5ea;padding:34px;color:#1d1d1f;font-size:clamp(30px,4vw,54px);line-height:1;letter-spacing:-.066em;font-weight:820;box-shadow:0 18px 52px rgba(0,0,0,.05)}.promise p{max-width:720px;margin:18px 0 0;color:#6e6e73;font-size:17px;line-height:1.55}
        .problem,.section,.trustPanel,.finalCta{max-width:1180px;margin:0 auto;padding:62px 28px}.problem{display:grid;grid-template-columns:minmax(0,.9fr) minmax(320px,1.1fr);gap:34px;align-items:center}
        .problemCopy h2,.sectionTitle h2,.trustPanel h2,.finalCta h2{margin:14px 0 0;color:#1d1d1f;font-size:clamp(34px,4.8vw,58px);line-height:1;letter-spacing:-.068em;font-weight:820}
        .problemCopy p,.pillar p,.trustPanel p,.finalCta p{margin:16px 0 0;color:#6e6e73;font-size:16px;line-height:1.55}
        .problemGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.problemItem{min-height:120px;border-radius:26px;background:#fff;border:1px solid #e5e5ea;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 14px 36px rgba(0,0,0,.04)}.problemItem span{width:12px;height:12px;border-radius:50%;background:#2f5bea}.problemItem strong{color:#1d1d1f;font-size:18px;line-height:1.22;letter-spacing:-.04em}
        .sectionTitle{max-width:760px;margin-bottom:24px}.sectionTitle.center{margin-left:auto;margin-right:auto;text-align:center}.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.pillar,.step{background:#fff;border:1px solid #e5e5ea;border-radius:26px;padding:22px;box-shadow:0 14px 36px rgba(0,0,0,.04)}.pillar h3{margin:0 0 10px;color:#1d1d1f;font-size:20px;letter-spacing:-.04em}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.step{min-height:132px;display:flex;flex-direction:column;justify-content:space-between}.step span{color:#2f5bea;font-size:13px;font-weight:820}.step strong{color:#1d1d1f;font-size:19px;line-height:1.25;letter-spacing:-.04em}
        .trustPanel{padding-top:40px}.trustPanel>div{background:#fff;border:1px solid #e5e5ea;border-radius:38px;padding:44px;box-shadow:0 24px 70px rgba(0,0,0,.06)}.trustPanel p{max-width:720px}
        .finalCta{text-align:center;padding-top:36px;padding-bottom:78px}.finalCta p{max-width:560px;margin-left:auto;margin-right:auto;margin-bottom:24px}
        .footer{max-width:1180px;margin:0 auto;padding:28px;border-top:1px solid #e5e5ea;display:flex;justify-content:space-between;gap:20px;color:#86868b}.footerBrand{color:#1d1d1f;text-decoration:none;font-weight:850;letter-spacing:-.04em}.footer p{margin:0}
        @media(max-width:980px){.hero,.problem{grid-template-columns:1fr;padding-top:58px}.announcement{justify-self:start}.pillars,.steps{grid-template-columns:1fr}}
        @media(max-width:760px){.blueBar,.blueInner{height:70px!important}.blueInner{grid-template-columns:auto 1fr!important;padding:0 18px!important}.blueInner>div:first-child{display:none!important}.centerHeaderLogo{height:70px!important;justify-content:flex-start!important}.centerHeaderLogo img{height:52px!important;max-height:52px!important;max-width:260px!important}.accountPill{min-height:36px!important;padding:0 12px!important;font-size:12px!important}}
        @media(max-width:640px){.hero,.problem,.section,.promise,.trustPanel,.finalCta,.footer{padding-left:18px;padding-right:18px}h1{font-size:43px}.heroCopy p{font-size:17px}.announcement{width:100%}.announcementInfo,.problemGrid{grid-template-columns:1fr}.trustPanel>div{padding:28px;border-radius:28px}.footer{flex-direction:column}}
        @media(max-width:520px){.accountPill{display:none!important}.blueInner{display:flex!important;justify-content:center!important}.centerHeaderLogo{justify-content:center!important}.centerHeaderLogo img{height:52px!important;max-height:52px!important;max-width:280px!important}}
      `}</style>
    </main>
  );
}
