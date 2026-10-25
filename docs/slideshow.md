# Homepage slideshow

The user requested dummy institute images now, with real images and image-count controls to be managed by the future admin interface. No admin interface was added in this visual update.

## Configuration

`src/content/slideshow.ts` owns the image list and settings:

- `slides`: ordered entries with a stable `id`, local `src`, English/Urdu `alt` and `caption`, `enabled`, and `placeholder`.
- `maxSlides`: number of enabled entries to display, in array order. Counts beyond the available entries use the available entries. Zero images renders no carousel; a single image hides unnecessary controls.
- `loop`: repeat the selected slides. When false, navigation stops at the ends.
- `intervalMs`: automatic advance delay, currently 5,000ms.

The future admin workflow can select/reorder images, change their visibility and count, and update looping by providing this shape to the existing component. Replacing an approved image includes updating bilingual alt text/caption and setting that entry's `placeholder` to false. Until then, each image carries a visible disclosure. Do not remove the disclosure from generated imagery.

The component uses Embla React, Next.js responsive images, 44px controls, touch/keyboard navigation, and Arabic/Urdu direction. Automatic advance pauses on hover, keyboard focus, manual pause, and hidden tabs; reduced motion disables autoplay and uses immediate manual transitions. The first image loads eagerly; later images use lazy loading. No remote image host or runtime image-generation service is needed.

The homepage uses the component's `hero` variant, spanning the viewport with `100vw` responsive image sizing, a panoramic desktop crop, and a taller mobile crop. Captions, placeholder disclosure, and controls stay within the image hero. The welcome text is a separate section below it, as requested in the annotated design PDF.

Implementation reference: [Embla React v8 documentation](https://www.embla-carousel.com/docs/v8/get-started/react).

## Generated assets

All three fictional photographs were generated with the built-in image-generation tool, then converted to local WebP assets for the website. They are not actual photographs of Jamia Madnia Arabia. The generated source originals remain at the image tool's original location; only optimized assets are served by this repository.

- `public/images/campus/courtyard.webp`
- `public/images/campus/veranda.webp`
- `public/images/campus/gardens.webp`

Final prompt set:

### Courtyard

Use case: photorealistic-natural. Asset type: website homepage slideshow placeholder photo, landscape 1536x1024. Create a beautiful photorealistic architectural photograph of a FICTIONAL South Asian Islamic educational institute courtyard: elegant cream sandstone Islamic arches, emerald green doors, terracotta pathways, lush flowering bougainvillea, palm foliage, a modest dome in the background. Inviting morning sunlight, realistic materials, vivid natural greens and warm amber colors, professional architectural photography. Wide composition suitable for object-cover cropping on desktop and mobile. No people, no text, no signs, no logos, no watermarks. This is dummy imagery, not a depiction of any real institution.

### Veranda

Use case: photorealistic-natural. Asset type: website homepage slideshow dummy image, landscape 1536x1024. A professional architectural photograph of a FICTIONAL Islamic educational institute in South Asia: a serene airy veranda and colonnade of tall sandstone scalloped arches opening onto a green garden with small flowering trees and a sunlit courtyard. Teal painted wood doors, cream limewashed walls, blue tile details, warm late afternoon light, vivid realistic natural colors, peaceful scholarly atmosphere. Wide photograph with useful composition at mobile crops. No people, no books with visible writing, no signs, no text, no logos, no watermarks. Not a real institution.

### Gardens

Use case: photorealistic-natural. Asset type: website homepage slideshow placeholder photograph, landscape 1536x1024. Create a professional wide architectural photo of a FICTIONAL Islamic educational campus: a graceful two-storey cream and terracotta madrasa building with arched windows, an understated turquoise tiled dome, landscaped green lawn, bright pink bougainvillea and flowering borders, a brick garden path leading to an entrance. Clear soft blue sky with a few white clouds, golden afternoon sunlight, inviting and uplifting, realistic fine detail, vivid natural colors. South Asian architectural setting. No people, no signs, no writing, no text, no logo, no watermark. Not a depiction of a real institution. Composition suitable for responsive cropping.
