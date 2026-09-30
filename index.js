const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

const manifest = {
    id: 'org.myaddon.nuvio',
    version: '1.0.0',
    name: 'Nuvio Custom Addon',
    description: 'إضافة شخصية لتطبيق Nuvio و Stremio',
    types: ['movie', 'series'],
    catalogs: [],
    resources: ['stream']
};

const builder = new addonBuilder(manifest);

// معالج جلب الروابط (Stream Handler)
builder.defineStreamHandler((args) => {
    console.log('طلب رابط لـ:', args.type, args.id);
    
    // يمكنك إضافة روابطك هنا مستقبلاً
    return Promise.resolve({ streams: [] });
});

// تحديد المنفذ تلقائياً ليتوافق مع Render وسيرفرات السحاب
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });
console.log(`الإضافة شغالة الآن على المنفذ: ${PORT}`);
