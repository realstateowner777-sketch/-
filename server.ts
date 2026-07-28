import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get GoogleGenAI client lazy
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", system: "حزب مستقبل وطن - أمانة مركز سمنود", timestamp: new Date().toISOString() });
});

// AI Video Script & Storyboard Generator for Party Media Studio
app.post("/api/gemini/generate-video-script", async (req, res) => {
  try {
    const { topic, platform, videoStyle, targetAudience } = req.body;
    const ai = getGeminiAI();

    const prompt = `أنت المخرج الإعلامي وصانع المحتوى المرئي لأمانة حزب مستقبل وطن بمركز سمنود (حزب مستقبل وطن - أمانة مركز سمنود).
شعار الحزب الرسمي: "كلنا بنبني مصر".
المطلوب: إنتاج سيناريو فيديو احترافي، جذاب، فيروسي ومتضمن مشاهد صور وحوار بصري كامل باللغة العربية.

المعطيات:
- موضوع الفيديو / المبادرة: ${topic || "مبادرة حزب مستقبل وطن للتطوير والخدمات الميدانية بمركز سمنود"}
- المنصة المستهدفة: ${platform || "Facebook Reel / TikTok / Shorts"}
- طابع الفيديو: ${videoStyle || "حماسي، إنجازات ميدانية، توثيقي، قريب من المواطن"}
- الجمهور المستهدف: ${targetAudience || "أهالي وسكان مركز ومدينة سمنود والوحدات المحلية المجاورة"}

المطلوب إرجاع JSON متطابق تماماً مع النمط التالي:
{
  "title": "عنوان الفيديو الجذاب",
  "hook": "الجملة الافتتاحية الخاطفة للإنتظار (الـ Hook)",
  "targetPlatform": "${platform || 'Facebook Reel'}",
  "durationSeconds": 45,
  "backgroundMusic": "موسيقى حماسية وطنية إيقاعية عالية الطاقة",
  "hashtags": ["#حزب_مستقبل_وطن", "#أمانة_سمنود", "#كلنا_بنبني_مصر", "#سمنود", "#خدمة_المواطن"],
  "voiceoverTone": "صوت دافئ، قوي، واثق ومحفز",
  "scenes": [
    {
      "sceneNumber": 1,
      "narrationText": "نص التعليق الصوتي للمشهد الأول",
      "visualDescription": "وصف دقيق لما يظهر في الفيديو من لقطات وزوايا تصوير",
      "imageKeyword": "كلمات مفتاحية بالإنجليزية لوصف الصورة مثل egypt developmental project samanoud party members",
      "duration": "00:00 - 00:08"
    },
    {
      "sceneNumber": 2,
      "narrationText": "نص التعليق الصوتي للمشهد الثاني",
      "visualDescription": "وصف المشهد الميداني والنزول للشارع مع الأهالي",
      "imageKeyword": "egyptian citizens community gathering samanoud center",
      "duration": "00:08 - 00:18"
    },
    {
      "sceneNumber": 3,
      "narrationText": "نص التعليق الصوتي للمشهد الثالث والإنجازات",
      "visualDescription": "عرض بالأرقام والصور لنشاط الحزب وخدماته",
      "imageKeyword": "modern egypt infrastructure logistics and services",
      "duration": "00:18 - 00:32"
    },
    {
      "sceneNumber": 4,
      "narrationText": "ختام حماسي مع دعوة للتفاعل وشعار الحزب: كلنا بنبني مصر!",
      "visualDescription": "شعار حزب مستقبل وطن أمانة سمنود مع زاوية واسعة للأهالي والشباب",
      "imageKeyword": "mostaqbal watan party flag and logo samanoud",
      "duration": "00:32 - 00:45"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            targetPlatform: { type: Type.STRING },
            durationSeconds: { type: Type.INTEGER },
            backgroundMusic: { type: Type.STRING },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            voiceoverTone: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  narrationText: { type: Type.STRING },
                  visualDescription: { type: Type.STRING },
                  imageKeyword: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
                required: ["sceneNumber", "narrationText", "visualDescription", "imageKeyword", "duration"],
              },
            },
          },
          required: ["title", "hook", "targetPlatform", "durationSeconds", "backgroundMusic", "hashtags", "voiceoverTone", "scenes"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-video-script:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate video script" });
  }
});

// AI Content Generation API for Party Communication & Viral Strategy
app.post("/api/gemini/generate-content", async (req, res) => {
  try {
    const { pillar, topic, targetAudience, contentType, tone } = req.body;
    const ai = getGeminiAI();

    const prompt = `أنت خبير الإعلام والتواصل السياسي لحزب مستقبل وطن - أمانة مركز سمنود (شعاراتنا: "كلنا بنبني مصر" - "حزب مستقبل وطن سمنود").
المطلوب: صياغة منشور/محتوى إعلامي رسمي وفيروسي رفيع المستوى باللغة العربية.

المعطيات:
- ركن المحتوى (Pillar): ${pillar || "المبادرات الخدمية والنزول الميداني"}
- موضوع المنشور: ${topic || "متابعة فعاليات حزب مستقبل وطن بمركز سمنود"}
- الجمهور المستهدف: ${targetAudience || "أهالي مركز ومدينة سمنود والقرى التابعة"}
- نوع المحتوى: ${contentType || "منشور فيسبوك / بيان إعلامي لحزب مستقبل وطن"}
- النبرة: ${tone || "مباشرة، وطنية، شفافة، معززة للثقة والعمل الجماعي"}

يرجى إرجاع الإجابة بتنسيق JSON يحتوي على:
1. title: عنوان جذاب مع اسم الحزب
2. content: النص الكامل للمنشور متضمناً الهاشتاجات الرسمية (#حزب_مستقبل_وطن #أمانة_سمنود #كلنا_بنبني_مصر #سمنود)
3. keyMetrics: أبرز الأرقام والإحصائيات الميدانية المقترحة لإبرازها
4. visualPrompt: وصف للإنفوجرافيك أو الصورة أو الفيديو المرافق للمنشور
5. suggestedChannels: المنصات الأنسب (صفحة الحزب الرسمية، مجموعات أمانة سمنود، واتساب الإعلامي، قناة تليجرام)
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            keyMetrics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            visualPrompt: { type: Type.STRING },
            suggestedChannels: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "content", "keyMetrics", "visualPrompt", "suggestedChannels"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-content:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate content" });
  }
});

// AI Promotional Image Generator API for Party Initiatives
app.post("/api/gemini/generate-promo-image", async (req, res) => {
  try {
    const { prompt, style, aspectRatio, initiativeTitle } = req.body;
    const ai = getGeminiAI();

    // 1. Generate an enhanced visual description and color theme using Gemini
    const metaPrompt = `أنت مصمم الجرافيك والهوية البصرية لحزب مستقبل وطن بمركز سمنود.
المطلوب: إعداد بطاقة وصف بصري وتفاصيل التصميم والهاشتاجات لبوستر ترويجي للمبادرة الآتية:
- المبادرة / الموضوع: "${initiativeTitle || prompt}"
- الطراز البصري: "${style || 'واقعي سينمائي إعلامي'}"
- نسبة الأبعاد: "${aspectRatio || '16:9'}"

قم بإرجاع JSON باللغة العربية يحتوي على:
{
  "title": "عنوان البوستر الترويجي المحترف",
  "subtitle": "العنوان الفرعي الشفاف أمانة سمنود",
  "visualConcept": "وصف دقيق للتصميم والألوان ونقاط التركيز",
  "suggestedColors": ["#0b1329", "#f59e0b", "#10b981"],
  "partyBranding": "شعار حزب مستقبل وطن أمانة سمنود - كلنا بنبني مصر",
  "promptEnglish": "detailed English prompt for AI image generator depicting Egyptian Mostaqbal Watan party community initiative in Samanoud district with golden and deep navy branding, professional photorealistic"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: metaPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const metaResult = JSON.parse(response.text || "{}");

    // Try Imagen generation if possible, or fallback gracefully
    let imageUrl = "";
    try {
      const imagenRes = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt: metaResult.promptEnglish || `Mostaqbal Watan party ${prompt} in Samanoud Egypt, deep navy blue and gold themes, photorealistic high quality`,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: (aspectRatio === "1:1" ? "1:1" : aspectRatio === "9:16" ? "9:16" : "16:9") as any,
        },
      });

      if (imagenRes.generatedImages && imagenRes.generatedImages[0]) {
        const base64 = imagenRes.generatedImages[0].image.imageBytes;
        imageUrl = `data:image/jpeg;base64,${base64}`;
      }
    } catch (imgError) {
      console.log("Imagen generation fallback used:", imgError);
    }

    res.json({
      success: true,
      data: {
        ...metaResult,
        imageUrl: imageUrl || null,
      },
    });
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-promo-image:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate promo image" });
  }
});

// AI Citizen Complaint Triage & Smart Routing API
app.post("/api/gemini/analyze-complaint", async (req, res) => {
  try {
    const { complaintText, district, category } = req.body;
    const ai = getGeminiAI();

    const prompt = `أنت محرك الذكاء الاصطناعي للتوجيه والتحليل الفوري للشكاوى والبلاغات بمركز ومدينة سمنود (SamanoudOS Triage Engine).
قم بتحليل الشكوى الآتية فوراً واستخراج التوجيه المؤسسي والأولوية والاتصال الشفاف مع المواطن.

الشكوى: "${complaintText}"
المنطقة/الوحدة المحلية: "${district || "مدينة سمنود"}"
التصنيف المبدئي: "${category || "عام"}"

المطلوب إرجاع JSON يحتوي على:
- assignedDepartment: الإدارة المختصة بالضبط (مثال: إدارة النظافة والتجميل، قسم الطرق والشبكات، شركة مياه الشرب والصرف الصحي، الشؤون الهندسية، قسم الكهرباء والإنارة العامة)
- priority: مستوى الأولوية (إما "حرج" أو "عاجل" أو "عادي")
- priorityScore: رقم من 1 إلى 100 يعبر عن درجة الخطورة والتأثير
- estimatedSLAHours: عدد الساعات المتوقع للحل (مثال: 4, 12, 24, 48, 72)
- categoryRefined: التصنيف الدقيق للشكوى
- summary: ملخص تنفيذي موجز للشكوى لغرفة العمليات
- recommendedAction: الخطوات التشغيلية المطلوبة من طاقم الميدان
- citizenResponseDraft: صياغة مسودة رد احترافية وسريعة تُرسل للمواطن عبر SMS/واتساب لإشعاره بالاستلام والتحريك الميداني
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            assignedDepartment: { type: Type.STRING },
            priority: { type: Type.STRING },
            priorityScore: { type: Type.INTEGER },
            estimatedSLAHours: { type: Type.INTEGER },
            categoryRefined: { type: Type.STRING },
            summary: { type: Type.STRING },
            recommendedAction: { type: Type.STRING },
            citizenResponseDraft: { type: Type.STRING },
          },
          required: [
            "assignedDepartment",
            "priority",
            "priorityScore",
            "estimatedSLAHours",
            "categoryRefined",
            "summary",
            "recommendedAction",
            "citizenResponseDraft",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in /api/gemini/analyze-complaint:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to analyze complaint" });
  }
});

// AI Municipal Assistant / Executive Co-Pilot API
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, userRole } = req.body;
    const ai = getGeminiAI();

    const systemInstruction = `أنت "المساعد الذكي لأمانة حزب مستقبل وطن بمركز سمنود"، الذكاء الاصطناعي الخاص بأمانة الإعلام والتواصل السياسي لأمانة سمنود (شعاراتنا الرسمية: "كلنا بنبني مصر" - "حزب مستقبل وطن").
مهامك:
1. تقديم الدعم الإعلامي والتنظيمي لأعضاء وكوادر أمانة مركز سمنود والوحدات المحلية (الراهبين، ميت حبيب، محلة زياد، أبو صير، بشتيل، طليمة، بنا أبوصير).
2. اقتراح أفكار وسيناريوهات للفيديوهات الفيروسية والمبادرات الخدمية والاجتماعية التي تهم الشارع في سمنود.
3. التوجيه الذكي ومتابعة طلبات وشكاوى المواطنين الواردة لأمانة الحزب وإعداد صيغ الاستجابة والمتابعة مع الأجهزة المعنية.
4. إعداد البيانات الصحفية والتقارير التنظيمية لأمانات الحزب (أمانة الإعلام، التنظيم، الشباب، المرأة، والعمل الجماهيري).
اجعل إجاباتك دقيقة، وطنية، مجهزة بنقاط عمل مباشرة وباللغة العربية المشرقة المعبّرة عن هوية حزب مستقبل وطن.`;

    const chatMessages = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: chatMessages,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/chat:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to chat" });
  }
});

// Start Express Server with Vite Dev / Static Production Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SamanoudOS 2030 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
