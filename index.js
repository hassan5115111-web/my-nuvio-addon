const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

// 1. إعداد بيانات الإضافة (Manifest)
const manifest = {
    id: 'org.myaddon.nuvio.custom',
    version: '1.0.0',
    name: 'Nuvio & Stremio Custom Addon',
    description: 'إضافة شخصية مخصصة لتطبيق Nuvio و Stremio',
    icon: 'https://dl.strem.io/addon-logo.png', // يمكنك تغيير رابط الأيقونة مستقبلاً
    types: ['movie', 'series'],
    catalogs: [], // نتركها فارغة إذا كانت الإضافة لجلب مصادر التشغيل فقط
    resources: ['stream'],
    idPrefixes: ['tt'] // لدعم معرفات IMDb النموذجية (مثل tt1234567)
};

const builder = new addonBuilder(manifest);

// 2. معالج جلب روابط التشغيل (Stream Handler)
builder.defineStreamHandler(async (args) => {
    const { type, id } = args;
    console.log(`[طلب جديد] نوع العرض: ${type} | المعرف (IMDb ID): ${id}`);

    // مصفوفة الروابط التي ستظهر في التطبيق
    const streams = [];

    /*
     * مثال لتمرير رابط فيديو أو سيرفر خارجي:
     * يمكنك إضافة منطق لجلب الروابط من أي مصدر API خارجي هنا.
     * 
     * مثال على بناء كائن الـ Stream:
     * streams.push({
     *     title: '🎬 سيرفر خاص - 1080p',
     *     url: 'https://example.com/video.mp4'
     * });
     */

    return { streams };
});

// 3. ضبط المنفذ تلقائياً ليتوافق مع Render والتوزيع السحابي
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

console.log(`--------------------------------------------------`);
console.log(`🚀 الإضافة تعمل بنجاح!`);
console.log(`📍 المنفذ النشط: ${PORT}`);
console.log(`🔗 رابط الـ Manifest: http://localhost:${PORT}/manifest.json`);
console.log(`--------------------------------------------------`);
