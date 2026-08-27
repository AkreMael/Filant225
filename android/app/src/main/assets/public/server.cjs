var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_googleapis = require("googleapis");
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_express_session = __toESM(require("express-session"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_firebase_admin = __toESM(require("firebase-admin"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
var import_auth = require("firebase/auth");
var import_genai = require("@google/genai");
var import_jimp = require("jimp");
var import_fonts = require("jimp/fonts");

// utils/shareUtils.ts
function decodeAdId(publicId) {
  if (!publicId) return "";
  let cleanId = publicId.trim();
  if (cleanId.startsWith("FL-")) {
    cleanId = cleanId.substring(3);
  } else {
    const onlyDigits = cleanId.replace(/\D/g, "");
    if (onlyDigits.length >= 8) return onlyDigits;
  }
  try {
    const parsed = parseInt(cleanId, 36);
    if (isNaN(parsed)) return "";
    const scrambled = parsed.toString().substring(1);
    const key = [3, 7, 1, 9, 4, 8, 2, 5, 6, 0];
    let phone = "";
    for (let i = 0; i < scrambled.length; i++) {
      const digit = parseInt(scrambled[i], 10);
      let shifted = (digit - key[i % key.length]) % 10;
      if (shifted < 0) shifted += 10;
      phone += shifted;
    }
    return phone;
  } catch (e) {
    return cleanId.replace(/\D/g, "");
  }
}

// server.ts
var import_meta = {};
var resolvedFilename = typeof import_meta !== "undefined" && import_meta.url ? (0, import_url.fileURLToPath)(import_meta.url) : __filename;
var resolvedDirname = typeof import_meta !== "undefined" && import_meta.url ? import_path.default.dirname(resolvedFilename) : __dirname;
var configPath = [
  import_path.default.join(process.cwd(), "firebase-applet-config.json"),
  import_path.default.join(resolvedDirname, "firebase-applet-config.json"),
  import_path.default.join(resolvedDirname, "..", "firebase-applet-config.json")
].find((p) => import_fs.default.existsSync(p));
if (!configPath) {
  throw new Error("firebase-applet-config.json not found in working directory or bundle directory.");
}
var firebaseConfig = JSON.parse(import_fs.default.readFileSync(configPath, "utf8"));
if (!import_firebase_admin.default.apps.length) {
  import_firebase_admin.default.initializeApp({
    projectId: process.env.GCP_PROJECT_ID || firebaseConfig.projectId
  });
}
var firestore = import_firebase_admin.default.firestore();
console.log("Firestore initialized successfully with project:", import_firebase_admin.default.app().options.projectId);
var clientApp = (0, import_app.initializeApp)(firebaseConfig);
var clientDb = (0, import_firestore.getFirestore)(clientApp);
var clientAuth = (0, import_auth.getAuth)(clientApp);
async function getClientDb() {
  if (!clientAuth.currentUser) {
    try {
      await (0, import_auth.signInAnonymously)(clientAuth);
      console.log("Client SDK authenticated anonymously for server-side Firestore operations.");
    } catch (authError) {
      console.error("Error signing in anonymously in Client SDK server-side:", authError);
    }
  }
  return clientDb;
}
var getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing from environment variables.");
    return null;
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.set("trust proxy", 1);
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
  const uploadsDir = import_path.default.join(resolvedDirname, "public", "uploads");
  if (!import_fs.default.existsSync(uploadsDir)) {
    import_fs.default.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", import_express.default.static(uploadsDir));
  app.get("/api/ping", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.json({ status: "ok", timestamp: Date.now() });
  });
  app.post("/api/upload-base64", async (req, res) => {
    try {
      const { base64, filename } = req.body;
      if (!base64) {
        return res.status(400).json({ error: "No base64 data provided" });
      }
      const matches = base64.match(/^data:([A-Za-z0-9\-+\/]+)(?:;[^;]+)*;base64,(.+)$/);
      let dataBuffer;
      let extension = "jpg";
      if (matches && matches.length === 3) {
        const fullMime = matches[1].toLowerCase();
        if (fullMime.includes("webm")) extension = "webm";
        else if (fullMime.includes("ogg") || fullMime.includes("opus")) extension = "ogg";
        else if (fullMime.includes("mp4") || fullMime.includes("m4a") || fullMime.includes("aac")) extension = "m4a";
        else if (fullMime.includes("wav")) extension = "wav";
        else if (fullMime.includes("mpeg") || fullMime.includes("mp3")) extension = "mp3";
        else if (fullMime.includes("png")) extension = "png";
        else if (fullMime.includes("webp")) extension = "webp";
        else if (fullMime.includes("pdf")) extension = "pdf";
        else extension = fullMime.split("/")[1] || "bin";
        dataBuffer = Buffer.from(matches[2], "base64");
      } else {
        dataBuffer = Buffer.from(base64, "base64");
      }
      const uniqName = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${extension}`;
      const savePath = import_path.default.join(uploadsDir, uniqName);
      import_fs.default.writeFileSync(savePath, dataBuffer);
      console.log(`Saved temporary local file upload: /uploads/${uniqName}`);
      res.json({ url: `/uploads/${uniqName}` });
    } catch (err) {
      console.error("Error saving base64 uploaded file on server:", err);
      res.status(500).json({ error: "Failed to upload file to server", details: err.message });
    }
  });
  app.post("/api/transcribe-audio", async (req, res) => {
    try {
      const { audioBase64, mimeType = "audio/webm" } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: "Aucun audio fourni pour la transcription", transcription: "" });
      }
      const matches = audioBase64.match(/^data:([^;]+);base64,(.+)$/);
      let cleanMime = mimeType;
      let rawBase64 = audioBase64;
      if (matches && matches.length === 3) {
        cleanMime = matches[1].split(";")[0] || mimeType;
        rawBase64 = matches[2];
      }
      if (cleanMime.includes("webm")) cleanMime = "audio/webm";
      else if (cleanMime.includes("ogg")) cleanMime = "audio/ogg";
      else if (cleanMime.includes("mp4") || cleanMime.includes("m4a") || cleanMime.includes("aac")) cleanMime = "audio/mp4";
      else if (cleanMime.includes("wav")) cleanMime = "audio/wav";
      else if (cleanMime.includes("mpeg") || cleanMime.includes("mp3")) cleanMime = "audio/mp3";
      const aiClient = getGeminiClient();
      if (!aiClient) {
        console.warn("Gemini client not initialized for audio transcription.");
        return res.json({ success: true, transcription: "Message vocal", model: "fallback" });
      }
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              data: rawBase64,
              mimeType: cleanMime
            }
          },
          {
            text: "Tu es un transcripteur audio professionnel pour l'application mobile et web de services FILANT\xB0225 en C\xF4te d'Ivoire. Transcris fid\xE8lement en fran\xE7ais ce message vocal parl\xE9 par l'utilisateur ou l'administrateur. Si l'enregistrement ne contient aucun mot intelligible, du silence pur ou du bruit, r\xE9ponds simplement par 'Message vocal'. Ne renvoie QUE la transcription brute, sans guillemets, sans explications et sans formules de politesse."
          }
        ]
      });
      const transcription = (response.text || "").trim();
      console.log("Transcribed voice note successfully:", transcription);
      return res.json({ success: true, transcription: transcription || "Message vocal" });
    } catch (err) {
      console.error("Error in /api/transcribe-audio:", err?.message || err);
      return res.json({ success: false, transcription: "Message vocal", error: err.message });
    }
  });
  app.use((0, import_cookie_parser.default)());
  app.use((0, import_express_session.default)({
    secret: "filant-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true
    }
  }));
  const getOAuth2Client = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      console.warn("Google OAuth credentials missing in environment variables.");
      return null;
    }
    return new import_googleapis.google.auth.OAuth2(
      clientId,
      clientSecret,
      process.env.APP_URL ? `${process.env.APP_URL}/auth/google/callback` : "http://localhost:3000/auth/google/callback"
    );
  };
  app.post("/api/verify-identity", async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Aucune image fournie." });
      }
      const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      let mimeType = "image/jpeg";
      let base64Data = imageBase64;
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
      const aiClient = getGeminiClient();
      if (!aiClient) {
        console.warn("Gemini client not initialized, skipping validation and approving as fallback.");
        return res.json({ isValid: true, reason: "Bypass mode as API key not configured yet" });
      }
      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType
            }
          },
          {
            text: "Analyse l'image fournie. D\xE9termine s'il s'agit d'une pi\xE8ce d'identit\xE9 (comme une Carte Nationale d'Identit\xE9 - CNI, Passeport, Permis de Conduire, Carte Professionnelle, ou autre document officiel d'identit\xE9 et de l\xE9gitimation en C\xF4te d'Ivoire ou de format administratif officiel g\xE9n\xE9ral). R\xE9ponds avec un JSON contenant isValid (boolean) et reason (string)."
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              isValid: {
                type: import_genai.Type.BOOLEAN,
                description: "True if the image looks like an official Ivorian identity card, professional card, passport, driver's license, or general official ID document. False if the image is unrelated."
              },
              reason: {
                type: import_genai.Type.STRING
              }
            },
            required: ["isValid"]
          }
        }
      });
      const responseText = response.text || "{}";
      const result = JSON.parse(responseText.trim());
      console.log("Identity validation result from Gemini:", result);
      return res.json({
        isValid: !!result.isValid,
        reason: result.reason || ""
      });
    } catch (err) {
      console.error("Error in /api/verify-identity:", err);
      return res.status(500).json({ error: "Erreur de validation", details: err.message });
    }
  });
  app.post("/api/publish-offer", async (req, res) => {
    console.log("POST /api/publish-offer received:", req.body);
    try {
      const { name, city, price, frequency, service, description, userId, photoUrl, isUnblurred } = req.body;
      if (!name || !service) {
        return res.status(400).json({ error: "Nom et M\xE9tier sont obligatoires." });
      }
      console.log("Saving to Firestore collection 'Travailleurs'...");
      let docRef;
      try {
        const dbInstance = await getClientDb();
        const docRefResult = await (0, import_firestore.addDoc)((0, import_firestore.collection)(dbInstance, "Travailleurs"), {
          name,
          city: city || "Non sp\xE9cifi\xE9e",
          price: price || "\xC0 discuter",
          frequency: frequency || "mois",
          service,
          description: description || `Disponible pour : ${service}`,
          createdAt: (0, import_firestore.serverTimestamp)(),
          isVerified: false,
          typeInscription: "Demande d'emploi",
          userId: userId || null,
          photoUrl: photoUrl || null,
          isUnblurred: isUnblurred || false
        });
        console.log("Saved to 'Travailleurs' with ID:", docRefResult.id);
        docRef = docRefResult;
      } catch (firestoreError) {
        console.error("Firestore Write Error:", firestoreError);
        return res.status(500).json({ error: "Erreur lors de la sauvegarde dans Firestore.", details: firestoreError.message });
      }
      return res.json({ id: docRef.id, success: true });
    } catch (error) {
      console.error("CRITICAL Error in /api/publish-offer:", error);
      return res.status(500).json({
        error: "Erreur interne du serveur lors de la publication.",
        details: error.message
      });
    }
  });
  app.post("/api/update-offer-blur", async (req, res) => {
    try {
      const { offerId, isUnblurred } = req.body;
      if (!offerId) {
        return res.status(400).json({ error: "Missing offerId" });
      }
      const dbInstance = await getClientDb();
      await (0, import_firestore.updateDoc)((0, import_firestore.doc)(dbInstance, "Travailleurs", offerId), {
        isUnblurred: !!isUnblurred
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating offer blur:", error);
      res.status(500).json({ error: "Failed to update blur", details: error.message });
    }
  });
  app.get("/api/workers", async (req, res) => {
    try {
      const dbInstance = await getClientDb();
      const collections = ["Travailleurs", "Agences immobili\xE8res", "\xC9quipements", "Entreprises"];
      const snapshots = await Promise.all(
        collections.map((col) => (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, col)))
      );
      const allDocs = [];
      snapshots.forEach((snapshot, index) => {
        const col = collections[index];
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          let name = "Professionnel";
          let description = "";
          if (col === "Travailleurs") {
            name = data.job || data.jobTitle || data.service || "Professionnel";
            description = data.description || `Disponible pour : ${name}`;
          } else if (col === "Agences immobili\xE8res") {
            name = data.agencyName || "Agence immobili\xE8re";
            description = data.description || data.services?.join(", ") || "Services d'agence immobili\xE8re";
          } else if (col === "\xC9quipements") {
            name = data.equipmentType || "Location d'\xE9quipements";
            description = data.description || "Location d'\xE9quipements et accessoires";
          } else if (col === "Entreprises") {
            name = data.companyName || "Entreprise";
            description = data.description || "Opportunit\xE9 professionnelle";
          }
          const nameLower = name.toLowerCase().trim();
          let fallbackDesc = "";
          if (nameLower.includes("vendeuse") || nameLower.includes("vendeur")) {
            fallbackDesc = "Assure la vente, l\u2019accueil des clients et la gestion d\u2019une boutique.";
          } else if (nameLower.includes("cuisinier") || nameLower.includes("cuisini\xE8re") || nameLower.includes("cuisine")) {
            fallbackDesc = "Pr\xE9pare les repas pour restaurant, foyer, entreprise ou \xE9v\xE9nements.";
          } else if (nameLower.includes("serveur") || nameLower.includes("serveuse")) {
            fallbackDesc = "Accueille les clients, sert les plats et s\u2019occupe des commandes.";
          } else if (nameLower.includes("coiffeur homme")) {
            fallbackDesc = "Coupes et coiffures masculines, entretien barbe.";
          } else if (nameLower.includes("coiffeuse femme") || nameLower.includes("coiffeuse") || nameLower.includes("coiffeur femme")) {
            fallbackDesc = "Tresses, tissages, tressages africains et soins capillaires f\xE9minins.";
          } else if (nameLower.includes("h\xF4tesse d\u2019accueil") || nameLower.includes("hotesse d\u2019accueil")) {
            fallbackDesc = "Accueille les visiteurs, g\xE8re les informations et la r\xE9ception.";
          } else if (nameLower.includes("chauffeur")) {
            fallbackDesc = "(Taxi, VTC, Entreprise) Conduit les clients ou le personnel d\u2019un lieu \xE0 un autre.";
          } else if (nameLower.includes("agent d\u2019entretien")) {
            fallbackDesc = "Nettoyeur professionnel de bureaux et locaux.";
          } else if (nameLower.includes("femme de m\xE9nage") || nameLower.includes("entretien")) {
            fallbackDesc = "Entretien m\xE9nager rigoureux et soins \xE0 domicile.";
          } else if (nameLower.includes("caissier") || nameLower.includes("caissi\xE8re")) {
            fallbackDesc = "G\xE8re les paiements, la caisse et l\u2019accueil dans les commerces.";
          } else if (nameLower.includes("r\xE9ceptionniste")) {
            fallbackDesc = "Accueille les clients dans h\xF4tels, entreprises ou agences.";
          } else if (nameLower.includes("baby-sitter") || nameLower.includes("nounou")) {
            fallbackDesc = "Garde les enfants de fa\xE7on ponctuelle ou r\xE9guli\xE8re.";
          } else if (nameLower.includes("jardinier")) {
            fallbackDesc = "Entretient les jardins, pelouses, fleurs et espaces verts.";
          } else if (nameLower.includes("couturier") || nameLower.includes("couturi\xE8re")) {
            fallbackDesc = "Coupe, confectionne et retouche des v\xEAtements.";
          } else if (nameLower.includes("esth\xE9ticienne")) {
            fallbackDesc = "Fait les soins du visage, manucure, p\xE9dicure, beaut\xE9.";
          } else if (nameLower.includes("magasinier")) {
            fallbackDesc = "G\xE8re les stocks, rangement et r\xE9ception des marchandises.";
          } else if (nameLower.includes("manutentionnaire")) {
            fallbackDesc = "Charge, d\xE9charge et organise les marchandises.";
          } else if (nameLower.includes("agent de s\xE9curit\xE9") || nameLower.includes("s\xE9curit\xE9") || nameLower.includes("vigile")) {
            fallbackDesc = "Assure la s\xE9curit\xE9 et la surveillance d\u2019un commerce, b\xE2timent ou d\u2019une r\xE9sidence.";
          } else if (nameLower.includes("laveur de vitres")) {
            fallbackDesc = "Nettoyage professionnel de vitres et surfaces vitr\xE9es.";
          } else if (nameLower.includes("climatisation") || nameLower.includes("climatiseur")) {
            fallbackDesc = "Entretien, nettoyage et recharge de climatiseurs.";
          } else if (nameLower.includes("cam\xE9ra") || nameLower.includes("camera")) {
            fallbackDesc = "Installation et configuration de syst\xE8mes de vid\xE9osurveillance.";
          } else if (nameLower.includes("pouf") || nameLower.includes("poufs")) {
            fallbackDesc = "Cr\xE9ation et r\xE9paration de poufs et coussins.";
          } else if (nameLower.includes("fen\xEAtre") || nameLower.includes("fenetre") || nameLower.includes("vitr\xE9e")) {
            fallbackDesc = "Pose de menuiserie aluminium et vitrerie.";
          } else if (nameLower.includes("menuisier")) {
            fallbackDesc = "Travaux de menuiserie bois et r\xE9paration de meubles.";
          } else if (nameLower.includes("aide \xE0 domicile")) {
            fallbackDesc = "Services d\u2019aide \xE0 domicile et aide de vie quotidienne.";
          } else if (nameLower.includes("garde malade")) {
            fallbackDesc = "Garde malade de jour comme de nuit pour personnes d\xE9pendantes.";
          } else if (nameLower.includes("manucure")) {
            fallbackDesc = "Soin et mise en beaut\xE9 des mains et des pieds \xE0 domicile.";
          } else if (nameLower.includes("massage")) {
            fallbackDesc = "Soins esth\xE9tiques du corps, massages de bien-\xEAtre.";
          } else if (nameLower.includes("maquilleuse") || nameLower.includes("maquillage")) {
            fallbackDesc = "Maquillage professionnel pour mariages, soir\xE9es et \xE9v\xE9nements.";
          } else if (nameLower.includes("p\xE2tissier") || nameLower.includes("patissier") || nameLower.includes("p\xE2tissi\xE8re")) {
            fallbackDesc = "Cr\xE9ation et pr\xE9paration de p\xE2tisseries artisanales pour \xE9v\xE9nements et au quotidien.";
          } else if (nameLower.includes("plombier")) {
            fallbackDesc = "D\xE9pannage plomberie ultra rapide et tuyauterie.";
          } else if (nameLower.includes("\xE9lectricien") || nameLower.includes("electricien")) {
            fallbackDesc = "D\xE9pannage \xE9lectricit\xE9 urgent et installation compl\xE8te.";
          } else if (nameLower.includes("ma\xE7on") || nameLower.includes("macon")) {
            fallbackDesc = "Ma\xE7onnerie g\xE9n\xE9rale, chapes, dalles et construction de murs.";
          }
          if (fallbackDesc && (!description || description.includes("Disponible pour") || description === "Professionnel qualifi\xE9")) {
            description = fallbackDesc;
          }
          allDocs.push({
            id: `${col}-${docSnap.id}`,
            name,
            profileImageUrl: data.profileImageUrl || "",
            phone: data.phone || "",
            rating: data.rating || 4.5,
            description,
            category: data.experience || data.typeInscription || "Disponible",
            isVerified: data.isVerified || false
          });
        });
      });
      res.json(allDocs);
    } catch (error) {
      console.error("Error fetching workers:", error);
      res.status(500).json({
        error: "Failed to fetch workers",
        details: error.message,
        code: error.code
      });
    }
  });
  app.post("/api/workers", async (req, res) => {
    try {
      const worker = req.body;
      const dbInstance = await getClientDb();
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(dbInstance, "Travailleurs"), {
        ...worker,
        createdAt: (0, import_firestore.serverTimestamp)()
      });
      res.json({ id: docRef.id, success: true });
    } catch (error) {
      console.error("Error saving worker:", error);
      res.status(500).json({ error: "Failed to save worker", details: error.message });
    }
  });
  app.post("/api/workers/verify", async (req, res) => {
    try {
      const { workerId, collection, isVerified } = req.body;
      if (!workerId || !collection) {
        return res.status(400).json({ error: "Missing workerId or collection" });
      }
      const dbInstance = await getClientDb();
      await (0, import_firestore.updateDoc)((0, import_firestore.doc)(dbInstance, collection, workerId), {
        isVerified: !!isVerified,
        verifiedAt: (0, import_firestore.serverTimestamp)()
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error verifying worker:", error);
      res.status(500).json({ error: "Failed to verify worker", details: error.message });
    }
  });
  app.get("/api/offers", async (req, res) => {
    try {
      const dbInstance = await getClientDb();
      const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Travailleurs"));
      const offers = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      res.json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ error: "Failed to fetch offers", details: error.message });
    }
  });
  app.post("/api/offers", async (req, res) => {
    try {
      const offer = req.body;
      const dbInstance = await getClientDb();
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(dbInstance, "Travailleurs"), {
        ...offer,
        createdAt: (0, import_firestore.serverTimestamp)()
      });
      res.json({ id: docRef.id, success: true });
    } catch (error) {
      console.error("Error saving offer:", error);
      res.status(500).json({ error: "Failed to save offer" });
    }
  });
  app.post("/api/recruitment", async (req, res) => {
    try {
      const data = req.body;
      const dbInstance = await getClientDb();
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(dbInstance, "Messagerie"), {
        ...data,
        type: "recruitment",
        createdAt: (0, import_firestore.serverTimestamp)()
      });
      res.json({ id: docRef.id, success: true });
    } catch (error) {
      console.error("Error saving recruitment:", error);
      res.status(500).json({ error: "Failed to save recruitment" });
    }
  });
  app.post("/api/placement", async (req, res) => {
    try {
      const data = req.body;
      const dbInstance = await getClientDb();
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(dbInstance, "Messagerie"), {
        ...data,
        type: "placement",
        createdAt: (0, import_firestore.serverTimestamp)()
      });
      res.json({ id: docRef.id, success: true });
    } catch (error) {
      console.error("Error saving placement:", error);
      res.status(500).json({ error: "Failed to save placement" });
    }
  });
  app.get("/api/auth/google/url", (req, res) => {
    const client = getOAuth2Client();
    if (!client) return res.status(500).json({ error: "OAuth not configured" });
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/contacts"],
      prompt: "consent"
    });
    res.json({ url });
  });
  app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    const client = getOAuth2Client();
    if (!client) return res.status(500).send("OAuth not configured");
    try {
      const { tokens } = await client.getToken(code);
      req.session.tokens = tokens;
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentification r\xE9ussie. Cette fen\xEAtre va se fermer.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error exchanging code for tokens", error);
      res.status(500).send("Authentication failed");
    }
  });
  app.post("/api/contacts/sync", async (req, res) => {
    const tokens = req.session.tokens;
    if (!tokens) {
      return res.status(401).json({ error: "Not authenticated with Google" });
    }
    const client = getOAuth2Client();
    if (!client) return res.status(500).json({ error: "OAuth not configured" });
    const { contact } = req.body;
    client.setCredentials(tokens);
    const people = import_googleapis.google.people({ version: "v1", auth: client });
    try {
      await people.people.createContact({
        requestBody: {
          names: [{ givenName: contact.name }],
          phoneNumbers: [{ value: contact.phone }],
          organizations: contact.type === "AGENCE" ? [{ name: contact.agencyName }] : [],
          occupations: contact.type === "TRAVAILLEUR" ? [{ value: contact.job }] : [],
          addresses: [{ city: contact.city }],
          biographies: [{ value: contact.description || contact.equipmentName || "" }]
        }
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating contact in Google", error);
      res.status(500).json({ error: "Failed to sync contact" });
    }
  });
  app.post("/api/notifications/send", async (req, res) => {
    try {
      const { phone, title, body, imageUrl, data, token: directToken } = req.body;
      if (!phone && !directToken || !title) {
        return res.status(400).json({ error: "Missing phone/token or title" });
      }
      let fcmToken = directToken;
      const sanitizedPhone = phone ? String(phone).replace(/\D/g, "") : "";
      if (!fcmToken && sanitizedPhone) {
        const dbInstance = await getClientDb();
        const collectionsToCheck = [
          "Clients",
          "Inscriptions",
          "FCMTokens",
          "Users",
          "Travailleurs",
          "Agences immobili\xE8res",
          "\xC9quipements",
          "Entreprises",
          "Admin"
        ];
        for (const col of collectionsToCheck) {
          try {
            const docSnap = await (0, import_firestore.getDoc)((0, import_firestore.doc)(dbInstance, col, sanitizedPhone));
            if (docSnap.exists() && docSnap.data()?.fcmToken) {
              fcmToken = docSnap.data()?.fcmToken;
              break;
            }
          } catch (e) {
          }
        }
      }
      if (!fcmToken) {
        console.warn(`No FCM token found for user ${sanitizedPhone || "direct"}`);
        return res.status(404).json({ error: "User FCM token not found in database" });
      }
      const PLATFORM_LOGO = "https://i.supaimg.com/5cd01a23-e101-4415-9e28-ff02a617cd11.png";
      const resolvedIcon = data?.icon || PLATFORM_LOGO;
      const targetUrl = data?.url || "/?tab=userChat";
      const stringData = {
        url: targetUrl,
        title: String(title),
        body: String(body || ""),
        icon: resolvedIcon,
        ...imageUrl ? { image: String(imageUrl) } : {}
      };
      if (data && typeof data === "object") {
        Object.keys(data).forEach((k) => {
          stringData[k] = String(data[k]);
        });
      }
      const message = {
        token: fcmToken,
        notification: {
          title: String(title),
          body: String(body || ""),
          ...imageUrl ? { imageUrl: String(imageUrl) } : {}
        },
        data: stringData,
        android: {
          priority: "high",
          notification: {
            title: String(title),
            body: String(body || ""),
            icon: "notification_icon",
            color: "#2563eb",
            sound: "default",
            defaultSound: true,
            defaultVibrateTimings: true,
            priority: "high",
            visibility: "public",
            ...imageUrl ? { imageUrl: String(imageUrl) } : {}
          }
        },
        webpush: {
          headers: {
            Urgency: "high"
          },
          notification: {
            title: String(title),
            body: String(body || ""),
            icon: resolvedIcon,
            badge: "/icon.svg",
            requireInteraction: true,
            tag: data?.chatUserId ? `chat-${data.chatUserId}` : data?.targetAction ? `action-${data.targetAction}` : "filant-push-notification",
            renotify: true,
            data: stringData,
            ...imageUrl ? { image: String(imageUrl) } : {}
          },
          fcmOptions: {
            link: targetUrl
          }
        }
      };
      await import_firebase_admin.default.messaging().send(message);
      console.log(`FCM push notification sent successfully to ${sanitizedPhone || "token"}`);
      res.json({ success: true, token: fcmToken });
    } catch (error) {
      console.error("Error sending FCM notification:", error);
      res.status(500).json({ error: "Failed to send notification", details: error.message });
    }
  });
  app.post("/api/notifications/send-multiple", async (req, res) => {
    try {
      const { phones, title, body, imageUrl, data } = req.body;
      if (!Array.isArray(phones) || phones.length === 0 || !title) {
        return res.status(400).json({ error: "Missing phones array or title" });
      }
      const dbInstance = await getClientDb();
      const results = [];
      for (const rawPhone of phones) {
        const sanitizedPhone = String(rawPhone).replace(/\D/g, "");
        try {
          const collectionsToCheck = [
            "Clients",
            "Inscriptions",
            "FCMTokens",
            "Users",
            "Travailleurs",
            "Agences immobili\xE8res",
            "\xC9quipements",
            "Entreprises",
            "Admin"
          ];
          let fcmToken;
          for (const col of collectionsToCheck) {
            try {
              const docSnap = await (0, import_firestore.getDoc)((0, import_firestore.doc)(dbInstance, col, sanitizedPhone));
              if (docSnap.exists() && docSnap.data()?.fcmToken) {
                fcmToken = docSnap.data()?.fcmToken;
                break;
              }
            } catch (e) {
            }
          }
          if (!fcmToken) {
            results.push({ phone: sanitizedPhone, success: false, error: "No FCM token" });
            continue;
          }
          const PLATFORM_LOGO = "https://i.supaimg.com/5cd01a23-e101-4415-9e28-ff02a617cd11.png";
          const resolvedIcon = data?.icon || PLATFORM_LOGO;
          const targetUrl = data?.url || "/?tab=userChat";
          const stringData = {
            url: targetUrl,
            title: String(title),
            body: String(body || ""),
            icon: resolvedIcon,
            ...imageUrl ? { image: String(imageUrl) } : {}
          };
          if (data && typeof data === "object") {
            Object.keys(data).forEach((k) => {
              stringData[k] = String(data[k]);
            });
          }
          const message = {
            token: fcmToken,
            notification: {
              title: String(title),
              body: String(body || ""),
              ...imageUrl ? { imageUrl: String(imageUrl) } : {}
            },
            data: stringData,
            android: {
              priority: "high",
              notification: {
                title: String(title),
                body: String(body || ""),
                icon: "notification_icon",
                color: "#2563eb",
                sound: "default",
                defaultSound: true,
                defaultVibrateTimings: true,
                priority: "high",
                visibility: "public",
                ...imageUrl ? { imageUrl: String(imageUrl) } : {}
              }
            },
            webpush: {
              headers: {
                Urgency: "high"
              },
              notification: {
                title: String(title),
                body: String(body || ""),
                icon: resolvedIcon,
                badge: "/icon.svg",
                requireInteraction: true,
                tag: data?.chatUserId ? `chat-${data.chatUserId}` : data?.targetAction ? `action-${data.targetAction}` : "filant-push-notification",
                renotify: true,
                data: stringData,
                ...imageUrl ? { image: String(imageUrl) } : {}
              },
              fcmOptions: {
                link: targetUrl
              }
            }
          };
          await import_firebase_admin.default.messaging().send(message);
          results.push({ phone: sanitizedPhone, success: true });
        } catch (itemErr) {
          results.push({ phone: sanitizedPhone, success: false, error: itemErr.message });
        }
      }
      const successCount = results.filter((r) => r.success).length;
      console.log(`Bulk FCM push complete: ${successCount}/${phones.length} sent successfully.`);
      res.json({ success: true, count: successCount, total: phones.length, results });
    } catch (error) {
      console.error("Error in bulk FCM send:", error);
      res.status(500).json({ error: "Failed to send bulk notifications", details: error.message });
    }
  });
  app.post("/api/notifications/broadcast", async (req, res) => {
    try {
      const { role, title, body, imageUrl, data } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Missing notification title" });
      }
      const dbInstance = await getClientDb();
      const targetTokens = /* @__PURE__ */ new Map();
      const collectTokensFromSnap = (snap, roleFilter, defaultRole) => {
        snap.forEach((d) => {
          const docData = d.data();
          const token = docData?.fcmToken;
          if (token && typeof token === "string" && token.length > 10) {
            const profileType = docData.profileType || defaultRole || "";
            const roleVal = docData.role || "";
            const docId = String(d.id || "");
            if (!roleFilter || roleFilter === "all") {
              targetTokens.set(token, docId);
            } else if (roleFilter === "workers" || roleFilter === "travailleurs") {
              if (profileType === "Travailleur" || docData.job || roleVal === "worker" || roleVal === "Travailleur" || defaultRole === "Travailleur") {
                targetTokens.set(token, docId);
              }
            } else if (roleFilter === "equipments" || roleFilter === "equipements") {
              if (profileType === "Propri\xE9taire" || profileType === "Equipement" || profileType === "\xC9quipement" || docData.equipmentType || roleVal === "equipment" || defaultRole === "\xC9quipements") {
                targetTokens.set(token, docId);
              }
            } else if (roleFilter === "agencies" || roleFilter === "agences") {
              if (profileType === "Agence" || profileType === "Agence immobili\xE8re" || docData.agencyName || roleVal === "agency" || defaultRole === "Agences immobili\xE8res") {
                targetTokens.set(token, docId);
              }
            } else if (roleFilter === "enterprises" || roleFilter === "entreprises") {
              if (profileType === "Entreprise" || docData.companyName || roleVal === "company" || defaultRole === "Entreprises") {
                targetTokens.set(token, docId);
              }
            } else if (roleFilter === "clients") {
              if (roleVal === "client" || roleVal === "Client" || !profileType && !docData.job && !docData.equipmentType && !docData.agencyName) {
                targetTokens.set(token, docId);
              }
            } else if (roleFilter === "admins" || roleFilter === "admin") {
              if (docId === "0705052632" || docId === "0701020304" || docId === "0719875153" || roleVal === "Admin 225" || roleVal === "admin" || roleVal === "Admin" || defaultRole === "Admin") {
                targetTokens.set(token, docId);
              }
            }
          }
        });
      };
      try {
        const clientsSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Clients"));
        collectTokensFromSnap(clientsSnap, role);
      } catch (err) {
        console.warn("Could not query Clients for broadcast:", err);
      }
      try {
        const inscSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Inscriptions"));
        collectTokensFromSnap(inscSnap, role);
      } catch (err) {
        console.warn("Could not query Inscriptions for broadcast:", err);
      }
      try {
        const fcmSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "FCMTokens"));
        collectTokensFromSnap(fcmSnap, role);
      } catch (err) {
        console.warn("Could not query FCMTokens for broadcast:", err);
      }
      try {
        const travSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Travailleurs"));
        collectTokensFromSnap(travSnap, role, "Travailleur");
      } catch (err) {
      }
      try {
        const eqSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "\xC9quipements"));
        collectTokensFromSnap(eqSnap, role, "\xC9quipements");
      } catch (err) {
      }
      try {
        const agSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Agences immobili\xE8res"));
        collectTokensFromSnap(agSnap, role, "Agences immobili\xE8res");
      } catch (err) {
      }
      try {
        const entSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Entreprises"));
        collectTokensFromSnap(entSnap, role, "Entreprises");
      } catch (err) {
      }
      try {
        const admSnap = await (0, import_firestore.getDocs)((0, import_firestore.collection)(dbInstance, "Admin"));
        collectTokensFromSnap(admSnap, role, "Admin");
      } catch (err) {
      }
      const tokenList = Array.from(targetTokens.keys());
      if (tokenList.length === 0) {
        console.log("No registered device tokens found for broadcast role:", role || "all");
        return res.json({ success: true, count: 0, total: 0, message: "No active FCM tokens found for this target group" });
      }
      const PLATFORM_LOGO = "https://i.supaimg.com/5cd01a23-e101-4415-9e28-ff02a617cd11.png";
      const resolvedIcon = data?.icon || PLATFORM_LOGO;
      const targetUrl = data?.url || "/?tab=notifications";
      const stringData = {
        url: targetUrl,
        title: String(title),
        body: String(body || ""),
        icon: resolvedIcon,
        targetRole: String(role || "all"),
        ...imageUrl ? { image: String(imageUrl) } : {}
      };
      if (data && typeof data === "object") {
        Object.keys(data).forEach((k) => {
          stringData[k] = String(data[k]);
        });
      }
      let sentCount = 0;
      for (const token of tokenList) {
        try {
          const message = {
            token,
            notification: {
              title: String(title),
              body: String(body || ""),
              ...imageUrl ? { imageUrl: String(imageUrl) } : {}
            },
            data: stringData,
            android: {
              priority: "high",
              notification: {
                title: String(title),
                body: String(body || ""),
                icon: "notification_icon",
                color: "#2563eb",
                sound: "default",
                defaultSound: true,
                defaultVibrateTimings: true,
                priority: "high",
                visibility: "public",
                ...imageUrl ? { imageUrl: String(imageUrl) } : {}
              }
            },
            webpush: {
              headers: {
                Urgency: "high"
              },
              notification: {
                title: String(title),
                body: String(body || ""),
                icon: resolvedIcon,
                badge: "/icon.svg",
                requireInteraction: true,
                tag: data?.targetAction ? `action-${data.targetAction}` : "filant-broadcast-notification",
                renotify: true,
                data: stringData,
                ...imageUrl ? { image: String(imageUrl) } : {}
              },
              fcmOptions: {
                link: targetUrl
              }
            }
          };
          await import_firebase_admin.default.messaging().send(message);
          sentCount++;
        } catch (itemErr) {
          console.warn(`FCM broadcast token send failed:`, itemErr);
        }
      }
      console.log(`Broadcast FCM push complete: ${sentCount}/${tokenList.length} sent for role: ${role || "all"}`);
      res.json({ success: true, count: sentCount, total: tokenList.length });
    } catch (error) {
      console.error("Error in broadcast FCM send:", error);
      res.status(500).json({ error: "Failed to broadcast notifications", details: error.message });
    }
  });
  app.post("/api/maps/validate-address", async (req, res) => {
    try {
      const { address, regionCode = "CI" } = req.body;
      if (!address || typeof address !== "string") {
        return res.status(400).json({ error: "Address is required" });
      }
      const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY;
      if (!apiKey) {
        return res.json({
          success: true,
          isValid: true,
          formattedAddress: address,
          regionCode,
          source: "local-fallback",
          geocode: {
            location: {
              latitude: 5.36,
              longitude: -4.0083
            }
          }
        });
      }
      const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: {
            regionCode,
            addressLines: [address]
          },
          enableUspsCass: false
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.warn("Address Validation API response error:", errorText);
        return res.json({
          success: true,
          isValid: true,
          formattedAddress: address,
          regionCode,
          source: "fallback-on-error"
        });
      }
      const result = await response.json();
      const verdict = result?.result?.verdict || {};
      const postalAddress = result?.result?.address?.postalAddress || {};
      const geocode = result?.result?.geocode || {};
      res.json({
        success: true,
        isValid: verdict.addressComplete || !verdict.hasUnconfirmedComponents,
        verdict,
        formattedAddress: result?.result?.address?.formattedAddress || address,
        postalAddress,
        geocode,
        source: "google-address-validation"
      });
    } catch (error) {
      console.error("Error validating address:", error);
      res.status(500).json({ error: "Address validation failed", details: error.message });
    }
  });
  app.post("/api/maps/compute-route", async (req, res) => {
    try {
      const { origin, destination, travelMode = "DRIVE" } = req.body;
      if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
      }
      const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY;
      if (!apiKey) {
        return res.json({
          success: true,
          source: "simulated-route",
          route: {
            distanceMeters: 4500,
            duration: "1200s",
            formattedDistance: "4.5 km",
            formattedDuration: "20 min"
          }
        });
      }
      const formatWayPoint = (wp) => {
        if (typeof wp === "string") {
          return { address: wp };
        }
        if (wp.lat !== void 0 && wp.lng !== void 0) {
          return {
            location: {
              latLng: {
                latitude: Number(wp.lat),
                longitude: Number(wp.lng)
              }
            }
          };
        }
        return { address: String(wp) };
      };
      const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs,routes.viewport"
        },
        body: JSON.stringify({
          origin: formatWayPoint(origin),
          destination: formatWayPoint(destination),
          travelMode: travelMode === "DRIVE" ? "DRIVE" : travelMode,
          routingPreference: "TRAFFIC_AWARE",
          computeAlternativeRoutes: false,
          languageCode: "fr-FR",
          units: "METRIC"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.warn("Routes API computeRoutes error:", errorText);
        return res.json({
          success: true,
          source: "fallback-route",
          route: {
            distanceMeters: 5e3,
            duration: "900s",
            formattedDistance: "5.0 km",
            formattedDuration: "15 min"
          }
        });
      }
      const data = await response.json();
      const firstRoute = data?.routes?.[0];
      if (firstRoute) {
        const distanceKm = (firstRoute.distanceMeters || 0) / 1e3;
        const durationSec = parseInt(firstRoute.duration?.replace("s", "") || "0", 10);
        const durationMin = Math.ceil(durationSec / 60);
        res.json({
          success: true,
          source: "google-routes-api",
          route: {
            ...firstRoute,
            distanceKm: Number(distanceKm.toFixed(1)),
            formattedDistance: distanceKm < 1 ? `${Math.round(distanceKm * 1e3)} m` : `${distanceKm.toFixed(1)} km`,
            durationMinutes: durationMin,
            formattedDuration: durationMin > 60 ? `${Math.floor(durationMin / 60)} h ${durationMin % 60} min` : `${durationMin} min`,
            encodedPolyline: firstRoute.polyline?.encodedPolyline
          }
        });
      } else {
        res.json({ success: false, message: "No route found" });
      }
    } catch (error) {
      console.error("Error computing route:", error);
      res.status(500).json({ error: "Route computation failed", details: error.message });
    }
  });
  app.post("/api/workers/live-location", async (req, res) => {
    try {
      const {
        workerId,
        workerName,
        workerPhone,
        lat,
        lng,
        heading = 0,
        speed = 0,
        accuracy = 10,
        status = "disponible",
        currentAddress = "",
        city = "",
        isLiveTracking = true,
        category = ""
      } = req.body;
      if (!workerId || lat === void 0 || lng === void 0) {
        return res.status(400).json({ error: "workerId, lat, and lng are required" });
      }
      const dbInstance = await getClientDb();
      const workerLocRef = (0, import_firestore.doc)(dbInstance, "WorkerLiveLocations", String(workerId));
      const payload = {
        workerId: String(workerId),
        workerName: workerName || "Travailleur FILANT\xB0225",
        workerPhone: workerPhone || "",
        lat: Number(lat),
        lng: Number(lng),
        heading: Number(heading),
        speed: Number(speed),
        accuracy: Number(accuracy),
        status,
        currentAddress,
        city,
        category,
        isLiveTracking: Boolean(isLiveTracking),
        lastUpdated: Date.now(),
        updatedAt: (0, import_firestore.serverTimestamp)()
      };
      await (0, import_firestore.updateDoc)(workerLocRef, payload).catch(async () => {
        const { setDoc: clientSetDoc } = await import("firebase/firestore");
        await clientSetDoc(workerLocRef, payload);
      });
      res.json({ success: true, location: payload });
    } catch (error) {
      console.error("Error updating worker live location:", error);
      res.status(500).json({ error: "Failed to update location", details: error.message });
    }
  });
  app.get("/api/share-image", async (req, res) => {
    try {
      const adId = req.query.adId;
      const col = req.query.col || "Inscriptions";
      const decodedId = decodeAdId(adId);
      if (!decodedId) {
        return res.status(400).send("Identifiant d'annonce invalide");
      }
      let data = {};
      try {
        const docSnap = await firestore.collection(col).doc(decodedId).get();
        if (docSnap.exists) {
          data = docSnap.data() || {};
        } else {
          console.warn(`Ad document not found in Firestore for image generation. ID: ${decodedId}, Col: ${col}`);
        }
      } catch (dbErr) {
        console.error("Error reading Firestore for share image:", dbErr);
      }
      const type = (data.profileType === "Agence immobili\xE8re" ? "Agence" : data.profileType) || "Travailleur";
      let mainTitle = "";
      let userName = "";
      if (type === "Travailleur") {
        mainTitle = data.job || data.jobTitle || data.service || "Travailleur Qualifi\xE9";
        userName = data.userName || data.name || "Prestataire";
      } else if (type === "Propri\xE9taire") {
        mainTitle = data.equipmentType || data.equipmentCategory || "\xC9quipement";
        userName = data.ownerName || data.userName || data.name || "Prestataire";
      } else if (type === "Agence") {
        mainTitle = data.propertyTypes ? Array.isArray(data.propertyTypes) ? data.propertyTypes.join(", ") : data.propertyTypes : "";
        userName = data.agencyName || data.userName || data.name || "Prestataire";
      } else if (type === "Entreprise") {
        mainTitle = data.companyName || "Entreprise";
        userName = data.companyOwner || data.userName || data.name || "Prestataire";
      } else {
        mainTitle = data.titleOrActivity || "Prestataire";
        userName = data.userName || data.name || "Prestataire";
      }
      if (!mainTitle) {
        mainTitle = type === "Agence" ? "Immobilier" : data.titleOrActivity || "Service";
      }
      if (!userName) userName = data.name || "Prestataire";
      const city = data.city || data.agencyCity || data.companyCity || data.equipmentCity || "Non sp\xE9cifi\xE9e";
      const font32Black = await (0, import_jimp.loadFont)(import_fonts.SANS_32_BLACK);
      const font16Black = await (0, import_jimp.loadFont)(import_fonts.SANS_16_BLACK);
      const font16White = await (0, import_jimp.loadFont)(import_fonts.SANS_16_WHITE);
      const baseImg = new import_jimp.Jimp({ width: 1200, height: 630, color: 4177198335 });
      const borderImg = new import_jimp.Jimp({ width: 1104, height: 534, color: 3806916863 });
      const cardImg = new import_jimp.Jimp({ width: 1100, height: 530, color: 4294967295 });
      baseImg.composite(borderImg, 48, 48);
      baseImg.composite(cardImg, 50, 50);
      let providerImg;
      let hasImage = false;
      const avatarUrl = data.profileImageUrl || data.photoUrl || data.imageLink;
      if (avatarUrl && avatarUrl.trim() && !avatarUrl.toLowerCase().includes("placeholder")) {
        try {
          let resolvedUrl = avatarUrl;
          if (resolvedUrl.startsWith("/")) {
            resolvedUrl = `${req.protocol}://${req.get("host")}${resolvedUrl}`;
          }
          providerImg = await import_jimp.Jimp.read(resolvedUrl);
          providerImg.resize({ width: 360, height: 360 });
          providerImg.circle();
          hasImage = true;
        } catch (e) {
          console.warn("Error reading provider image for Jimp, will use placeholder:", e);
        }
      }
      if (!hasImage) {
        providerImg = new import_jimp.Jimp({ width: 360, height: 360, color: 1196780031 });
        providerImg.circle();
        providerImg.print({
          font: font16White,
          x: 105,
          y: 170,
          text: "IMAGE MASQU\xC9E"
        });
      }
      const isOnline = data.isOnline === true;
      const ringImg = new import_jimp.Jimp({ width: 372, height: 372, color: isOnline ? 280592895 : 3806916863 });
      ringImg.circle();
      baseImg.composite(ringImg, 94, 129);
      baseImg.composite(providerImg, 100, 135);
      baseImg.print({
        font: font32Black,
        x: 520,
        y: 160,
        text: userName.toUpperCase()
      });
      const jobBadge = new import_jimp.Jimp({ width: 500, height: 50, color: 4059429375 });
      jobBadge.print({
        font: font16Black,
        x: 15,
        y: 15,
        text: `M\xC9TIER : ${mainTitle.toUpperCase()}`
      });
      baseImg.composite(jobBadge, 520, 240);
      const cityBadge = new import_jimp.Jimp({ width: 500, height: 50, color: 4277389311 });
      cityBadge.print({
        font: font16Black,
        x: 15,
        y: 15,
        text: `VILLE : ${city.toUpperCase()}`
      });
      baseImg.composite(cityBadge, 520, 310);
      baseImg.print({
        font: font32Black,
        x: 800,
        y: 70,
        text: "FILANT\xB0225"
      });
      const lineAccent = new import_jimp.Jimp({ width: 220, height: 5, color: 4282712319 });
      baseImg.composite(lineAccent, 800, 115);
      baseImg.print({
        font: font16Black,
        x: 800,
        y: 130,
        text: "PROFIL DISPONIBLE"
      });
      const buffer = await baseImg.getBuffer("image/png");
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.status(200).send(buffer);
    } catch (err) {
      console.error("Error generating share preview image:", err);
      res.status(500).send("Erreur interne du serveur");
    }
  });
  let globalViteInstance = null;
  app.get(["/", "/index.html"], async (req, res, next) => {
    if (!req.query.adId) {
      return next();
    }
    try {
      const adId = req.query.adId;
      const col = req.query.col || "Inscriptions";
      const decodedId = decodeAdId(adId);
      if (!decodedId) {
        return next();
      }
      let title = "FILANT\xB0225";
      let description = "Trouvez des travailleurs, \xE9quipements, agences ou opportunit\xE9s en C\xF4te d'Ivoire.";
      let imageUrl = `${req.protocol}://${req.get("host")}/api/share-image?adId=${encodeURIComponent(adId)}&col=${encodeURIComponent(col)}`;
      try {
        const docSnap = await firestore.collection(col).doc(decodedId).get();
        if (docSnap.exists) {
          const data = docSnap.data() || {};
          const type = (data.profileType === "Agence immobili\xE8re" ? "Agence" : data.profileType) || "Travailleur";
          let mainTitle = "";
          let userName = "";
          if (type === "Travailleur") {
            mainTitle = data.job || "Travailleur Qualifi\xE9";
            userName = data.userName || data.name || "Prestataire";
          } else if (type === "Propri\xE9taire") {
            mainTitle = data.equipmentType || data.equipmentCategory || "\xC9quipement";
            userName = data.ownerName || data.userName || data.name || "Prestataire";
          } else if (type === "Agence") {
            mainTitle = data.propertyTypes ? Array.isArray(data.propertyTypes) ? data.propertyTypes.join(", ") : data.propertyTypes : "";
            userName = data.agencyName || data.userName || data.name || "Prestataire";
          } else if (type === "Entreprise") {
            mainTitle = data.companyName || "Entreprise";
            userName = data.companyOwner || data.userName || data.name || "Prestataire";
          } else {
            mainTitle = data.titleOrActivity || "Prestataire";
            userName = data.userName || data.name || "Prestataire";
          }
          if (!mainTitle) {
            mainTitle = type === "Agence" ? "Immobilier" : data.titleOrActivity || "Service";
          }
          if (!userName) userName = data.name || "Prestataire";
          if (mainTitle.toLowerCase() === userName.toLowerCase()) {
            if (type === "Agence") {
              mainTitle = data.propertyTypes ? Array.isArray(data.propertyTypes) ? data.propertyTypes.join(", ") : data.propertyTypes : "Immobilier";
              if (!mainTitle || mainTitle.toLowerCase() === userName.toLowerCase()) {
                mainTitle = "Immobilier";
              }
            } else if (type === "Propri\xE9taire") {
              mainTitle = data.equipmentCategory || "Location d'\xE9quipements";
            } else if (type === "Entreprise") {
              mainTitle = data.companyDomain || "Services aux Entreprises";
            }
          }
          const city = data.city || data.agencyCity || data.companyCity || data.equipmentCity || "Non sp\xE9cifi\xE9e";
          title = "Profil disponible sur FILANT\xB0225";
          description = `Titre : ${mainTitle} \u2022 Nom : ${userName} \u2022 Ville : ${city}`;
        }
      } catch (dbErr) {
        console.error("Error reading Firestore document for share metadata:", dbErr);
      }
      let templatePath = import_path.default.join(resolvedDirname, process.env.NODE_ENV === "production" ? "dist" : "", "index.html");
      if (!import_fs.default.existsSync(templatePath)) {
        templatePath = import_path.default.join(resolvedDirname, "index.html");
      }
      let html = import_fs.default.readFileSync(templatePath, "utf8");
      if (process.env.NODE_ENV !== "production" && globalViteInstance) {
        html = await globalViteInstance.transformIndexHtml(req.originalUrl, html);
      }
      html = html.replace("<title>FILANT\xB0225</title>", `<title>${title}</title>`);
      const metaTags = `
    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
    <meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${req.protocol}://${req.get("host")}${req.originalUrl}" />
    <meta property="og:site_name" content="FILANT\xB0225" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${title.replace(/"/g, "&quot;")}" />
    <meta property="twitter:description" content="${description.replace(/"/g, "&quot;")}" />
    <meta property="twitter:image" content="${imageUrl}" />
      `;
      if (html.includes("</head>")) {
        html = html.replace("</head>", `${metaTags}
</head>`);
      } else {
        html = html + metaTags;
      }
      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(html);
    } catch (err) {
      console.error("Error generating dynamic share page:", err);
      return next();
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    globalViteInstance = vite;
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    });
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
