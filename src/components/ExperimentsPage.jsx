import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// Image aspect ratio: 3584 x 1756
const ASPECT = 3584 / 1756;

// Clickable zones over the tab labels in the image
const tabHotspots = [
  { id: 'AI',        left: '5%',  width: '30%', top: '14%', height: '8%' },
  { id: 'ANIMATION', left: '35%', width: '30%', top: '14%', height: '8%' },
  { id: 'WEB',       left: '65%', width: '30%', top: '14%', height: '8%' },
];


const aiVideos = [
  { youtubeId: 'SBTTkawe4ho', title: 'OCTRA', customThumb: '/octra2-thumb.png', logo: '/octra-logo.png', logoSize: 'w-[32%]', about: `Octra is a fully homomorphic compute company and I wanted the ad to feel as cutting edge as the product, classy and high tech without being cold or corporate.\n\nI had Claude Code write me a Python script that runs inside Terminal and generates the whole thing. The idea was to use AI tooling to make an ad for a company whose entire product is about what AI can compute, and having it come out of the command line rather than After Effects felt right for that.\n\nThe script is a from-scratch terminal animation with no dependencies. It fills the screen with random code characters on a blue background, then draws the Octra "O" ring by doing actual math on the terminal grid, calculating an inner and outer radius, mapping each character cell to an angle, and revealing the ring randomly rather than clockwise. Text blocks cycle through product copy for the company. The whole thing runs at 30 frames per second with a frame loop, and has synchronized audio playing through afplay. It auto-adjusts the font size in Terminal so the proportions hold for recording.\n\nThe timing was the hardest part. Every phase has exact start and end times defined in seconds and I went through a lot of iterations to get the pacing to feel right. Too fast and nothing lands, too slow and it drags.` },
  { youtubeId: '7q08EuFDdwE', title: 'GROK ANNIE', customThumb: '/grok-annie-thumb.png', logo: '/grok-logo.png', logoSize: 'w-[32%]', about: `Google has made some of the best AI ads I've seen, Loretta, Mr. Fuzzy's Big Adventure. What makes them work is that they show AI doing something real and human rather than futuristic. They advertise the actual experience of using the product, which is a much harder thing to do.\n\nI think AI video is generally more interesting when it's self-aware about what it is. When the artificiality serves the concept, that's when it gets interesting. Trying to make it pass as real footage is usually a losing battle.\n\nSo for the Grok challenge I wanted to do something in that Google spirit, someone using Grok to reimagine a memory of a person they miss, something grounded and emotional rather than a demo. Grok's video model is harder to use than most, the interface is basically just an endless scroll of generations, which sounds chaotic but is actually kind of fun. You just keep going until something clicks and you end up with a lot to work with.` },
  { youtubeId: 'RCbfqQNils8', title: 'LIQUID DEATH', logo: '/liquiddeath-logo.png', logoSize: 'w-[32%]', about: `Liquid Death's branding is so punk and high energy that a standard product spot would never work. I've been into this comedic format where someone is in a life or death situation and instead of escaping, they go for the product, I did a version of it with Nova Vodka and the Titanic. For Liquid Death the idea was aliens invade Earth and all they actually want is to get their hands on a can.\n\nMy starting point was always to prompt Sora with my video idea just to see what comes back. I'm not always planning to use it directly but it's a good way to explore quickly and sometimes it generates something I wouldn't have planned for, kind of like a storyboard that moves. From there I'd take those outputs into Nano Banana Pro to make them more cinematic, get the grade right, bring up the quality. Nano Banana is really good at taking something raw and making it feel like it was actually shot.\n\nVeo and Kling 3.0 handled the actual video generation depending on the shot. Handheld and chaotic stuff was great with Kling, simpler inserts and product shots I'd do in Veo which is cleaner when the motion is straightforward.\n\nWith AI video I really think the best approach is to tell the story through cuts rather than trying to hold a scene together. The tools still can't really maintain continuity across a longer shot, so if you write for the montage from the start you get a much stronger result.` },
  { youtubeId: '59cpVc6vhtQ', title: 'CYGNET GIN', logo: '/cygnet-logo.png', logoSize: 'w-[32%]', about: `This one I worked on for months. The concept was a bartender trying to drop a lemon into a martini glass of Cygnet Gin, but the glass keeps jumping away from him, the idea being the gin is so smooth and luxurious it basically refuses to be disturbed. Funny and premium at the same time.\n\nThis was back when AI models were a lot less capable and getting the bottle to look right was genuinely the hardest thing I've dealt with in this whole process. I trained a custom LoRA on Hugging Face for a while and it still couldn't hold the shape consistently. What I eventually landed on was having the model generate a generic wine bottle for the shape and lighting, then inserting an actual photo of the Cygnet bottle through Photoshop, and then prompting Gemini to fix the lighting and make it feel believable. The label went on last.\n\nVeo handled the bottle consistency better than anything else I tried. The one shot of the bottle jumping I did in Sora and upscaled in Astra, Sora just has so much character and I wanted that specific energy for that moment, it was the only Sora shot in the whole piece.\n\nGetting the glass to move correctly was a whole other problem. Even with very specific prompts, whenever I gave the model an image of a bartender holding a lemon over a martini glass it would just assume the lemon was supposed to go in. That's what the training data says should happen and I couldn't get it to understand the glass should be moving away. The solution ended up being two separate generations with identical lighting, one where the glass moves, one where he dangles the lemon over an empty spot in frame, and then compositing them in After Effects.` },
  { youtubeId: '8pSX52Irk1U', title: 'NEURO', logo: '/neuro-logo.png', logoSize: 'w-[32%]', about: `Spec spot for Neuro Gum. I wanted it to feel less like a supplement ad and more like a sci-fi thriller, that Fight Club and Limitless voiceover style, depressed and nihilistic, like the character is just reporting from inside his own head.\n\nThe entire voiceover was done in Sora. I generated the original footage of the guy at his desk first, then created a character from it by going into the video, clicking the three-dot menu, and hitting Create Character. From there I'd write a separate prompt for each section of the script using that character so the voice stayed consistent across takes. The booth prompt was always the same: isolated audio, high quality, no music, movie monologue quality, then I'd add the specific tone and script for that section.\n\nFor visuals I focused on style over scene consistency, which is why it's a montage. I'd find reference images for the dreary office vibe, put them into Midjourney, and then go into Gemini and say "make a high quality cinematic image based on this" to upscale and make it feel real. Sometimes I'd take a Midjourney image into Sora first, and if Sora gave me something I liked I'd grab a frame from that and run the same Gemini pass on it, that kept the style consistent even when shots were coming from different models.\n\nVeo, Luma, and Kling all handled different shots depending on what was needed. Veo for simple stuff like the swimming shot, Luma for complex motion, Kling all-around but especially for characters.\n\nRaw AI video always looks too glossy so I brought everything into Premiere, added film grain from a preset by @beechinour, and fixed the color grading. Sound design came from ElevenLabs' library which you can search for free without using credits. Music was from Suno, I was targeting a bright cinematic synth underscore, analog arpeggios, no drums, optimistic flow state for the ending. You have to try it a couple times but when it works it's pretty insane.` },
  { youtubeId: 'BKw0ox-HpP0', title: 'NOVA VODKA', logo: '/novavodka-logo.png', logoSize: 'w-[32%]', about: `Someone on the Titanic who, instead of going for the lifeboats, just wants to get to the Nova Vodka. The product is that good.\n\nI started with a shotlist because it's so hard to get AI video to look realistic, this one doesn't hit the mark in a lot of ways, so I wanted to prioritize storytelling through cuts and not rely on the model getting character movement right.\n\nI've been using Nano Banana Pro a lot lately. I like generating reference images in Midjourney and then bringing them into Whisk or Nano Banana to get different angles or different parts of the scene. Freepik is also good for this especially their camera rotation tool. Flow is great but it still has an AI sheen sometimes that's hard to shake.\n\nWan 2.5 handled some of the handheld shaky shots and Sora handled some of the exterior stuff. I love Sora for video that looks quality and feels real but the resolution is low, so usually I'll generate in Sora from a reference image, remove the watermark in Photoshop, and bring it into Astra to upscale. I try to save Sora for the key shots.\n\nAudio was ElevenLabs, though most models besides Sora are still lacking in sound generation and tend to come out sounding a bit canned.` },
  { youtubeId: 'TouTcXdS_5g', title: 'MIDJOURNEY', logo: '/mj-logo.png', logoSize: 'w-[32%]', about: `I think the best AI video focuses on what the technology is actually good at, which is style. It's hard to generate coherent scenes, but when you focus on world building and atmosphere you can get something cohesive as long as you tell the story through cuts.\n\nEverything was generated in Midjourney. I'd take style references for colors and then describe the image I wanted in detail, I don't really use image references much unless I just need a variation of something I already have.\n\nThe trickiest shots were the ones where I needed a consistent location, like the castle and gold ball scene at the end. The model doesn't really understand a prompt like "using this wide shot, generate a closeup of the cowboy on the far end of the room." To get around it I'd take a low resolution screenshot of the area I wanted, bring it back into Midjourney or Nano Banana Pro, tell it to add the elements I needed, and then upscale to a high quality cinematic image. Every image went through that same pipeline: generated in Midjourney, upscaled and edited in Nano Banana Pro, then made into video with Kling or Flow. Flow for simple stuff like close ups of a person, Kling for complex motion, gunshots, anything with a lot of movement.\n\nThis was my first time using Suno for music. I couldn't quite get what I needed from a single track so I layered a few of the free jazzy riff outputs on top of each other. The main issue was it kept wanting to add standard percussion, so I generated a cymbal sound in ElevenLabs and just dropped it into Premiere wherever I wanted it.` },
  { youtubeId: '7mlFitv-n9w', title: 'HEARO', logoText: 'HEARO', about: `I really like the product launch video format and wanted to lean into it here. Hearo is an audio product so the whole concept around ears felt natural.\n\nFor the opening I generated a bunch of close-up ear images in Midjourney and brought them into Gemini to center and reframe them, I was going for a Svankmajer feel, that unsettling clinical surrealism. Gemini was good at isolating and composing the images in a way that felt intentional rather than just cropped. Voiceover was ElevenLabs, and for music I mixed two separate Suno tracks together because neither one on its own was quite right but layered they worked.\n\nOne thing worth mentioning: archival footage libraries are either too expensive or don't have exactly what you need. My workaround is to just generate fake archival footage in Sora. For this I needed something institutional and clinical so my prompt was something like "old 16mm 50s black and white newsreel footage of people waiting in hospital waiting rooms, checking their watches, busy rooms, tired of waiting, drab, large open spaces." Sora naturally produces the degraded film look with no extra post work, it just comes out looking like it was shot in 1954.` },
  { youtubeId: 'adOs2-quMUc', title: 'FACT MACHINE — CONFESSIONS', logo: '/factmachine-logo.png', about: `Fact Machine is an opinion market, like Polymarket but for opinions. I made all three of these spots hoping they would hire me to shoot the real version with a camera and crew, the AI version is essentially a detailed previs and they'd know exactly what they were getting.\n\nThe concept came from the Art Bell Area 51 call, that moment where someone calls into a radio show sounding genuinely terrified claiming to be a real Area 51 employee. The joke is that the caller is trying to manipulate the host into believing they're the real thing, and that same format of a very serious paranoid person making a desperate call maps perfectly onto the absurdity of an opinion market. Using a familiar tone and putting it completely out of context is what makes it funny.\n\nI mostly used Sora for character references, generating the characters first to get the look and feel right, then taking those shots into Gemini or Google to reshoot at higher quality. Sora gives you the character and the vibe and then you use another model to refine it.` },
  { youtubeId: 'mRIGg3EKw2c', title: 'FACT MACHINE — ALIENS', logo: '/factmachine-logo.png', about: `Fact Machine is an opinion market, like Polymarket but for opinions. I made all three of these spots hoping they would hire me to shoot the real version with a camera and crew, the AI version is a detailed previs and they'd know exactly what they were getting.\n\nThe aliens concept felt like a natural fit. Fact Machine is about people putting their opinions out into the world, and the idea that aliens come to Earth and immediately want to get on it plays into that in a funny way. I mostly just prompted Sora directly with my idea and cut together the clips I liked best. Sora gave me a lot to work with and some of the outputs were genuinely great. I mixed in some Veo clips as well for shots where I needed something cleaner.` },
  { youtubeId: 'u_OmktU01lI', title: 'FACT MACHINE — ROBBERS', logo: '/factmachine-logo.png', about: `Fact Machine is an opinion market, like Polymarket but for opinions. I made all three of these spots hoping they would hire me to shoot the real version with a camera and crew, the AI gives me a way to pitch the idea visually without having to convince anyone to spend money upfront.\n\nI keep coming back to this format where someone is in a life or death situation and instead of handling it they go for the product. I did it with Nova Vodka and the Titanic and with Liquid Death and the alien invasion. For Fact Machine it felt obvious once I thought of it, a getaway driver who is supposed to be doing the getaway but is just sitting there on Fact Machine instead. I came up with the tagline "your two cents are worth more than the vault" which makes me laugh.\n\nI put masks on the guys in the back seat which helped a lot because syncing their dialogue would have been really hard, and the masks actually add to the bit. Most of the video was Veo 3 or Sora, Sora for the influencer-style phone shots since it handles that kind of footage well, everything else Veo 3. I had to be really specific with start and end frames because the model always wanted to add a dolly, and I used Gemini to generate slightly different versions of the same character across shots so the scene would map out properly.\n\nYou really do have to tell the story through shots rather than scenes and dialogue with AI video. The tools still can't hold a scene together reliably so writing for the cut from the start just gets you a better result.` },
  { youtubeId: 'i_c8JtvB85o', title: 'VOSS', logo: '/voss-logo.png', logoSize: 'w-[32%]', about: `Someone traveling to the most remote place possible to get the purest water. Voss was the obvious product fit.\n\nI started in Midjourney and Sora, not necessarily to get final shots but because both tools are really good for idea generation, they show you what you might be missing aesthetically, kind of like a moodboard. Once I had the direction I'd move to other generators. Nano Banana Pro and the new ChatGPT image model are especially good at manipulating images you already have, so I'd take a low resolution Sora output, remove the watermark in Photoshop, and then instruct Nano Banana to make a high quality cinematic shot based on it. That also let me get different angles of the same shot, like the different glacier views.\n\nKling O1 in Higgsfield handled most of the video and Flow handled the slow motion. Inserting the bottle is always the hardest part with these tools, Photoshop and Nano Banana Pro together are the best approach for getting the actual product into a shot cleanly.\n\nI always start with a shotlist. The images and cuts have to tell the story because the tools still aren't advanced enough to hold together longer scenes. For audio I usually use ElevenLabs but on this one I got good enough outputs directly from the Sora and Veo generations that I didn't really need it. Sometimes you get lucky.` },
];

const animationProjects = [
  {
    id: 'caveh',
    title: 'CAVEH ZAHEDI',
    about: `Frame-by-frame animation in Photoshop for Caveh Zahedi's documentary *How to Make a Film About an Iranian Film Producer I'd Never Even Met*.\n\nEach frame was drawn by hand which made it pretty time intensive. I'd finish a clip and send it over, Caveh would send back notes, and we'd go from there.\n\nCaveh's style is very hand-drawn and scrappy and kind of off-the-cuff, so I wanted to match that energy rather than make something slick. I used Generative Fill to create a different watercolor texture on every single frame so it always looks slightly different, like it was physically painted. That quality of nothing being quite perfect from frame to frame felt right for his work.\n\nHe was careful about the details. He connected me with a producer named Moudy who had photos of the actual apartment in Tehran we were animating. On the running shot he caught that a sign in the background was in Arabic and not Farsi. That kind of thing mattered to him.`,
    thumb: '/caveh/american-producer.mp4',
    logo: '/caveh-logo.png',
    logoSize: 'w-[60%]',
    videos: [
      { src: '/caveh/american-producer.mp4', title: 'AMERICAN PRODUCER' },
      { src: '/caveh/bahmankiarostami.mp4', title: 'BAHMAN KIAROSTAMI' },
      { src: '/caveh/marjaneh-animation.mp4', title: 'MARJANEH' },
      { src: '/caveh/moudydrink.mp4', title: 'MOUDY DRINK' },
      { src: '/caveh/peephole-final.mp4', title: 'PEEPHOLE' },
      { src: '/caveh/running-shot.mp4', title: 'RUNNING SHOT' },
      { src: '/caveh/doorbell.mp4', title: 'DOORBELL' },
    ],
  },
];

const webProjects = [
  { id: 'portfolio', title: 'THIS SITE', thumbImage: '/thumb-lukewolsko.png', logoText: 'lukewolsko.com', logoFont: 'CCDutchCourageDark', logoFontSize: '1.4rem', logoFontWeight: 'normal', about: `Most portfolio sites are pretty sleek and simple. I like that look but I wanted something more maximalist that actually felt like me. I built this with Claude Code and wrote no code myself. I'd describe what I wanted, it would build it, and I'd give notes the same way I would to anyone else I was working with.\n\nThe whole thing is organized like a real theater. The navigation is the signs on the walls, not a menu. I put invisible hotspots over the text in the photo and skewed them to match the angle of each sign. When you hover they glow blue like the sign is lit from behind.\n\nThe background is the Tower Theater in LA, which David Lynch has used for his films. All the text on the walls is embedded directly in the image, built in Photoshop, Gemini, and Midjourney. The layout locks to the exact pixel dimensions of the photo so nothing drifts.\n\nOne of the bigger things I had to figure out was aspect ratios. The desktop site is basically one big image that has to scale to any screen size while keeping all the clickable hotspots in the right place. Once I understood how to lock the layout to the image dimensions that problem went away, but getting there took a while. I also just learned a lot of CSS working on this, how positioning actually works, how to use blend modes, how animations are done.\n\nMobile had to be a completely different design. The theater concept doesn't really translate to a phone screen so I built a separate layout that's much simpler but still has the same feel. It's cleaner but it doesn't feel like a different site.\n\nThe biography page is an AI video of me at a desk. You click the desk to open the bio. The contact page has blinking lights scattered randomly so it looks like the LA skyline at night. That's my favorite part of the whole thing.\n\nDeployed on Vercel.` },
  { id: 'cygnetweb', title: 'CYGNET GIN', thumbImage: '/thumb-cygnet.png', logoText: 'cygnet-distillery.com', logoFont: 'Montserrat', logoFontWeight: 200, logoFontSize: '1.5rem', thumbOverlay: 'bg-black/55', about: `Cygnet's site runs on Shopify, which meant I actually had to learn to code since I was working inside their editor and couldn't use Claude Code. I was writing CSS and JavaScript directly in the platform.\n\nThe brief was to redesign it so it felt sleek and informational rather than just a shopping site. Cygnet is a premium product and the old site felt like a storefront. I wanted it to feel more like a brand.\n\nThe hardest part was integrating shopping across different countries. I worked with LiquidCommerce on an opening page where you'd select your country, and depending on the selection it would either load a script that swapped out the cart elements for US customers, or for countries outside the US where our provider was different, it would replace the add to cart and other shopping buttons with links to the right external site. Getting all of that to work cleanly and feel seamless was genuinely difficult.\n\nI designed all the CSS and built out the pages, including a serves page that I wanted to feel really classy, more like a recipe editorial than a product page. I also set up auto-publishing for articles using a Zapier integration so new content could go live without anyone touching the site.` },
  { id: 'tools', title: 'CLAUDE CODE TOOLS', about: 'Awards tracker + placement tracker built with Claude Code.' },
];

function VideoCard({ video, index, onOpen }) {
  const thumbUrl = video.customThumb || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  return (
    <motion.div
      className="cursor-pointer group h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={() => onOpen(video)}
    >
      <div className="h-full w-full overflow-hidden relative">
        <img
          src={thumbUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-200" />
        {video.logo && (
          <img
            src={video.logo}
            alt=""
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${video.logoSize || 'w-[25%]'} object-contain pointer-events-none`}
          />
        )}
        {video.logoText && (
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white tracking-widest"
            style={{ fontFamily: 'NeueHelvetica', fontSize: '1.6rem' }}
          >
            {video.logoText}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.div
      className="cursor-pointer group h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => onOpen(project)}
    >
      {(project.thumb || project.thumbImage) ? (
        <div className="h-full w-full overflow-hidden relative bg-black">
          {project.thumbImage ? (
            <img
              src={project.thumbImage}
              alt=""
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <video
              src={project.thumb}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              preload="metadata"
              muted
              playsInline
            />
          )}
          <div className={`absolute inset-0 ${project.thumbOverlay || 'bg-black/30'} group-hover:bg-black/0 transition-colors duration-200`} />
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${project.logoSize || 'w-[25%]'} object-contain pointer-events-none`}
            />
          )}
          {project.logoText && (
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white tracking-widest whitespace-nowrap"
              style={{ fontFamily: project.logoFont || 'NeueHelvetica', fontSize: project.logoFontSize || '1.6rem', fontWeight: project.logoFontWeight || 'bold' }}
            >
              {project.logoText}
            </span>
          )}
        </div>
      ) : (
        <div className="h-full w-full bg-black/20" />
      )}
    </motion.div>
  );
}

function ItemModal({ item, onClose }) {
  const [tab, setTab] = useState('WATCH');
  const [activeVideo, setActiveVideo] = useState(null);
  const isVideo = !!(item.youtubeId || item.src || item.videos);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ background: 'rgba(0, 0, 0, 0.88)' }}
    >
      <motion.div
        className="relative w-[92%] max-w-4xl flex flex-col"
        style={{
          maxHeight: '82vh',
          background: 'linear-gradient(145deg, rgba(42, 36, 32, 0.98) 0%, rgba(26, 22, 20, 0.98) 100%)',
          border: '2px solid #3d3530',
          borderRadius: '8px',
        }}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="flex-shrink-0 px-8 pt-8 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-white/50 hover:text-white text-2xl cursor-pointer"
          >
            ×
          </button>
          <h2
            className="text-center pt-2 pb-1 text-2xl md:text-3xl tracking-[0.15em]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#c4a882' }}
          >
            {item.title}
          </h2>

          {/* WATCH / ABOUT tabs */}
          {isVideo && <div className="flex justify-center gap-8 mb-5">
            {['WATCH', 'ABOUT'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative px-4 py-2 tracking-[0.25em] cursor-pointer"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '0.95rem',
                  color: tab === t ? '#c4a882' : 'rgba(196, 168, 130, 0.35)',
                  background: 'none',
                  border: 'none',
                }}
              >
                {t}
                {tab === t && (
                  <motion.div
                    layoutId="modal-tab-line"
                    className="absolute bottom-0 left-[15%] right-[15%] h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #c4a882, transparent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-10 pb-8">
          {tab === 'WATCH' && isVideo ? (
            item.videos ? (
              activeVideo ? (
                <div>
                  <div className="aspect-video">
                    <video src={activeVideo.src} className="w-full h-full" controls autoPlay />
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="mt-3 text-xs tracking-[0.2em] hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'rgba(196, 168, 130, 0.7)' }}
                  >
                    ← ALL CLIPS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 grid-rows-3 gap-1" style={{ height: '420px' }}>
                  {item.videos.map((v) => (
                    <div
                      key={v.src}
                      className="cursor-pointer group relative overflow-hidden bg-black h-full"
                      onClick={() => setActiveVideo(v)}
                    >
                      <video src={v.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" preload="metadata" muted playsInline />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="aspect-video">
                {item.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={item.src} className="w-full h-full" controls autoPlay />
                )}
              </div>
            )
          ) : (
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(196, 168, 130, 0.85)' }}>
              {(item.about || 'Coming soon.').split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '1.1rem' }}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperimentsPage() {
  const [activeTab, setActiveTab] = useState('AI');
  const [selectedItem, setSelectedItem] = useState(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    const items = activeTab === 'AI' ? aiVideos
      : activeTab === 'ANIMATION' ? animationProjects
      : webProjects;

    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-black pb-3 px-4 flex items-center justify-center" style={{ paddingTop: 'max(3.5rem, calc(env(safe-area-inset-top) + 1.5rem))' }}>
          <h1 className="tracking-[0.3em] uppercase text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#c4a882' }}>
            Experiments
          </h1>
        </div>

        {/* Tabs + Back */}
        <div className="sticky top-[72px] z-20 bg-black flex border-b border-white/10 mb-4">
          <Link
            to="/"
            className="flex-1 py-3 flex items-center justify-center tracking-[0.2em] uppercase transition-colors"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem',
              color: 'rgba(196,168,130,0.35)',
            }}
          >
            ← Back
          </Link>
          {['AI', 'ANIMATION', 'WEB'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 tracking-[0.2em] uppercase transition-colors"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                color: activeTab === tab ? '#c4a882' : 'rgba(196,168,130,0.35)',
                borderBottom: activeTab === tab ? '1px solid #c4a882' : '1px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto pb-16">
          {items.map((item, i) => {
            const isVideo = !!(item.youtubeId || item.src || item.videos);
            const thumbUrl = item.customThumb || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg` : null);
            return (
              <div
                key={item.youtubeId || item.id}
                className="w-full cursor-pointer mb-1 relative"
                onClick={() => setSelectedItem(item)}
              >
                {/* Thumbnail */}
                <div className="w-full relative" style={{ aspectRatio: '16/9' }}>
                  {thumbUrl ? (
                    <img src={thumbUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : item.thumb ? (
                    <video src={item.thumb} className="w-full h-full object-cover" preload="metadata" muted playsInline />
                  ) : item.thumbImage ? (
                    <img src={item.thumbImage} alt={item.title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  {/* Logo overlay */}
                  {item.logo && (
                    <img src={item.logo} alt="" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${item.logoSize || 'w-[25%]'} object-contain pointer-events-none`} />
                  )}
                  {item.logoText && (
                    <span
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white tracking-widest whitespace-nowrap"
                      style={{ fontFamily: item.logoFont || 'NeueHelvetica', fontSize: item.logoFontSize || '1.4rem', fontWeight: item.logoFontWeight || 'bold' }}
                    >
                      {item.logoText}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-auto bg-black flex items-center justify-center">
      {/* Aspect ratio container, scales like other pages */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: '100%',
          height: '100%',
          minWidth: `calc(100vh * ${ASPECT})`,
          minHeight: `calc(100vw / ${ASPECT})`,
          aspectRatio: '3584 / 1756',
        }}
      >
        {/* Background frame image */}
        <img
          src="/assets/experimentspage.png"
          alt=""
          className="absolute inset-0 w-full h-full"
        />

        {/* Tab hotspots, transparent clickable zones over the tab labels */}
        {tabHotspots.map((tab) => (
          <button
            key={tab.id}
            className="absolute z-20 cursor-pointer"
            style={{
              top: tab.top,
              left: tab.left,
              width: tab.width,
              height: tab.height,
              background: 'transparent',
              border: 'none',
            }}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}


        {/* Content area, overlaid on the black rectangle in the image */}
        <div
          className="absolute z-10 overflow-hidden"
          style={{
            top: '23%',
            left: '3.5%',
            width: '93%',
            height: '74%',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`h-full grid grid-rows-3 ${
                activeTab === 'AI' || activeTab === 'ANIMATION' || activeTab === 'WEB'
                  ? 'grid-cols-4'
                  : 'grid-cols-3'
              }`}
            >
              {activeTab === 'AI' && aiVideos.map((video, i) => (
                <VideoCard key={video.youtubeId} video={video} index={i} onOpen={setSelectedItem} />
              ))}
              {activeTab === 'ANIMATION' && animationProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelectedItem} />
              ))}
              {activeTab === 'WEB' && webProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelectedItem} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Back to site */}
      <Link to="/">
        <motion.div
          className="fixed z-50 cursor-pointer font-serif tracking-[0.2em] uppercase text-lg flex items-center gap-2"
          style={{
            bottom: '40px',
            right: '40px',
            color: '#c4a882',
            textShadow: '0 0 6px rgba(196, 168, 130, 0.4), 0 0 12px rgba(196, 168, 130, 0.2), 0 0 8px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,1)',
          }}
          whileHover={{
            scale: 1.05,
            textShadow: '0 0 10px rgba(196, 168, 130, 0.6), 0 0 20px rgba(196, 168, 130, 0.4), 0 0 8px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,1)',
          }}
        >
          Back to Theater →
        </motion.div>
      </Link>

      {/* Video / project modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
