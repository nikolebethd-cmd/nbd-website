/* ============================================
   SITE DATA — Edit this file to update content
   ============================================

   To add new items, copy an existing entry
   and change the values. That's it!
   ============================================ */

const SITE_DATA = {

  /* ------ Site Info ------ */
  site: {
    name: "NBD",
    tagline: "Photo · Art · Film",
    email: "nikolebethd@gmail.com",
    instagram: "#",             // <-- Replace with your Instagram URL
    youtube: "#",               // <-- Replace with your YouTube URL
    readymag: "https://readymag.website/u1791011645/6279182/",
  },

  /* ------ Event Photo Galleries ------ */
  /* Gallery data now comes from galleries.json on the server.
     This array is only used as a fallback if the server isn't running.
     To add/edit galleries, edit galleries.json instead. */
  galleries: [
    {
      title: "Powder Mountain Closing Day 3.22.26",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/galleries/powder-mountain-closing-032226/IMG_2540.jpg",
      description: "Closing day at Powder Mountain.",
      date: "March 22, 2026",
      private: false,
      id: "powder-mountain-closing-032226",
      url: "gallery.html?id=powder-mountain-closing-032226"
    },
    {
      title: "OVGS at Nordic Valley 3.21.26",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/galleries/ovgs-nordic-valley-032126/IMG_2470.jpg",
      description: "OVGS at Nordic Valley.",
      date: "March 21, 2026",
      private: false,
      id: "ovgs-nordic-valley-032126",
      url: "gallery.html?id=ovgs-nordic-valley-032126"
    },
    {
      title: "OVGS at Powder Keg 2.21.26",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/galleries/ovgs-powder-keg-022126/IMG_2141.jpg",
      description: "OVGS at Powder Keg.",
      date: "February 21, 2026",
      private: false,
      id: "ovgs-powder-keg-022126",
      url: "gallery.html?id=ovgs-powder-keg-022126"
    },
    {
      title: "OVGS at Powder Keg 1.18.26",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/galleries/ovgs-powder-keg-011826/IMG_1796.jpg",
      description: "OVGS at Powder Keg.",
      date: "January 18, 2026",
      private: false,
      id: "ovgs-powder-keg-011826",
      url: "gallery.html?id=ovgs-powder-keg-011826"
    },
  ],

  /* ------ Art / Paintings for Sale ------ */
  artPieces: [
    {
      title: "First Tracks on Baldy",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-first-tracks-baldy.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 20\"",
      status: "sold",
      // price: add a number here to show it instead of "Price on request"
    },
    {
      title: "South Beach Storm Swell",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-south-beach-storm-swell.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 20\"",
      price: 600,
      status: "available",
    },
    {
      title: "Sea Hawg",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-sailboats.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 20\"",
      status: "sold",
      // price: add a number here to show it instead of "Price on request"
    },
    {
      title: "Powder Country",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-powder-country-2026.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 20\"",
      price: 400,
      status: "available",
    },
    {
      title: "Wombat Sunset",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-wombat-sunset.jpg",
      medium: "Acrylic on canvas",
      size: "20\" × 20\"",
      status: "available",
      // price: add a number here to show it instead of "Price on request"
    },
    {
      title: "Gabagool",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-gabagool-2026.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 24\"",
      price: 600,
      status: "available",
    },
    {
      title: "Sunset Swell",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-sunset-surf-2026.jpg",
      medium: "Acrylic on canvas",
      size: "12\" × 12\"",
      price: 100,
      status: "available",
    },
    {
      title: "Mt Hood",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-mt-hood.jpg",
      medium: "Acrylic on wood",
      size: "36\" × 24\"",
      price: 200,
      status: "available",
    },
    {
      title: "Xpression",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-xpression-2026.jpg",
      medium: "Acrylic on wood",
      size: "20\" × 20\"",
      price: 150,
      status: "available",
    },
    {
      title: "Sunset Surf",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-sunset-surf-orange.jpg",
      medium: "Acrylic on canvas",
      size: "24\" × 20\"",
      price: 200,
      status: "available",
    },
    {
      title: "Water Woman",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-water-woman.jpg",
      medium: "Acrylic on carved wood",
      size: "8\" × 10\"",
      price: 100,
      status: "available",
    },
    {
      title: "Pacifico Surf",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-pacifico-surf.jpg",
      medium: "Acrylic and ink on canvas",
      size: "12\" × 10\"",
      price: 150,
      status: "available",
    },
    {
      title: "Blue Surf",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-blue-surf.jpg",
      medium: "Acrylic on canvas",
      size: "10\" × 12\"",
      price: 150,
      status: "available",
    },
    {
      title: "Life Is a Game",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-life-is-a-game-2026.jpg",
      medium: "Acrylic on wood",
      size: "20\" × 20\"",
      price: 150,
      status: "available",
    },
    {
      title: "James Peak",
      image: "https://res.cloudinary.com/dljs01zmp/image/upload/site-images/paint-james-peak.jpg",
      medium: "Acrylic on canvas",
      size: "12\" × 18\"",
      price: 150,
      status: "available",
    },
  ],

  /* ------ Videography ------ */
  /* type: 'local' | 'youtube'  |  src: file path or YouTube URL  |  tags: [] optional */
  videos: [
    { title: "People of Powder Mountain", type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1788322826/site-videos/people-of-powder-mountain.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/video/upload/so_2,c_fill,ar_16:9,g_auto,w_800,q_auto,f_auto/site-videos/people-of-powder-mountain.jpg", duration: "8:31", year: "2026" },
    { title: "South Beach Swell", type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1788134599/site-videos/south-beach-swell.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/video/upload/so_2,c_fill,ar_16:9,g_auto,w_800,q_auto,f_auto/site-videos/south-beach-swell.jpg", duration: "1:23", year: "2026" },
    { title: "Momento — A Mixed Media Film", type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1788135230/site-videos/momento-a-mixed-media-film.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/video/upload/so_2,c_fill,ar_16:9,g_auto,w_800,q_auto,f_auto/site-videos/momento-a-mixed-media-film.jpg", duration: "5:04", year: "2026" },
  ],

  /* ------ Short Form / Vertical ------ */
  /* TikTok, Reels, Shorts — anything shot vertical.
     Same fields as videos above. Shown in the 9:16 grid at the bottom
     of the video page; the whole section stays hidden while this is empty. */
  shorts: [
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180077/site-videos/896a8da1fcd24bc6a016fcdb810532aa.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237468/video-thumbs/896a8da1fcd24bc6a016fcdb810532aa.mov.png", duration: "0:27", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180177/site-videos/9d4b7335a689410bbae850b7c104525e.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237473/video-thumbs/9d4b7335a689410bbae850b7c104525e.mov.png", duration: "0:24", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233079/site-videos/6edb3dac5adb48ab8874aed8bd7a9608.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237465/video-thumbs/6edb3dac5adb48ab8874aed8bd7a9608.mov.png", duration: "3:43", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180060/site-videos/7636a992b85a46f498de0135a89ebd83.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237467/video-thumbs/7636a992b85a46f498de0135a89ebd83.mov.png", duration: "1:00", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179849/site-videos/412a12e193b743bd8d42f82abb5e8bd3.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237455/video-thumbs/412a12e193b743bd8d42f82abb5e8bd3.mov.png", duration: "0:44", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233362/site-videos/copy_39C02920-581D-4807-9738-102F6E5387B0.mp4", thumbnail: "videos/thumbs/copy_39C02920-581D-4807-9738-102F6E5387B0.mov.png", duration: "4:50", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180154/site-videos/9a94993e6200477cb0fa2ce58c3f753d.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237472/video-thumbs/9a94993e6200477cb0fa2ce58c3f753d.mov.png", duration: "0:45", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233510/site-videos/export_1776332982069.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237495/video-thumbs/export_1776332982069.mov.png", duration: "1:00", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180381/site-videos/f1b64a67a8b24792b51acffd0a588e20.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237496/video-thumbs/f1b64a67a8b24792b51acffd0a588e20.mov.png", duration: "0:25", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179832/site-videos/3b39837da3e24bdfa9721044ef027630.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237455/video-thumbs/3b39837da3e24bdfa9721044ef027630.mov.png", duration: "1:00", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179548/site-videos/08c46fbda7f942cf94a37c0bd34c1382.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237439/video-thumbs/08c46fbda7f942cf94a37c0bd34c1382.mov.png", duration: "0:21", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179798/site-videos/343e117db2c84b5baf35ca679089a1b1.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237453/video-thumbs/343e117db2c84b5baf35ca679089a1b1.mov.png", duration: "0:20", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179957/site-videos/5a82b83452594f779c544fa179e2e60a.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237462/video-thumbs/5a82b83452594f779c544fa179e2e60a.mov.png", duration: "1:00", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233031/site-videos/6B8B485A-428A-47A9-9B4C-9C01C9B5B01B.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237464/video-thumbs/6B8B485A-428A-47A9-9B4C-9C01C9B5B01B.mov.png", duration: "2:12", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179811/site-videos/34d8a4fd25d24484b494cf0a35500c39.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237454/video-thumbs/34d8a4fd25d24484b494cf0a35500c39.mov.png", duration: "0:18", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180130/site-videos/9819886099b14966a52d0b60043db5b0.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237471/video-thumbs/9819886099b14966a52d0b60043db5b0.mov.png", duration: "0:33", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233107/site-videos/864a588b20194aebaada8b8669b9543d.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237468/video-thumbs/864a588b20194aebaada8b8669b9543d.mov.png", duration: "1:00", year: "2026"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179862/site-videos/454e2a2348a94db4b0b19a525babc449.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237456/video-thumbs/454e2a2348a94db4b0b19a525babc449.mov.png", duration: "0:31", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180029/site-videos/74e03581174c4678822db09a3397325d.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237467/video-thumbs/74e03581174c4678822db09a3397325d.mov.png", duration: "0:28", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179921/site-videos/550da6cbb5a447219d474d045396dc5e.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237460/video-thumbs/550da6cbb5a447219d474d045396dc5e.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233446/site-videos/export_1764920101375.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237494/video-thumbs/export_1764920101375.mov.png", duration: "2:12", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179687/site-videos/25984be1086341d1b438700245bc8a5e.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237449/video-thumbs/25984be1086341d1b438700245bc8a5e.mov.png", duration: "0:54", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179873/site-videos/46556a93f0624e0286375179c210d72b.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237457/video-thumbs/46556a93f0624e0286375179c210d72b.mov.png", duration: "0:15", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180338/site-videos/e8b1e3ba71b04883a4ab09ced1b03586.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237493/video-thumbs/e8b1e3ba71b04883a4ab09ced1b03586.mov.png", duration: "1:01", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179544/site-videos/0817265e207349e1b9fb32d27ff8574d.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237438/video-thumbs/0817265e207349e1b9fb32d27ff8574d.mov.png", duration: "0:32", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179750/site-videos/2ab38c18c16a4a00b05eab75e84e66f7.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237451/video-thumbs/2ab38c18c16a4a00b05eab75e84e66f7.mov.png", duration: "0:37", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233305/site-videos/c3133360d79a4ff383ecc571e4b2e08f.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237478/video-thumbs/c3133360d79a4ff383ecc571e4b2e08f.mov.png", duration: "1:00", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179724/site-videos/296dcd5e89dc4854b0244017544c76cf.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237450/video-thumbs/296dcd5e89dc4854b0244017544c76cf.mov.png", duration: "0:33", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179611/site-videos/1d62ccdbd29a485781372c9de50a61bd.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237445/video-thumbs/1d62ccdbd29a485781372c9de50a61bd.mov.png", duration: "0:19", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179621/site-videos/1e1a44aaf1ee4936b6f15ee9a8caa2e2.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237446/video-thumbs/1e1a44aaf1ee4936b6f15ee9a8caa2e2.mov.png", duration: "0:21", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179913/site-videos/4e0f847960694c7daa1e9a8f230ea8f6.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237460/video-thumbs/4e0f847960694c7daa1e9a8f230ea8f6.mov.png", duration: "0:27", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180085/site-videos/8b78b17b86524ffeb0cb74a04d3633a8.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237469/video-thumbs/8b78b17b86524ffeb0cb74a04d3633a8.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180289/site-videos/d3cf48d4700e4814b6ea8f438f3e34fc.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237491/video-thumbs/d3cf48d4700e4814b6ea8f438f3e34fc.mov.png", duration: "0:59", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179559/site-videos/09c57715c53c45aab4ec28ec67491c7f.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237440/video-thumbs/09c57715c53c45aab4ec28ec67491c7f.mov.png", duration: "0:21", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180195/site-videos/b3e326ac4cc04730b22745e5c884cce1.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237475/video-thumbs/b3e326ac4cc04730b22745e5c884cce1.mov.png", duration: "0:32", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233215/site-videos/ae842bd8d7c6467986f67c4d1f1fb806.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237474/video-thumbs/ae842bd8d7c6467986f67c4d1f1fb806.mov.png", duration: "1:05", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180255/site-videos/c78ac0f3ce474da6b196849c61f79174.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237479/video-thumbs/c78ac0f3ce474da6b196849c61f79174.mov.png", duration: "1:00", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179706/site-videos/28e11c8a3904420e9180d97c270514bd.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237450/video-thumbs/28e11c8a3904420e9180d97c270514bd.mov.png", duration: "0:45", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179601/site-videos/149df7da2e7d49fe8ba4b4d76a83e243.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237443/video-thumbs/149df7da2e7d49fe8ba4b4d76a83e243.mov.png", duration: "0:35", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180201/site-videos/b98bcb22d3464200a821d092dd3ba34f.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237475/video-thumbs/b98bcb22d3464200a821d092dd3ba34f.mov.png", duration: "0:34", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179777/site-videos/2f39f677fc404959881ab1ee2d91687b.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237452/video-thumbs/2f39f677fc404959881ab1ee2d91687b.mov.png", duration: "0:43", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180096/site-videos/94e7fc931d54429eb00dbda22b1d68be.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237470/video-thumbs/94e7fc931d54429eb00dbda22b1d68be.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179904/site-videos/4b7359c23e8c45a181348774dedb67d4.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237458/video-thumbs/4b7359c23e8c45a181348774dedb67d4.mov.png", duration: "0:15", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233586/site-videos/f9af1d560b404f6790d73a0cd5b5838b.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237498/video-thumbs/f9af1d560b404f6790d73a0cd5b5838b.mov.png", duration: "2:14", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179630/site-videos/23bfd4dc6ef54af4acaf80e978f16ecb.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237447/video-thumbs/23bfd4dc6ef54af4acaf80e978f16ecb.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233284/site-videos/bfdf56661b414050876c118773962fa7.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237477/video-thumbs/bfdf56661b414050876c118773962fa7.mov.png", duration: "3:26", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180414/site-videos/f5c939e336d6432cb25cb0856de1f69f.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237497/video-thumbs/f5c939e336d6432cb25cb0856de1f69f.mov.png", duration: "1:00", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180315/site-videos/dc0d51585c8d4e06b09d429bb65220f6.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237493/video-thumbs/dc0d51585c8d4e06b09d429bb65220f6.mov.png", duration: "0:22", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180463/site-videos/v15044gf0000d28lsfvog65ptco00elg.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237501/video-thumbs/v15044gf0000d28lsfvog65ptco00elg.mp4.png", duration: "0:21", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180005/site-videos/6bccc2b45da848c090ba0be605ad7f9a.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237465/video-thumbs/6bccc2b45da848c090ba0be605ad7f9a.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179788/site-videos/33c2f8f5538b467b8f842f01216ac3ce.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237453/video-thumbs/33c2f8f5538b467b8f842f01216ac3ce.mov.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233003/site-videos/4c83cbd563f9427e8402b931e8665c75.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237459/video-thumbs/4c83cbd563f9427e8402b931e8665c75.mov.png", duration: "1:23", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180461/site-videos/v15044gf0000d1qrfgnog65gaqvn2tp0.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237500/video-thumbs/v15044gf0000d1qrfgnog65gaqvn2tp0.mp4.png", duration: "0:24", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179933/site-videos/5812d75907fc42f3a4a5c4e58a36c1bd.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237461/video-thumbs/5812d75907fc42f3a4a5c4e58a36c1bd.mov.png", duration: "0:22", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180021/site-videos/72fae7681bbb454cb4e005f789df3a46.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237466/video-thumbs/72fae7681bbb454cb4e005f789df3a46.mov.png", duration: "0:27", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180455/site-videos/v15044gf0000cvhp557og65nbqqgee00.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237499/video-thumbs/v15044gf0000cvhp557og65nbqqgee00.mp4.png", duration: "0:34", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180458/site-videos/v15044gf0000d0qcf8fog65gsscg1nbg.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237500/video-thumbs/v15044gf0000d0qcf8fog65gsscg1nbg.mp4.png", duration: "0:20", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179585/site-videos/0aa444ea8db547d58fdd9bd2034e35dc.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237441/video-thumbs/0aa444ea8db547d58fdd9bd2034e35dc.mov.png", duration: "0:52", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180115/site-videos/95e74fe63f094b51afa8499f576a1e5f.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237471/video-thumbs/95e74fe63f094b51afa8499f576a1e5f.mov.png", duration: "0:41", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179989/site-videos/687be7708dab484e9589beffaab5b0f5.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237463/video-thumbs/687be7708dab484e9589beffaab5b0f5.mov.png", duration: "0:24", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779233672/site-videos/seaside_bar_crawl.mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237499/video-thumbs/seaside_bar_crawl.mov.png", duration: "1:48", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179591/site-videos/13999748dc6f4d8091fbbc21e50c42b3.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237442/video-thumbs/13999748dc6f4d8091fbbc21e50c42b3.mov.png", duration: "0:19", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179978/site-videos/5c49fa6712564d06b38f1c6cc3ec6e32.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237463/video-thumbs/5c49fa6712564d06b38f1c6cc3ec6e32.mov.png", duration: "0:33", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180270/site-videos/c955ba546dad46bda1e9d6044a1684cf.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237480/video-thumbs/c955ba546dad46bda1e9d6044a1684cf.mov.png", duration: "0:21", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180368/site-videos/f0f4156b980c491f9e1f6c96046b86e8.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237496/video-thumbs/f0f4156b980c491f9e1f6c96046b86e8.mov.png", duration: "1:00", year: "2025"},
    {type: "local", src: "videos/Telluride trip  (3).mp4", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237473/video-thumbs/Telluride_trip___3_.mp4.png", duration: "4:49", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180301/site-videos/d4e0b2ae6cff4f4c97fe8326d99d78c4.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237492/video-thumbs/d4e0b2ae6cff4f4c97fe8326d99d78c4.mov.png", duration: "0:19", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180221/site-videos/c72e7a5ab01d45fbb31791d2c6b122f5.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237479/video-thumbs/c72e7a5ab01d45fbb31791d2c6b122f5.mov.png", duration: "0:22", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180452/site-videos/f76474a54fc8458c94f410024bd83377.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237497/video-thumbs/f76474a54fc8458c94f410024bd83377.mov.png", duration: "1:02", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779180209/site-videos/bf330fc9f9e643ec97ec4f284291fe83.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237476/video-thumbs/bf330fc9f9e643ec97ec4f284291fe83.mov.png", duration: "0:34", year: "2025"},
    {type: "local", src: "https://res.cloudinary.com/dljs01zmp/video/upload/v1779179898/site-videos/4b3dc8225abe426ebd450a0f8c2773b7.mov", thumbnail: "https://res.cloudinary.com/dljs01zmp/image/upload/v1779237457/video-thumbs/4b3dc8225abe426ebd450a0f8c2773b7.mov.png", duration: "0:39", year: "2025"},
  ],

  /* ------ Creative Archive ------ */
  archiveItems: [
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/0243d212-5261-4fc2-94c2-8132b4034974.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/749793d9-d254-4659-81d9-f2414ba94603-removebg-preview.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/9a46e54f-64a8-4b8b-807b-e0e20e53c8dd-min.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/AD72CD10-2010-4B62-B635-B271028387F8_-_Edited.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/bcd7e422-d182-43ab-986e-d8cb1a598090.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/d6f3092b-3772-4547-866f-026cd4b4f2b5-min.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/e7e56479-099d-40d7-99a5-497e2b5e710d.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/E8856422-499F-401E-9CD9-351AA8C759EE.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__1_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__10_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__2_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__3_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__4_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__5_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__6_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/FullSizeRender__8_.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2860.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2870.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2872.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2874.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2876.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2877.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2880.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2965.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2970.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_2971.png", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4009.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4022.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4023.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4024.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4026.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4044.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4052.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4057.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4059.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4062.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_4064.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_5785.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_6179.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_6188.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_6246.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_6248.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_9889.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/IMG_9892.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/archive/Screenshot_2024-01-30_at_4_59_00_PM.png", type: "" },
  ],

  /* ------ Prints ------ */
  /* Second sketchbook on the archive page. Same shape as archiveItems.
     Add files to ~/Desktop/prints, then run:
       node --env-file=.env upload-photos.js ~/Desktop/prints prints  */
  prints: [
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6290.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6289.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6286.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6285.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6284.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6283.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6272.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6270.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6269.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6267.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6264.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6251.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6250.jpg", type: "" },
    { title: "", image: "https://res.cloudinary.com/dljs01zmp/image/upload/photos/prints/IMG_6228.jpg", type: "" },
  ],

  /* ------ About ------ */
  about: {
    portrait: "https://res.cloudinary.com/dljs01zmp/image/upload/c_fill,ar_3:4,g_auto,w_1000,q_auto,f_auto/site-photos/about-portrait.jpg",
    headline: "To Chase What Moves Me",
    subhead: "By someone who was skiing before they could walk.",
    bio: [
      "I don't come from mountains. I come from salt and sand — Jersey Shore summer nights, the hum of cicadas, boardwalk lights flickering in the dark. A place where family is loud and love is louder. Where the ocean raised me. Where my heart first learned to ache in the best kind of way.",
      "But I've been chasing mountains since before I had words for them. Before I could even walk I was in the backcountry, bundled up and cradled by peaks, absorbing the rhythm of snow, wind, and wilderness. Skiing didn't come later — it was always there. It's how I learned to move. How I learned to live.",
      "I grew up racing gates in the icy grip of New Jersey winters. That hardpack, that edge-gripping survival skiing — it teaches you something. Discipline. Grit. A respect for speed and control. But powder was always the thing I came back to, and even then I felt it in my chest: the pull of deeper snow, of untouched terrain, of something wilder than finish lines.",
      "So I listened. I went west — landed in Colorado with nothing but a heart full of fire and a head full of dreams. CU Boulder cracked my world open. The chaos, the pressure to fit a mold, the noise of it all. But I kept looking up. I kept chasing storms, ditching class for fresh lines, trading comfort for clarity in the alpine. And when I found freeride skiing, it felt like coming home to a part of myself I'd been waiting to meet.",
      "Dropping into deep snow still feels like touching the divine. Like the snow swallows everything that hurt and leaves behind only breath and blood and clarity. There's a silence in skiing that heals you. A stillness in motion. Dolores LaChapelle called it sacred, and she was right. Skiing doesn't just take you down mountains — it takes you deeper into yourself.",
      "I still remember the first time I looked out a window in Colorado and said, I can't believe places like this exist. I've said it nearly every day since — Utah sunrises, canyon drives, deep powder lines that make you feel like you're flying.",
      "And I started creating again. Film, photography, words, food — anything to capture the feeling, to bottle it, to give it to someone else. I realized I didn't just want to feel deeply. I wanted to make others feel, too. Whether it's a frame of a skier carving a ridgeline at sunset or a shared meal after a storm day, I want to remind people that life is still worth falling in love with.",
      "Now I live in Utah full-time, and the Wasatch is where my story is unfolding. I'm ski bumming in my own way — every season planned around snow, everything built around the mountain — and I've never felt more wealthy for it. I don't want a career that traps me in a box. I want a life that breathes. One that carves new lines every day. I'm chasing the dream of making ski and surf films that stir people, that crack open something real. Because at the heart of it all, I'm a storyteller: through powder turns, through camera lenses, through frames and edits and late-night kitchen table conversations.",
      "I surf in the summers. I ski in the winters. I chase storms. I chase light. I chase connection. I chase whatever makes me feel most alive.",
      "Some people measure success in titles, in bank accounts, in achievements lined up like trophies. I measure it in powder days and shared smiles. In community. In adrenaline. In peace. In the meals I cook for people I love. In the strangers who become family at the top of a ridgeline, grinning through frozen eyelashes.",
      "Life, to me, is about love. About people. About feeling it all. About waking up in wild places and saying, thank God I'm here. About giving the best of yourself to others.",
      "Because at the end of the day, all I want is to move people — with my words, my art, my presence. I want to remind others of their own aliveness. To inspire someone to drop everything and chase what they love.",
      "That's what I'm doing. I'm chasing what moves me.<br>And maybe, just maybe, that's enough.",
    ],
    values: [
      "Skiing", "Surfing", "Skating", "Sailing",
      "Mountains", "Ocean", "Powder Days", "Event Coverage",
      "Film", "Photography", "Painting", "Adventure",
    ],
  },
};
