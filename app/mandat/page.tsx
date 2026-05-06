"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type PhotoItem = {
  label: string;
  image: string;
  instruction: string;
  multiple: boolean;
};

const CITIES = [
  "Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan","Safi","Mohammedia","El Jadida","Béni Mellal","Nador","Khouribga","Settat","Taza","Larache","Ksar El Kébir","Khemisset","Guelmim","Berrechid","Wad Zem","Fquih Ben Salah","Taourirt","Berkane","Sidi Slimane","Errachidia","Guercif","Ouarzazate","Tiznit","Taroudant","Essaouira","Al Hoceïma","Chefchaouen","Sidi Kacem","Youssoufia","Tan-Tan","Dakhla","Laâyoune","Boujdour","Ifrane","Azrou","Midelt","Zagora","Tinghir","Skhirat","Temara","Salé","Bouskoura","Nouaceur","Mediouna","Dar Bouazza","Autre"
];

const MOROCCAN_REGISTRATION_CITIES = [
  "1 - Rabat",
  "2 - Salé",
  "3 - Sala Al Jadida",
  "4 - Skhirat-Témara",
  "5 - Khémisset",
  "6 - Casablanca - Anfa",
  "7 - Casablanca - Aïn Sebaâ - Hay Mohammadi",
  "8 - Casablanca - Hay Hassani",
  "9 - Casablanca - Ben M’Sick",
  "10 - Casablanca - My Rachid",
  "11 - Casablanca - Al Fida",
  "12 - Casablanca - Mechouar",
  "13 - Casablanca - Sidi Bernoussi",
  "14 - Mohammédia",
  "15 - Fès - Jdid",
  "16 - Fès - Medina",
  "17 - Fès - Zouagha Moulay Yacoub",
  "18 - Sefrou",
  "19 - Boulemane",
  "20 - Meknès - Menzah",
  "21 - Meknès - Ismailia",
  "22 - El Hajeb",
  "23 - Ifrane",
  "24 - Khénifra",
  "25 - Errachidia",
  "26 - Marrakech - Menara",
  "27 - Marrakech - Medina",
  "28 - Marrakech - Sidi Youssef Ben Ali",
  "29 - Marrakech - El Haouz",
  "30 - Chichaoua",
  "31 - Kelâat Es-Sraghna",
  "32 - Essaouira",
  "33 - Agadir - Ida Ouatanane",
  "34 - Inezgane - Aït Melloul",
  "35 - Chtouka - Aït Baha",
  "36 - Taroudant",
  "37 - Tiznit",
  "38 - Ouarzazate",
  "39 - Zagora",
  "40 - Tanger - Asilah",
  "41 - Tanger - Fahs Anjra",
  "42 - Larache - Ksar El Kébir",
  "43 - Chefchaouen",
  "44 - Tétouan",
  "45 - El Hoceima",
  "46 - Taza",
  "47 - Taounate",
  "48 - Oujda-Angad",
  "49 - Berkane",
  "50 - Nador",
  "51 - Taourirt",
  "52 - Jerada",
  "53 - Figuig",
  "54 - Safi",
  "55 - El Jadida",
  "56 - Settat",
  "57 - Khouribga",
  "58 - Bouznika - Benslimane",
  "59 - Kénitra",
  "60 - Sidi Kacem",
  "61 - Beni Mellal",
  "62 - Azilal",
  "63 - Smara",
  "64 - Guelmim",
  "65 - Tan-Tan",
  "66 - Tata",
  "67 - Assa-Zag",
  "68 - Laâyoune",
  "69 - Boujdour",
  "70 - Oued Ed-Dahab",
  "71 - Aousserd",
  "72 - Casablanca - Aïn Chock",
  "73 - Nouaceur",
  "74 - Médiouna",
  "75 - M’diq, Fnideq",
  "76 - Driouch",
  "77 - Guercif",
  "78 - Ouezzane",
  "79 - Sidi Slimane",
  "80 - Midelt",
  "81 - Berrechid",
  "82 - Sidi Bennour",
  "83 - Benguerir",
  "84 - Fquih Ben Salah",
  "85 - Youssoufia",
  "86 - Tinghir",
  "87 - Sidi Ifni",
  "88 - Tarfaya",
  "89 - Lagouira",
  "Autre"
];

const COUNTRIES = [
  "France","Espagne","Belgique","Allemagne","Italie","Pays-Bas","Portugal","Suisse","Royaume-Uni","Luxembourg",
  "États-Unis","Canada","Émirats Arabes Unis","Arabie Saoudite","Qatar","Turquie","Chine","Japon","Corée du Sud",
  "Algérie","Tunisie","Égypte","Sénégal","Côte d’Ivoire","Mauritanie","Autre"
];

const MODELS: Record<string, string[]> = {
  "Abarth":["500","595","695","124 Spider","Autre"],
  "Alfa Romeo":["Giulia","Giulietta","MiTo","Stelvio","Tonale","Autre"],
  "Audi":["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8","TT","e-tron","Autre"],
  "BAIC":["X35","X55","X7","BJ40","BJ60","EU5","Autre"],
  "BMW":["Série 1","Série 2","Série 3","Série 4","Série 5","Série 7","X1","X2","X3","X4","X5","X6","X7","i3","i4","iX","Autre"],
  "BYD":["Atto 3","Dolphin","Seal","Seal U","Tang","Han","Song Plus","Qin Plus","Autre"],
  "Changan":["Alsvin","Eado","CS35 Plus","CS55 Plus","CS75 Plus","UNI-K","UNI-T","Deepal S07","Autre"],
  "Chery":["Tiggo 2 Pro","Tiggo 4 Pro","Tiggo 7 Pro","Tiggo 8 Pro","Arrizo 5","Arrizo 6","Autre"],
  "Citroën":["C1","C3","C3 Aircross","C4","C5 Aircross","Berlingo","Autre"],
  "Cupra":["Born","Formentor","Leon","Ateca","Tavascan","Terramar","Autre"],
  "Dacia":["Dokker","Duster","Jogger","Lodgy","Logan","Sandero","Sandero Stepway","Spring","Autre"],
  "DFSK":["K01","K05","K07","C31","C32","Glory 500","Glory 580","Fengon 500","Fengon 580","Autre"],
  "Dongfeng":["Aeolus Shine","Aeolus AX7","Forthing T5 Evo","Forthing U-Tour","M-Hero 917","Autre"],
  "DS Automobiles":["DS 3","DS 4","DS 7","DS 9","Autre"],
  "Fiat":["500","500X","Doblo","Fiorino","Panda","Punto","Tipo","Autre"],
  "Ford":["EcoSport","Fiesta","Focus","Kuga","Mondeo","Mustang","Puma","Ranger","Transit","Autre"],
  "Geely":["Coolray","Azkarra","Atlas","Emgrand","Geometry C","Starray","Okavango","Autre"],
  "GWM":["Haval H6","Haval Jolion","Tank 300","Tank 500","Ora 03","Poer","Autre"],
  "Honda":["Accord","Civic","CR-V","HR-V","Jazz","Autre"],
  "Hyundai":["Accent","Atos","Creta","Elantra","i10","i20","i30","Kona","Santa Fe","Tucson","Venue","Autre"],
  "JAC":["JS2","JS3","JS4","JS6","S2","S3","T8","T9","E10X","Autre"],
  "Jaecoo":["J7","J8","Autre"],
  "Jaguar":["XE","XF","F-Pace","E-Pace","I-Pace","F-Type","Autre"],
  "Jeep":["Compass","Grand Cherokee","Renegade","Wrangler","Cherokee","Autre"],
  "Jetour":["X70","X70 Plus","X90 Plus","Dashing","T2","Autre"],
  "KGM":["Tivoli","Korando","Torres","Rexton","Musso","Autre"],
  "Kia":["Ceed","Cerato","Picanto","Rio","Seltos","Sorento","Sportage","Stonic","Autre"],
  "Land Rover":["Defender","Discovery","Discovery Sport","Range Rover","Range Rover Evoque","Range Rover Sport","Velar","Autre"],
  "Leapmotor":["T03","C10","C11","C01","Autre"],
  "Lexus":["CT","IS","ES","GS","LS","UX","NX","RX","LX","LC","Autre"],
  "Lynk & Co":["01","02","03","05","06","07","08","09","Autre"],
  "Mahindra":["KUV100","XUV300","XUV500","XUV700","Scorpio","Thar","Pick Up","Autre"],
  "Maserati":["Ghibli","Quattroporte","Levante","Grecale","GranTurismo","MC20","Autre"],
  "Mazda":["2","3","6","CX-3","CX-30","CX-5","MX-5","Autre"],
  "Mercedes-Benz":["Classe A","Classe B","Classe C","Classe CLA","Classe E","Classe GLA","Classe GLB","Classe GLC","Classe GLE","Classe GLS","Classe S","Classe V","Vito","Autre"],
  "MG":["MG3","MG4","MG5","ZS","HS","EHS","Marvel R","Cyberster","Autre"],
  "Mini":["Cooper","Countryman","Clubman","Autre"],
  "Mitsubishi":["Space Star","ASX","Eclipse Cross","Outlander","L200","Pajero Sport","Autre"],
  "Nissan":["Juke","Micra","Navara","Qashqai","X-Trail","Note","Autre"],
  "Omoda":["C5","E5","Autre"],
  "Opel":["Astra","Corsa","Crossland","Grandland","Mokka","Insignia","Autre"],
  "Peugeot":["108","2008","208","3008","301","308","5008","508","Partner","Rifter","Autre"],
  "Porsche":["911","Cayenne","Macan","Panamera","Taycan","Boxster","Cayman","Autre"],
  "Renault":["Arkana","Captur","Clio","Kadjar","Kangoo","Koleos","Megane","Scenic","Symbol","Talisman","Twingo","Trafic","Autre"],
  "Seat":["Arona","Ateca","Ibiza","Leon","Tarraco","Autre"],
  "Seres":["3","5","7","Autre"],
  "Skoda":["Fabia","Kamiq","Karoq","Kodiaq","Octavia","Rapid","Scala","Superb","Autre"],
  "Smart":["Fortwo","Forfour","#1","#3","Autre"],
  "Suzuki":["Alto","Baleno","Celerio","Jimny","S-Cross","Swift","Vitara","Autre"],
  "Tesla":["Model 3","Model S","Model X","Model Y","Autre"],
  "Toyota":["Auris","Avensis","C-HR","Camry","Corolla","Hilux","Land Cruiser","Prado","RAV4","Yaris","Yaris Cross","Autre"],
  "Volkswagen":["Arteon","Caddy","Golf","Golf VII","Golf VIII","Jetta","Passat","Polo","T-Cross","T-Roc","Tiguan","Touareg","Touran","Autre"],
  "Volvo":["S60","S90","V40","V60","XC40","XC60","XC90","Autre"],
  "Xpeng":["G6","G9","P7","P7i","Autre"],
  "Zeekr":["001","007","X","7X","009","Autre"],
  "Autre":["Autre"]
};

const ENGINES: Record<string, string[]> = {
  "Mercedes-Benz|Classe C":["C180","C200","C220d","C250","C300","C300e","C350e","C43 AMG","C63 AMG","Autre"],
  "Mercedes-Benz|Classe E":["E200","E220d","E300","E300e","E350e","E400d","E450","E53 AMG","E63 AMG","Autre"],
  "Mercedes-Benz|Classe GLC":["GLC200","GLC220d","GLC300","GLC300e","GLC350e","GLC43 AMG","GLC63 AMG","Autre"],
  "BMW|Série 3":["316i","316d","318i","318d","320i","320d","325d","328i","330i","330d","330e","335i","335d","M340i","M3","Autre"],
  "BMW|Série 5":["518d","520i","520d","523i","525i","525d","528i","530i","530d","530e","535i","535d","540i","545e","M550d","M550i","M5","Autre"],
  "Audi|A3":["30 TFSI","35 TFSI","35 TDI","40 TFSI","40 TDI","45 TFSI e","S3","RS3","Autre"],
  "Audi|A4":["35 TFSI","35 TDI","40 TFSI","40 TDI","45 TFSI","S4","RS4","Autre"],
  "Dacia|Logan":["1.0 SCe","1.0 TCe","1.2 16V","1.5 dCi","1.6 MPI","ECO-G","Autre"],
  "Dacia|Duster":["1.0 TCe","1.2 TCe","1.3 TCe","1.5 dCi","1.6 SCe","ECO-G","Autre"],
  "Peugeot|208":["1.2 PureTech","1.5 BlueHDi","e-208","GTi","Autre"],
  "Peugeot|3008":["1.2 PureTech","1.6 PureTech","1.5 BlueHDi","2.0 BlueHDi","Hybrid 225","Hybrid4 300","Autre"],
  "Volkswagen|Golf":["1.0 TSI","1.2 TSI","1.4 TSI","1.5 TSI","1.6 TDI","2.0 TDI","GTE","GTI","GTD","R","Autre"],
  "Renault|Clio":["0.9 TCe","1.0 SCe","1.0 TCe","1.2 16V","1.3 TCe","1.5 dCi","E-Tech Hybrid","RS","Autre"],
  "Toyota|Yaris":["1.0 VVT-i","1.3 VVT-i","1.5 VVT-i","Hybrid","GR Yaris","Autre"],
  "Hyundai|Tucson":["1.6 GDi","1.6 T-GDi","1.6 CRDi","2.0 CRDi","Hybrid","Plug-in Hybrid","Autre"],
  "Kia|Sportage":["1.6 GDi","1.6 T-GDi","1.6 CRDi","2.0 CRDi","Hybrid","Plug-in Hybrid","Autre"],
  "Lynk & Co|01":["1.5 PHEV","2.0 T","Hybrid","Autre"],
  "Lynk & Co|02":["1.5 T","2.0 T","Autre"],
  "Lynk & Co|03":["1.5 T","2.0 T","03+","Autre"],
  "Lynk & Co|05":["2.0 T","Autre"],
  "Lynk & Co|06":["1.5 T","Hybrid","Autre"],
  "Lynk & Co|08":["EM-P","Autre"],
  "BMW|Série 1":["116i","118i","120i","125i","M135i","M140i","116d","118d","120d","123d","125d","Autre"],
  "BMW|Série 2":["218i","220i","225i","230i","M235i","M240i","216d","218d","220d","225d","225e","Autre"],
  "BMW|Série 4":["420i","430i","440i","M440i","420d","430d","435d","M4","Autre"],
  "BMW|Série 7":["730d","740d","740i","745e","750i","760i","i7 eDrive50","i7 xDrive60","i7 M70","Autre"],
  "BMW|X1":["16d","18i","18d","20i","20d","23i","23d","25e","30e","M35i","iX1 eDrive20","iX1 xDrive30","Autre"],
  "BMW|X3":["20i","20d","30i","30d","30e","40i","M40d","M40i","X3 M","Autre"],
  "BMW|X5":["30d","40d","40i","45e","50e","M50d","M50i","X5 M","Autre"],
  "Audi|A1":["25 TFSI","30 TFSI","35 TFSI","40 TFSI","Autre"],
  "Audi|A5":["35 TFSI","40 TFSI","45 TFSI","35 TDI","40 TDI","S5","RS5","Autre"],
  "Audi|A6":["40 TDI","45 TDI","50 TDI","55 TFSI","50 TFSI e","55 TFSI e","S6","RS6","Autre"],
  "Audi|Q2":["30 TFSI","35 TFSI","30 TDI","35 TDI","SQ2","Autre"],
  "Audi|Q3":["35 TFSI","40 TFSI","45 TFSI","35 TDI","40 TDI","45 TFSI e","RS Q3","Autre"],
  "Audi|Q5":["40 TDI","45 TFSI","50 TDI","50 TFSI e","55 TFSI e","SQ5","Autre"],
  "Audi|Q7":["45 TDI","50 TDI","55 TFSI","55 TFSI e","60 TFSI e","SQ7","Autre"],
  "Audi|Q8":["45 TDI","50 TDI","55 TFSI","55 TFSI e","60 TFSI e","SQ8","RS Q8","Autre"],
  "Mercedes-Benz|Classe A":["A160","A180","A200","A220","A250","A250e","A180d","A200d","A220d","A35 AMG","A45 AMG","Autre"],
  "Mercedes-Benz|Classe B":["B160","B180","B200","B220","B250","B250e","B180d","B200d","B220d","Autre"],
  "Mercedes-Benz|Classe CLA":["CLA180","CLA200","CLA220","CLA250","CLA250e","CLA180d","CLA200d","CLA220d","CLA35 AMG","CLA45 AMG","Autre"],
  "Mercedes-Benz|Classe GLA":["GLA180","GLA200","GLA220","GLA250","GLA250e","GLA180d","GLA200d","GLA220d","GLA35 AMG","GLA45 AMG","Autre"],
  "Mercedes-Benz|Classe GLB":["GLB180","GLB200","GLB220","GLB250","GLB180d","GLB200d","GLB220d","GLB35 AMG","Autre"],
  "Mercedes-Benz|Classe GLE":["GLE300d","GLE350d","GLE350de","GLE400d","GLE450","GLE450e","GLE53 AMG","GLE63 AMG","Autre"],
  "Volkswagen|Polo":["1.0 MPI","1.0 TSI","1.2 TSI","1.4 TSI","1.6 MPI","1.4 TDI","1.6 TDI","GTI","Autre"],
  "Volkswagen|Passat":["1.4 TSI","1.5 TSI","1.8 TSI","2.0 TSI","1.6 TDI","2.0 TDI","GTE","Alltrack 2.0 TDI","Autre"],
  "Volkswagen|Tiguan":["1.4 TSI","1.5 TSI","2.0 TSI","2.0 TDI","eHybrid","R","Autre"],
  "Volkswagen|T-Roc":["1.0 TSI","1.5 TSI","2.0 TSI","1.6 TDI","2.0 TDI","R","Autre"],
  "Volkswagen|Touareg":["3.0 V6 TDI","3.0 V6 TSI","eHybrid","R eHybrid","Autre"],
  "Peugeot|2008":["1.2 PureTech 100","1.2 PureTech 130","1.2 PureTech 155","1.5 BlueHDi 100","1.5 BlueHDi 130","e-2008","Autre"],
  "Peugeot|308":["1.2 PureTech 110","1.2 PureTech 130","1.5 BlueHDi 130","Hybrid 180","Hybrid 225","e-308","Autre"],
  "Peugeot|5008":["1.2 PureTech 130","1.6 PureTech 180","1.5 BlueHDi 130","2.0 BlueHDi 180","Hybrid 136","Autre"],
  "Peugeot|508":["1.2 PureTech 130","1.6 PureTech 180","1.6 PureTech 225","1.5 BlueHDi 130","2.0 BlueHDi 160","2.0 BlueHDi 180","Hybrid 225","PSE 360","Autre"],
  "Renault|Captur":["0.9 TCe","1.0 TCe","1.2 TCe","1.3 TCe","1.5 dCi","E-Tech Hybrid","E-Tech Plug-in Hybrid","Autre"],
  "Renault|Megane":["1.2 TCe","1.3 TCe","1.5 dCi","1.6 dCi","2.0 dCi","E-Tech Plug-in Hybrid","R.S.","Autre"],
  "Renault|Kadjar":["1.2 TCe","1.3 TCe","1.5 dCi","1.6 dCi","Autre"],
  "Renault|Koleos":["1.6 dCi","2.0 dCi","2.5 SCe","Autre"],
  "Dacia|Sandero":["1.0 SCe","1.0 TCe","1.2 16V","1.5 dCi","ECO-G","Stepway TCe","Autre"],
  "Dacia|Sandero Stepway":["1.0 TCe","1.0 ECO-G","1.5 dCi","Autre"],
  "Dacia|Jogger":["1.0 TCe","1.0 ECO-G","Hybrid 140","Autre"],
  "Toyota|Corolla":["1.2 Turbo","1.6 VVT-i","1.8 Hybrid","2.0 Hybrid","Autre"],
  "Toyota|C-HR":["1.2 Turbo","1.8 Hybrid","2.0 Hybrid","2.0 Plug-in Hybrid","Autre"],
  "Toyota|RAV4":["2.0 VVT-i","2.5 Hybrid","2.5 Plug-in Hybrid","Autre"],
  "Toyota|Land Cruiser":["2.8 D-4D","3.0 D-4D","4.0 V6","Autre"],
  "Hyundai|i10":["1.0 MPI","1.2 MPI","Autre"],
  "Hyundai|i20":["1.0 T-GDi","1.2 MPI","1.4 MPI","1.4 CRDi","Autre"],
  "Hyundai|Kona":["1.0 T-GDi","1.6 T-GDi","1.6 CRDi","Hybrid","Electric 39 kWh","Electric 64 kWh","Autre"],
  "Kia|Picanto":["1.0 MPI","1.2 MPI","Autre"],
  "Kia|Rio":["1.0 T-GDi","1.2 MPI","1.4 MPI","1.4 CRDi","Autre"],
  "Kia|Stonic":["1.0 T-GDi","1.2 MPI","1.4 MPI","1.6 CRDi","Autre"],
  "Ford|Fiesta":["1.0 EcoBoost","1.1 Ti-VCT","1.5 TDCi","ST 1.5 EcoBoost","Autre"],
  "Ford|Focus":["1.0 EcoBoost","1.5 EcoBoost","2.0 EcoBlue","1.5 EcoBlue","ST 2.3 EcoBoost","Autre"],
  "Ford|Kuga":["1.5 EcoBoost","1.5 EcoBlue","2.0 EcoBlue","Hybrid","Plug-in Hybrid","Autre"],
  "Nissan|Qashqai":["1.2 DIG-T","1.3 DIG-T","1.5 dCi","1.6 dCi","e-Power","Autre"],
  "Nissan|Juke":["1.0 DIG-T","1.2 DIG-T","1.5 dCi","Hybrid","Autre"],
  "Citroën|C3":["1.2 PureTech","1.5 BlueHDi","Autre"],
  "Citroën|C4":["1.2 PureTech","1.5 BlueHDi","Hybrid 136","ë-C4","Autre"],
  "Citroën|C5 Aircross":["1.2 PureTech","1.5 BlueHDi","Hybrid 180","Hybrid 225","Autre"],
  "Opel|Corsa":["1.2","1.2 Turbo","1.5 Diesel","Corsa-e","Autre"],
  "Opel|Mokka":["1.2 Turbo","1.5 Diesel","Mokka-e","Autre"],
  "Skoda|Octavia":["1.0 TSI","1.4 TSI","1.5 TSI","2.0 TSI","1.6 TDI","2.0 TDI","iV","RS","Autre"],
  "Seat|Leon":["1.0 TSI","1.4 TSI","1.5 TSI","2.0 TSI","1.6 TDI","2.0 TDI","eHybrid","FR","Cupra","Autre"],
  "Cupra|Formentor":["1.5 TSI","2.0 TSI","2.0 TSI VZ","1.4 e-Hybrid","VZ5","Autre"],
  "Volvo|XC40":["T2","T3","T4","T5","B3","B4","B5","Recharge T4","Recharge Twin","Autre"],
  "Volvo|XC60":["D4","D5","B4","B5","B6","T5","T6","T8 Recharge","Autre"],
  "Porsche|Cayenne":["Cayenne","Cayenne S","Cayenne E-Hybrid","Cayenne Turbo","Cayenne Turbo S E-Hybrid","Autre"],
  "Porsche|Macan":["Macan","Macan S","Macan GTS","Macan Turbo","Autre"],
  "Tesla|Model 3":["Propulsion","Grande Autonomie","Performance","Autre"],
  "Tesla|Model Y":["Propulsion","Grande Autonomie","Performance","Autre"],
  "BYD|Atto 3":["Comfort","Design","Autre"],
  "BYD|Dolphin":["Active","Boost","Comfort","Design","Autre"],
  "BYD|Seal":["Design","Excellence AWD","Autre"],
  "MG|ZS":["1.5 VTi-tech","1.0 T-GDI","ZS EV","Autre"],
  "MG|HS":["1.5 T-GDI","EHS Plug-in Hybrid","Autre"],
  "MG|MG4":["Standard","Comfort","Luxury","XPower","Autre"]
};

const DEFAULT_ENGINES = ["Autre"];
const BRANDS = Object.keys(MODELS).sort();
const YEARS = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => String(new Date().getFullYear() - i));
const MILEAGES = ["< 1 000 km", ...Array.from({ length: 199 }, (_, i) => `> ${(i + 1) * 1000} km`), "> 200 000 km"];
const VEHICLE_TYPES = ["Cabriolet/Roadster","SUV / Tout-terrain / Pickup","Citadine","Break","Berline","Sport / Coupé","Monospace / Minibus","Utilitaire","Autre"];
const BODY_COLORS = ["Beige","Bleu","Brun","Jaune","Or","Vert","Gris","Orange","Rouge","Noir","Argent","Violet","Blanc","Mat","Métallique"];
const INTERIOR_COLORS = ["Beige","Noir","Bleu","Brun","Gris","Rouge","Autres"];
const INTERIOR_MATERIALS = ["Alcantara","Tissu","Imitation cuir","Cuir partiel","Tout cuir","Velours","Autres"];

const EXTERIOR_OPTIONS = ["Jantes alliage","Pack sport","Pack chrome","Phares LED","Phares Matrix LED","Phares xénon","Feux de jour LED","Phares antibrouillard","Attelage fixe","Attelage pivotant","Barres de toit","Vitres arrière surteintées"];
const COMFORT_OPTIONS = ["Climatisation automatique","Climatisation bi-zone","Sièges chauffants","Sièges ventilés","Sièges électriques","Mémoire de siège","Volant chauffant","Volant multifonction","Accès sans clé","Démarrage sans clé","Hayon électrique","Vitres teintées","Toit ouvrant","Toit panoramique","Toit panoramique ouvrant","Suspension adaptative","Régulateur de vitesse","Régulateur adaptatif"];
const INFOTAINMENT_OPTIONS = ["Apple CarPlay","Android Auto","Navigation GPS","Écran tactile","Cockpit numérique","Affichage tête haute","Bluetooth","Chargeur induction","USB arrière","Système audio premium","Burmester","Harman Kardon","Bose","TV","WLAN / Wi-Fi"];
const SAFETY_OPTIONS = ["ABS","ESP","Airbags frontaux","Airbags latéraux","Freinage d’urgence","Détecteur angle mort","Aide maintien de voie","Assistant feux de route","Contrôle pression pneus","Alerte franchissement ligne","Reconnaissance panneaux","Appel d’urgence","Caméra 360°","Caméra de recul","Radars avant","Radars arrière","Park Assist"];

const PHOTOS: PhotoItem[] = [
  { label: "Arrière", image: "/photo-guides/arriere.png", instruction: "Arrière complet du véhicule", multiple: false },
  { label: "Avant", image: "/photo-guides/avant.png", instruction: "Avant complet du véhicule", multiple: false },
  { label: "Coffre", image: "/photo-guides/coffre.png", instruction: "Coffre ouvert, volume visible", multiple: false },
  { label: "Compteur kilométrique", image: "/photo-guides/compteur-kilometrique.png", instruction: "Kilométrage net et lisible", multiple: false },
  { label: "Jantes", image: "/photo-guides/jantes.png", instruction: "Jante et état du pneu visibles", multiple: false },
  { label: "Moteur", image: "/photo-guides/moteur.png", instruction: "Capot ouvert, moteur visible", multiple: false },
  { label: "Profil droit", image: "/photo-guides/profil-droit.png", instruction: "Côté droit complet, roues incluses", multiple: false },
  { label: "Profil gauche", image: "/photo-guides/profil-gauche.png", instruction: "Côté gauche complet, roues incluses", multiple: false },
  { label: "Siège conducteur", image: "/photo-guides/siege-conducteur.png", instruction: "Siège conducteur et commandes visibles", multiple: false },
  { label: "Siège passager", image: "/photo-guides/siege-passager.png", instruction: "Siège passager visible", multiple: false },
  { label: "Sièges arrières", image: "/photo-guides/sieges-arrieres.png", instruction: "Banquette arrière entière visible", multiple: false },
  { label: "Tableau de bord", image: "/photo-guides/tableau-de-bord.png", instruction: "Volant, écran et console visibles", multiple: false },
  { label: "Défauts constatés", image: "/photo-guides/defauts.png", instruction: "Toutes les photos nécessaires des défauts", multiple: true }
];

const STEPS = ["Vendeur","Véhicule","Technique","Design & options","Prix","Photos","Confiance","Aperçu"];
const MARKET_PRICES = [104000,108000,109000,112000,115000,117000,118000,121000,123000,125000,128000,131000,135000,139000,142000,148000,152000,158000];

const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  "Lynk & Co": "/brands/lynk-&-co.png",
  "DS Automobiles": "/brands/ds-automobiles.png",
  "Mercedes-Benz": "/brands/mercedes-benz.png",
  "Land Rover": "/brands/land-rover.png",
  "Alfa Romeo": "/brands/alfa-romeo.png"
};

function getBrandLogo(brand: string) {
  if (!brand) return null;
  if (BRAND_LOGO_OVERRIDES[brand]) return BRAND_LOGO_OVERRIDES[brand];
  const normalized = brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `/brands/${normalized}.png`;
}

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
  return Array.from({ length: buckets }, (_, i) => {
    const low = min + i * step;
    const high = i === buckets - 1 ? max : low + step;
    const count = values.filter(v => i === buckets - 1 ? v >= low && v <= high : v >= low && v < high).length;
    return { low, high, pct: Math.round((count / values.length) * 100) };
  });
}

export default function MandatPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [otherModel, setOtherModel] = useState("");
  const [engine, setEngine] = useState("");
  const [otherEngine, setOtherEngine] = useState("");
  const [trim, setTrim] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [mileageRange, setMileageRange] = useState("0");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<Record<string, { checked: boolean; value: string }>>({});
  const [docs, setDocs] = useState(false);
  const [brandLogoMissing, setBrandLogoMissing] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [priceMin, setPriceMin] = useState("");
  const [priceDesired, setPriceDesired] = useState("");
  const [priceInstant, setPriceInstant] = useState("");
  const [priceMinError, setPriceMinError] = useState("");
  const [priceInstantError, setPriceInstantError] = useState("");
  const [instantEnabled, setInstantEnabled] = useState(false);
  const [instantCommitChecked, setInstantCommitChecked] = useState(false);
  const [instantLocked, setInstantLocked] = useState(false);
  const [instantCheckAnimation, setInstantCheckAnimation] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, number>>({});
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(7);

  const models = useMemo(() => brand ? MODELS[brand] || ["Autre"] : [], [brand]);
  const displayModel = model === "Autre" ? otherModel : model;
  const engineOptions = useMemo(() => {
    const key = `${brand}|${model}`;
    return brand && model ? ENGINES[key] || DEFAULT_ENGINES : [];
  }, [brand, model]);

  const displayEngine = engine === "Autre" ? otherEngine : engine;
  const desired = Number(priceDesired || form.desired || 0);
  const average = Math.round(MARKET_PRICES.reduce((a,b) => a + b, 0) / MARKET_PRICES.length);
  const completionBase = [form.first, form.last, form.phone, form.city, brand, displayModel, displayEngine, trim, form.year, form.mileage, form.fuel, form.gearbox, form.condition, form.desired, form.floor, form.instantPrice];
  const completion = Math.round((completionBase.filter(Boolean).length / completionBase.length) * 100);

  const priceSignal = useMemo(() => {
    if (!desired) return { tone: "neutral", badge: "En attente", label: "Renseignez un prix souhaité pour obtenir un signal marché." };
    const diff = (desired - average) / average;
    if (diff < -0.05) return { tone: "green", badge: "Sous marché", label: "Prix plus bas que le marché. Votre annonce devrait générer plus de demandes." };
    if (diff > 0.05) return { tone: "red", badge: "Au-dessus marché", label: "Prix plus haut que le marché. Le délai de vente peut être plus long." };
    return { tone: "black", badge: "Prix du marché ✓", label: "Positionnement cohérent avec les comparables collectés." };
  }, [desired, average]);

  const setValue = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const rejectMinPrice = () => {
    setPriceMin("");
    setValue("floor", "");
    setPriceMinError("Prix minimum supérieur au prix souhaité");
  };

  const rejectInstantPrice = () => {
    setPriceInstant("");
    setValue("instantPrice", "");
    setInstantCommitChecked(false);
    setInstantLocked(false);
    setPriceInstantError("Prix minimum supérieur au prix de vente immédiat");
  };

  const handleDesiredPriceChange = (value: string) => {
    if (Number(value) < 0) value = "";
    setPriceDesired(value);
    setValue("desired", value);
    setPriceMinError("");
    if (priceMin && value && Number(priceMin) >= Number(value)) {
      setTimeout(rejectMinPrice, 0);
    }
    if (priceInstant && priceMin && Number(priceInstant) <= Number(priceMin)) {
      setTimeout(rejectInstantPrice, 0);
    }
  };

  const handleMinPriceChange = (value: string) => {
    if (Number(value) < 0) value = "";
    setPriceMin(value);
    setValue("floor", value);
    setPriceMinError("");
    if (priceInstant && value && Number(priceInstant) <= Number(value)) {
      setInstantCommitChecked(false);
      setInstantLocked(false);
      setPriceInstantError("");
    }
  };

  const validateMinPrice = () => {
    if (priceMin && priceDesired && Number(priceMin) >= Number(priceDesired)) {
      rejectMinPrice();
      return false;
    }
    setPriceMinError("");
    return true;
  };

  const handleInstantEnable = (checked: boolean) => {
    setInstantEnabled(checked);
    setPriceInstantError("");
    setInstantCommitChecked(false);
    setInstantLocked(false);
    setInstantCheckAnimation(false);
    if (!checked) {
      setPriceInstant("");
      setValue("instantPrice", "");
    }
  };

  const handleInstantPriceChange = (value: string) => {
    if (instantLocked) return;
    if (Number(value) < 0) value = "";
    setPriceInstant(value);
    setValue("instantPrice", value);
    setPriceInstantError("");
    setInstantCommitChecked(false);
    setInstantLocked(false);
  };

  const validateInstantPrice = () => {
    if (!instantEnabled || !priceInstant) return false;
    if (priceMin && Number(priceInstant) <= Number(priceMin)) {
      rejectInstantPrice();
      return false;
    }
    setPriceInstantError("");
    return true;
  };

  const handleInstantCommit = (checked: boolean) => {
    if (!checked) {
      setInstantCommitChecked(false);
      setInstantLocked(false);
      setInstantCheckAnimation(false);
      return;
    }

    const valid = validateInstantPrice();
    if (!valid) return;

    setInstantCommitChecked(true);
    setInstantLocked(true);
    setInstantCheckAnimation(false);
    window.setTimeout(() => setInstantCheckAnimation(true), 20);
  };

  const showInstantCommit = instantEnabled && priceInstant && !priceInstantError && (!priceMin || Number(priceInstant) > Number(priceMin));
  const toggleOption = (value: string) => setSelectedOptions(prev => prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]);

  const toggleCustom = (key: string) => {
    setCustomFields(prev => {
      const checked = !prev[key]?.checked;
      return { ...prev, [key]: { checked, value: checked ? prev[key]?.value || "" : "" } };
    });
  };

  const setCustomValue = (key: string, value: string) => {
    setCustomFields(prev => ({ ...prev, [key]: { checked: true, value } }));
  };

  const customOptions = Object.values(customFields).filter(x => x.checked && x.value.trim()).map(x => x.value.trim());
  const allOptions = [...selectedOptions, ...customOptions];

  const registrationSummary =
    form.registrationCountry === "Maroc"
      ? `Immatriculation : Maroc${form.registrationCity ? ` (${form.registrationCity})` : ""}.`
      : form.registrationCountry === "Étranger"
        ? `Immatriculation : ${form.foreignRegistrationCountry || "Étranger"}${form.customsCleared ? `, dédouanée : ${form.customsCleared.toLowerCase()}` : ""}.`
        : "";
  const description = `${brand || "Véhicule"} ${displayModel || ""} ${displayEngine || ""}${trim ? ` finition ${trim}` : ""}${form.year ? ` ${form.year}` : ""}${form.fuel ? ` ${form.fuel.toLowerCase()}` : ""}${form.gearbox ? ` ${form.gearbox.toLowerCase()}` : ""} à vendre${form.mileage ? ` avec ${form.mileage} au compteur` : ""}${form.city ? `, disponible à ${form.city}` : ""}.${form.condition ? ` État déclaré : ${form.condition.toLowerCase()}.` : ""}${registrationSummary ? ` ${registrationSummary}` : ""}${form.accidented ? ` Véhicule accidenté : ${form.accidented.toLowerCase()}.` : ""}${form.mileageEvolving ? ` Kilométrage évolutif : ${form.mileageEvolving.toLowerCase()}.` : ""}${exteriorColor ? ` Couleur extérieure : ${exteriorColor.toLowerCase()}.` : ""}${allOptions.length ? ` Équipements notables : ${allOptions.slice(0, 10).join(", ")}.` : ""}${form.desired ? ` Prix souhaité : ${formatDh(Number(form.desired))}.` : ""}`.replace(/\s+/g, " ").trim();


  const requiredPhotoLabels = PHOTOS.filter(photo => !photo.multiple).map(photo => photo.label);
  const uploadedRequiredPhotos = requiredPhotoLabels.filter(label => (uploadedPhotos[label] || 0) > 0).length;
  const hasDefectPhotos = (uploadedPhotos["Défauts constatés"] || 0) > 0;
  const photoCompletion = Math.round((uploadedRequiredPhotos / requiredPhotoLabels.length) * 100);

  const priceWithinMarket = !!priceDesired && Math.abs((Number(priceDesired) - average) / average) <= 0.05;
  const trustSignals = [
    docs,
    form.condition,
    form.accidented,
    form.smoker,
    form.mileageEvolving,
    form.fuel,
    form.gearbox,
    uploadedRequiredPhotos === requiredPhotoLabels.length,
    priceWithinMarket
  ];

  const qualityScore = Math.min(
    100,
    Math.round(
      completion * 0.42 +
      photoCompletion * 0.30 +
      (trustSignals.filter(Boolean).length / trustSignals.length) * 28
    )
  );

  const qualityLabel =
    qualityScore >= 90 ? "Excellent" :
    qualityScore >= 75 ? "Très bon" :
    qualityScore >= 55 ? "À renforcer" :
    "Incomplet";

  const missingItems = [
    !brand || !displayModel ? "Identifier précisément le véhicule" : "",
    !displayEngine ? "Renseigner la motorisation constructeur" : "",
    !form.fuel ? "Sélectionner le carburant" : "",
    !form.mileage ? "Renseigner le kilométrage" : "",
    !form.condition ? "Préciser l’état général" : "",
    !form.registrationCountry ? "Préciser le pays d’immatriculation" : "",
    form.registrationCountry === "Maroc" && !form.registrationCity ? "Sélectionner la ville d’immatriculation" : "",
    form.registrationCountry === "Étranger" && !form.foreignRegistrationCountry ? "Sélectionner le pays d’immatriculation étranger" : "",
    form.registrationCountry === "Étranger" && !form.customsCleared ? "Indiquer si la voiture est dédouanée" : "",
    !priceDesired ? "Ajouter un prix souhaité" : "",
    uploadedRequiredPhotos < requiredPhotoLabels.length ? `Ajouter les photos obligatoires manquantes (${uploadedRequiredPhotos}/${requiredPhotoLabels.length})` : "",
    !docs ? "Ajouter des documents publics pour renforcer la confiance" : ""
  ].filter(Boolean);

  const recommendedLow = Math.round(average * 0.96 / 1000) * 1000;
  const recommendedHigh = Math.round(average * 1.05 / 1000) * 1000;
  const estimatedDelay =
    !priceDesired ? "—" :
    Number(priceDesired) <= recommendedHigh && Number(priceDesired) >= recommendedLow ? "12 à 18 jours" :
    Number(priceDesired) < recommendedLow ? "7 à 12 jours" :
    "20 jours et +";

  const handlePhotoUpload = (label: string, files: FileList | null) => {
    const count = files?.length || 0;
    setUploadedPhotos(prev => ({ ...prev, [label]: count }));

    if (count > 0 && !previewPhoto && files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setPreviewPhoto(url);
    }
  };
  const journeySteps = [
    { title: "Vendeur", section: "s1" },
    { title: "Véhicule", section: "s2" },
    { title: "Technique", section: "s3" },
    { title: "Design & options", section: "s4" },
    { title: "Prix", section: "s7" },
    { title: "Photos", section: "s8" },
    { title: "Confiance", section: "s9" },
    { title: "Aperçu", section: "s10" }
  ];

  const stepProgress = Math.round(((activeStep + 1) / journeySteps.length) * 100);
  const isLastStep = activeStep === journeySteps.length - 1;

  const goNext = () => {
    setActiveStep(prev => Math.min(prev + 1, journeySteps.length - 1));
  };

  const goPrev = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const stepRequiredOk = [
    Boolean(form.first && form.last && form.phone && form.phone.replace(/\D/g, "").length === 10 && form.city),
    Boolean(
      brand &&
      displayModel &&
      displayEngine &&
      trim &&
      form.year &&
      form.mileage &&
      form.registrationCountry &&
      (
        (form.registrationCountry === "Maroc" && form.registrationCity) ||
        (form.registrationCountry === "Étranger" && form.foreignRegistrationCountry && form.customsCleared)
      )
    ),
    Boolean(form.fuel && form.gearbox),
    true,
    Boolean(priceMin && priceDesired && Number(priceMin) < Number(priceDesired) && (!instantEnabled || !priceInstant || Number(priceInstant) > Number(priceMin))),
    uploadedRequiredPhotos === requiredPhotoLabels.length,
    true,
    true
  ];

  const currentStepValid = stepRequiredOk[activeStep];

  const handleNextStep = () => {
    if (!currentStepValid) return;
    const nextStep = Math.min(activeStep + 1, journeySteps.length - 1);
    setMaxUnlockedStep(prev => Math.max(prev, nextStep));
    setActiveStep(nextStep);
  };

  const handleStepNavClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <main className="page">
      <nav className="topbar">
        <Link href="/" className="logo">Auto<span>Souk</span></Link>
        <div className="topRight">
          <span className="draft">Sauvegarde automatique</span>
          <Link href="/" className="back">Retour au site</Link>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">AutoSouk</div>
          <h1>Vendez votre voiture avec une expérience <em>fluide</em>, claire et premium.</h1>
          <p>Un parcours minimaliste, visuel et guidé — pensé pour créer une annonce fiable sans effort.</p>
        </div>
        <div className="heroGlass">
          <div className="heroMetric"><span>Annonce prête à publier</span><strong>{completion}%</strong></div>
          <div className="track"><div style={{ width: `${completion}%` }} /></div>
          <div className="heroList"><span>Identification guidée</span><span>Argus mensuel</span><span>Dossier photo structuré</span></div>
        </div>
      </section>

      <section className="workspace">
        <aside className="leftNav">
          <div className="navTitle">Publication</div><div className="recetteBadge">Mode recette · navigation libre</div>
          {journeySteps.map((step, i) => (
            <button
              type="button"
              key={step.title}
              className={activeStep === i ? "activeStepNav" : ""}
              onClick={() => handleStepNavClick(i)}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              <span>{step.title}</span>
            </button>
          ))}
        </aside>

        <form className="panel stepPanel">
          <div className="stepHeader">
            <div>
              <span>Étape {activeStep + 1} sur {journeySteps.length}</span>
              <h2>{journeySteps[activeStep].title}</h2>
              <p>Complétez cette étape, puis avancez vers la suivante. Votre annonce se construit progressivement.</p>
            </div>
            <div className="stepPercent">{stepProgress}%</div>
          </div>
          <div className="stepProgress"><div style={{ width: `${stepProgress}%` }} /></div>
          <div className={`journeyPane ${activeStep === 0 ? "active" : ""}`}>
          <Section id="s1" title="Identité vendeur" subtitle="Ces informations restent privées et ne sont jamais publiées." />
          <div className="grid">
            <Field label="Prénom" required><input placeholder="Mohammed" onChange={e => setValue("first", e.target.value)} /></Field>
            <Field label="Nom" required><input placeholder="El Fassi" onChange={e => setValue("last", e.target.value)} /></Field>
            <Field label="Téléphone" required>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9 ]*"
                placeholder="06 XX XX XX XX"
                value={form.phone || ""}
                onKeyDown={e => {
                  const allowed = ["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"," "];
                  if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) e.preventDefault();
                }}
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  const grouped = digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
                  setValue("phone", grouped);
                }}
              />
              <small className={form.phone && form.phone.replace(/\D/g, "").length !== 10 ? "fieldHint fieldHintError" : "fieldHint"}>
                10 chiffres obligatoires.
              </small>
            </Field>
            <Field label="Ville" required><select defaultValue="" onChange={e => setValue("city", e.target.value)}><option value="" disabled>Sélectionner</option>{CITIES.map(x => <option key={x}>{x}</option>)}</select></Field>
          </div>

          </div>

          <div className={`journeyPane ${activeStep === 1 ? "active" : ""}`}>
          <Section id="s2" title="Identification du véhicule" subtitle="Commencez par les informations clés. Le reste s’ajuste progressivement autour de votre véhicule." />
          <div className="brandShowcaseWide">
            <div className="brandLogoSlot">
              {brand && !brandLogoMissing && getBrandLogo(brand) ? <img src={getBrandLogo(brand) || ""} alt={brand} className="brandPngLogo" onError={() => setBrandLogoMissing(true)} /> : <div className="brandFallback"><span>{brand ? brand.slice(0, 2).toUpperCase() : "AS"}</span></div>}
            </div>
            <div className="brandShowcaseCopy">
              <strong>{brand || "Sélectionnez une marque"}</strong>
              <small>{brand ? "Logo constructeur affiché automatiquement si disponible dans /public/brands." : "Le logo apparaîtra ici après sélection."}</small>
            </div>
          </div>
          <div className="grid">
            <Field label="Marque" required><select value={brand} onChange={e => { setBrand(e.target.value); setModel(""); setEngine(""); setBrandLogoMissing(false); }}><option value="">Sélectionner</option>{BRANDS.map(x => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Modèle" required><select value={model} disabled={!brand} onChange={e => { setModel(e.target.value); setEngine(""); }}><option value="">{brand ? "Sélectionner" : "Choisissez une marque"}</option>{models.map(x => <option key={x}>{x}</option>)}</select></Field>
            {model === "Autre" && <Field label="Autre modèle"><input value={otherModel} onChange={e => setOtherModel(e.target.value)} placeholder="Préciser le modèle" /></Field>}
            <Field label="Motorisation constructeur" required><select value={engine} disabled={!brand || !model} onChange={e => setEngine(e.target.value)}><option value="">{brand && model ? "Sélectionner" : "Choisissez marque et modèle"}</option>{engineOptions.map(x => <option key={x}>{x}</option>)}</select><small className="fieldHint">Variante constructeur du modèle : ex. 320d, C300, 2.0 TDI, 1.2 PureTech.</small></Field>
            {engine === "Autre" && <Field label="Autre motorisation"><input value={otherEngine} onChange={e => setOtherEngine(e.target.value)} placeholder="Ex. 300e, 520d..." /></Field>}
            <Field label="Finition (Pack M, AMG Line, R Line...)" required><input value={trim} onChange={e => setTrim(e.target.value)} placeholder="Ex. Pack M, AMG Line..." /></Field>
            <Field label="Type de véhicule"><select defaultValue="" onChange={e => setValue("type", e.target.value)}><option value="" disabled>Sélectionner</option>{VEHICLE_TYPES.map(x => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Année" required><select defaultValue="" onChange={e => setValue("year", e.target.value)}><option value="" disabled>Sélectionner</option>{YEARS.map(x => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Kilométrage" required>
              <div className="mileageGaugeBox">
                <div className="mileageGaugeTop">
                  <span>0 km</span>
                  <strong>{mileageRange === "200000" ? "+200 000 km" : `${Number(mileageRange).toLocaleString("fr-FR")} km`}</strong>
                  <span>+200 000 km</span>
                </div>
                <input
                  className="mileageRange"
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={mileageRange}
                  onChange={e => {
                    setMileageRange(e.target.value);
                    setValue("mileage", e.target.value === "200000" ? "+200 000 km" : `${Number(e.target.value).toLocaleString("fr-FR")} km`);
                  }}
                />
                <input
                  className="mileagePrecise"
                  type="number"
                  placeholder="Corriger manuellement, ex. 18 350"
                  onChange={e => {
                    setValue("mileage", e.target.value ? `${Number(e.target.value).toLocaleString("fr-FR")} km` : "");
                  }}
                />
              </div>
            </Field>
            <Field label="Kilométrage évolutif ?">
              <select defaultValue="" onChange={e => setValue("mileageEvolving", e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                <option>Oui, j’utilise encore la voiture au quotidien</option>
                <option>Non, le véhicule ne roule presque plus</option>
              </select>
            </Field>
          </div>

          <div className="subSectionBox">
            <h3>Immatriculation</h3>
            <p>Pays et lieu d’immatriculation du véhicule.</p>
            <div className="grid">
              <Field label="Pays d’immatriculation" required>
                <select
                  value={form.registrationCountry || ""}
                  onChange={e => {
                    setValue("registrationCountry", e.target.value);
                    setValue("registrationCity", "");
                    setValue("foreignRegistrationCountry", "");
                    setValue("customsCleared", "");
                  }}
                >
                  <option value="" disabled>Sélectionner</option>
                  <option value="Maroc">Maroc</option>
                  <option value="Étranger">Étranger</option>
                </select>
              </Field>

              {form.registrationCountry === "Maroc" && (
                <Field label="Ville / préfecture d’immatriculation" required>
                  <select value={form.registrationCity || ""} onChange={e => setValue("registrationCity", e.target.value)}>
                    <option value="" disabled>Sélectionner</option>
                    {MOROCCAN_REGISTRATION_CITIES.map(city => <option key={city}>{city}</option>)}
                  </select>
                </Field>
              )}

              {form.registrationCountry === "Étranger" && (
                <>
                  <Field label="Pays d’immatriculation étranger" required>
                    <select value={form.foreignRegistrationCountry || ""} onChange={e => setValue("foreignRegistrationCountry", e.target.value)}>
                      <option value="" disabled>Sélectionner le pays</option>
                      {COUNTRIES.map(country => <option key={country}>{country}</option>)}
                    </select>
                  </Field>

                  <Field label="Voiture dédouanée ?" required>
                    <select value={form.customsCleared || ""} onChange={e => setValue("customsCleared", e.target.value)}>
                      <option value="" disabled>Sélectionner</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </Field>
                </>
              )}
            </div>
          </div>

          </div>

          <div className={`journeyPane ${activeStep === 2 ? "active" : ""}`}>
          <Section id="s3" title="Carburant & caractéristiques techniques" subtitle="Le carburant est séparé de la motorisation constructeur pour éviter les doublons et fiabiliser l’annonce." />
          <div className="grid">
            <Field label="Carburant" required><select defaultValue="" onChange={e => setValue("fuel", e.target.value)}><option value="" disabled>Sélectionner</option><option>Essence</option><option>Diesel</option><option>Hybride</option><option>Hybride rechargeable</option><option>Électrique</option><option>GPL</option><option>Hydrogène</option><option>Bioéthanol</option><option>Gaz naturel CNG</option><option>Autre</option></select></Field>
            <Field label="Transmission" required><select defaultValue="" onChange={e => setValue("gearbox", e.target.value)}><option value="" disabled>Sélectionner</option><option>Boîte manuelle</option><option>Boîte automatique</option><option>Boîte semi-automatique</option></select></Field>
            <Field label="Motricité"><select defaultValue=""><option>Tous</option><option>Traction avant</option><option>Propulsion</option><option>4x4</option></select></Field>
            <Field label="Puissance"><input placeholder="Ex. 204 ch DIN" /></Field>
            <Field label="Cylindrée"><input placeholder="Ex. 1998 ccm" /></Field>
            <Field label="Nombre de portes"><select defaultValue=""><option>Tous</option><option>2 portes</option><option>3 portes</option><option>4 portes</option><option>5 portes</option></select></Field>
          </div>

          </div>

          <div className={`journeyPane ${activeStep === 3 ? "active" : ""}`}>
          <Section id="s4" title="Design extérieur & intérieur" subtitle="Couleurs, matériaux et premiers éléments visuels." />
          <Field label="Couleur extérieure"><ColorGrid items={BODY_COLORS} selectedColor={exteriorColor} onPick={v => { const next = exteriorColor === v ? "" : v; setExteriorColor(next); }} /></Field>
          <div className="grid">
            <Field label="Couleur intérieure"><PillGroup items={INTERIOR_COLORS} onPick={v => setValue("interiorColor", v)} />{form.interiorColor === "Autres" && <input placeholder="Préciser la couleur intérieure" onChange={e => setValue("interiorColorOther", e.target.value)} />}</Field>
            <Field label="Matériau intérieur"><PillGroup items={INTERIOR_MATERIALS} onPick={v => setValue("interiorMaterial", v)} />{form.interiorMaterial === "Autres" && <input placeholder="Préciser le matériau" onChange={e => setValue("interiorMaterialOther", e.target.value)} />}</Field>
          </div>

          <Section id="s5" title="Équipements" subtitle="Sélectionnez les options présentes. Les champs Autre se vident automatiquement si décochés." />
          <OptionBlock title="Équipements extérieurs" items={EXTERIOR_OPTIONS} selected={selectedOptions} toggle={toggleOption} customPrefix="ext" customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />
          <OptionBlock title="Confort & intérieur" items={COMFORT_OPTIONS} selected={selectedOptions} toggle={toggleOption} customPrefix="comfort" customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />
          <OptionBlock title="Infotainment" items={INFOTAINMENT_OPTIONS} selected={selectedOptions} toggle={toggleOption} customPrefix="info" customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />
          <OptionBlock title="Sécurité & aides à la conduite" items={SAFETY_OPTIONS} selected={selectedOptions} toggle={toggleOption} customPrefix="safety" customFields={customFields} toggleCustom={toggleCustom} setCustomValue={setCustomValue} />

          <Section id="s6" title="État, vendeur & historique" subtitle="Ces informations renforcent la confiance et réduisent les questions inutiles." />
          <div className="grid">
            <Field label="État général" required><select defaultValue="" onChange={e => setValue("condition", e.target.value)}><option value="" disabled>Sélectionner</option><option>Neuf</option><option>Excellent état</option><option>Très bon état</option><option>Bon état</option><option>État correct</option><option>Petits frais à prévoir</option></select></Field>
            <Field label="Vendeur"><select defaultValue=""><option>Particulier</option><option>Concessionnaire</option><option>Voiture de société</option></select></Field>
            <Field label="Entretien"><select defaultValue=""><option>Non renseigné</option><option>Carnet complet</option><option>Factures disponibles</option><option>Historique partiel</option><option>Non disponible</option></select></Field>
            <Field label="Véhicule fumeur ?"><select defaultValue="" onChange={e => setValue("smoker", e.target.value)}><option value="" disabled>Sélectionner</option><option>Oui</option><option>Non</option></select></Field>
            <Field label="Véhicule accidenté ?"><select defaultValue="" onChange={e => setValue("accidented", e.target.value)}><option value="" disabled>Sélectionner</option><option>Oui</option><option>Non</option></select></Field>
          </div>

          </div>

          <div className={`journeyPane ${activeStep === 4 ? "active" : ""}`}>
          <Section id="s7" title="Stratégie de prix" subtitle="Trois niveaux de décision : minimum accepté, prix souhaité et prix immédiat." />
          <div className="critical">🔒 <strong>Le prix minimum accepté reste confidentiel.</strong> Il n’est jamais montré aux acheteurs.</div>
          <div className="pricingGrid pricingGridExact">
            <div className="priceBox priceBoxMinimum">
              <div className="priceLabel">Prix minimum accepté <span>*</span></div>
              <div className={`moneyInput ${priceMinError ? "priceInvalid shakeField" : ""}`}>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  onKeyDown={e => { if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault(); }}
                  value={priceMin}
                  placeholder={priceMinError || "Ex. 145000"}
                  onChange={e => handleMinPriceChange(e.target.value)}
                  onBlur={validateMinPrice}
                />
                <span>Dirhams</span>
              </div>
              {priceMinError && <div className="priceError">{priceMinError}</div>}
              <p>Confidentiel. Il doit impérativement être inférieur au prix souhaité.</p>
            </div>

            <div className="priceBox priceBoxMain priceBoxDesired">
              <div className="priceBadge">Prix affiché</div>
              <div className="priceLabel">Prix souhaité <span>*</span></div>
              <div className="moneyInput moneyInputDesired">
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  onKeyDown={e => { if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault(); }}
                  value={priceDesired}
                  placeholder="Ex. 160000"
                  onChange={e => handleDesiredPriceChange(e.target.value)}
                />
                <span>Dirhams</span>
              </div>
              <p>Montant central de l’annonce, utilisé comme base de discussion.</p>
            </div>

            <div className={`priceBox priceBoxInstantExact ${instantEnabled ? "instantEnabled" : ""} ${instantLocked ? "instantLocked" : ""}`}>
              <div className="instantHeader">
                <div>
                  <div className="priceLabel">Prix de vente immédiat</div>
                  <small>Optionnel</small>
                </div>
                
              </div>

              <div className={`moneyInput ${priceInstantError ? "priceInvalid shakeField" : ""}`}>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  onKeyDown={e => { if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault(); }}
                  value={priceInstant}
                  placeholder={priceInstantError || "Ex. 155000"}
                  disabled={!instantEnabled || instantLocked}
                  onChange={e => handleInstantPriceChange(e.target.value)}
                  onBlur={validateInstantPrice}
                />
                <span>Dirhams</span>
              </div>
              {priceInstantError && <div className="priceError">{priceInstantError}</div>}

              <label className="instantEnableLine">
                <input
                  type="checkbox"
                  checked={instantEnabled}
                  onChange={e => handleInstantEnable(e.target.checked)}
                />
                <span>Je souhaite renseigner un prix de vente immédiat</span>
              </label>

              {showInstantCommit && (
                <label className={`instantCommitLine ${instantLocked ? "locked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={instantCommitChecked}
                    disabled={instantLocked}
                    onChange={e => handleInstantCommit(e.target.checked)}
                  />
                  <span>Je m’engage à céder mon véhicule si une offre atteint au minimum ce prix-là.</span>
                </label>
              )}

              {instantCheckAnimation && <div className="instantFlyingCheck">✓</div>}
            </div>
          </div>
          <Field label="Remarques vendeur"><textarea placeholder="Première main, carnet complet, pneus neufs, défauts éventuels..." /></Field>

          </div>

          <div className={`journeyPane ${activeStep === 5 ? "active" : ""}`}>
          <Section id="s8" title="Guide photo" subtitle="12 photos principales avec une limite de 1 photo par section, plus un espace illimité pour les défauts." />
          <div className="photoQualityPanel"><div><strong>Checklist qualité photo</strong><p>Photos nettes, lumière naturelle, véhicule propre, plaque masquée si nécessaire.</p></div><span>12 photos + défauts illimités</span></div>
          <div className="photoGrid">
            {PHOTOS.map((photo, i) => (
              <label className={`upload ${photo.multiple ? "uploadDefects" : ""}`} key={photo.label}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <img src={photo.image} alt={photo.label} className="photoGuideImage" onError={e => { e.currentTarget.style.display = "none"; }} />
                <span>{photo.label}</span>
                <small>{photo.instruction}</small>
                <input type="file" accept="image/*" multiple={photo.multiple} onChange={e => handlePhotoUpload(photo.label, e.target.files)} />
                {(uploadedPhotos[photo.label] || 0) > 0 && <em className="photoAdded">✓ Photo ajoutée{photo.multiple && uploadedPhotos[photo.label] > 1 ? `s (${uploadedPhotos[photo.label]})` : ""}</em>}
                {photo.multiple && <em>Upload multiple autorisé</em>}
              </label>
            ))}
          </div>

          </div>

          <div className={`journeyPane ${activeStep === 6 ? "active" : ""}`}>
          <Section id="s9" title="Documents & confiance" subtitle="Documents publics facultatifs. Les informations sensibles doivent être floutées." />
          <label className="check"><input type="checkbox" checked={docs} onChange={e => setDocs(e.target.checked)} /> Ajouter carte grise floutée, contrôle technique ou factures partageables</label>
          {docs && <div className="docs"><div className="verified">Verified potentiel</div><div className="grid"><Field label="Carte grise floutée"><input type="file" accept="image/*,.pdf" /></Field><Field label="Factures / carnet"><input type="file" accept="image/*,.pdf" multiple /></Field><Field label="Contrôle technique"><input type="file" accept="image/*,.pdf" /></Field><Field label="Autres documents"><input type="file" accept="image/*,.pdf" multiple /></Field></div></div>}

          </div>

          <div className={`journeyPane ${activeStep === 7 ? "active" : ""}`}>
          <Section id="s10" title="Preview de l’annonce" subtitle="Résumé public généré automatiquement." />
          <div className="preview">{description}</div>
          <div className="finalReview">
            <div>
              <strong>{missingItems.length ? "Derniers points avant publication" : "Votre annonce est prête"}</strong>
              <p>{missingItems.length ? "Complétez les éléments ci-dessous pour maximiser la confiance acheteur." : "Le dossier est suffisamment complet pour être envoyé en revue."}</p>
              {missingItems.length > 0 && <ul>{missingItems.slice(0, 5).map(item => <li key={item}>{item}</li>)}</ul>}
            </div>
            <button type="button">{missingItems.length ? "Continuer à compléter" : "Finaliser mon annonce"}</button>
          </div>
        </div>
          <div className="stepActions persistentStepActions">
            <button type="button" className="secondaryStep" onClick={goPrev} disabled={activeStep === 0}>Retour</button>
            <div className="stepActionRight">
              {!currentStepValid && <span className="stepValidationHint">Complétez les champs obligatoires (*) pour continuer.</span>}
              <button type="button" className="primaryStep" onClick={handleNextStep} disabled={!currentStepValid}>
                {isLastStep ? "Finaliser" : "Continuer"}
              </button>
            </div>
          </div>
        </form>

        <aside className="rightRail">
          <div className="livePreviewCard">
            <div className="livePreviewMedia">
              {previewPhoto ? <img src={previewPhoto} alt="Photo principale" /> : <div className="livePreviewEmpty">Photo principale</div>}
            </div>
            <div className="livePreviewBody">
              <div className="livePreviewBrand">
                {brand && !brandLogoMissing && getBrandLogo(brand) && <img src={getBrandLogo(brand) || ""} alt={brand} onError={() => setBrandLogoMissing(true)} />}
                <span>{brand || "Marque"} {displayModel || "Modèle"}</span>
              </div>
              <strong>{displayEngine || "Motorisation"} {trim || ""}</strong>
              <p>{form.year || "Année"} · {form.mileage || "Kilométrage"} · {form.fuel || "Carburant"} · {form.city || "Ville"}</p>
              <b>{priceDesired ? formatDh(Number(priceDesired)) : "Prix à renseigner"}</b>
              {docs && <small className="verifiedMini">Verified potentiel</small>}
            </div>
          </div>

          <div className="qualityCard">
            <div className="qualityHeader">
              <span>Qualité annonce</span>
              <strong>{qualityScore}/100</strong>
            </div>
            <div className="qualityTrack"><div style={{ width: `${qualityScore}%` }} /></div>
            <b>{qualityLabel}</b>
            <p>{uploadedRequiredPhotos}/{requiredPhotoLabels.length} photos obligatoires ajoutées · {missingItems.length ? `${missingItems.length} point(s) à compléter` : "Dossier prêt pour revue"}</p>
          </div>

          <div className="marketCard">
            <div className="marketHeader"><span>Argus AutoSouk</span><b>Benchmark mensuel</b></div>
            <div className="marketIdentity"><strong>{brand || "Marque"} {displayModel || "Modèle"} {displayEngine || ""}</strong><small>{trim || "Finition"} · {form.year || "Année"} · {form.mileage || "Kilométrage"}</small></div>
            <div className="recommendedBox">
              <small>Fourchette recommandée</small>
              <strong>{formatDh(recommendedLow)} – {formatDh(recommendedHigh)}</strong>
              <span>Délai estimé : {estimatedDelay}</span>
            </div>
            <div className="marketStats"><div><small>Min</small><strong>{formatDh(Math.min(...MARKET_PRICES))}</strong></div><div><small>Moy.</small><strong>{formatDh(average)}</strong></div><div><small>Médiane</small><strong>{formatDh(median(MARKET_PRICES))}</strong></div><div><small>Max</small><strong>{formatDh(Math.max(...MARKET_PRICES))}</strong></div></div>
            <div className="chart">{buildHistogram(MARKET_PRICES).map((bar, i) => <div className="barRow" key={i}><span>{Math.round(bar.low/1000)}-{Math.round(bar.high/1000)}k</span><div className="barTrack"><div style={{ width: `${Math.max(bar.pct,3)}%` }} /></div><b>{bar.pct}%</b></div>)}</div>
            <div className={`signal ${priceSignal.tone}`}><strong>{priceSignal.badge}</strong><p>{priceSignal.label}</p></div>
            <p className="sourceNote">Base démo. À connecter ensuite à une base benchmark mensuelle réelle.</p>
          </div>
        </aside>
      </section>

      <style>{`
        *{box-sizing:border-box} html{scroll-behavior:smooth}
        .page{min-height:100vh;background:radial-gradient(circle at 10% -6%,rgba(217,181,109,.24),transparent 34%),radial-gradient(circle at 90% 2%,rgba(148,163,184,.24),transparent 30%),linear-gradient(145deg,#fbfaf7 0%,#f3f0ea 42%,#eef4f8 100%);color:#0f1720;font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Arial,sans-serif}
        .topbar{height:82px;display:flex;justify-content:space-between;align-items:center;max-width:1480px;margin:auto;padding:0 34px}.logo{text-decoration:none;color:#111827;font-size:25px;font-weight:950;letter-spacing:-.04em}.logo span{background:linear-gradient(135deg,#b8924a,#e7c983);-webkit-background-clip:text;color:transparent}.topRight{display:flex;gap:12px;align-items:center}.draft{background:rgba(255,255,255,.72);border:1px solid #e2e8f0;color:#2f6b4f;border-radius:999px;padding:9px 13px;font-size:12px;font-weight:850}.back{background:#111827;color:white;text-decoration:none;border-radius:999px;padding:10px 16px;font-weight:850}
        .hero{max-width:1480px;margin:auto;padding:70px 34px 36px;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(340px,.75fr);gap:34px;align-items:end}.eyebrow{display:inline-flex;background:rgba(255,255,255,.72);border:1px solid #e2e8f0;border-radius:999px;padding:9px 13px;color:#9c7632;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:950}h1{font-size:clamp(48px,6.4vw,92px);line-height:.92;letter-spacing:-.075em;font-weight:950;margin:18px 0;max-width:980px}h1 em{font-style:normal;background:linear-gradient(135deg,#111827 5%,#b8924a 55%,#e2c079);-webkit-background-clip:text;color:transparent}.hero p{font-size:20px;line-height:1.65;color:#687386;max-width:760px}.heroGlass{border-radius:34px;background:linear-gradient(160deg,rgba(255,255,255,.9),rgba(255,255,255,.58));border:1px solid #fff;box-shadow:0 28px 90px rgba(22,28,36,.10);padding:28px}.heroMetric{display:flex;justify-content:space-between;align-items:center}.heroMetric strong{font-size:42px;background:linear-gradient(135deg,#111827,#b8924a);-webkit-background-clip:text;color:transparent}.track{height:12px;background:#e9edf2;border-radius:999px;overflow:hidden;margin:14px 0 18px}.track div{height:100%;background:linear-gradient(90deg,#111827,#b8924a,#e6c77e)}.heroList{display:grid;gap:10px}.heroList span{background:rgba(255,255,255,.72);border:1px solid #e2e8f0;border-radius:18px;padding:13px 14px;font-weight:850}
        .workspace{max-width:1480px;margin:auto;padding:24px 34px 100px;display:grid;grid-template-columns:230px minmax(0,1fr) 380px;gap:26px;align-items:start}.leftNav,.rightRail{position:sticky;top:22px}.leftNav{border-radius:28px;background:rgba(255,255,255,.72);border:1px solid #e2e8f0;box-shadow:0 24px 70px rgba(22,28,36,.08);padding:16px}.navTitle{font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:#93a0b2;font-weight:950;margin:4px 8px 12px}.leftNav a{display:flex;gap:10px;padding:10px 11px;border-radius:18px;text-decoration:none;color:#647083;font-size:13px;font-weight:850}.leftNav a:hover{background:rgba(255,255,255,.78);transform:translateX(2px)}.leftNav small{color:#b8924a}
        .panel{border-radius:36px;background:rgba(255,255,255,.84);border:1px solid #e2e8f0;box-shadow:0 34px 100px rgba(22,28,36,.10);padding:38px;min-width:0}.sectionTitle{scroll-margin-top:30px;border-top:1px solid #e2e8f0;margin:46px 0 24px;padding-top:26px}.sectionTitle:first-child{margin-top:0;padding-top:0;border-top:0}.sectionTitle h2{font-size:32px;line-height:1.05;letter-spacing:-.055em;font-weight:950;margin:0}.sectionTitle p{color:#6d7890;font-size:15px;line-height:1.55;margin:5px 0 0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:24px 26px;align-items:start}.field{display:grid;gap:8px;min-width:0}.field label{font-weight:900;font-size:12px;color:#111827}.req{color:#b8924a}input,select,textarea{width:100%;min-height:56px;border-radius:18px;border:1.5px solid #dce4ee;background:rgba(248,250,252,.82);padding:14px 15px;font-size:15px;outline:none}textarea{min-height:118px}input:focus,select:focus,textarea:focus{background:white;border-color:#c9a15a;box-shadow:0 0 0 5px rgba(184,146,74,.13)}
        .brandShowcaseWide{display:grid;grid-template-columns:220px minmax(0,1fr);gap:18px;align-items:center;border-radius:30px;background:linear-gradient(135deg,rgba(255,255,255,.88),rgba(248,250,252,.70));border:1px solid #e2e8f0;box-shadow:0 24px 70px rgba(22,28,36,.08);padding:24px;margin-bottom:24px}.brandLogoSlot{height:118px;display:flex;align-items:center;justify-content:center;background:white;border-radius:24px;box-shadow:inset 0 0 0 1px #e2e8f0}.brandPngLogo{max-width:175px;max-height:86px;object-fit:contain}.brandFallback{width:86px;height:86px;border-radius:28px;background:linear-gradient(135deg,#111827,#27313c);color:#d9ad62;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:950}.brandShowcaseCopy strong{font-size:23px}.brandShowcaseCopy small{display:block;color:#6d7890;margin-top:5px}
        .pillGroup,.optionsGrid,.colorGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));gap:10px}.pill,.optionItem,.colorItem{display:flex;gap:8px;align-items:center;border-radius:16px;background:rgba(248,250,252,.84);border:1.5px solid #dce4ee;padding:10px;font-size:12px;font-weight:850;color:#111827}.pill input,.optionItem input{width:auto;min-height:auto}.optionItem.selected,.colorGrid.hasSelection .colorItem.selected{background:linear-gradient(145deg,#fff8ec,#fff);border-color:#d9b56d;box-shadow:0 14px 34px rgba(184,146,74,.16)}.colorItem{cursor:pointer;position:relative}.colorGrid.hasSelection .colorItem{opacity:.35;filter:grayscale(.85)}.colorGrid.hasSelection .colorItem.selected{opacity:1;filter:none}.colorItem.selected:after{content:"✓";position:absolute;right:8px;top:8px;background:#111827;color:#d9ad62;width:18px;height:18px;border-radius:999px;display:flex;align-items:center;justify-content:center}.swatch{width:16px;height:16px;border-radius:5px;border:1px solid #9aa6b4}
        .optionBlock{margin-top:18px}.optionBlock h3{font-size:15px}.customOtherGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:12px;margin-top:12px}.customOtherBox{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:center;background:white;border:1.5px solid #dce4ee;border-radius:16px;padding:10px 12px}.customOtherBox.active{background:#fff8ec;border-color:#d9b56d}.customOtherCheck{display:flex;gap:8px;font-size:12px;font-weight:900}.customOtherCheck input{width:auto;min-height:auto}.customOtherInput{min-height:38px!important;border-radius:10px!important;font-size:13px!important}.customOtherInput:disabled{background:#eef2f6!important;color:#9aa6b4!important}
        .critical{border-radius:20px;background:#fff7f5;border:1.5px solid #f0b4aa;color:#b42318;padding:16px 18px;font-weight:900}.pricingGrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.22fr) minmax(0,1fr);gap:22px;margin:20px 0 24px}.priceBox{border-radius:26px;border:1.5px solid #dce4ee;background:rgba(248,250,252,.72);box-shadow:0 18px 46px rgba(22,28,36,.06);padding:18px;display:grid;gap:10px}.priceBoxMain{background:linear-gradient(180deg,#fff8ea,#fff);border-color:#d9b56d;box-shadow:0 26px 70px rgba(184,146,74,.20);transform:translateY(-6px)}.priceBadge{display:inline-flex;background:#111827;color:#d9ad62;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:950;width:max-content}.priceLabel{font-weight:950}.moneyInput{display:grid;grid-template-columns:minmax(0,1fr) auto;background:white;border:1.5px solid #cfd8e3;border-radius:18px;overflow:hidden}.moneyInput input{border:0!important;box-shadow:none!important;background:white!important;font-size:20px!important;font-weight:900!important}.moneyInput span{display:flex;align-items:center;padding:0 14px;background:#eef2f6;border-left:1px solid #dce3eb;font-size:12px;font-weight:950;color:#5f6f82;text-transform:uppercase}
        .photoQualityPanel{display:flex;justify-content:space-between;gap:16px;background:linear-gradient(135deg,#fff8ec,#fff);border:1.5px solid #ead3a5;border-radius:24px;padding:16px 18px;margin-bottom:18px}.photoQualityPanel p{margin:4px 0 0;color:#7a5720}.photoQualityPanel span{background:#111827;color:#d9ad62;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:950}.photoGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:20px}.upload{border-radius:26px;background:rgba(255,255,255,.72);border:1.5px dashed #ccd6e2;padding:22px;display:flex;flex-direction:column;gap:8px;box-shadow:0 18px 44px rgba(22,28,36,.06)}.upload:hover{transform:translateY(-3px);border-color:#d9b56d}.photoGuideImage{width:100%;height:130px;object-fit:contain;background:white;border:1px solid #e2e8f0;border-radius:20px;padding:12px}.uploadDefects{border-color:#f2aaa2;background:#fff7f6}.uploadDefects em{display:inline-flex;width:max-content;background:#fff2f0;color:#b42318;border-radius:999px;padding:5px 9px;font-size:11px;font-style:normal;font-weight:950}
        .check{display:flex;gap:12px;background:#f8fafc;border:1px solid #dce3eb;border-radius:18px;padding:17px;font-weight:900}.check input{width:auto;min-height:auto}.docs{margin-top:18px;background:#eef8f2;border:1px solid #c7e8d3;border-radius:22px;padding:22px}.verified{display:inline-flex;background:#2d8653;color:white;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:950;margin-bottom:18px}.preview{border-radius:26px;background:linear-gradient(145deg,#fff,#f8fafc);border:1.5px solid #dce4ee;box-shadow:0 18px 44px rgba(22,28,36,.06);padding:22px;line-height:1.75}.final{margin-top:34px;border-radius:30px;background:linear-gradient(135deg,#111827,#1f2937);box-shadow:0 28px 80px rgba(17,24,39,.22);color:white;padding:24px;display:flex;justify-content:space-between;gap:22px;align-items:center}.final p{color:rgba(255,255,255,.62)}.final button{background:linear-gradient(135deg,#b8924a,#d9b56d);color:white;border:0;border-radius:18px;padding:15px 22px;font-weight:950}
        .marketCard{border-radius:32px;background:rgba(255,255,255,.80);border:1px solid #e2e8f0;box-shadow:0 30px 90px rgba(22,28,36,.10);padding:20px}.marketHeader{display:flex;justify-content:space-between;gap:10px}.marketHeader span{font-size:24px;font-weight:950}.marketHeader b{font-size:10px;text-transform:uppercase;color:#b8924a;background:#fff6e8;border-radius:999px;padding:7px 9px}.marketIdentity{background:linear-gradient(135deg,#111827,#27313c);border-radius:24px;color:white;padding:15px;margin:15px 0}.marketIdentity small{display:block;color:rgba(255,255,255,.6);margin-top:4px}.marketStats{display:grid;grid-template-columns:1fr 1fr;gap:9px}.marketStats div{background:#f8fafc;border:1px solid #dce3eb;border-radius:15px;padding:11px}.marketStats small{display:block;color:#728196;font-size:10px;text-transform:uppercase;font-weight:900}.chart{display:grid;gap:8px;margin:16px 0}.barRow{display:grid;grid-template-columns:56px minmax(0,1fr) 34px;gap:8px;align-items:center;font-size:11px}.barTrack{height:9px;background:#e5eaf0;border-radius:999px;overflow:hidden}.barTrack div{height:100%;background:linear-gradient(90deg,#b8924a,#d9ad62)}.signal{border-radius:16px;padding:14px;margin-top:14px;border:1px solid #ddd}.signal p{margin:4px 0 0}.signal.green{background:#edf7f2;color:#2d8653}.signal.red{background:#fff2f0;color:#b42318}.signal.black{background:#f3f0ec;color:#111827}.signal.neutral{background:#f8fafc;color:#728196}.sourceNote{font-size:11px;color:#8090a3}
        @media(max-width:1280px){.workspace{grid-template-columns:220px minmax(0,1fr)}.rightRail{position:static;grid-column:2}.pricingGrid{grid-template-columns:1fr}.priceBoxMain{transform:none}}@media(max-width:900px){.topbar{padding:0 18px}.hero,.workspace{grid-template-columns:1fr;padding-left:18px;padding-right:18px}.leftNav,.rightRail{position:static}.brandShowcaseWide{grid-template-columns:1fr}.photoQualityPanel,.final{flex-direction:column;align-items:flex-start}.panel{padding:24px;border-radius:28px}h1{font-size:clamp(42px,12vw,64px)}}

        /* V14 Apple-inspired minimal DA + subtle 3D scroll */
        :root{
          --apple-bg:#f5f5f7;
          --apple-white:#ffffff;
          --apple-ink:#1d1d1f;
          --apple-muted:#6e6e73;
          --apple-line:rgba(0,0,0,.075);
          --apple-blue:#0071e3;
          --apple-blue-soft:#f0f7ff;
          --apple-shadow:0 18px 60px rgba(0,0,0,.055);
          --apple-shadow-strong:0 28px 90px rgba(0,0,0,.09);
        }

        .page{
          background:linear-gradient(180deg,#f5f5f7 0%,#ffffff 46%,#f5f5f7 100%)!important;
          color:var(--apple-ink)!important;
          font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter","Segoe UI",Arial,sans-serif!important;
          overflow-x:hidden!important;
        }

        .topbar{
          height:74px!important;
          background:rgba(245,245,247,.74)!important;
          backdrop-filter:blur(28px)!important;
          border-bottom:1px solid rgba(0,0,0,.045)!important;
          position:sticky!important;
          top:0!important;
          z-index:50!important;
        }

        .logo{
          color:var(--apple-ink)!important;
          font-weight:760!important;
          letter-spacing:-.045em!important;
        }

        .logo span{
          color:var(--apple-ink)!important;
          background:none!important;
          -webkit-background-clip:initial!important;
        }

        .draft{
          background:rgba(255,255,255,.72)!important;
          border:1px solid rgba(0,0,0,.06)!important;
          color:var(--apple-muted)!important;
          box-shadow:none!important;
        }

        .back{
          background:var(--apple-ink)!important;
          color:white!important;
          box-shadow:0 12px 30px rgba(0,0,0,.14)!important;
        }

        .hero{
          padding-top:96px!important;
          padding-bottom:58px!important;
          perspective:1200px!important;
        }

        .eyebrow{
          color:var(--apple-muted)!important;
          background:transparent!important;
          border:0!important;
          box-shadow:none!important;
          text-transform:none!important;
          letter-spacing:0!important;
          font-size:14px!important;
          padding:0!important;
        }

        .eyebrow:before{
          display:none!important;
        }

        h1{
          font-weight:760!important;
          letter-spacing:-.075em!important;
          color:var(--apple-ink)!important;
          font-size:clamp(56px,7vw,108px)!important;
          line-height:.94!important;
        }

        h1 em{
          color:var(--apple-blue)!important;
          background:none!important;
          -webkit-background-clip:initial!important;
          font-style:normal!important;
        }

        .hero p{
          color:var(--apple-muted)!important;
          font-size:22px!important;
          line-height:1.45!important;
        }

        .heroGlass,.panel,.leftNav,.marketCard{
          background:rgba(255,255,255,.84)!important;
          border:1px solid var(--apple-line)!important;
          box-shadow:var(--apple-shadow)!important;
          backdrop-filter:blur(26px)!important;
        }

        .heroGlass{
          animation:appleFloatIn .9s ease both!important;
          transform-style:preserve-3d!important;
        }

        .heroMetric strong{
          color:var(--apple-ink)!important;
          background:none!important;
          -webkit-background-clip:initial!important;
          font-weight:760!important;
        }

        .track div{
          background:var(--apple-blue)!important;
        }

        .heroList span{
          background:#f5f5f7!important;
          border:1px solid rgba(0,0,0,.055)!important;
          color:#333336!important;
        }

        .workspace{
          perspective:1200px!important;
        }

        .leftNav{
          top:94px!important;
        }

        .leftNav a{
          color:var(--apple-muted)!important;
          transition:transform .18s ease, background .18s ease, color .18s ease!important;
        }

        .leftNav a:hover{
          background:#f5f5f7!important;
          color:var(--apple-ink)!important;
          transform:translateX(3px) translateZ(8px)!important;
        }

        .leftNav small,.req,.upload b{
          color:var(--apple-blue)!important;
        }

        .sectionTitle{
          animation:sectionReveal linear both!important;
          animation-timeline:view()!important;
          animation-range:entry 0% cover 28%!important;
        }

        .sectionTitle h2{
          color:var(--apple-ink)!important;
          font-weight:760!important;
          letter-spacing:-.055em!important;
        }

        .sectionTitle p{
          color:var(--apple-muted)!important;
        }

        input,select,textarea{
          background:#f5f5f7!important;
          border:1px solid rgba(0,0,0,.08)!important;
          border-radius:16px!important;
          color:var(--apple-ink)!important;
          transition:border-color .16s ease, background .16s ease, box-shadow .16s ease, transform .16s ease!important;
        }

        input:hover,select:hover,textarea:hover{
          background:#fff!important;
          border-color:rgba(0,113,227,.32)!important;
        }

        input:focus,select:focus,textarea:focus{
          background:#fff!important;
          border-color:var(--apple-blue)!important;
          box-shadow:0 0 0 4px rgba(0,113,227,.16)!important;
          transform:translateY(-1px)!important;
        }

        .brandShowcaseWide,.priceBox,.upload,.optionBlock,.field{
          animation:cardReveal linear both!important;
          animation-timeline:view()!important;
          animation-range:entry 0% cover 22%!important;
        }

        .brandShowcaseWide{
          background:linear-gradient(180deg,#fff,#f5f5f7)!important;
          border:1px solid var(--apple-line)!important;
          box-shadow:var(--apple-shadow)!important;
          transform-style:preserve-3d!important;
        }

        .brandLogoSlot{
          background:#fff!important;
          box-shadow:inset 0 0 0 1px rgba(0,0,0,.06),0 12px 32px rgba(0,0,0,.045)!important;
          transform:translateZ(18px)!important;
        }

        .brandFallback{
          background:var(--apple-ink)!important;
          color:#fff!important;
        }

        .brandPngLogo{
          transition:transform .22s ease!important;
        }

        .brandPngLogo:hover{
          transform:scale(1.04) rotateX(3deg)!important;
        }

        .pill,.optionItem,.colorItem,.priceBox,.upload,.preview,.check{
          background:#fff!important;
          border:1px solid rgba(0,0,0,.08)!important;
          box-shadow:0 8px 30px rgba(0,0,0,.035)!important;
          transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease!important;
          transform-style:preserve-3d!important;
        }

        .pill:hover,.optionItem:hover,.colorItem:hover,.upload:hover{
          transform:translateY(-3px) rotateX(2deg)!important;
          border-color:rgba(0,113,227,.30)!important;
          box-shadow:0 18px 54px rgba(0,0,0,.075)!important;
        }

        .optionItem.selected,.colorGrid.hasSelection .colorItem.selected,.customOtherBox.active{
          background:var(--apple-blue-soft)!important;
          border-color:var(--apple-blue)!important;
          box-shadow:0 16px 40px rgba(0,113,227,.12)!important;
        }

        .colorGrid.hasSelection .colorItem{
          opacity:.30!important;
          filter:grayscale(.9)!important;
        }

        .colorGrid.hasSelection .colorItem.selected{
          opacity:1!important;
          filter:none!important;
        }

        .colorItem.selected:after{
          background:var(--apple-blue)!important;
          color:white!important;
        }

        .critical{
          background:#fff5f5!important;
          border:1px solid rgba(180,35,24,.18)!important;
          color:#b42318!important;
        }

        .priceBoxMain{
          background:#fff!important;
          border:2px solid var(--apple-blue)!important;
          box-shadow:0 24px 70px rgba(0,113,227,.16)!important;
        }

        .priceBadge,.final button,.barTrack div{
          background:var(--apple-blue)!important;
          color:white!important;
        }

        .moneyInput span{
          background:#f5f5f7!important;
          color:var(--apple-muted)!important;
        }

        .photoQualityPanel{
          background:#fff!important;
          border:1px solid rgba(0,0,0,.07)!important;
          box-shadow:var(--apple-shadow)!important;
        }

        .photoQualityPanel p{
          color:var(--apple-muted)!important;
        }

        .photoQualityPanel span,.marketIdentity,.final{
          background:var(--apple-ink)!important;
          color:white!important;
        }

        .photoGuideImage{
          background:#f5f5f7!important;
          border:1px solid rgba(0,0,0,.06)!important;
        }

        .marketHeader b{
          color:var(--apple-blue)!important;
          background:var(--apple-blue-soft)!important;
        }

        .marketStats div{
          background:#f5f5f7!important;
          border:1px solid rgba(0,0,0,.06)!important;
        }

        .marketStats small,.sourceNote{
          color:var(--apple-muted)!important;
        }

        .barTrack{
          background:#e8e8ed!important;
        }

        .signal.green{background:#f0faf4!important;color:#2d8653!important}
        .signal.red{background:#fff5f5!important;color:#b42318!important}
        .signal.black{background:#f5f5f7!important;color:#1d1d1f!important}
        .signal.neutral{background:#f5f5f7!important;color:#6e6e73!important}

        @keyframes appleFloatIn{
          from{opacity:0;transform:translateY(24px) rotateX(8deg) scale(.98)}
          to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}
        }

        @keyframes cardReveal{
          from{opacity:.25;transform:translateY(34px) rotateX(7deg) scale(.985)}
          to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}
        }

        @keyframes sectionReveal{
          from{opacity:.35;transform:translateY(26px)}
          to{opacity:1;transform:translateY(0)}
        }

        @supports not (animation-timeline:view()){
          .sectionTitle,.field,.optionBlock,.priceBox,.upload,.brandShowcaseWide{
            animation:none!important;
          }
        }

        @media(max-width:900px){
          .draft{display:none!important}
          h1{font-size:clamp(44px,12vw,68px)!important}
        }


        .fieldHint{display:block;color:#6e6e73;font-size:11px;line-height:1.4;margin-top:-2px}


        .mileageGaugeBox{display:grid;gap:12px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:22px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,.035)}
        .mileageGaugeTop{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;color:#6e6e73;font-size:11px;font-weight:650}
        .mileageGaugeTop strong{font-size:18px;color:#1d1d1f;letter-spacing:-.03em;text-align:center}
        .mileageGaugeTop span:last-child{text-align:right}
        .mileageRange{padding:0!important;min-height:28px!important;background:transparent!important;border:0!important;box-shadow:none!important;accent-color:#0071e3}
        .mileagePrecise{min-height:46px!important;border-radius:14px!important;font-size:13px!important}


        .pricingGridExact{grid-template-columns:minmax(0,.92fr) minmax(0,1.24fr) minmax(0,.92fr)!important;align-items:stretch!important}
        .priceBoxMinimum{transform:scale(.97);transform-origin:center}
        .priceBoxDesired{transform:translateY(-8px) scale(1.03)!important;z-index:2;border:2px solid var(--apple-blue)!important;background:#fff!important;box-shadow:0 24px 70px rgba(0,113,227,.16)!important}
        .priceBoxDesired .priceLabel{font-size:18px!important}
        .moneyInputDesired input{font-size:31px!important;font-weight:760!important}
        .priceBoxInstantExact{position:relative;border:1.6px dashed rgba(0,0,0,.25)!important;background:#fff!important;overflow:hidden}
        .priceBoxInstantExact.instantEnabled{border-color:rgba(0,113,227,.42)!important}
        .priceBoxInstantExact.instantLocked{border:2px solid #2d8653!important;background:#f0faf4!important;box-shadow:0 22px 62px rgba(45,134,83,.16)!important}
        .instantHeader{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
        .instantHeader small{display:block;color:#6e6e73;font-size:11px;margin-top:3px}
        .instantCornerCheck{width:30px;height:30px;border-radius:999px;background:#2d8653;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;box-shadow:0 10px 28px rgba(45,134,83,.28)}
        .instantEnableLine,.instantCommitLine{display:flex;gap:10px;align-items:flex-start;font-size:12px;line-height:1.4;color:#6e6e73;font-weight:650}
        .instantEnableLine input,.instantCommitLine input{width:auto!important;min-height:auto!important;margin-top:2px}
        .instantCommitLine{background:#f0faf4;border:1px solid rgba(45,134,83,.20);border-radius:14px;padding:10px;color:#2d8653}
        .instantCommitLine.locked{opacity:.92}
        .priceInvalid{border-color:#b42318!important;background:#fff5f5!important}
        .priceInvalid input::placeholder{color:#b42318!important;opacity:1;font-size:12px}
        .priceError{color:#b42318;font-size:12px;font-weight:700;margin-top:-2px}
        .shakeField{animation:shakePrice .34s ease}
        .instantFlyingCheck{position:absolute;left:50%;top:50%;width:58px;height:58px;border-radius:50%;background:#2d8653;color:white;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:950;animation:instantCheckTravel .9s cubic-bezier(.16,.84,.28,1) forwards;pointer-events:none;z-index:5}
        @keyframes shakePrice{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
        @keyframes instantCheckTravel{0%{opacity:0;transform:translate(-50%,-50%) scale(.18)}18%{opacity:1;transform:translate(-50%,-50%) scale(1.18)}100%{opacity:1;transform:translate(calc(-50% + 128px),calc(-50% - 108px)) scale(.38)}}
        @media(max-width:1280px){.pricingGridExact{grid-template-columns:1fr!important}.priceBoxMinimum,.priceBoxDesired{transform:none!important}}


        /* V19 - Pricing section: 3 horizontal square cards */
        .pricingGridExact{
          display:grid!important;
          grid-template-columns:repeat(3,minmax(0,1fr))!important;
          gap:20px!important;
          align-items:stretch!important;
          width:100%!important;
        }

        .pricingGridExact .priceBox{
          aspect-ratio:1 / 1!important;
          min-height:270px!important;
          height:auto!important;
          display:flex!important;
          flex-direction:column!important;
          justify-content:space-between!important;
          padding:22px!important;
        }

        .pricingGridExact .priceBoxMinimum{
          transform:none!important;
        }

        .pricingGridExact .priceBoxDesired{
          transform:none!important;
          scale:1.035;
          z-index:2;
        }

        .pricingGridExact .priceBoxInstantExact{
          transform:none!important;
        }

        .pricingGridExact .moneyInput{
          min-height:58px!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput{
          min-height:70px!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput input{
          font-size:30px!important;
        }

        @media(max-width:1280px){
          .pricingGridExact{
            grid-template-columns:repeat(3,minmax(0,1fr))!important;
          }
          .pricingGridExact .priceBoxMinimum,
          .pricingGridExact .priceBoxDesired,
          .pricingGridExact .priceBoxInstantExact{
            transform:none!important;
          }
        }

        @media(max-width:760px){
          .pricingGridExact{
            grid-template-columns:1fr!important;
          }
          .pricingGridExact .priceBox{
            aspect-ratio:auto!important;
            min-height:auto!important;
          }
          .pricingGridExact .priceBoxDesired{
            scale:1!important;
          }
        }


        /* V20 - Pricing typography polish + single animated check */
        .pricingGridExact{
          gap:18px!important;
        }

        .pricingGridExact .priceBox{
          min-height:255px!important;
          padding:20px!important;
          border-radius:28px!important;
        }

        .pricingGridExact .priceLabel{
          font-size:17px!important;
          line-height:1.18!important;
          letter-spacing:-.025em!important;
          font-weight:740!important;
        }

        .pricingGridExact .priceBoxDesired .priceLabel{
          font-size:18px!important;
          line-height:1.15!important;
        }

        .pricingGridExact .priceBadge{
          font-size:11px!important;
          padding:7px 11px!important;
          margin-bottom:2px!important;
        }

        .pricingGridExact .moneyInput{
          min-height:52px!important;
          border-radius:18px!important;
        }

        .pricingGridExact .moneyInput input{
          font-size:22px!important;
          line-height:1!important;
          padding:12px 14px!important;
          font-weight:720!important;
        }

        .pricingGridExact .moneyInput span{
          font-size:11px!important;
          padding:0 12px!important;
          letter-spacing:.02em!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput{
          min-height:58px!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput input{
          font-size:28px!important;
          font-weight:740!important;
        }

        .pricingGridExact .priceBox p{
          font-size:15px!important;
          line-height:1.42!important;
          margin:8px 0 0!important;
          color:#6e6e73!important;
        }

        .priceBoxMinimum p,
        .priceBoxDesired p{
          font-size:15px!important;
        }

        .instantHeader{
          min-height:42px!important;
        }

        .instantHeader small{
          font-size:12px!important;
          line-height:1.2!important;
        }

        .instantEnableLine,
        .instantCommitLine{
          font-size:12px!important;
          line-height:1.32!important;
          gap:8px!important;
        }

        .instantCommitLine{
          padding:9px 10px!important;
          border-radius:13px!important;
        }

        .instantCornerCheck{
          display:none!important;
        }

        .priceBoxInstantExact.instantLocked{
          position:relative!important;
        }

        .instantFlyingCheck{
          position:absolute!important;
          left:50%!important;
          top:50%!important;
          width:60px!important;
          height:60px!important;
          border-radius:50%!important;
          background:#2d8653!important;
          color:#fff!important;
          display:flex!important;
          align-items:center!important;
          justify-content:center!important;
          font-size:34px!important;
          font-weight:900!important;
          z-index:8!important;
          pointer-events:none!important;
          animation:singleCheckTravel .9s cubic-bezier(.16,.84,.28,1) forwards!important;
          box-shadow:0 18px 45px rgba(45,134,83,.28)!important;
        }

        @keyframes singleCheckTravel{
          0%{
            opacity:0;
            transform:translate(-50%,-50%) scale(.25);
          }
          18%{
            opacity:1;
            transform:translate(-50%,-50%) scale(1.18);
          }
          72%{
            opacity:1;
          }
          100%{
            opacity:1;
            left:calc(100% - 26px);
            top:28px;
            transform:translate(-50%,-50%) scale(.72);
          }
        }

        @media(max-width:1280px){
          .pricingGridExact .priceBox{
            min-height:245px!important;
          }
        }

        @media(max-width:760px){
          .pricingGridExact .priceBox{
            min-height:auto!important;
          }
          .pricingGridExact .priceBoxDesired .moneyInput input{
            font-size:24px!important;
          }
        }


        /* V21 - Pricing amount font reduced + reliable check travel */
        .pricingGridExact .moneyInput input{
          font-size:19px!important;
          font-weight:700!important;
          letter-spacing:-.02em!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput input{
          font-size:22px!important;
          font-weight:720!important;
          letter-spacing:-.025em!important;
        }

        .pricingGridExact .moneyInput span{
          font-size:10px!important;
          padding:0 10px!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput{
          min-height:56px!important;
        }

        .pricingGridExact .moneyInput{
          min-height:50px!important;
        }

        .instantFlyingCheck{
          left:auto!important;
          top:18px!important;
          right:18px!important;
          width:42px!important;
          height:42px!important;
          font-size:26px!important;
          transform-origin:center!important;
          animation:singleCheckTravelV21 .95s cubic-bezier(.16,.84,.28,1) forwards!important;
        }

        @keyframes singleCheckTravelV21{
          0%{
            opacity:0;
            transform:translate(-145px,115px) scale(.30);
          }
          18%{
            opacity:1;
            transform:translate(-145px,115px) scale(1.75);
          }
          55%{
            opacity:1;
            transform:translate(-68px,55px) scale(1.15);
          }
          100%{
            opacity:1;
            transform:translate(0,0) scale(1);
          }
        }

        @media(max-width:760px){
          .pricingGridExact .moneyInput input,
          .pricingGridExact .priceBoxDesired .moneyInput input{
            font-size:20px!important;
          }
          .instantFlyingCheck{
            right:16px!important;
            top:16px!important;
          }
        }


        /* V22 - Smaller amount typography + smaller final check top-right */
        .pricingGridExact .moneyInput input{
          font-size:16px!important;
          font-weight:600!important;
          letter-spacing:-.01em!important;
        }

        .pricingGridExact .moneyInput input::placeholder{
          font-size:14px!important;
          font-weight:500!important;
          color:#86868b!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput input{
          font-size:18px!important;
          font-weight:620!important;
          letter-spacing:-.015em!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput input::placeholder{
          font-size:15px!important;
          font-weight:500!important;
          color:#86868b!important;
        }

        .pricingGridExact .moneyInput span{
          font-size:9px!important;
          font-weight:650!important;
          padding:0 9px!important;
        }

        .pricingGridExact .moneyInput{
          min-height:46px!important;
        }

        .pricingGridExact .priceBoxDesired .moneyInput{
          min-height:50px!important;
        }

        .instantFlyingCheck{
          right:10px!important;
          top:10px!important;
          width:24px!important;
          height:24px!important;
          font-size:15px!important;
          line-height:1!important;
          box-shadow:0 8px 18px rgba(45,134,83,.22)!important;
          animation:singleCheckTravelV22 .95s cubic-bezier(.16,.84,.28,1) forwards!important;
        }

        @keyframes singleCheckTravelV22{
          0%{
            opacity:0;
            transform:translate(-165px,135px) scale(.35);
          }
          18%{
            opacity:1;
            transform:translate(-165px,135px) scale(3.00);
          }
          58%{
            opacity:1;
            transform:translate(-72px,58px) scale(1.55);
          }
          100%{
            opacity:1;
            transform:translate(0,0) scale(1);
          }
        }

        @media(max-width:760px){
          .pricingGridExact .moneyInput input,
          .pricingGridExact .priceBoxDesired .moneyInput input{
            font-size:17px!important;
          }

          .instantFlyingCheck{
            right:10px!important;
            top:10px!important;
            width:24px!important;
            height:24px!important;
            font-size:15px!important;
          }
        }


        /* V23 - Smooth immediate-price check animation + no negative price UX */
        .instantFlyingCheck{
          will-change:transform, opacity!important;
          animation:singleCheckTravelV23 1.18s cubic-bezier(.22,1,.36,1) forwards!important;
        }

        @keyframes singleCheckTravelV23{
          0%{
            opacity:0;
            transform:translate3d(-165px,135px,0) scale(.32);
          }
          12%{
            opacity:1;
            transform:translate3d(-165px,135px,0) scale(2.85);
          }
          34%{
            opacity:1;
            transform:translate3d(-132px,108px,0) scale(2.35);
          }
          56%{
            opacity:1;
            transform:translate3d(-86px,70px,0) scale(1.70);
          }
          78%{
            opacity:1;
            transform:translate3d(-34px,28px,0) scale(1.18);
          }
          100%{
            opacity:1;
            transform:translate3d(0,0,0) scale(1);
          }
        }

        .pricingGridExact input[type="number"]{
          appearance:textfield;
          -moz-appearance:textfield;
        }

        .pricingGridExact input[type="number"]::-webkit-outer-spin-button,
        .pricingGridExact input[type="number"]::-webkit-inner-spin-button{
          -webkit-appearance:none;
          margin:0;
        }


        /* V24 - Ultra smooth 100-step check animation */
        .instantFlyingCheck{
          will-change:transform, opacity!important;
          animation:singleCheckTravelV24 1.35s linear forwards!important;
          transform:translate3d(-165px,135px,0) scale(.32);
        }

        @keyframes singleCheckTravelV24{
          0%{opacity:0.000;transform:translate3d(-165.00px,135.00px,0) scale(0.320);}
          1%{opacity:0.125;transform:translate3d(-160.10px,130.99px,0) scale(0.478);}
          2%{opacity:0.250;transform:translate3d(-155.30px,127.06px,0) scale(0.636);}
          3%{opacity:0.375;transform:translate3d(-150.59px,123.21px,0) scale(0.794);}
          4%{opacity:0.500;transform:translate3d(-145.98px,119.44px,0) scale(0.953);}
          5%{opacity:0.625;transform:translate3d(-141.47px,115.75px,0) scale(1.111);}
          6%{opacity:0.750;transform:translate3d(-137.05px,112.13px,0) scale(1.269);}
          7%{opacity:0.875;transform:translate3d(-132.72px,108.59px,0) scale(1.427);}
          8%{opacity:1.000;transform:translate3d(-128.48px,105.12px,0) scale(1.585);}
          9%{opacity:1.000;transform:translate3d(-124.34px,101.73px,0) scale(1.743);}
          10%{opacity:1.000;transform:translate3d(-120.29px,98.42px,0) scale(1.901);}
          11%{opacity:1.000;transform:translate3d(-116.32px,95.17px,0) scale(2.059);}
          12%{opacity:1.000;transform:translate3d(-112.44px,92.00px,0) scale(2.218);}
          13%{opacity:1.000;transform:translate3d(-108.65px,88.90px,0) scale(2.376);}
          14%{opacity:1.000;transform:translate3d(-104.95px,85.87px,0) scale(2.534);}
          15%{opacity:1.000;transform:translate3d(-101.33px,82.91px,0) scale(2.692);}
          16%{opacity:1.000;transform:translate3d(-97.80px,80.02px,0) scale(2.850);}
          17%{opacity:1.000;transform:translate3d(-94.34px,77.19px,0) scale(2.785);}
          18%{opacity:1.000;transform:translate3d(-90.98px,74.43px,0) scale(2.721);}
          19%{opacity:1.000;transform:translate3d(-87.69px,71.74px,0) scale(2.659);}
          20%{opacity:1.000;transform:translate3d(-84.48px,69.12px,0) scale(2.598);}
          21%{opacity:1.000;transform:translate3d(-81.35px,66.56px,0) scale(2.539);}
          22%{opacity:1.000;transform:translate3d(-78.30px,64.06px,0) scale(2.481);}
          23%{opacity:1.000;transform:translate3d(-75.33px,61.63px,0) scale(2.425);}
          24%{opacity:1.000;transform:translate3d(-72.43px,59.26px,0) scale(2.370);}
          25%{opacity:1.000;transform:translate3d(-69.61px,56.95px,0) scale(2.317);}
          26%{opacity:1.000;transform:translate3d(-66.86px,54.71px,0) scale(2.265);}
          27%{opacity:1.000;transform:translate3d(-64.19px,52.52px,0) scale(2.214);}
          28%{opacity:1.000;transform:translate3d(-61.59px,50.39px,0) scale(2.165);}
          29%{opacity:1.000;transform:translate3d(-59.06px,48.32px,0) scale(2.117);}
          30%{opacity:1.000;transform:translate3d(-56.59px,46.30px,0) scale(2.071);}
          31%{opacity:1.000;transform:translate3d(-54.20px,44.35px,0) scale(2.025);}
          32%{opacity:1.000;transform:translate3d(-51.88px,42.45px,0) scale(1.981);}
          33%{opacity:1.000;transform:translate3d(-49.63px,40.60px,0) scale(1.939);}
          34%{opacity:1.000;transform:translate3d(-47.44px,38.81px,0) scale(1.897);}
          35%{opacity:1.000;transform:translate3d(-45.31px,37.07px,0) scale(1.857);}
          36%{opacity:1.000;transform:translate3d(-43.25px,35.39px,0) scale(1.818);}
          37%{opacity:1.000;transform:translate3d(-41.26px,33.76px,0) scale(1.780);}
          38%{opacity:1.000;transform:translate3d(-39.32px,32.17px,0) scale(1.744);}
          39%{opacity:1.000;transform:translate3d(-37.45px,30.64px,0) scale(1.708);}
          40%{opacity:1.000;transform:translate3d(-35.64px,29.16px,0) scale(1.674);}
          41%{opacity:1.000;transform:translate3d(-33.89px,27.73px,0) scale(1.641);}
          42%{opacity:1.000;transform:translate3d(-32.19px,26.34px,0) scale(1.609);}
          43%{opacity:1.000;transform:translate3d(-30.56px,25.00px,0) scale(1.578);}
          44%{opacity:1.000;transform:translate3d(-28.98px,23.71px,0) scale(1.548);}
          45%{opacity:1.000;transform:translate3d(-27.45px,22.46px,0) scale(1.519);}
          46%{opacity:1.000;transform:translate3d(-25.98px,21.26px,0) scale(1.491);}
          47%{opacity:1.000;transform:translate3d(-24.56px,20.10px,0) scale(1.465);}
          48%{opacity:1.000;transform:translate3d(-23.20px,18.98px,0) scale(1.439);}
          49%{opacity:1.000;transform:translate3d(-21.89px,17.91px,0) scale(1.414);}
          50%{opacity:1.000;transform:translate3d(-20.62px,16.88px,0) scale(1.390);}
          51%{opacity:1.000;transform:translate3d(-19.41px,15.88px,0) scale(1.367);}
          52%{opacity:1.000;transform:translate3d(-18.25px,14.93px,0) scale(1.345);}
          53%{opacity:1.000;transform:translate3d(-17.13px,14.02px,0) scale(1.324);}
          54%{opacity:1.000;transform:translate3d(-16.06px,13.14px,0) scale(1.304);}
          55%{opacity:1.000;transform:translate3d(-15.04px,12.30px,0) scale(1.284);}
          56%{opacity:1.000;transform:translate3d(-14.06px,11.50px,0) scale(1.266);}
          57%{opacity:1.000;transform:translate3d(-13.12px,10.73px,0) scale(1.248);}
          58%{opacity:1.000;transform:translate3d(-12.22px,10.00px,0) scale(1.231);}
          59%{opacity:1.000;transform:translate3d(-11.37px,9.30px,0) scale(1.215);}
          60%{opacity:1.000;transform:translate3d(-10.56px,8.64px,0) scale(1.200);}
          61%{opacity:1.000;transform:translate3d(-9.79px,8.01px,0) scale(1.185);}
          62%{opacity:1.000;transform:translate3d(-9.05px,7.41px,0) scale(1.171);}
          63%{opacity:1.000;transform:translate3d(-8.36px,6.84px,0) scale(1.158);}
          64%{opacity:1.000;transform:translate3d(-7.70px,6.30px,0) scale(1.146);}
          65%{opacity:1.000;transform:translate3d(-7.07px,5.79px,0) scale(1.134);}
          66%{opacity:1.000;transform:translate3d(-6.49px,5.31px,0) scale(1.123);}
          67%{opacity:1.000;transform:translate3d(-5.93px,4.85px,0) scale(1.112);}
          68%{opacity:1.000;transform:translate3d(-5.41px,4.42px,0) scale(1.102);}
          69%{opacity:1.000;transform:translate3d(-4.92px,4.02px,0) scale(1.093);}
          70%{opacity:1.000;transform:translate3d(-4.46px,3.65px,0) scale(1.084);}
          71%{opacity:1.000;transform:translate3d(-4.02px,3.29px,0) scale(1.076);}
          72%{opacity:1.000;transform:translate3d(-3.62px,2.96px,0) scale(1.069);}
          73%{opacity:1.000;transform:translate3d(-3.25px,2.66px,0) scale(1.061);}
          74%{opacity:1.000;transform:translate3d(-2.90px,2.37px,0) scale(1.055);}
          75%{opacity:1.000;transform:translate3d(-2.58px,2.11px,0) scale(1.049);}
          76%{opacity:1.000;transform:translate3d(-2.28px,1.87px,0) scale(1.043);}
          77%{opacity:1.000;transform:translate3d(-2.01px,1.64px,0) scale(1.038);}
          78%{opacity:1.000;transform:translate3d(-1.76px,1.44px,0) scale(1.033);}
          79%{opacity:1.000;transform:translate3d(-1.53px,1.25px,0) scale(1.029);}
          80%{opacity:1.000;transform:translate3d(-1.32px,1.08px,0) scale(1.025);}
          81%{opacity:1.000;transform:translate3d(-1.13px,0.93px,0) scale(1.021);}
          82%{opacity:1.000;transform:translate3d(-0.96px,0.79px,0) scale(1.018);}
          83%{opacity:1.000;transform:translate3d(-0.81px,0.66px,0) scale(1.015);}
          84%{opacity:1.000;transform:translate3d(-0.68px,0.55px,0) scale(1.013);}
          85%{opacity:1.000;transform:translate3d(-0.56px,0.46px,0) scale(1.011);}
          86%{opacity:1.000;transform:translate3d(-0.45px,0.37px,0) scale(1.009);}
          87%{opacity:1.000;transform:translate3d(-0.36px,0.30px,0) scale(1.007);}
          88%{opacity:1.000;transform:translate3d(-0.29px,0.23px,0) scale(1.005);}
          89%{opacity:1.000;transform:translate3d(-0.22px,0.18px,0) scale(1.004);}
          90%{opacity:1.000;transform:translate3d(-0.16px,0.13px,0) scale(1.003);}
          91%{opacity:1.000;transform:translate3d(-0.12px,0.10px,0) scale(1.002);}
          92%{opacity:1.000;transform:translate3d(-0.08px,0.07px,0) scale(1.002);}
          93%{opacity:1.000;transform:translate3d(-0.06px,0.05px,0) scale(1.001);}
          94%{opacity:1.000;transform:translate3d(-0.04px,0.03px,0) scale(1.001);}
          95%{opacity:1.000;transform:translate3d(-0.02px,0.02px,0) scale(1.000);}
          96%{opacity:1.000;transform:translate3d(-0.01px,0.01px,0) scale(1.000);}
          97%{opacity:1.000;transform:translate3d(-0.00px,0.00px,0) scale(1.000);}
          98%{opacity:1.000;transform:translate3d(-0.00px,0.00px,0) scale(1.000);}
          99%{opacity:1.000;transform:translate3d(-0.00px,0.00px,0) scale(1.000);}
          100%{opacity:1.000;transform:translate3d(0.00px,0.00px,0) scale(1.000);}
        }


        /* V25 - Premium experience: live preview, scoring, photo validation */
        .livePreviewCard,.qualityCard{
          border-radius:34px;
          background:rgba(255,255,255,.84);
          border:1px solid rgba(0,0,0,.06);
          box-shadow:0 18px 60px rgba(0,0,0,.055);
          overflow:hidden;
          margin-bottom:18px;
          backdrop-filter:blur(24px);
        }

        .livePreviewMedia{
          height:168px;
          background:#f5f5f7;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .livePreviewMedia img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .livePreviewEmpty{
          color:#86868b;
          font-size:13px;
          font-weight:650;
        }

        .livePreviewBody{
          padding:18px;
          display:grid;
          gap:8px;
        }

        .livePreviewBrand{
          display:flex;
          align-items:center;
          gap:9px;
          color:#6e6e73;
          font-size:13px;
          font-weight:650;
        }

        .livePreviewBrand img{
          width:24px;
          height:24px;
          object-fit:contain;
        }

        .livePreviewBody strong{
          font-size:20px;
          letter-spacing:-.04em;
        }

        .livePreviewBody p{
          margin:0;
          color:#6e6e73;
          font-size:13px;
          line-height:1.45;
        }

        .livePreviewBody b{
          font-size:22px;
          letter-spacing:-.04em;
        }

        .verifiedMini{
          width:max-content;
          background:#f0faf4;
          color:#2d8653;
          border:1px solid rgba(45,134,83,.18);
          border-radius:999px;
          padding:6px 9px;
          font-size:11px;
          font-weight:760;
        }

        .qualityCard{
          padding:18px;
        }

        .qualityHeader{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
        }

        .qualityHeader span{
          color:#6e6e73;
          font-size:13px;
          font-weight:650;
        }

        .qualityHeader strong{
          font-size:28px;
          letter-spacing:-.05em;
        }

        .qualityTrack{
          height:9px;
          background:#e8e8ed;
          border-radius:999px;
          overflow:hidden;
          margin:12px 0;
        }

        .qualityTrack div{
          height:100%;
          background:#0071e3;
          border-radius:999px;
        }

        .qualityCard b{
          display:block;
          font-size:16px;
          margin-bottom:4px;
        }

        .qualityCard p{
          margin:0;
          color:#6e6e73;
          font-size:12px;
          line-height:1.45;
        }

        .recommendedBox{
          background:#f0f7ff;
          border:1px solid rgba(0,113,227,.14);
          border-radius:18px;
          padding:13px;
          margin-bottom:14px;
          display:grid;
          gap:4px;
        }

        .recommendedBox small{
          color:#0071e3;
          font-size:10px;
          text-transform:uppercase;
          font-weight:760;
          letter-spacing:.04em;
        }

        .recommendedBox strong{
          font-size:17px;
          letter-spacing:-.03em;
        }

        .recommendedBox span{
          color:#6e6e73;
          font-size:12px;
        }

        .photoAdded{
          display:inline-flex;
          width:max-content;
          background:#f0faf4!important;
          color:#2d8653!important;
          border:1px solid rgba(45,134,83,.18)!important;
          border-radius:999px;
          padding:5px 9px;
          font-size:11px;
          font-style:normal;
          font-weight:760;
        }

        .finalReview{
          margin-top:36px;
          border-radius:34px;
          background:#1d1d1f;
          box-shadow:0 30px 90px rgba(0,0,0,.20);
          color:white;
          padding:26px;
          display:flex;
          justify-content:space-between;
          gap:24px;
          align-items:flex-start;
        }

        .finalReview p{
          color:rgba(255,255,255,.64);
          margin:6px 0 0;
        }

        .finalReview ul{
          margin:14px 0 0;
          padding-left:18px;
          color:rgba(255,255,255,.78);
          line-height:1.6;
          font-size:13px;
        }

        .finalReview button{
          background:#0071e3;
          color:white;
          border:0;
          border-radius:999px;
          padding:16px 24px;
          font-weight:760;
          white-space:nowrap;
        }

        @media(max-width:900px){
          .finalReview{
            flex-direction:column;
          }
        }


        /* V27 - Build-safe true multi-step journey */
        .stepPanel{min-height:680px}
        .stepHeader{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(0,0,0,.06)}
        .stepHeader span{color:#0071e3;font-size:12px;font-weight:760}
        .stepHeader h2{margin:6px 0 6px;font-size:42px;line-height:1;letter-spacing:-.06em;font-weight:760;color:#1d1d1f}
        .stepHeader p{margin:0;color:#6e6e73;line-height:1.5;max-width:660px}
        .stepPercent{min-width:76px;height:76px;border-radius:50%;background:#f0f7ff;color:#0071e3;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:760;box-shadow:inset 0 0 0 1px rgba(0,113,227,.14)}
        .stepProgress{height:8px;background:#e8e8ed;border-radius:999px;overflow:hidden;margin-bottom:32px}
        .stepProgress div{height:100%;background:#0071e3;border-radius:999px;transition:width .45s cubic-bezier(.22,1,.36,1)}
        .journeyPane{display:none;animation:journeyPaneIn .42s cubic-bezier(.22,1,.36,1) both}
        .journeyPane.active{display:block}
        .stepActions{margin-top:34px;padding-top:22px;border-top:1px solid rgba(0,0,0,.06);display:flex;justify-content:space-between;gap:14px}
        .primaryStep,.secondaryStep{min-height:48px;border:0;border-radius:999px;padding:0 22px;font-weight:760;cursor:pointer}
        .primaryStep{background:#0071e3;color:white;box-shadow:0 16px 38px rgba(0,113,227,.22)}
        .secondaryStep{background:#f5f5f7;color:#1d1d1f}
        .secondaryStep:disabled{opacity:.4;cursor:not-allowed}
        .leftNav a{display:none!important}
        .leftNav button{width:100%;display:flex;align-items:center;gap:10px;padding:10px 11px;border-radius:16px;border:0;background:transparent;color:#6e6e73;font-size:13px;font-weight:650;cursor:pointer;text-align:left;transition:transform .18s ease,background .18s ease,color .18s ease}
        .leftNav button:hover{background:#f5f5f7;color:#1d1d1f;transform:translateX(3px)}
        .leftNav button small{color:#0071e3;font-weight:760}
        .leftNav button.activeStepNav{background:#1d1d1f;color:#fff}
        .leftNav button.activeStepNav small{color:#fff;opacity:.72}
        @keyframes journeyPaneIn{from{opacity:0;transform:translateY(18px) scale(.992)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:900px){.stepHeader{flex-direction:column}.stepPercent{width:64px;height:64px;min-width:64px;font-size:17px}.stepHeader h2{font-size:34px}}


        /* V28 - Step actions always visible + mandatory fields validation */
        .persistentStepActions{
          display:flex!important;
          position:sticky;
          bottom:18px;
          z-index:15;
          background:rgba(255,255,255,.86);
          backdrop-filter:blur(22px);
          border:1px solid rgba(0,0,0,.06);
          border-radius:26px;
          padding:14px;
          box-shadow:0 18px 60px rgba(0,0,0,.09);
        }

        .stepActionRight{
          display:flex;
          align-items:center;
          gap:12px;
          margin-left:auto;
        }

        .stepValidationHint{
          color:#b42318;
          font-size:12px;
          font-weight:650;
          max-width:260px;
          text-align:right;
          line-height:1.35;
        }

        .primaryStep:disabled{
          opacity:.42;
          cursor:not-allowed;
          box-shadow:none!important;
          background:#8ebff0!important;
        }

        @media(max-width:900px){
          .persistentStepActions{
            position:static;
            flex-direction:column;
            align-items:stretch;
          }
          .stepActionRight{
            margin-left:0;
            flex-direction:column;
            align-items:stretch;
          }
          .stepValidationHint{
            max-width:none;
            text-align:left;
          }
        }


        /* V29 - Locked left navigation */
        .leftNav button.lockedStepNav{
          opacity:.42;
          cursor:not-allowed;
          pointer-events:auto;
        }

        .leftNav button.lockedStepNav:hover{
          background:transparent!important;
          color:#6e6e73!important;
          transform:none!important;
        }

        .leftNav button em{
          margin-left:auto;
          font-style:normal;
          font-size:11px;
          opacity:.72;
        }


        /* V30 - Phone numeric-only + stable left navigation */
        input[type="tel"]{
          letter-spacing:.01em;
        }


        /* V31 - Phone 10 digits required + no scroll on step navigation */
        .fieldHintError{
          color:#b42318!important;
          font-weight:650;
        }


        /* V34 - Registration section JSX fixed */
        .subSectionBox{
          margin-top:28px;
          background:#fff;
          border:1px solid rgba(0,0,0,.07);
          border-radius:28px;
          padding:22px;
          box-shadow:0 12px 38px rgba(0,0,0,.045);
        }
        .subSectionBox h3{
          margin:0;
          font-size:22px;
          line-height:1.1;
          letter-spacing:-.04em;
          color:#1d1d1f;
        }
        .subSectionBox p{
          margin:6px 0 18px;
          color:#6e6e73;
          line-height:1.5;
        }


        /* V36 - Recette: navigation libre */
        .recetteBadge{
          margin:0 8px 12px;
          padding:8px 10px;
          border-radius:999px;
          background:#f0f7ff;
          color:#0071e3;
          font-size:11px;
          font-weight:760;
          text-align:center;
        }

        .leftNav button{
          opacity:1!important;
          cursor:pointer!important;
        }

        .leftNav button em{
          display:none!important;
        }

      `}</style>
    </main>
  );
}

function Section({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return <div id={id} className="sectionTitle"><h2>{title}</h2><p>{subtitle}</p></div>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return <div className="field"><label>{label} {required && <span className="req">*</span>}</label>{children}</div>;
}

function PillGroup({ items, onPick }: { items: string[]; onPick: (value: string) => void }) {
  return <div className="pillGroup">{items.map(item => <label key={item} className="pill"><input type="radio" name={items.join("-")} onChange={() => onPick(item)} />{item}</label>)}</div>;
}

function ColorGrid({ items, selectedColor, onPick }: { items: string[]; selectedColor: string; onPick: (value: string) => void }) {
  const colors: Record<string, string> = { Beige:"#d7b98c", Bleu:"#3267d6", Brun:"#7a4f16", Jaune:"#f1d000", Or:"#c9a227", Vert:"#73b63a", Gris:"#a8a8a8", Orange:"#f97316", Rouge:"#ef4444", Noir:"#2f3437", Argent:"#d8d8d8", Violet:"#8b5cf6", Blanc:"#fff", Mat:"#e5e7eb", Métallique:"#cbd5e1" };
  return <div className={`colorGrid ${selectedColor ? "hasSelection" : ""}`}>{items.map(item => <button key={item} type="button" className={`colorItem ${selectedColor === item ? "selected" : ""}`} onClick={() => onPick(item)}><span className="swatch" style={{ background: colors[item] || "#ddd" }} />{item}</button>)}</div>;
}

function OptionBlock({ title, items, selected, toggle, customPrefix, customFields, toggleCustom, setCustomValue }: { title: string; items: string[]; selected: string[]; toggle: (value: string) => void; customPrefix: string; customFields: Record<string, { checked: boolean; value: string }>; toggleCustom: (key: string) => void; setCustomValue: (key: string, value: string) => void }) {
  const customKeys = [`${customPrefix}_other1`, `${customPrefix}_other2`, `${customPrefix}_other3`];
  return (
    <div className="optionBlock">
      <h3>{title}</h3>
      <div className="optionsGrid">{items.map(item => <label key={item} className={`optionItem ${selected.includes(item) ? "selected" : ""}`}><input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} /><span>{item}</span></label>)}</div>
      <div className="customOtherGrid">{customKeys.map((key, index) => {
        const checked = customFields[key]?.checked || false;
        return <div key={key} className={`customOtherBox ${checked ? "active" : ""}`}><label className="customOtherCheck"><input type="checkbox" checked={checked} onChange={() => toggleCustom(key)} /><span>Autre {index + 1}</span></label><input className="customOtherInput" type="text" placeholder="Préciser l’équipement" disabled={!checked} value={customFields[key]?.value || ""} onChange={e => setCustomValue(key, e.target.value)} /></div>;
      })}</div>
    </div>
  );
}

function PriceBox({ label, placeholder, text, onChange, main }: { label: string; placeholder: string; text: string; onChange: (value: string) => void; main?: boolean }) {
  return <div className={`priceBox ${main ? "priceBoxMain" : ""}`}>{main && <div className="priceBadge">Prix de référence</div>}<div className="priceLabel">{label} <span>*</span></div><div className="moneyInput"><input type="number" min="0" inputMode="numeric" placeholder={placeholder} onKeyDown={e => { if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault(); }} onChange={e => onChange(Number(e.target.value) < 0 ? "" : e.target.value)} /><span>Dirhams</span></div><p>{text}</p></div>;
}
