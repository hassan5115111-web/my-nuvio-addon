const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// تعريف إضافة Nuvio
const builder = new addonBuilder({
    id: "org.mycustomnuvio.addon",
    version: "1.0.0",
    name: "سيرفري الخاص - Nuvio",
    description: "إضافة شخصية لتشغيل بجودات 4K و 1080p على Nuvio",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"]
});

// معالجة طلبات تشغيل الروابط والجودات
builder.defineStreamHandler((args) => {
    console.log("تم طلب المقطع للمعرف:", args.id);

    return Promise.resolve({
        streams: [
            {
                name: "4K UHD",
                title: "سيرفري الخاص - 4K Ultra HD (HDR)",
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            },
            {
                name: "1080p FHD",
                title: "سيرفري الخاص - Full HD 1080p",
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
        ]
    });
});

serveHTTP(builder.getInterface(), { port: 7000 });
console.log("الإضافة شغالة الآن على: http://localhost:7000/manifest.json");
